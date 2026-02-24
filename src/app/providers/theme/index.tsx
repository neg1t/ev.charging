import React from 'react'

import { ConfigProvider } from 'antd'
import locale from 'antd/locale/ru_RU'

import { themeConfig } from 'shared/config'

export function ThemeProvider({ children }: React.PropsWithChildren) {
  return (
    <ConfigProvider locale={locale} theme={themeConfig}>
      {children}
    </ConfigProvider>
  )
}
