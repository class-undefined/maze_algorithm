export const hex2rgb = (hex: string) => {
    let sColor = hex.toLowerCase()
    //十六进制颜色值的正则表达式
    const reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/
    // 如果是16进制颜色
    if (sColor && reg.test(sColor)) {
        if (sColor.length === 4) {
            let sColorNew = "#"
            for (let i = 1; i < 4; i += 1) {
                sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1))
            }
            sColor = sColorNew
        }
        //处理六位的颜色值
        const sColorChange = []
        for (var i = 1; i < 7; i += 2) {
            sColorChange.push(parseInt("0x" + sColor.slice(i, i + 2)))
        }
        return { r: sColorChange[0], g: sColorChange[1], b: sColorChange[2] }
    }
    throw `${hex} is not a legitimate hexadecimal color`
}

/**
 * 将 rgb 转 10 进制
 * @param color
 * @returns rgb 转 10 进制
 */
export const rgb2digital = (color: { r: number; g: number; b: number }): number => {
    const { r, g, b } = color
    const base = (r << 16) + (g << 8) + b
    return base
}

export const hex2digital = (hex: string) => rgb2digital(hex2rgb(hex))

if (import.meta.vitest) {
    const { it, expect } = import.meta.vitest
    it("hex2rgb", () => {
        expect(hex2rgb("#000000")).toEqual({ r: 0, g: 0, b: 0 })
        expect(hex2rgb("#23272E")).toEqual({ r: 35, g: 39, b: 46 })
    })
}
