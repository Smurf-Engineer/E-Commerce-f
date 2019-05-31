/**
 * OrderHistoryAdmin Reducer - Created by eduardoquintero on 07/05/19.
 */

import { fromJS } from 'immutable'
import {
  SET_PRODUCT_DATA,
  CHANGE_VALUE,
  RESET_DATA,
  SET_LOADING
} from './constants'
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
    material_banner: '',
    media_files: [],
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
    priceRange: [
      {
        price: 0,
        quantity: 'Personal',
        abbreviation: 'aud',
        shortName: 'AUD'
      },
      {
        price: 0,
        quantity: '2-5',
        abbreviation: 'aud',
        shortName: 'AUD'
      },
      {
        price: 0,
        quantity: '6-24',
        abbreviation: 'aud',
        shortName: 'AUD'
      },
      {
        price: 0,
        quantity: '25-49',
        abbreviation: 'aud',
        shortName: 'AUD'
      },
      {
        price: 0,
        quantity: '50-99',
        abbreviation: 'aud',
        shortName: 'AUD'
      },
      {
        price: 0,
        quantity: '100-249',
        abbreviation: 'aud',
        shortName: 'AUD'
      },
      {
        price: 0,
        quantity: 'Personal',
        abbreviation: 'cad',
        shortName: 'CAD'
      },
      {
        price: 0,
        quantity: '2-5',
        abbreviation: 'cad',
        shortName: 'CAD'
      },
      {
        price: 0,
        quantity: '6-24',
        abbreviation: 'cad',
        shortName: 'CAD'
      },
      {
        price: 0,
        quantity: '25-49',
        abbreviation: 'cad',
        shortName: 'CAD'
      },
      {
        price: 0,
        quantity: '50-99',
        abbreviation: 'cad',
        shortName: 'CAD'
      },
      {
        price: 0,
        quantity: '100-249',
        abbreviation: 'cad',
        shortName: 'CAD'
      },
      {
        price: 0,
        quantity: 'Personal',
        abbreviation: 'eur',
        shortName: 'EUR'
      },
      {
        price: 0,
        quantity: '2-5',
        abbreviation: 'eur',
        shortName: 'EUR'
      },
      {
        price: 0,
        quantity: '6-24',
        abbreviation: 'eur',
        shortName: 'EUR'
      },
      {
        price: 0,
        quantity: '25-49',
        abbreviation: 'eur',
        shortName: 'EUR'
      },
      {
        price: 0,
        quantity: '50-99',
        abbreviation: 'eur',
        shortName: 'EUR'
      },
      {
        price: 0,
        quantity: '100-249',
        abbreviation: 'eur',
        shortName: 'EUR'
      },
      {
        price: 0,
        quantity: 'Personal',
        abbreviation: 'gbp',
        shortName: 'GBP'
      },
      {
        price: 0,
        quantity: '2-5',
        abbreviation: 'gbp',
        shortName: 'GBP'
      },
      {
        price: 0,
        quantity: '6-24',
        abbreviation: 'gbp',
        shortName: 'GBP'
      },
      {
        price: 0,
        quantity: '25-49',
        abbreviation: 'gbp',
        shortName: 'GBP'
      },
      {
        price: 0,
        quantity: '50-99',
        abbreviation: 'gbp',
        shortName: 'GBP'
      },
      {
        price: 0,
        quantity: '100-249',
        abbreviation: 'gbp',
        shortName: 'GBP'
      },
      {
        price: 0,
        quantity: 'Personal',
        abbreviation: 'usd',
        shortName: 'USD'
      },
      {
        price: 0,
        quantity: '2-5',
        abbreviation: 'usd',
        shortName: 'USD'
      },
      {
        price: 0,
        quantity: '6-24',
        abbreviation: 'usd',
        shortName: 'USD'
      },
      {
        price: 0,
        quantity: '25-49',
        abbreviation: 'usd',
        shortName: 'USD'
      },
      {
        price: 0,
        quantity: '50-99',
        abbreviation: 'usd',
        shortName: 'USD'
      },
      {
        price: 0,
        quantity: '100-249',
        abbreviation: 'usd',
        shortName: 'USD'
      }
    ],
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
  },
  loading: false,
  productImages: [],
  productMaterials: [],
  bannerMaterials: [],
  mediaFiles: []
})

const productFormReducer: Reducer<any> = (state = initialState, action) => {
  switch (action.type) {
    case RESET_DATA:
      return initialState
    case SET_PRODUCT_DATA:
      return state.set('product', fromJS(action.product))
    case SET_LOADING:
      return state.set('loading', action.loading)
    case CHANGE_VALUE: {
      if (action.field === 'genders') {
        const pictures = action.value.map((gender: any) => ({
          front_image: '',
          back_image: '',
          left_image: '',
          right_image: '',
          gender_id: gender.id
        }))
        return state
          .setIn(['product', action.field], action.value)
          .setIn(['product', 'pictures'], pictures)
      } else if (action.field === 'files') {
        return state.set(action.value.type, action.value.array)
      }
      return state.setIn(['product', action.field], action.value)
    }
    default:
      return state
  }
}

export default productFormReducer
