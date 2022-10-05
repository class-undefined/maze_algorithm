import { CellStyleOptions } from "../options"
import { DefaultCellStyleTable } from "../options.default"
import { Cell, CellType } from "../types"

export class MazeCell implements Cell {
    /** 是否可通过 */
    public passable: boolean

    /** 单元格类型 */
    public type: CellType

    /** 到达代价 */
    public cost?: number | undefined

    /** 定义相关样式 */
    public style: CellStyleOptions

    /** 用于自身状态回溯, 回到上一次的状态 */
    private statuStack: Cell[]

    constructor(passable?: boolean, type?: CellType) {
        this.passable = passable ?? true
        this.type = type ?? "blank"
        this.style = DefaultCellStyleTable[this.type]
        this.statuStack = [{ passable: this.passable, type: this.type, style: this.style }]
    }

    public changeStatus(passable?: boolean, type?: CellType) {
        if (!passable && !type) return this
        this.passable = passable ?? this.passable
        this.type = type ?? this.type
        this.style = DefaultCellStyleTable[this.type]
        this.statuStack.push({ passable: this.passable, type: this.type, style: this.style })
        return this
    }

    public static Start() {
        return new MazeCell(false, "start")
    }

    public static End() {
        return new MazeCell(true, "end")
    }

    public static Blank() {
        return new MazeCell(true, "blank")
    }

    public static Obstacle() {
        return new MazeCell(false, "obstacle")
    }

    public toBlank() {
        return this.changeStatus(true, "blank")
    }

    public toObstacle() {
        return this.changeStatus(false, "obstacle")
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
