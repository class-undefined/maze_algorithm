<script lang="ts" setup>
import { onMounted, ref } from "vue"
import { Maze } from "./core/maze"
const canvas = ref()
onMounted(() => {
    const maze = Maze.from(canvas.value)
})
</script>

<template>
    <canvas ref="canvas"></canvas>
</template>

<style lang="scss">
//
</style>
