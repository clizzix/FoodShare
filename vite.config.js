import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(), tailwindcss()],
    server: {
        proxy: {
            '/api/auth': {
                target: 'https://oauth.fatsecret.com',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api\/auth/, ''),
            },
            '/api/platform': {
                target: 'https://platform.fatsecret.com',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api\/platform/, ''),
            },
        },
    },
});
