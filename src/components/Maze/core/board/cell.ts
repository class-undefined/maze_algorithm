import { Cell, CellType, Pos } from "../types"

export class MazeCell implements Cell {
    public passable: boolean
    public type: CellType

    constructor(passable?: boolean, type?: CellType) {
        this.passable = passable ?? true
        this.type = type ?? CellType.Road
    }

    public static Road() {
        return new MazeCell(true, CellType.Road)
    }

    public static Wall() {
        return new MazeCell(false, CellType.Wall)
    }

    public toRoad() {
        this.passable = true
        this.type = CellType.Road
        return this
    }

    public toWall() {
        this.passable = false
        this.type = CellType.Wall
    }
}
