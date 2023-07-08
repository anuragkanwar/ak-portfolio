import {resolve} from 'path'
import {defineConfig} from 'vite'

export default defineConfig({
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                contact: resolve(__dirname, "contact.html"),
                about: resolve(__dirname, "about.html"),
                showcase: resolve(__dirname, "showcase.html"),
            },
        },
    },
})