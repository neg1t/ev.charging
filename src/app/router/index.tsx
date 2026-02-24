import React, { Suspense } from 'react'

import type { MenuProps } from 'antd'
import { MainLayout, getTabKey } from 'app/layouts'
import { useUnit } from 'effector-react'
import { useTranslation } from 'react-i18next'
import { Link, Navigate, Route, Routes } from 'react-router-dom'

import { authModel } from 'entities/auth'

import { RoleGuard } from 'features/auth/role-guard'

import { PageLoader } from 'shared/ui/PageLoader'

import { $availableRoutes, $availableTabs } from './routes'

type MenuItem = Required<MenuProps>['items'][number] & { path: string }

export const Router = () => {
  const { t } = useTranslation()

  const token = useUnit(authModel.stores.$tokenData)

  const routes = useUnit($availableRoutes)
  const tabs: MenuItem[] = useUnit($availableTabs).map((tab, index) => ({
    path: tab.path,
    key: getTabKey(index),
    icon: tab?.icon && React.createElement(tab.icon),
    title: t(tab.text as never),
    label: <Link to={tab.path}>{t(tab.text as never)}</Link>,
  }))

  return (
    <MainLayout menuItems={tabs} isLoading={!token}>
      <Routes>
        {routes.map(({ path, Component, roles }) => (
          <Route
            key={path}
            path={path}
            element={
              <RoleGuard allowedRoles={roles} showForbiddenMessage={true}>
                <Suspense fallback={<PageLoader />}>{Component}</Suspense>
              </RoleGuard>
            }
          />
        ))}

        {!!routes.length && (
          <Route path='*' element={<Navigate to={routes[0].path} replace />} />
        )}
      </Routes>
    </MainLayout>
  )
}
