/**
 * ShoppingCartPage Reducer - Created by gustavomedina on 02/05/18.
 */
import { fromJS } from 'immutable'
import { Reducer } from '../../types/common'
import {
  SELECT_PRODUCT,
  DESELECT_PRODUCT,
  GO_TO_NEXT_PAGE,
  Sections
} from './constants'
export const initialState = fromJS({
  selectedItems: [],
  currentScreen: Sections.PRODUCTS
})

const intakeFormReducer: Reducer<any> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case SELECT_PRODUCT: {
      const selectedItems = state.get('selectedItems')
      const addItem = selectedItems.push(action.productId)
      return state.merge({ selectedItems: addItem })
    }
    case DESELECT_PRODUCT: {
      const { productId } = action
      const indexOfListingToDelete = state
        .get('selectedItems')
        .findIndex((productType: number) => {
          return productType === productId
        })
      const selectedItems = state.get('selectedItems')
      const updatedSelectedItems = selectedItems.delete(indexOfListingToDelete)
      return state.set('selectedItems', updatedSelectedItems)
    }
    case GO_TO_NEXT_PAGE:
      return state.set('currentScreen', action.page)
    default:
      return state
  }
}

export default intakeFormReducer
