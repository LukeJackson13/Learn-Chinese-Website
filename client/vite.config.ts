import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // During `npm run dev`, API calls go to the C# backend.
    proxy: { '/api': 'http://localhost:5097' },
  },
  build: {
    // `npm run build` puts the app where the C# API serves it, so one `dotnet run` runs everything.
    outDir: '../LearnChinese.Api/wwwroot',
    emptyOutDir: true,
  },
})
