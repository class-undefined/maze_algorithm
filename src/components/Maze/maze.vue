<script lang="ts" setup>
import { onMounted, ref } from "vue"
import { MazeGrid } from "./core/board/grid"
import { Maze } from "./core/maze"
const canvas = ref()
onMounted(() => {
    const maze = Maze.from(canvas.value)
    maze.bindGrid(new MazeGrid(maze.getOptison().grid.size))
    maze.search([0, 0], [4, 6])
    setTimeout(() => maze.clearBoard(), 2000)
})
</script>

<template>
    <canvas ref="canvas"></canvas>
</template>

<style lang="scss">
//
</style>
