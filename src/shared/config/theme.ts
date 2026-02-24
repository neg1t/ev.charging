import type { ThemeConfig } from 'antd'

const token: ThemeConfig['token'] = {
  colorPrimary: '#E4022E',
  colorInfo: '#361766',
}

const components: ThemeConfig['components'] = {
  Menu: {
    itemSelectedColor: '#E4022E',
  },
  Typography: {
    titleMarginBottom: 0,
  },
}

export const themeConfig: ThemeConfig = {
  token,
  components,
}
