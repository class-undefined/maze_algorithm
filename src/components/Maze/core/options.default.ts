import { CellOption, GridOptions, MazeStyleOptions } from "./options"

export const DefaultGrid: GridOptions = {
    unit: {
        width: 40,
        height: 40,
    },
    size: 10,
    backGroundColor: "#23272e",
    lineStyle: {
        width: 4,
        color: "#000000",
    },
    padding: 20,
    axis: {
        fontSize: 12,
        color: "#f7d098",
    },
}

export const defaultMazeOptions: MazeStyleOptions = {
    grid: DefaultGrid,
}

export const CellConfig: CellOption = {
    blank: {
        style: {
            mouse: {
                normal: "#404969",
                hover: "#404969",
                mousedown: "#404969",
                mouseup: "#404969",
            },
        },
        passable: true,
        type: "blank",
        cost: 1,
    },
    start: {
        passable: false,
        type: "start",
        cost: Infinity,
        style: {
            mouse: {
                normal: "#bde4f4",
                hover: "#bde4f4",
                mousedown: "#bde4f4",
                mouseup: "#bde4f4",
            },
        },
    },
    end: {
        passable: true,
        type: "end",
        cost: 1,
        style: {
            mouse: {
                normal: "#e0fcff",
                hover: "#e0fcff",
                mousedown: "#e0fcff",
                mouseup: "#e0fcff",
            },
        },
    },
    obstacle: {
        passable: false,
        type: "obstacle",
        cost: Infinity,
        style: {
            mouse: {
                normal: "#ff7f50",
                hover: "#ff7f50",
                mousedown: "#ff7f50",
                mouseup: "#ff7f50",
            },
        },
    },
    path: {
        passable: false,
        type: "path",
        cost: Infinity,
        style: {
            mouse: {
                normal: "#E67E22",
                hover: "#E67E22",
                mousedown: "#E67E22",
                mouseup: "#E67E22",
            },
        },
    },
}
