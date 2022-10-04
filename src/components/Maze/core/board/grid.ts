import { Maze } from "../maze"
import { Cell, Grid, Pos } from "../types"
import { MazeCell } from "./cell"

export class MazeGrid implements Grid {
    public board: Cell[][]
    private directions: number[][] = [
        [0, -1],
        [1, 0],
        [0, 1],
        [-1, 0],
    ] // ↑→↓←
    constructor(private maze: Maze) {
        const { size } = maze.getOptison().grid
        this.board = new Array<Cell[]>(size)
        for (let i = 0; i < size; i++) {
            const col = new Array(size)
            for (let j = 0; j < size; j++) col[j] = MazeCell.Road()
            this.board[i] = col
        }
    }
    render(): void {
        throw new Error("Method not implemented.")
    }

    passable(pos: Pos): boolean {
        return this.board[pos[0]][pos[1]].passable
    }

    neighbors(pos: Pos): Cell[] {
        const list = []
        const { size } = this.maze.getOptison().grid
        for (const [dx, dy] of this.directions) {
            const x = dx + pos[0]
            const y = dx + pos[1]
            if (x < 0 || y < 0 || x >= size || y >= size) continue //跳过超出边界的坐标
            if (!this.board[x][y].passable) continue
            list.push(this.board[x][y])
        }
        return list
    }
}
