import { MazeStyleOptions } from "./options"
import { defaultMazeOptions } from "./options.default"
import { Application, Container, TextStyle, Text, Graphics } from "pixi.js"
import { hex2digital } from "./utils"
import { CellRect, Rect } from "./utils/pixi/rect"
import { Algorithm, AlgorithmEngine, Pos } from "./types"
import { getPath } from "./algorithms/common"
import { BorderEventSystem } from "./event"
import { MazeHelper } from "./utils/helper"
import { useSubscriptCellClick } from "./hooks/subscription"
export class Maze {
    private __app: Application // 主容器, 填装网格容器
    private __gridContainer: Container // 网格容器, 用于承载棋盘
    private __grid: Graphics // 棋盘坐标
    private __board: Container // 棋盘, 用于填充矩形
    private __options: MazeStyleOptions
    private __start?: Pos
    private __end?: Pos

    public algoEngine?: AlgorithmEngine // 算法引擎
    public event: BorderEventSystem // 事件系统
    public helper: MazeHelper // 工具类

    private constructor(teleport: HTMLCanvasElement, options?: Partial<MazeStyleOptions>) {
        this.__options = { ...defaultMazeOptions, ...(options || {}) }
        const { width, height } = this.size
        const { padding } = this.__options.grid
        this.__app = new Application({
            view: teleport.tagName === "CANVAS" ? teleport : undefined,
            width: width + 2 * padding,
            height: height + 2 * padding,
            backgroundColor: hex2digital(this.__options.grid.backGroundColor),
            resolution: 1,
        })
        this.__gridContainer = new Container()
        this.__board = new Container()
        this.__board.pivot = { x: -padding, y: -padding }
        this.__grid = new Rect(
            0,
            0,
            width,
            height,
            this.__options.grid.backGroundColor
        ).toGraphics()
        this.__app.stage.addChild(this.__gridContainer)
        this.event = BorderEventSystem.from(this, this.__grid).enable()
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
        return this.__options
    }

    /** 绑定算法格点 */
    public bindEngine(engine: AlgorithmEngine) {
        this.algoEngine = engine
        const { size } = this.__options.grid
        for (let i = 0; i < size; i++) {
            for (let j = 0; j < size; j++) {
                this.__drawRect(i, j)
            }
        }
        useSubscriptCellClick(cell => {
            if (["start", "end"].find(type => cell.type === type)) return
            cell.to("obstacle")
            this.clearBoard(true)
            this.search(this.__start!, this.__end!)
        })
        return this
    }

    public get size() {
        const n = this.__options.grid.size
        const { width, height } = this.__options.grid.unit
        const spacing = this.__options.grid.lineStyle.width
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
        const cellWidth = this.__options.grid.unit.width
        const cellHeight = this.__options.grid.unit.height
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
        this.__board.addChild(graphic)
    }

    /**
     * 绘制棋盘
     */
    private __drawBoard() {
        const { width, height } = this.size
        const color = this.__options.grid.lineStyle.color //线条颜色
        const n = this.__options.grid.size // 棋盘尺寸
        const lineWidth = this.__options.grid.lineStyle.width // 线条宽度
        const cellWidth = this.__options.grid.unit.width
        const cellHeight = this.__options.grid.unit.height

        // 刻度文字样式
        const style = new TextStyle({
            fontSize: this.__options.grid.axis.fontSize,
            fill: this.__options.grid.axis.color,
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
            if (i !== n) this.__grid.addChild(text)
            this.__grid.addChild(line)
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
            if (j !== n) this.__grid.addChild(text) // 0只添加一次
            this.__grid.addChild(line)
        }
    }

    private __initGrid() {
        const { width, height } = this.size
        const { padding } = this.__options.grid
        this.__gridContainer.width = width + 2 * padding
        this.__gridContainer.height = height + 2 * padding
        this.__gridContainer.addChild(
            new Rect(
                0,
                0,
                width + 2 * padding,
                height + 2 * padding,
                this.__options.grid.backGroundColor
            ).toGraphics()
        )
        this.__grid.pivot = { x: -padding, y: -padding }
        this.__gridContainer.addChild(this.__grid)
        this.__gridContainer.addChild(this.__board)
        this.__drawBoard()
    }

    /** 清空棋盘 */
    public clearBoard(skipObstacles: boolean = false) {
        this.algoEngine?.clear(skipObstacles)
    }

    public search(source: Pos, target: Pos, type: Algorithm = "bfs") {
        if (!this.algoEngine) throw "尚未载入格点搜索系统 Grid class"
        this.__start = source
        this.__end = target
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
