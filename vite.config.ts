import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  base: command === "build" ? "/2048-game/" : "/",
  plugins: [vue()],
}));
