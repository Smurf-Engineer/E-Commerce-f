/**
 * LanguageProvider Reducer - Created by david on 20/02/18.
 */
import { fromJS } from 'immutable'
import { CHANGE_LOCALE, DEFAULT_LOCALE, SET_REGION_ACTION } from './constants'
import { Reducer } from '../../types/common'

export const initialState = fromJS({
  locale: DEFAULT_LOCALE,
  currentRegion: '',
  currentLanguage: '',
  currentCurrency: ''
})

const languageProviderReducer: Reducer<any> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case CHANGE_LOCALE:
      return state.set('locale', action.locale)
    case SET_REGION_ACTION: {
      const { payload: { region, localeIndex, currency } } = action
      return state.merge({
        currentRegion: region,
        currentLanguage: localeIndex,
        currentCurrency: currency
      })
    }
    default:
      return state
  }
}

export default languageProviderReducer
