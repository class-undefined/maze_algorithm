import { GridOptions, MazeStyleOptions } from "./options"

export const DefaultGrid: GridOptions = {
    unit: {
        width: 40,
        height: 40,
    },
    size: 25,
    backGroundColor: "#23272e",
    lineStyle: {
        width: 2,
        color: "#458CFF",
    },
    padding: 20,
}

export const defaultMazeOptions: MazeStyleOptions = {
    grid: DefaultGrid,
}
