import { MazeStyleOptions } from "./options"
import { defaultMazeOptions } from "./options.default"
import { Application, Container, TextStyle, Text, Graphics } from "pixi.js"
import { hex2digital } from "./utils"
import { Rect } from "./utils/pixi/rect"
export class Maze {
    private app: Application // 主容器, 填装网格容器
    private gridContainer: Container // 网格容器, 用于承载棋盘
    private board: Container // 棋盘, 用于填充矩形
    private options: MazeStyleOptions
    private constructor(teleport: HTMLCanvasElement, options?: Partial<MazeStyleOptions>) {
        this.options = { ...defaultMazeOptions, ...(options || {}) }
        const { width, height } = this.size
        const { padding } = this.options.grid
        this.app = new Application({
            view: teleport.tagName === "CANVAS" ? teleport : undefined,
            width: width + 2 * padding,
            height: height + 2 * padding,
            backgroundColor: hex2digital(this.options.grid.backGroundColor),
        })
        this.gridContainer = new Container()
        this.board = new Container()
        this.board.pivot = { x: -padding, y: -padding }
        this.gridContainer.addChild(this.board)
        this.app.stage.addChild(this.gridContainer)
        this.__initGrid()
    }

    /**
     * @param teleport 承载画布的节点, 若该元素本身即为canvas, 则设置该canvas为渲染对象
     */
    public static from(teleport: HTMLCanvasElement, options?: Partial<MazeStyleOptions>) {
        return new Maze(teleport, options)
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

    // private __initOptions() {
    //     // 初始化画布尺寸
    //     const { width, height } = this.size
    //     this.canvas.width = width
    //     this.canvas.height = height
    //     this.context.fillStyle = this.options.grid.backGroundColor
    //     this.context.fillRect(0, 0, width, height)
    // }

    /**
     * 将格点转换为画布坐标
     * @param x
     * @param y
     * @returns
     */
    private __converCoordinates(x: number, y: number) {
        // 从格点坐标转换成画布坐标系
        const lineWidth = this.options.grid.lineStyle.width
        const cellWidth = this.options.grid.unit.width
        const cellHeight = this.options.grid.unit.height
        return {
            x: x * (lineWidth + cellWidth),
            y: y * (lineWidth + cellHeight),
        }
    }

    /**
     * 构造网格基本矩形单元
     * @param rowIndex 网格横轴索引
     * @param colIndex 网格纵轴索引
     * @param color 矩形颜色
     * @returns Graphics实例
     */
    private __generateRect(rowIndex: number, colIndex: number, color?: string) {
        // 从格点坐标转换成画布坐标系
        const lineWidth = this.options.grid.lineStyle.width
        const cellWidth = this.options.grid.unit.width
        const cellHeight = this.options.grid.unit.height
        const x = lineWidth / 2 + rowIndex * (cellWidth + lineWidth)
        const y = lineWidth / 2 + colIndex * (cellHeight + lineWidth)
        return new Rect(x, y, cellWidth, cellHeight, color).toGraphics()
    }

    /**
     * 绘制棋盘
     */
    private __drawBoard() {
        const { width, height } = this.size
        // 绘制棋盘背景
        const grid = new Rect(0, 0, width, height, this.options.grid.backGroundColor).toGraphics()
        this.board.addChild(grid)
        this.gridContainer.addChild(this.board)
        const color = this.options.grid.lineStyle.color //线条颜色
        const n = this.options.grid.size // 棋盘尺寸
        const lineWidth = this.options.grid.lineStyle.width // 线条宽度
        const cellWidth = this.options.grid.unit.width
        const cellHeight = this.options.grid.unit.height
        const { padding } = this.options.grid
        // 刻度文字样式
        const style = new TextStyle({
            fontSize: 10,
            fill: "#ffffff",
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
            if (i !== n) grid.addChild(text)
            grid.addChild(line)
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
            text.y = -15
            if (j !== n) grid.addChild(text) // 0只添加一次
            grid.addChild(line)
        }

        const rect = this.__generateRect(21, 5, "#ffffff")
        this.board.addChild(rect)
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
        this.__drawBoard()
    }
}
