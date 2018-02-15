import { fromJS } from 'immutable'
import { SHOW_HEADER_SEARCH_RESULTS } from './constants'
import { Reducer } from '../../types/common'

export const initialState = fromJS({})

const MainLayoutReducer: Reducer<any> = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state
  }
}

export default MainLayoutReducer
