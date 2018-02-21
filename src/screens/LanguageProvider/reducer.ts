/**
 * LanguageProvider Reducer - Created by david on 20/02/18.
 */
import { fromJS } from 'immutable'
import { CHANGE_LOCALE, DEFAULT_LOCALE } from './constants'
import { Reducer } from '../../types/common'

export const initialState = fromJS({
  locale: DEFAULT_LOCALE
})

const languageProviderReducer: Reducer<any> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case CHANGE_LOCALE:
      return state.set('locale', action.locale)
    default:
      return state
  }
}

export default languageProviderReducer
