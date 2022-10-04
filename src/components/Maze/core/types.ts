export const enum Cell {
    Road, // 可通行的路
    Wall, // 墙
}

/** 棋盘坐标 */
export type Pos = [number, number]

/** 网格接口 */
export interface MazeGrid {
    board: Cell[][]

    render(): void

    passable(pos: Pos): boolean

    neighbors(cell: Cell): Cell[]
}
/** 寻路算法 */
export type MazeAlgorithm = (grid: MazeGrid, source: Pos, target: Pos) => void
