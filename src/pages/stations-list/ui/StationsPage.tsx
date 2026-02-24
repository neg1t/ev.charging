import { type FC } from 'react'

import { Button } from 'antd'
import { useTranslation } from 'react-i18next'

import { RoleGuard } from 'features/auth/role-guard'

import { PageContent } from 'shared/ui/PageContent'

export const StationsPage: FC = () => {
  const { t } = useTranslation()

  return (
    <PageContent>
      <h1>{t('stationsPage.title')}</h1>

      <RoleGuard allowedRoles={['admin']}>
        <Button type='primary'>{t('actions.create')}</Button>
      </RoleGuard>

      <RoleGuard allowedRoles={['agent']}>
        <Button type='default'>{t('actions.view')}</Button>
      </RoleGuard>
    </PageContent>
  )
}
