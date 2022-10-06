import { Graphics } from "pixi.js"
import { bfsSearch } from "../algorithms/bfs"
import { getPath } from "../algorithms/common"
import { Cell, AlgorithmEngine, Pos, Algorithm, GridCell } from "../types"
import { MazeCell } from "./cell"

export class MazeGrid implements AlgorithmEngine {
    public board: GridCell[][]
    private directions: number[][] = [
        [0, -1],
        [1, 0],
        [0, 1],
        [-1, 0],
    ] // ↑→↓←
    constructor(private size: number) {
        this.board = new Array<GridCell[]>(size)
        for (let i = 0; i < this.size; i++) {
            const col = new Array<GridCell>(size)
            for (let j = 0; j < size; j++) {
                col[j] = { cell: MazeCell.Blank() }
            }
            this.board[i] = col
        }
    }

    /** 清空棋盘 */
    clear(skipObstacles: boolean = false): void {
        for (let i = 0; i < this.size; i++) {
            for (let j = 0; j < this.size; j++) {
                if (skipObstacles && !this.board[i][j].cell.passable) continue
                this.board[i][j].cell = MazeCell.Blank()
            }
        }
    }

    search(source: Pos, target: Pos, type: Algorithm = "bfs"): Map<string, Pos | undefined> | null {
        switch (type) {
            case "bfs": {
                return bfsSearch(this, source, target)
            }
        }
        return null
    }

    render(): void {
        throw new Error("Method not implemented.")
    }

    passable(pos: Pos): boolean {
        return this.board[pos[0]][pos[1]].cell.passable
    }

    neighbors(pos: Pos): Pos[] {
        const list: Pos[] = []
        for (const [dx, dy] of this.directions) {
            const x = dx + pos[0]
            const y = dy + pos[1]
            if (x < 0 || y < 0 || x >= this.size || y >= this.size) continue //跳过超出边界的坐标
            if (!this.board[x][y].cell.passable) continue
            list.push([x, y])
        }
        return list
    }
}

if (import.meta.vitest) {
    const { it, expect } = import.meta.vitest
    it("bfs", () => {
        const mazeGrid = new MazeGrid(10)
        const path = mazeGrid.search([0, 0], [5, 4])
        console.log(getPath(path, [5, 4]))
    })
}
