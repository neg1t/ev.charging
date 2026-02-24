import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { readFileSync } from 'fs'
import { join } from 'path'
import { visualizer } from 'rollup-plugin-visualizer'
import { type Plugin, defineConfig, loadEnv } from 'vite'
import { vitePluginVersionMark } from 'vite-plugin-version-mark'
import tsconfigPaths from 'vite-tsconfig-paths'

const getVersionVariable = (env: Record<string, string>): Plugin => ({
  name: 'version-variable',
  config(config) {
    if (env?.VITE_APP_VERSION) return

    const version =
      config.define?.__APP_VERSION__
        ?.replaceAll(/"/g, '')
        .replaceAll('"', '') || '0.0.0'

    console.log('version', version)

    return defineConfig({
      define: {
        'import.meta.env.VITE_APP_VERSION': JSON.stringify(version),
      },
    })
  },
})

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const packageJSONFile = readFileSync(join(__dirname, 'package.json'), {
    encoding: 'utf8',
  })

  const version = JSON.parse(packageJSONFile)?.version || '0.0.0'

  const env = loadEnv(mode, process.cwd(), '')

  return {
    server: { port: 8000 },
    plugins: [
      react(),
      tsconfigPaths(),
      tailwindcss(),
      vitePluginVersionMark({
        name: 'app',
        command: {
          commands: [
            {
              alias: 'tag',
              cmd: 'git describe --tags --abbrev=0',
              fallback: 'v0.0.0',
            },
          ],
          errorStrategy: 'fallback',
        },
      }),
      getVersionVariable(env),
      mode === 'production' &&
        visualizer({
          filename: 'dist/stats.html',
          gzipSize: true,
          brotliSize: true,
        }),
    ],
    preview: { port: 8000 },
    define: {
      'import.meta.env.VITE_VERSION': JSON.stringify(version),
    },
    build: {
      cssCodeSplit: true,
      rollupOptions: {
        output: {
          manualChunks: {
            react: ['react', 'react-dom', 'react-router-dom'],
            antd: ['antd', '@ant-design/icons'],
            effector: ['effector', 'effector-react', 'patronum'],
            dnd: [
              '@dnd-kit/core',
              '@dnd-kit/sortable',
              '@dnd-kit/utilities',
              'rc-virtual-list',
            ],
            utils: [
              'dayjs',
              'lodash-es',
              'uuid',
              'jwt-decode',
              'oidc-client-ts',
              'axios',
            ],
          },
        },
      },
    },
    esbuild: {
      drop: ['console', 'debugger'],
    },
    test: {
      setupFiles: ['./tests/setup.ts'],
      passWithNoTests: true,
    },
  }
})
