import { MazeCell } from "../board/cell"
import mitt from "mitt"
/** cell单击事件池 */
const handlers: ((cell: MazeCell) => void)[] = []
type CellEvent = {
    click: MazeCell
}

const cellClickEvent = mitt<CellEvent>()
cellClickEvent.on("click", cell => {
    handlers.forEach(handler => setTimeout(() => handler(cell)))
})

/** 订阅`MazeCell`单击事件 */
export const useSubscriptCellClick = (handler: (cell: MazeCell) => void) => {
    handlers.push(handler)
}

export const cellClicked = (cell: MazeCell) => {
    cellClickEvent.emit("click", cell)
}
