import { PathBackTrack, Pos } from "../types"

export const getPath = (pathBackTrack: PathBackTrack, targetPos: Pos) => {
    if (!pathBackTrack) return null
    let prePos = targetPos
    const path: Pos[] = [targetPos]
    while (prePos) {
        const pre = pathBackTrack.get(prePos.join(","))
        if (!pre) return path.reverse()
        path.push(pre)
        prePos = pre
    }
    return null
}
