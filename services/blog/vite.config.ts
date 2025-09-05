import { defineConfig } from "vite"
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    manifest: true,
    rollupOptions: {
      input: {
        main: "/src/main.ts",
        "entry-editor": "/src/entry-editor.tsx"
      },
    },
  },
})
