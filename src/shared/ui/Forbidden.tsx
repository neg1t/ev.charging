import { useTranslation } from 'react-i18next'

export const Forbidden: React.FC = () => {
  const { t } = useTranslation()

  return <p>{t('errors.forbiddenMessage')}</p>
}
