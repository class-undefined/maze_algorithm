import { MazeStyleOptions } from "./options"
import { defaultMazeOptions } from "./options.default"
import { Application, Container, TextStyle, Text, Graphics } from "pixi.js"
import { hex2digital } from "./utils"
import { CellRect, Rect } from "./utils/pixi/rect"
import { Algorithm, AlgorithmEngine, Cell, Pos } from "./types"
import { getPath } from "./algorithms/common"
import { BorderEventSystem } from "./event"
import { MazeHelper } from "./utils/helper"
export class Maze {
    private app: Application // 主容器, 填装网格容器
    private gridContainer: Container // 网格容器, 用于承载棋盘
    private grid: Graphics // 棋盘坐标
    private board: Container // 棋盘, 用于填充矩形
    private options: MazeStyleOptions
    public algoEngine?: AlgorithmEngine // 算法引擎
    public event: BorderEventSystem // 事件系统
    public helper: MazeHelper // 工具类

    private constructor(teleport: HTMLCanvasElement, options?: Partial<MazeStyleOptions>) {
        this.options = { ...defaultMazeOptions, ...(options || {}) }
        const { width, height } = this.size
        const { padding } = this.options.grid
        this.app = new Application({
            view: teleport.tagName === "CANVAS" ? teleport : undefined,
            width: width + 2 * padding,
            height: height + 2 * padding,
            backgroundColor: hex2digital(this.options.grid.backGroundColor),
            resolution: 1,
        })
        this.gridContainer = new Container()
        this.board = new Container()
        this.board.pivot = { x: -padding, y: -padding }
        this.grid = new Rect(0, 0, width, height, this.options.grid.backGroundColor).toGraphics()
        this.app.stage.addChild(this.gridContainer)
        this.event = BorderEventSystem.from(this, this.grid).enable()
        this.helper = MazeHelper.from(this)
        CellRect.bind(this.helper)
        this.__initGrid()
    }

    /**
     * @param teleport 承载画布的节点, 若该元素本身即为canvas, 则设置该canvas为渲染对象
     */
    public static from(teleport: HTMLCanvasElement, options?: Partial<MazeStyleOptions>) {
        return new Maze(teleport, options)
    }

    public getOptison(): Readonly<MazeStyleOptions> {
        return this.options
    }

    /** 绑定算法格点 */
    public bindEngine(engine: AlgorithmEngine) {
        this.algoEngine = engine
        const { size } = this.options.grid
        for (let i = 0; i < size; i++) {
            for (let j = 0; j < size; j++) {
                this.__drawRect(i, j)
            }
        }
        return this
    }

    public get size() {
        const n = this.options.grid.size
        const { width, height } = this.options.grid.unit
        const spacing = this.options.grid.lineStyle.width
        const buff = n * spacing
        return {
            width: n * width + buff,
            height: n * height + buff,
        }
    }

    /**
     * 构造网格基本矩形单元
     * @param rowIndex 网格横轴索引
     * @param colIndex 网格纵轴索引
     * @param color 矩形颜色
     * @returns Graphics实例
     */
    private __generateRect(rowIndex: number, colIndex: number) {
        // 从格点坐标转换成画布坐标系
        const cellWidth = this.options.grid.unit.width
        const cellHeight = this.options.grid.unit.height
        const [x, y] = this.helper.getPosByIndex(rowIndex, colIndex)
        const gridCell = this.algoEngine!.board[rowIndex][colIndex]
        const graphic = new CellRect(x, y, cellWidth, cellHeight, gridCell).toGraphics()
        gridCell.graphic = graphic
        gridCell.boundingBox = [x, y, cellWidth, cellHeight]
        return graphic
    }

    /**
     * 在棋盘上绘制矩形
     * @param rowIndex 网格横轴索引
     * @param colIndex 网格纵轴索引
     * @param color 矩形颜色
     */
    private __drawRect(rowIndex: number, colIndex: number) {
        const graphic = this.__generateRect(rowIndex, colIndex)
        this.board.addChild(graphic)
    }

    /**
     * 绘制棋盘
     */
    private __drawBoard() {
        const { width, height } = this.size
        const color = this.options.grid.lineStyle.color //线条颜色
        const n = this.options.grid.size // 棋盘尺寸
        const lineWidth = this.options.grid.lineStyle.width // 线条宽度
        const cellWidth = this.options.grid.unit.width
        const cellHeight = this.options.grid.unit.height

        // 刻度文字样式
        const style = new TextStyle({
            fontSize: this.options.grid.axis.fontSize,
            fill: this.options.grid.axis.color,
        })
        // 水平线
        for (let i = 0; i < n + 1; i++) {
            const y = i * (lineWidth + cellHeight)
            const line = new Graphics()
            line.lineStyle({ width: lineWidth, color: hex2digital(color) })
                .moveTo(0, y)
                .lineTo(width, y)
            const text = new Text(i.toString(), style)
            text.x = -15
            text.y = y + cellHeight / 3
            if (i !== n) this.grid.addChild(text)
            this.grid.addChild(line)
        }
        // 竖直线
        for (let j = 0; j < n + 1; j++) {
            const x = j * (lineWidth + cellWidth)
            const line = new Graphics()
            line.lineStyle({ width: lineWidth, color: hex2digital(color) })
                .moveTo(x, 0)
                .lineTo(x, height)
            const text = new Text(j.toString(), style)
            text.x = x + cellWidth / 3
            text.y = -19
            if (j !== n) this.grid.addChild(text) // 0只添加一次
            this.grid.addChild(line)
        }
    }

    private __initGrid() {
        const { width, height } = this.size
        const { padding } = this.options.grid
        this.gridContainer.width = width + 2 * padding
        this.gridContainer.height = height + 2 * padding
        this.gridContainer.addChild(
            new Rect(
                0,
                0,
                width + 2 * padding,
                height + 2 * padding,
                this.options.grid.backGroundColor
            ).toGraphics()
        )
        this.grid.pivot = { x: -padding, y: -padding }
        this.gridContainer.addChild(this.grid)
        this.gridContainer.addChild(this.board)
        this.__drawBoard()
    }

    /** 清空棋盘 */
    public clearBoard() {
        this.board.removeChildren()
        this.algoEngine?.clear()
    }

    public search(source: Pos, target: Pos, type: Algorithm = "bfs") {
        if (!this.algoEngine) throw "尚未载入格点搜索系统 Grid class"
        const pathBacktrack = this.algoEngine.search(source, target, type)
        const path = getPath(pathBacktrack, target)
        const { board } = this.algoEngine!
        board[source[0]][source[1]].to("start")
        board[target[0]][target[1]].to("end")
        path?.forEach(([x, y]) => {
            if (!["start", "end"].find(type => board[x][y].type === type)) board[x][y].to("path")
        })
    }
}
