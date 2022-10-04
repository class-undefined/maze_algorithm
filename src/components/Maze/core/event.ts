import { Container, DisplayObject } from "pixi.js"
import { MazeStyleOptions } from "./options"

export class BorderEventSystem {
    private constructor(private border: DisplayObject, private mazeOptions: MazeStyleOptions) {}

    public static from(border: DisplayObject, mazeOptions: MazeStyleOptions) {
        return new BorderEventSystem(border, mazeOptions)
    }

    private __enableClickHandle() {
        const padding = this.mazeOptions.grid.padding
        // TODO: 需要通过x, y坐标计算出矩形所在rowIndex, colIndex; 还未处理边框的宽度
        this.border.addListener("click", e => {
            const x = e.data.global.x - padding
            const y = e.data.global.y - padding
            // this.border.x
            console.log(x, y)
        })
    }

    public enable() {
        this.border.interactive = true
        this.__enableClickHandle()
        return this
    }
}
