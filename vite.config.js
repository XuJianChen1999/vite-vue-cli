/*
 * @Description: vite配置
 * @Author: xjc
 * @Date: 2022-06-08 09:31:28
 * @LastEditTime: 2022-06-08 10:55:57
 * @LastEditors: xjc
 */
import {fileURLToPath, URL} from 'url'
import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import {visualizer} from 'rollup-plugin-visualizer'

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [
    vue(), 
    vueJsx(),
    visualizer({
      open: true,
      gzipSize: true,
      brotliSize: true,
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '/images': 'src/assets/images/'
    },
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.json', '.vue'],
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @import '@/assets/styles/var.scss';
          @import '@/assets/styles/mixin.scss';
        `
      }
    }
  },
  server: {
    proxy: {
      '/agency': {
        target: 'https://xxxxx.com/api',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/agency/, ''),
      },
    },
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      }
    },
    rollupOptions: {
      output: {
        // 拆包
        chunkFileNames: 'js/[name]-[hash].js',
        entryFileNames: 'js/[name]-[hash].js',
        assetFileNames: '[ext]/[name]-[hash].[ext]',
        // 第三方库拆包
        manualChunks: {
          // xgplayer: ['xgplayer'],
          // echarts: ['echarts'],
          // tinymce: ['tinymce'],
          // elicons: ['elicons']
        },
      },
    }
  }
})
