import { lazy } from 'react'

import { AppstoreAddOutlined } from '@ant-design/icons'
import { combine, createStore } from 'effector'

import { authModel } from 'entities/auth'

import { AppRoutes } from 'shared/config'

import type { IRoute, ITab } from './types'

const TestPageLazy = lazy(() =>
  import('pages/test').then((m) => ({ default: m.TestPage })),
)
const StationsPageLazy = lazy(() =>
  import('pages/stations-list').then((m) => ({
    default: m.StationsPage,
  })),
)

export const $routes = createStore<IRoute[]>([
  {
    path: AppRoutes.Stations.path,
    Component: <StationsPageLazy />,
    roles: ['admin', 'agent'],
  },
  {
    path: AppRoutes.TestPage.path,
    Component: <TestPageLazy />,
    roles: ['admin'],
  },
])

export const $tabs = createStore<ITab[]>([
  {
    path: AppRoutes.Stations.path,
    text: 'tabs.stationsTab',
    icon: AppstoreAddOutlined,
    roles: ['admin', 'agent'],
  },
  {
    path: AppRoutes.TestPage.path,
    text: 'tabs.testPageTab',
    icon: AppstoreAddOutlined,
    roles: ['admin'],
  },
])

const $userRoles = authModel.stores.$role

// export const $availableTabs = combine($tabs, $userRoles, (tabs, role) => {
//   return tabs.filter((tab) => tab.roles.includes(role))
// })

export const $availableTabs = combine($tabs, $userRoles, (tabs, role) => {
  return tabs
})

export const $availableRoutes = combine($routes, $userRoles, (routes, role) => {
  return routes
})
// export const $availableRoutes = combine($routes, $userRoles, (routes, role) => {
//   return routes.filter((route) => route.roles.includes(role))
// })
