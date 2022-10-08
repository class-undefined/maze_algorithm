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
                click: "#404969",
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
                click: "#bde4f4",
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
                click: "#e0fcff",
            },
        },
    },
    obstacle: {
        passable: false,
        type: "obstacle",
        cost: Infinity,
        style: {
            mouse: {
                normal: "#000000",
                click: "#000000",
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
                click: "#E67E22",
            },
        },
    },
}
