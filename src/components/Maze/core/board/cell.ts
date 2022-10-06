import { Graphics } from "pixi.js"
import { cellClicked } from "../hooks/subscription"
import { CellStyleOptions } from "../options"
import { CellConfig } from "../options.default"
import { Cell, CellType } from "../types"
import { changeGraphicColor } from "../utils/pixi/graphic"

export class MazeCell implements Cell {
    /** 是否可通过 */
    public passable: boolean

    /** 单元格类型 */
    public type: CellType

    /** 到达代价 */
    public cost: number | undefined

    /** 定义相关样式 */
    public style: CellStyleOptions

    private __graphic?: Graphics

    public boundingBox?: [number, number, number, number]

    /** 用于自身状态回溯, 回到上一次的状态 */
    private statuStack: Cell[]

    public get graphic() {
        return this.__graphic
    }

    /** 设置graphic时绑定单击监听 */
    public set graphic(graphic: Graphics | undefined) {
        this.__graphic = graphic
        if (graphic) {
            graphic.on("click", () => cellClicked(this))
        }
    }

    constructor(type: CellType, graphic?: Graphics) {
        this.statuStack = []
        const cell = CellConfig[type]
        this.passable = cell.passable
        this.type = cell.type
        this.style = cell.style
        this.cost = cell.cost
        this.graphic = graphic
        this.statuStack.push({ ...cell })
    }

    public to(type: CellType) {
        const cell = CellConfig[type]
        this.passable = cell.passable
        this.type = cell.type
        this.style = cell.style
        this.cost = cell.cost
        this.statuStack.push({ ...cell })
        if (this.graphic) {
            // 由于事件侦听的是改变style的值, 而to会改变至对应type的style, 所以事件可以正常触发任意type的style样式
            changeGraphicColor(this.graphic, ...this.boundingBox!, cell.style.mouse.normal)
        }
        return this
    }

    public static Start() {
        return new MazeCell("start")
    }

    public static End() {
        return new MazeCell("end")
    }

    public static Blank() {
        return new MazeCell("blank")
    }

    public static Obstacle() {
        return new MazeCell("obstacle")
    }

    public toBlank() {
        return this.to("blank")
    }

    public toObstacle() {
        return this.to("obstacle")
    }

    /**
     * 将自身状态回溯到上一次的状态
     * @returns 返回自身
     */
    public backtrack() {
        this.statuStack.pop()
        if (this.statuStack.length === 0) throw "当前时刻仅有一个状态, 上一个状态为空, 不可回溯"
        const { passable, type, style } = this.statuStack[this.statuStack.length - 1]
        this.passable = passable
        this.type = type
        this.style = style
        return this
    }
}
