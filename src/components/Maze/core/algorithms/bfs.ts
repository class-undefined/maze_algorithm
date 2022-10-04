import { Grid, MazeAlgorithm, Pos } from "../types"

export const bfsSearch: MazeAlgorithm = (grid: Grid, source: Pos, target: Pos) => {
    const queue = [source]
    const visited = new Set<string>()
    const path = new Map<string, Pos | undefined>()
    path.set(source.join(","), undefined)
    while (queue.length !== 0) {
        const size = queue.length
        for (let i = 0; i < size; i++) {
            const p = queue.shift() as Pos
            visited.add(p.join(","))
            if (p.join(",") === target.join(",")) {
                return path
            }
            for (const next of grid.neighbors(p)) {
                if (visited.has(next.join(","))) continue
                queue.push(next)
                path.set(next.join(","), p)
            }
        }
    }
    return null
}
