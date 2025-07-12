// vite.config.js
import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueDevTools from "vite-plugin-vue-devtools";
import { viteStaticCopy } from "vite-plugin-static-copy";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    viteStaticCopy({
      targets: [
        {
          src: "index.html",
          dest: "",
        },
        {
          src: "manifest.json",
          dest: "",
        },
      ],
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  build: {
    rollupOptions: {
      input: {
        content: "src/main.js",
        background: "src/background/background.js",
        youtube: "src/scripts/youtube.js",
      },
      output: {
        entryFileNames: (chunkInfo) => {
          if (chunkInfo.name === "content") return "main.js";
          if (chunkInfo.name === "background") return "background/background.js";
          if (chunkInfo.name === "youtube") return "scripts/youtube.js";
        },
      },
      commonjsOptions: {
        include: [/node_modules/], // Include dependencies in the bundle
        format: "iife",
      },
      external: [],
    },
  },
});
