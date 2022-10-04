import { Grid, MazeAlgorithm, Pos } from "../types"

export const bfsSearch: MazeAlgorithm = (grid: Grid, source: Pos, target: Pos) => {
    const queue = [source]
    grid.board[source[0]][source[1]]
    const visited = new Set<string>()
    const path = new Map<Pos, Pos | undefined>()
    path.set(source, undefined)
    while (queue.length !== 0) {
        const size = queue.length
        for (let i = 0; i < size; i++) {
            const p = queue.shift() as Pos
            visited.add(p.join(","))
            if (p == target) return path
            for (const next of grid.neighbors(p)) {
                if (visited.has(p.join(","))) continue
                queue.push(next)
                path.set(next, p)
            }
        }
    }
    return null
}
