import path from 'node:path'
import process from 'node:process'
import { loadEnv } from 'vite'
import type { ConfigEnv, UserConfig } from 'vite'
import viewport from 'postcss-mobile-forever'
import autoprefixer from 'autoprefixer'
import { createVitePlugins } from './build/vite'

export default ({ mode }: ConfigEnv): UserConfig => {
  const root = process.cwd()
  const env = loadEnv(mode, root)

  return {
    base: env.VITE_APP_PUBLIC_PATH,
    plugins: createVitePlugins(),

    server: {
      host: true,
      port: 3000,
      proxy: {
        '/api': {
          target: '',
          ws: false,
          changeOrigin: true,
        },
      },
    },

    resolve: {
      alias: {
        '~@': path.join(__dirname, './src'),
        '@': path.join(__dirname, './src'),
        '~': path.join(__dirname, './src/assets'),
      },
    },

    css: {
      postcss: {
        plugins: [
          autoprefixer(),
          // https://github.com/wswmsword/postcss-mobile-forever
          viewport({
            // appSelector: '#app',
            mobileUnit: 'vmin',
            unitPrecision: 6,
            viewportWidth: 375,
            enableMediaQuery: true,
            disableDesktop: true,
            // maxDisplayWidth: 600,
            rootContainingBlockSelectorList: [
              'var-app-bar',
              'van-popup',
              'var-bottom-navigation',
            ],
          }),
        ],
      },
    },

    build: {
      cssCodeSplit: false,
      chunkSizeWarningLimit: 2048,
    },
  }
}
