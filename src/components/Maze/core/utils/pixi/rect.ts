import { Graphics } from "pixi.js"
import { hex2digital } from ".."
import { Cell } from "../../types"
import { MazeHelper } from "../helper"
import { changeGraphicColor } from "./graphic"
import Color from "color"
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

export class CellRect extends Rect {
    public static helper: MazeHelper
    public color: string
    public pos: Pos
    public size: Size
    public cell: Cell
    constructor(x: number, y: number, width: number, height: number, cell: Cell) {
        const color = cell.style.mouse.normal
        super(x, y, width, height, color)
        this.cell = cell
        this.color = color
        this.pos = { x: x ?? 0, y: y ?? 0 }
        this.size = { width: width ?? 0, height: height ?? 0 }
    }

    public static bind(helper: MazeHelper) {
        CellRect.helper = helper
    }

    public toGraphics() {
        if (!CellRect.helper) throw "尚未绑定helper"
        const { x, y } = this.pos
        const { width, height } = this.size
        const graphic = new Graphics()
            .beginFill(hex2digital(this.color))
            .drawRect(x, y, width, height)
            .endFill()
        graphic.interactive = true

        graphic.addListener("mouseover", () => {
            const { normal } = this.cell.style.mouse
            const color = new Color(normal)
            changeGraphicColor(graphic, x, y, width, height, color.darken(0.4).hex())
        })
        graphic.addListener("mouseout", () => {
            changeGraphicColor(graphic, x, y, width, height, this.cell.style.mouse.normal)
        })
        graphic.addListener("click", () => {
            changeGraphicColor(graphic, x, y, width, height, this.cell.style.mouse.click)
        })
        return graphic
    }
}
