/**
 * MyLocker Reducer - Created by miguelcanobbio on 21/06/18.
 */
import { fromJS } from 'immutable'
import { DEFAULT_ACTION, SET_SKIP_VALUE, SET_DESIGNS_DATA } from './constants'
import { Reducer } from '../../types/common'

export const initialState = fromJS({
  someKey: 'This is a value in the reducer',
  fullCount: '',
  designs: [],
  limit: 15,
  skip: 0,
  currentPage: 1
})

const productCatalogReducer: Reducer<any> = (state = initialState, action) => {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state.set('someKey', action.someValue)
    case SET_SKIP_VALUE:
      return state.merge({
        skip: action.skip,
        currentPage: action.page
      })
    case SET_DESIGNS_DATA: {
      const {
        data: {
          designs: { designs, fullCount }
        }
      } = action.data
      console.log(designs, fullCount)
      return state.merge({
        designs,
        fullCount
      })
    }
    default:
      return state
  }
}

export default productCatalogReducer
