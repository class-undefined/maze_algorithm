import { DisplayObject } from "pixi.js"
import { Maze } from "./maze"

export type ClickHandler = (rowIndex: number, colIndex: number) => void
export class BorderEventSystem {
    private clickHandlers: ClickHandler[]
    private constructor(private maze: Maze, private border: DisplayObject) {
        this.clickHandlers = []
    }

    public static from(maze: Maze, border: DisplayObject) {
        return new BorderEventSystem(maze, border)
    }

    private __enableClickHandle() {
        const padding = this.maze.getOptison().grid.padding
        const lineWidth = this.maze.getOptison().grid.lineStyle.width
        this.border.addListener("click", e => {
            const x = e.data.global.x - padding - lineWidth
            const y = e.data.global.y - padding - lineWidth
            if (x < 0 || y < 0) return
            this.clickHandlers.forEach(handler => handler(...this.maze.helper.getRectPos(x, y)))
        })
    }

    public enable() {
        this.border.interactive = true
        this.__enableClickHandle()
        return this
    }

    /** 增加点击事件 */
    public addClickListener(handler: ClickHandler) {
        this.clickHandlers.push(handler)
    }
}
