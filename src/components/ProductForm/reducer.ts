/**
 * OrderHistoryAdmin Reducer - Created by eduardoquintero on 07/05/19.
 */

import { fromJS } from 'immutable'
import { SET_PRODUCT_DATA, CHANGE_VALUE, RESET_DATA } from './constants'
import { Reducer } from '../../types/common'

export const initialState = fromJS({
  product: {
    shortDescription: '',
    details: '',
    season: '',
    flatlock: '',
    isTopProduct: null,
    __typename: '',
    binding: {
      white: '',
      black: '',
      __typename: 'Binding'
    },
    mtl: '',
    bumpMap: '',
    sport_id: null,
    active: 'true',
    name: '',
    mpn: '',
    related_item_tag: '',
    materials: '',
    category_name: '',
    code: '',
    relatedProducts: [],
    colors: [],
    yotpoAverageScore: {
      total: 0,
      averageScore: 0,
      __typename: 'YotpoScore'
    },
    genders: [],
    fitStyles: [],
    retailMen: false,
    priceRange: [],
    collections: null,
    pictures: [],
    design_center: true,
    obj: '',
    yotpoId: '',
    bibBrace: null,
    images: [],
    weight: 0,
    tags: '',
    gender_id: null,
    template: '',
    type: '',
    retailWomen: false,
    id: 0,
    customizable: true,
    intendedUse: null,
    retail_version: null,
    sizeRange: [],
    zipper: null,
    description: '',
    category_id: 0,
    temperatures: null,
    sports: []
  }
})

const productFormReducer: Reducer<any> = (state = initialState, action) => {
  switch (action.type) {
    case RESET_DATA:
      return initialState
    case SET_PRODUCT_DATA:
      return state.set('product', fromJS(action.product))
    case CHANGE_VALUE: {
      return state.setIn(['product', action.field], action.value)
    }
    default:
      return state
  }
}

export default productFormReducer
