type AppRoute = {
  path: string
  getDynamicPaths: (...args: string[]) => string
}

type RouteName = 'TestPage' | 'Stations'

export const AppRoutes: Record<RouteName, AppRoute> = {
  TestPage: {
    path: '/test',
    getDynamicPaths() {
      return this.path
    },
  },
  Stations: {
    path: '/stations',
    getDynamicPaths() {
      return this.path
    },
  },
} as const
