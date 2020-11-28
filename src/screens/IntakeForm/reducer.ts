/**
 * ShoppingCartPage Reducer - Created by gustavomedina on 02/05/18.
 */
import { fromJS } from 'immutable'
import { Reducer } from '../../types/common'

export const initialState = fromJS({
})

const intakeFormReducer: Reducer<any> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    default:
      return state
  }
}

export default intakeFormReducer
