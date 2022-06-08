/*
 * @Description: vite配置
 * @Author: xjc
 * @Date: 2022-06-08 09:31:28
 * @LastEditTime: 2022-06-08 14:31:04
 * @LastEditors: xjc
 */
import {fileURLToPath, URL} from 'url'
import {defineConfig} from 'vite'
import path from 'path'
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
    // 文件压缩
    // viteCompression()
    // 图片压缩
    // viteImagemin({
    //   gifsicle: {
    //     optimizationLevel: 7,
    //     interlaced: false
    //   },
    //   optipng: {
    //     optimizationLevel: 7
    //   },
    //   mozjpeg: {
    //     quality: 20
    //   },
    //   pngquant: {
    //     quality: [0.8, 0.9],
    //     speed: 4
    //   },
    //   svgo: {
    //     plugins: [
    //       {name: 'removeViewBox'},
    //       {
    //         name: 'removeEmptyAttrs',
    //         active: false
    //       }
    //     ]
    //   }
    // })
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
        // 最小化拆分包
        manualChunks: id => {
          
          if (id.includes('node_modules')) {
            return id.toString().split('node_modules/')[1].split('/')[0].toString()
          }
          // 将pinia的全局库实例打包进vendor，避免和页面一起打包造成资源重复引入
          // eslint-disable-next-line no-undef
          if (id.includes(path.resolve(__dirname, '/src/store/index.js'))) {
            return 'vendor'
          } else if (id.includes('node_modules/element-plus')) {
            return 'element-plus'
          }
        },
        // 第三方库拆包
        // manualChunks: {
        //   // xgplayer: ['xgplayer'],
        //   // echarts: ['echarts'],
        //   // tinymce: ['tinymce'],
        //   // elicons: ['elicons']
        // },
      },
      minify: 'esbuild'
    }
  }
})
