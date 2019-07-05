/**
 * MenuReducer reducer
 */

import { fromJS } from 'immutable'
import {
  SET_MENU_GENDER_SELECTED,
  SET_MENU_SPORT_SELECTED,
  SET_GENDER_SPORT_SELECTED,
  SET_SPORTS
} from './constants'
import { Reducer } from '../../types/common'
import { CLEAR_STATE_ACTION } from '../MenuGender/constants'

export const initialState = fromJS({
  genderOptions: [
    { label: 'men', visible: false },
    { label: 'women', visible: false }
  ],
  sportOptions: [
    { label: 'cycling', menuOpen: false },
    { label: 'triathlon', menuOpen: false },
    // { label: 'nordic', visible: false }, TODO: uncomment when nordic will be needed
    { label: 'active', menuOpen: false }
  ],
  sports: [],
  genderSportSelected: 0
})

const menuReducer: Reducer<any> = (state = initialState, action) => {
  switch (action.type) {
    case SET_MENU_GENDER_SELECTED: {
      const { index, visible } = action
      const genderOptions = state.get('genderOptions')
      const updatedGenderOptions = genderOptions.update(index, (sport: any) => {
        const updatedGender = sport.set('menuOpen', visible)
        return updatedGender
      })
      return state.set('genderOptions', updatedGenderOptions)
    }
    case SET_MENU_SPORT_SELECTED: {
      const { index, visible } = action
      const sportOptions = state.get('sportOptions')
      const updatedSportOptions = sportOptions.update(index, (sport: any) => {
        const updatedSport = sport.set('menuOpen', visible)
        return updatedSport
      })
      return state.set('sportOptions', updatedSportOptions)
    }
    case SET_GENDER_SPORT_SELECTED:
      return state.set('genderSportSelected', action.sport)
    case CLEAR_STATE_ACTION:
      return state.set('genderSportSelected', 0)
    case SET_SPORTS: {
      const { sportOptions, sportsData } = action
      return state.merge({ sportOptions, sports: sportsData })
    }
    default:
      return state
  }
}

export default menuReducer
