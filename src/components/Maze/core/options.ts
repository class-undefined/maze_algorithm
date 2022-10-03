export type GridOptions = {
    unit: {
        /**  一个矩形的宽度*/
        width: number
        /** 一个矩形的长度 */
        height: number
    }
    size: {
        /** 一行 row 个矩形 */
        row: number
        /** 一列 col 个矩形 */
        col: number
    }
    lineStyle: {
        /** 网格线宽度 */
        width: number
        /** 网格线颜色 */
        color: string
    }
    backGroundColor: string
}
export type MazeStyleOptions = {
    grid: GridOptions
}
