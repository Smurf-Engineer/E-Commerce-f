/**
 * DesignCenter Reducer - Created by david on 23/02/18.
 */
import { fromJS, List } from 'immutable'
import fill from 'lodash/fill'
import {
  SET_CURRENT_TAB_ACTION,
  SET_COLOR_BLOCK_ACTION,
  SET_COLOR_ACTION,
  SET_PALETTE_ACTION,
  SET_PALETTE_NAME_ACTION,
  SET_PALETTES_ACTION,
  SET_LOADING_MODEL,
  DESIGN_RESET_ACTION
} from './constants'
import { Reducer } from '../../types/common'

const colors = fill(Array(5), '')

export const initialState = fromJS({
  currentTab: 0,
  colorBlock: -1,
  colors,
  styleColors: ['#F0AAB4', '#EE3C6F', '#94CFBB', '#00ADEE', '#FFFFFF'],
  palettes: [],
  paletteName: '',
  loadingModel: false,
  genderFilters: {
    men: true
  }
})

const designCenterReducer: Reducer<any> = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_TAB_ACTION:
      return state.set('currentTab', action.index)
    case SET_COLOR_BLOCK_ACTION:
      return state.set('colorBlock', action.index)
    case SET_COLOR_ACTION: {
      const colorBlock = state.get('colorBlock')
      if (colorBlock < 0) {
        return state
      }
      const { color } = action
      return state.updateIn(['colors', colorBlock], () => color)
    }
    case SET_PALETTE_ACTION:
      return state.set('colors', List.of(...action.colors))
    case SET_PALETTE_NAME_ACTION:
      return state.set('paletteName', action.name)
    case SET_PALETTES_ACTION:
      return state.set('palettes', action.palettes)
    case SET_LOADING_MODEL:
      return state.set('loadingModel', action.loading)
    case DESIGN_RESET_ACTION:
      return state.set('colors', List.of(...colors))
    default:
      return state
  }
}

export default designCenterReducer
