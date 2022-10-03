import { GridOptions, MazeStyleOptions } from "./options"

export const DefaultGrid: GridOptions = {
    unit: {
        width: 40,
        height: 40,
    },
    size: {
        row: 20,
        col: 20,
    },
    backGroundColor: "#23272e",
    lineStyle: {
        width: 2,
        color: "#458CFF",
    },
}

export const defaultMazeOptions: MazeStyleOptions = {
    grid: DefaultGrid,
}
