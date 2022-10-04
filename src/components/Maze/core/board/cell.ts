import { Cell, CellType, Pos } from "../types"

export class MazeCell implements Cell {
    public passable: boolean
    public type: CellType
    private statuStack: Cell[]
    constructor(passable?: boolean, type?: CellType) {
        this.passable = passable ?? true
        this.type = type ?? CellType.Blank
        this.statuStack = [{ passable: this.passable, type: this.type }]
    }

    public changeStatus(passable?: boolean, type?: CellType) {
        if (!passable && !type) return this
        this.passable = passable ?? this.passable
        this.type = type ?? this.type
        this.statuStack.push({ passable: this.passable, type: this.type })
        return this
    }

    public static Blank() {
        return new MazeCell(true, CellType.Blank)
    }

    public static Road() {
        return new MazeCell(true, CellType.Road)
    }

    public static Wall() {
        return new MazeCell(false, CellType.Wall)
    }

    public toRoad() {
        return this.changeStatus(true, CellType.Road)
    }

    public toWall() {
        return this.changeStatus(false, CellType.Wall)
    }

    /**
     * 将自身状态回溯到上一次的状态
     * @returns 返回自身
     */
    public backtrack() {
        this.statuStack.pop()
        if (this.statuStack.length === 0) throw "当前时刻仅有一个状态, 上一个状态为空, 不可回溯"
        const { passable, type } = this.statuStack[this.statuStack.length - 1]
        this.passable = passable
        this.type = type
        return this
    }
}
