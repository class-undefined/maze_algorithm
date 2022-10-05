import { CellStyleTableOptions, GridOptions, MazeStyleOptions } from "./options"

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

export const DefaultCellStyleTable: CellStyleTableOptions = {
    blank: {
        mouse: {
            normal: "#404969",
            hover: "#404969",
            clickDown: "#404969",
            clickUp: "#404969",
        },
    },
    start: {
        mouse: {
            normal: "#bde4f4",
            hover: "#bde4f4",
            clickDown: "#bde4f4",
            clickUp: "#bde4f4",
        },
    },
    end: {
        mouse: {
            normal: "#e0fcff",
            hover: "#e0fcff",
            clickDown: "#e0fcff",
            clickUp: "#e0fcff",
        },
    },
    obstacle: {
        mouse: {
            normal: "#ff7f50",
            hover: "#ff7f50",
            clickDown: "#ff7f50",
            clickUp: "#ff7f50",
        },
    },
}
