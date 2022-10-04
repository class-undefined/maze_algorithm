export const enum CellType {
    Road, // 可通行的路
    Wall, // 墙
}

export interface Cell {
    /** 是否可通过 */
    passable: boolean
    type: CellType
}

/** 棋盘坐标 */
export type Pos = [number, number]

/** 网格接口 */
export interface Grid {
    board: Cell[][]

    render(): void

    /** 判断`pos`是否可通行 */
    passable(pos: Pos): boolean

    /** 与位于`pos`位置相邻的`Cell` */
    neighbors(pos: Pos): Cell[]
}
/** 寻路算法 */
export type MazeAlgorithm = (grid: Grid, source: Pos, target: Pos) => void
