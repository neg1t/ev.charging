import { defineConfig } from '@kubb/core'
import { pluginClient } from '@kubb/plugin-client'
import { pluginOas } from '@kubb/plugin-oas'
import { pluginTs } from '@kubb/plugin-ts'
import { pluginZod } from '@kubb/plugin-zod'

export default defineConfig({
  input: {
    path: './src/shared/api/source/swagger.json',
  },
  output: {
    path: './src/shared/api/gen',
    format: 'prettier',
    clean: true,
  },
  plugins: [
    pluginOas({ validate: true }),
    pluginTs({
      output: {
        path: './types',
      },
    }),
    pluginZod({
      dateType: false,
      output: {
        path: './zod',
      },
      group: {
        type: 'tag',
        name: ({ group }) => `${group}Schema`,
      },
    }),
    pluginClient({
      output: {
        path: './services',
      },
      group: {
        type: 'tag',
        name: ({ group }) => `${group}Service`,
      },
      parser: 'zod',
      importPath: 'shared/api/client/api-client',
      dataReturnType: 'full',
    }),
  ],
})
