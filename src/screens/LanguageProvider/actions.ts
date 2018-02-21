/**
 * LanguageProvider  Actions - Created by david on 20/02/18.
 */
import { CHANGE_LOCALE } from './constants'
import { AnyAction } from '../../types/common'

export const changeLocaleAction = (locale: string): AnyAction => ({
  type: CHANGE_LOCALE,
  locale
})
