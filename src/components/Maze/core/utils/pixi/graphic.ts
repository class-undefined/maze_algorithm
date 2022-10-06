import { Graphics } from "pixi.js"
import { hex2digital } from ".."

/** 改变图像颜色 */
export const changeGraphicColor = (
    graphic: Graphics,
    x: number,
    y: number,
    width: number,
    height: number,
    color: string
) => {
    graphic.beginFill(hex2digital(color)).drawRect(x, y, width, height).endFill()
}
