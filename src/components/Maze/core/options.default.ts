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

// export const DefaultCellStyleTable: CellStyleTableOptions = {
//     start: {
//         mouse: {
//             normal: ""
//         }
//     }
// }
