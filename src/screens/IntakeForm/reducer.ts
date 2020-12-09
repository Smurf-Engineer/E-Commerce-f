/**
 * ShoppingCartPage Reducer - Created by gustavomedina on 02/05/18.
 */
import { fromJS } from 'immutable'
import { Reducer } from '../../types/common'
import {
  SELECT_ELEMENT,
  DESELECT_ELEMENT,
  GO_TO_NEXT_PAGE,
  SET_INSPIRATION_PAGE,
  SET_INSPIRATION_DATA,
  SET_INSPIRATION_LOADING,
  Sections
} from './constants'
export const initialState = fromJS({
  selectedItems: [],
  currentScreen: Sections.PRODUCTS,
  inspirationPage: -1,
  inspirationSkip: 0,
  inspirationTotal: 0,
  inspirationLoading: false,
  inspiration: [],
  inspirationSelectedItems: []
})

const intakeFormReducer: Reducer<any> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case SELECT_ELEMENT: {
      const { listName, elementId } = action
      const selectedItems = state.get(listName)
      const addItem = selectedItems.push(elementId)
      return state.merge({ [listName]: addItem })
    }
    case DESELECT_ELEMENT: {
      const { listName, elementId } = action
      const indexOfListingToDelete = state
        .get(listName)
        .findIndex((productType: number) => {
          return productType === elementId
        })
      const selectedItems = state.get(listName)
      const updatedSelectedItems = selectedItems.delete(indexOfListingToDelete)
      return state.set(listName, updatedSelectedItems)
    }
    case GO_TO_NEXT_PAGE:
      return state.set('currentScreen', action.page)
    case SET_INSPIRATION_PAGE:
      const { skip, newPage } = action
      return state.merge({
        inspirationSkip:  skip,
        inspirationPage: newPage
      })
    case SET_INSPIRATION_DATA:
      const { data, fullCount } = action
      const items = state.get('inspiration')
      const itemToAdd = items.push(...data)
      const itemsMap = itemToAdd.map((item: any) => fromJS(item))
      return state.merge({
        inspiration: itemsMap,
        inspirationTotal: fullCount,
        inspirationLoading: false
      })
    case SET_INSPIRATION_LOADING:
      return state.setIn('inspirationLoading', action.loading)
    default:
      return state
  }
}

export default intakeFormReducer
