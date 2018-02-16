/**
 * MenuReducer reducer
 */

import { fromJS } from 'immutable'
import { SET_MENU_GENDER_SELECTED, SET_MENU_SPORT_SELECTED } from './constants'
import { Reducer } from '../../types/common'

export const initialState = fromJS({
  genderOptions: [
    { label: 'men', visible: false },
    { label: 'women', visible: false }
  ],
  sportOptions: [
    { label: 'cycling', visible: false },
    { label: 'triathalon', visible: false },
    { label: 'nordic', visible: false },
    { label: 'active', visible: false }
  ]
})

const menuReducer: Reducer<any> = (state = initialState, action) => {
  switch (action.type) {
    case SET_MENU_GENDER_SELECTED: {
      const { index, visible } = action
      const genderOptions = state.get('genderOptions')
      const updatedGenderOptions = genderOptions.update(index, (sport: any) => {
        const updatedGender = sport.set('visible', visible)
        return updatedGender
      })
      return state.set('genderOptions', updatedGenderOptions)
    }
    case SET_MENU_SPORT_SELECTED: {
      const { index, visible } = action
      const sportOptions = state.get('sportOptions')
      const updatedSportOptions = sportOptions.update(index, (sport: any) => {
        const updatedSport = sport.set('visible', visible)
        return updatedSport
      })
      return state.set('sportOptions', updatedSportOptions)
    }
    default:
      return state
  }
}

export default menuReducer
