import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import VueDevTools from "vite-plugin-vue-devtools";

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), VueDevTools()],
  server: {
    port: 4001,
    watch: {
      usePolling: true,
    },
    hmr: {
      host: "localhost",
    },
  },
});
