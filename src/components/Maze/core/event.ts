import { Container, DisplayObject } from "pixi.js"
import { Maze } from "./maze"
import { MazeStyleOptions } from "./options"

export class BorderEventSystem {
    private constructor(private maze: Maze, private border: DisplayObject) {}

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
            console.log(x, y, this.maze.helper.getRectPos(x, y))
        })
    }

    public enable() {
        this.border.interactive = true
        this.__enableClickHandle()
        return this
    }
}
