import { type JSX } from 'react'

import { type VideoCameraOutlined } from '@ant-design/icons'

import type { AppRole } from 'shared/role-guard'

export interface IRoute {
  path: string
  Component: JSX.Element
  roles: AppRole[]
}

export interface ITab {
  text: string
  path: string
  icon?: typeof VideoCameraOutlined
  roles: AppRole[]
}
