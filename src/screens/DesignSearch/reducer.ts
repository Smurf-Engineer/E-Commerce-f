/**
 * DesignSearch Reducer - Created by miguelcanobbio on 15/08/18.
 */
import { fromJS } from 'immutable'
import { DEFAULT_ACTION } from './constants'
import { Reducer } from '../../types/common'

export const initialState = fromJS({
  someKey: 'This is a value in the reducer'
})

const designSearchReducer: Reducer<any> = (state = initialState, action) => {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state.set('someKey', action.someValue)
    default:
      return state
  }
}

export default designSearchReducer