export type CellType = "start" | "end" | "obstacle" | "blank"

export interface Cell {
    /** 是否可通过 */
    passable: boolean
    /** 类型 */
    type: CellType
    /** 通过成本, 约定默认为0 */
    cost?: number
}

/** 棋盘坐标 */
export type Pos = [number, number]

export type Algorithm = "bfs" | "dfs" | "astar" | "dijkstra"

export type PathBackTrack = Map<string, Pos | undefined> | null

export type Path = Pos[]

/** 网格接口 */
export interface AlgorithmEngine {
    board: Cell[][]

    /** 清空棋盘 */
    clear(skipObstacles?: boolean): void

    render(): void

    /** 判断`pos`是否可通行 */
    passable(pos: Pos): boolean

    /** 获取`pos`附近可通过的其它位置 */
    neighbors(pos: Pos): Pos[]

    search: (source: Pos, target: Pos, type?: Algorithm) => PathBackTrack
}
/** 寻路算法 */
export type MazeAlgorithm = (engine: AlgorithmEngine, source: Pos, target: Pos) => PathBackTrack
