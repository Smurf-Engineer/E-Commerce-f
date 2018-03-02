/**
 * ProductCatalog Reducer - Created by cazarez on 27/02/18.
 */
import { fromJS } from 'immutable'
import { DEFAULT_ACTION, SELECTED_FILTER } from './constants'
import { Reducer } from '../../types/common'

export const initialState = fromJS({
  someKey: 'This is a value in the reducer',
  typeOfFilter: '',
  selectedFilters: []
})

const productCatalogReducer: Reducer<any> = (state = initialState, action) => {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state.set('someKey', action.someValue)
    case SELECTED_FILTER: {
      console.log('Selected filter ', action)
      return state.merge({
        typeOfFilter: action.id,
        selectedFilters: action.filter
      })
    }
    /*{
      const id = action.filter.id

      const indexOfType = state.get('filtersArray').findIndex((type: any) => {
        return type.get('name') === action.filter.id
      })
      const indexOfOption = state
        .get('filtersArray')
        .get(indexOfType)
        .get('options')
        .findIndex((option: any) => {
          return option.get('name') === action.filter.name
        })

      return state.setIn(
        ['filtersArray', indexOfType, 'options', indexOfOption, 'selected'],
        action.filter.checked
      )
    } */
    default:
      return state
  }
}

export default productCatalogReducer
