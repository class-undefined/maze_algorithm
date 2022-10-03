import { MazeStyleOptions } from "./options"
import { defaultMazeOptions } from "./options.default"

export class Maze {
    private canvas: HTMLCanvasElement
    private options: MazeStyleOptions
    private context: CanvasRenderingContext2D
    private constructor(teleport: HTMLCanvasElement, options?: Partial<MazeStyleOptions>) {
        this.options = { ...defaultMazeOptions, ...(options || {}) }

        if (teleport.tagName === "CANVAS") this.canvas = teleport
        else {
            const canvas = document.createElement("canvas")
            teleport.appendChild(canvas)
            this.canvas = canvas
        }
        this.context = this.canvas.getContext("2d") as CanvasRenderingContext2D
        this.__initOptions()
        this.__drawGrid()
    }

    /**
     * @param teleport 承载画布的节点, 若该元素本身即为canvas, 则设置该canvas为渲染对象
     */
    public static from(teleport: HTMLCanvasElement, options?: Partial<MazeStyleOptions>) {
        return new Maze(teleport, options)
    }

    public get size() {
        const { row, col } = this.options.grid.size
        const { width, height } = this.options.grid.unit
        const spacing = this.options.grid.lineStyle.width
        const widthBuff = (row + 1) * spacing
        const heightBuff = (col + 1) * spacing
        return {
            width: col * width + widthBuff,
            height: row * height + heightBuff,
        }
    }

    private __initOptions() {
        // 初始化画布尺寸
        const { width, height } = this.size
        this.canvas.width = width
        this.canvas.height = height
        this.context.fillStyle = this.options.grid.backGroundColor
        this.context.fillRect(0, 0, width, height)
    }

    private __grawBorder() {
        // 绘制边框
        this.context.fillStyle = this.options.grid.lineStyle.color
        const { width, height } = this.size
        const { row, col } = this.options.grid.size
        const lineWidth = this.options.grid.lineStyle.width // 线条宽度
        for (let i = 0; i < row + 1; i++) {
            this.context.fillRect(this.__converCoordinates(i, 0).x, 0, lineWidth, height)
        }
        for (let j = 0; j < col + 1; j++) {
            this.context.fillRect(0, this.__converCoordinates(0, j).y, width, lineWidth)
        }
    }

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

    private __drawGrid() {
        this.__grawBorder()
    }
}
