import { initReactI18next } from 'react-i18next'

import i18n from 'i18next'

import en from 'shared/assets/locales/en.json'
import hy from 'shared/assets/locales/hy.json'
import ru from 'shared/assets/locales/ru.json'
import { LOCAL_STORAGE_KEYS } from 'shared/const/localStorageKeys'

const resources = {
  en: { translation: en },
  ru: { translation: ru },
  hy: { translation: hy },
} as const

const lng = localStorage.getItem(LOCAL_STORAGE_KEYS.LANG) || 'ru'

void i18n.use(initReactI18next).init({
  resources,
  lng,
  fallbackLng: 'ru',
  interpolation: {
    escapeValue: false,
  },
})

export default i18n
