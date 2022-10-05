import { Maze } from "../maze"
import { Pos } from "../types"

export class MazeHelper {
    private constructor(private maze: Maze) {}

    public static from(maze: Maze) {
        return new MazeHelper(maze)
    }

    /**
     * 获取鼠标所在矩形的索引
     * @param x 棋盘`x`轴坐标
     * @param y 棋盘`y`轴坐标
     * @returns
     */
    public getRectPos(x: number, y: number): Pos {
        const options = this.maze.getOptison()
        const lineWidth = options.grid.lineStyle.width
        const { width, height } = options.grid.unit
        const rowIndex = Math.floor(x / (width + lineWidth))
        const colIndex = Math.floor(y / (height + lineWidth))
        return [rowIndex, colIndex]
    }

    /**
     * 获取矩形所在的左上角坐标
     * @param rowIndex
     * @param colIndex
     * @returns
     */
    public getPosByIndex(rowIndex: number, colIndex: number): [number, number] {
        const options = this.maze.getOptison()
        const lineWidth = options.grid.lineStyle.width
        const cellWidth = options.grid.unit.width
        const cellHeight = options.grid.unit.height
        const x = lineWidth / 2 + rowIndex * (cellWidth + lineWidth)
        const y = lineWidth / 2 + colIndex * (cellHeight + lineWidth)
        return [x, y]
    }
}
