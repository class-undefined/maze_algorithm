import { MazeCell } from "../board/cell"
import mitt from "mitt"
const handlers: ((cell: MazeCell) => void)[] = []
type CellEvent = {
    click: MazeCell
}
/** cell单击事件池 */
const cellEvent = mitt<CellEvent>()
cellEvent.on("click", cell => {
    handlers.forEach(handler => setTimeout(() => handler(cell)))
})

export const useSubscriptCellClick = (handler: (cell: MazeCell) => void) => {
    handlers.push(handler)
}

export const cellClicked = (cell: MazeCell) => {
    cellEvent.emit("click", cell)
}
