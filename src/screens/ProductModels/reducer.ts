/**
 * ProductModels Reducer - Created by Jesús Apodaca on 16/12/19.
 */
import { fromJS } from 'immutable'
import { OPEN_MODAL, EDIT_MODEL, CHANGE_NAME } from './constants'
import { Reducer } from '../../types/common'

export const initialState = fromJS({
  openModal: false,
  tempModel: {},
  selected: 0,
  defaultModelIndex: 'test',
  variants: {
    test: {
      name: 'This is a test',
      default: true,
      icon: ''
    },
    test2: {
      name: 'This is normal model',
      icon: ''
    }
  }
})

const productModelsReducer: Reducer<any> = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_MODAL:
      return state.merge({
        openModal: action.open,
        selected: 0,
        tempModel: {}
      })
    case CHANGE_NAME:
      return state.setIn(['tempModel', 'name'], action.name)
    case EDIT_MODEL: {
      const tempModel = state.getIn(['variants', action.id])
      return state.merge({
        tempModel,
        openModal: true,
        selected: action.id
      })
    }
    default:
      return state
  }
}

export default productModelsReducer
