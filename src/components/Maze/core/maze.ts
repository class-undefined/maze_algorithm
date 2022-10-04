import { MazeStyleOptions } from "./options"
import { defaultMazeOptions } from "./options.default"
import { Application, Container, TextStyle, Text, Graphics } from "pixi.js"
import { hex2digital } from "./utils"
import { Rect } from "./utils/pixi/rect"
export class Maze {
    private app: Application
    private options: MazeStyleOptions
    private gridContainer: Container // 网格
    private constructor(teleport: HTMLCanvasElement, options?: Partial<MazeStyleOptions>) {
        this.options = { ...defaultMazeOptions, ...(options || {}) }
        const { width, height } = this.size
        this.app = new Application({
            view: teleport.tagName === "CANVAS" ? teleport : undefined,
            width: width + 40,
            height: height + 40,
            backgroundColor: hex2digital(this.options.grid.backGroundColor),
        })
        this.gridContainer = new Container()

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

    private __grawBorder() {
        // 绘制边框
        const { width, height } = this.size
        const grid = new Rect(0, 0, width, height, this.options.grid.backGroundColor).toGraphics()
        const color = this.options.grid.lineStyle.color
        const n = this.options.grid.size
        const lineWidth = this.options.grid.lineStyle.width // 线条宽度
        const style = new TextStyle({
            fontSize: 10,
            fill: "#ffffff",
        })

        // 水平线
        for (let i = 0; i < n + 1; i++) {
            const { x, y } = this.__converCoordinates(0, i)
            const line = new Graphics()
            line.lineStyle({ width: lineWidth, color: hex2digital(color) })
                .moveTo(0, y)
                .lineTo(width, y)
            const text = new Text(i.toString(), style)
            text.x = x
            text.y = y
            grid.addChild(line)
            grid.addChild(text)
        }
        // 列
        for (let j = 0; j < n + 1; j++) {
            const { x, y } = this.__converCoordinates(j, 0)
            const line = new Graphics()
            line.lineStyle({ width: lineWidth, color: hex2digital(color) })
                .moveTo(x, 0)
                .lineTo(x, height)
            const text = new Text(j.toString(), style)
            text.x = x
            text.y = y
            grid.addChild(text)
            grid.addChild(line)
        }

        grid.pivot = { x: -10, y: -10 }
        this.gridContainer.addChild(grid)
    }

    private __initGrid() {
        const { width, height } = this.size
        this.gridContainer.width = width + 20
        this.gridContainer.height = height + 20
        this.gridContainer.addChild(new Rect(0, 0, width + 40, height + 40, "#000000").toGraphics())
        this.__grawBorder()
    }
}
