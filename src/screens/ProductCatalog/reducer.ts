/**
 * ProductCatalog Reducer - Created by cazarez on 27/02/18.
 */
import { fromJS } from 'immutable'
import { DEFAULT_ACTION, SELECTED_FILTER } from './constants'
import { Reducer } from '../../types/common'

export const initialState = fromJS({
  someKey: 'This is a value in the reducer',
  filtersArray: [
    {
      id: 'Type',
      name: 'Type',
      options: [
        { name: 'Customizable', selected: false },
        { name: 'Collection', selected: false }
      ]
    },
    {
      id: 'Gender',
      name: 'Gender',
      options: [
        { name: 'Men', selected: false },
        { name: 'Women', selected: false },
        { name: 'Youth', selected: false }
      ]
    },
    {
      id: 'Sport',
      name: 'Sport',
      options: [
        { name: 'Cycling', selected: false },
        { name: 'Mountaing Bike', selected: false },
        { name: 'Triathlon', selected: false },
        { name: 'Runnig + Training', selected: false },
        { name: 'Nordic', selected: false }
      ]
    },
    {
      id: 'Performance',
      name: 'Performance Level',
      options: [
        { name: 'Recreational', selected: false },
        { name: 'Competitive', selected: false }
      ]
    },
    {
      id: 'Category',
      name: 'Category',
      options: [
        { name: 'Tops', selected: true },
        { name: 'Bottoms', selected: true },
        { name: 'Skinsuits', selected: true },
        { name: 'Outerwear', selected: true },
        { name: 'Casual', selected: true },
        { name: 'Accesories', selected: true }
      ]
    },
    {
      id: 'Fit',
      name: 'Fit Style',
      options: [
        { name: 'Slim', selected: false },
        { name: 'Standard', selected: false },
        { name: 'Relaxed', selected: false }
      ]
    },
    {
      id: 'Season',
      name: 'Season',
      options: [
        { name: 'Spring + Summer', selected: false },
        { name: 'Fall + Winter', selected: false }
      ]
    }
  ]
})

const productCatalogReducer: Reducer<any> = (state = initialState, action) => {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state.set('someKey', action.someValue)
    case SELECTED_FILTER: {
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
    }
    default:
      return state
  }
}

export default productCatalogReducer
