import { defineConfig } from "vitest/config"
import vue from "@vitejs/plugin-vue"

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
    test: {
        includeSource: ["src/**/*.{js,ts}"],
    },
    base: "/maze_algorithm/",
})
