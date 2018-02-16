import { fromJS } from 'immutable'
import { SHOW_HEADER_SEARCH_RESULTS, SET_SEARCH_PARAM } from './constants'
import { Reducer } from '../../types/common'

export const initialState = fromJS({
  searchParam: '',
  showSearchResults: false
})

const MainLayoutReducer: Reducer<any> = (state = initialState, action) => {
  switch (action.type) {
    case SET_SEARCH_PARAM:
      return state.merge({ searchParam: action.param, showSearchResults: true })
    case SHOW_HEADER_SEARCH_RESULTS:
      return state.set('showSearchResults', action.show)
    default:
      return state
  }
}

export default MainLayoutReducer
