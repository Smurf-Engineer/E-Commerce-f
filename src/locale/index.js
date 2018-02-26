/**
 * i18n Config
 */

import { addLocaleData } from 'react-intl'
import enLocaleData from 'react-intl/locale-data/en'
import deLocaleData from 'react-intl/locale-data/de'
import frLocaleData from 'react-intl/locale-data/fr'
import jpLocaleData from 'react-intl/locale-data/ja'

import { DEFAULT_LOCALE } from '../screens/LanguageProvider/constants'

import enTranslationMessages from './en.json'
import deTranslationMessages from './de.json'
import frTranslationMessages from './fr.json'
import jpnTranslationMessages from './jpn.json'

addLocaleData(enLocaleData)
addLocaleData(deLocaleData)
addLocaleData(frLocaleData)
addLocaleData(jpLocaleData)

export const appLocales = ['en', 'de', 'fr', 'jpn']

export const formatTranslationMessages = (locale, messages) => {
  const defaultFormattedMessages =
    locale !== DEFAULT_LOCALE
      ? formatTranslationMessages(DEFAULT_LOCALE, enTranslationMessages)
      : {}
  return Object.keys(messages).reduce((formattedMessages, key) => {
    const formattedMessage =
      !messages[key] && locale !== DEFAULT_LOCALE
        ? defaultFormattedMessages[key]
        : messages[key]
    return Object.assign(formattedMessages, { [key]: formattedMessage })
  }, {})
}

export const translationMessages = {
  en: formatTranslationMessages('en', enTranslationMessages),
  de: formatTranslationMessages('de', deTranslationMessages),
  fr: formatTranslationMessages('fr', frTranslationMessages),
  jpn: formatTranslationMessages('jpn', jpnTranslationMessages)
}
