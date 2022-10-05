import { Graphics } from "pixi.js"
import { hex2digital } from ".."
import { CellStyleOptions } from "../../options"
import { DefaultCellStyleTable } from "../../options.default"
import { Cell } from "../../types"
import { MazeHelper } from "../helper"
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
        const color = cell.style.mouse.normal ?? DefaultCellStyleTable.blank.mouse.normal
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
        const changeColor = (color: string) => {
            graphic.beginFill(hex2digital(color)).drawRect(x, y, width, height).endFill()
        }
        graphic.addListener("mouseenter", () => {
            changeColor(this.cell.style.mouse.hover)
        })
        graphic.addListener("mouseleave", () => {
            changeColor(this.cell.style.mouse.normal)
        })
        graphic.addListener("mousedown", () => {
            changeColor(this.cell.style.mouse.mousedown)
        })
        graphic.addListener("mouseup", () => {
            changeColor(this.cell.style.mouse.mouseup)
        })
        return graphic
    }
}
