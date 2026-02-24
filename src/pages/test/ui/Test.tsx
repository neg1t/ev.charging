import { type FC } from 'react'

import { useTranslation } from 'react-i18next'

import { PageContent } from 'shared/ui/PageContent'

export const TestPage: FC = () => {
  const { t } = useTranslation()

  return <PageContent>{t('testPage.title')}</PageContent>
}
