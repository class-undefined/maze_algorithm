import { Graphics } from "pixi.js"
import { CellStyleOptions } from "../options"
import { CellConfig } from "../options.default"
import { Cell, CellType } from "../types"

export class MazeCell implements Cell {
    /** 是否可通过 */
    public passable: boolean

    /** 单元格类型 */
    public type: CellType

    /** 到达代价 */
    public cost: number | undefined

    /** 定义相关样式 */
    public style: CellStyleOptions

    public graphic?: Graphics

    /** 用于自身状态回溯, 回到上一次的状态 */
    private statuStack: Cell[]

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
