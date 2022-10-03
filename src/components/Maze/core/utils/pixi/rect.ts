import { Graphics } from "pixi.js"
import { hex2digital } from ".."
type Pos = {
    x: number
    y: number
}

type Size = {
    width: number
    height: number
}

export class Rect {
    public color: string
    public pos: Pos
    public size: Size
    constructor(x: number, y: number, width: number, height: number, color?: string) {
        this.color = color ?? "#000000"
        this.pos = { x: x ?? 0, y: y ?? 0 }
        this.size = { width: width ?? 0, height: height ?? 0 }
    }

    public toGraphics() {
        const { x, y } = this.pos
        const { width, height } = this.size
        return new Graphics()
            .beginFill(hex2digital(this.color))
            .drawRect(x, y, width, height)
            .endFill()
    }
}
