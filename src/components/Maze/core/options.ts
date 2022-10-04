export type GridOptions = {
    unit: {
        /**  一个矩形的宽度*/
        width: number
        /** 一个矩形的长度 */
        height: number
    }
    /** size * size个矩形 */
    size: number
    lineStyle: {
        /** 网格线宽度 */
        width: number
        /** 网格线颜色 */
        color: string
    }
    backGroundColor: string
    /** 棋盘外边距 */
    padding: number
}
export type MazeStyleOptions = {
    grid: GridOptions
}
