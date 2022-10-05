import { CellType } from "./types"

export type GridAxisOptions = {
    /** 刻度字体大小 */
    fontSize: number
    /** 刻度字体颜色 */
    color: string
}

/** 网格相关配置 */
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
    axis: GridAxisOptions
    /** 棋盘外边距 */
    padding: number
}

/** 迷宫样式相关配置 */
export type MazeStyleOptions = {
    grid: GridOptions
}

/** Cell的交互样式配置 */
export type InteractiveStyle = {
    /** 正常 */
    normal: string
    /** 悬浮 */
    hover: string
    /** 按下 */
    mousedown: string
    /** 抬起 */
    mouseup: string
}

/** Cell的相关样式配置 */
export type CellStyleOptions = {
    /** 鼠标交互样式配置 */
    mouse: InteractiveStyle
}

export type CellStyleTableOptions = Record<CellType, CellStyleOptions>
