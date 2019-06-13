/**
 * HomepageAdminActions Reducer - Created by eduardoquintero on 30/05/19.
 */

import { fromJS, List } from 'immutable'
import fill from 'lodash/fill'
import {
  SET_URL_IMAGE,
  SET_LOADING,
  SET_HOMEPAGE_INFO,
  SET_URL,
  SET_LOADERS,
  SET_URL_IMAGE_LIST,
  SET_LOADING_LIST,
  SET_URL_LIST,
  SET_PRODUCTS_DATA,
  SET_ITEM_SELECTED,
  DELETE_ITEM_SELECTED,
  OPEN_MODAL,
  ADD_ITEMS,
  DELETE_FROM_TABLE,
  ImageTypes,
  Sections
} from './constants'
import { Reducer } from '../../types/common'

export const initialState = fromJS({
  mainHeader: {
    [ImageTypes.DESKTOP]: '',
    [ImageTypes.MOBILE]: '',
    url: '',
    loading: false
  },
  secondaryHeader: [],
  mainHeaderLoading: {
    [ImageTypes.DESKTOP]: false,
    [ImageTypes.MOBILE]: false
  },
  secondaryHeaderLoading: [],
  loaders: {
    [Sections.MAIN_CONTAINER]: true,
    [Sections.MAIN_HEADER]: false,
    [Sections.SECONDARY_HEADER]: false
  },
  fullCount: '',
  products: [],
  limit: 12,
  offset: 0,
  currentPage: 1,
  selectedItems: [],
  productsModalOpen: false,
  items: []
})

const homepageAdminReducer: Reducer<any> = (state = initialState, action) => {
  switch (action.type) {
    case SET_URL_IMAGE:
      return state.setIn([action.section, action.imageType], action.url)
    case SET_URL_IMAGE:
      return state.merge({
        [action.section[action.imageType]]: action.url
      })
    case SET_LOADING:
      return state.setIn(
        ['mainHeaderLoading', action.imageType],
        action.loading
      )
    case SET_HOMEPAGE_INFO: {
      const {
        homepageImages,
        headerImageLink,
        headerImage,
        headerImageMobile
      } = action.data
      return state.withMutations((map: any) => {
        map.set('items', fromJS(action.data.items))
        map.set('secondaryHeader', List.of(...fromJS(homepageImages)))
        map.set(
          'secondaryHeaderLoading',
          List.of(
            ...fill(
              Array(homepageImages.length),
              fromJS({
                [ImageTypes.DESKTOP]: false,
                [ImageTypes.MOBILE]: false
              })
            )
          )
        )
        map.setIn(['mainHeader', ImageTypes.DESKTOP], headerImage)
        map.setIn(['mainHeader', ImageTypes.MOBILE], headerImageMobile)
        map.setIn(['mainHeader', 'url'], headerImageLink)
        return map.toJS()
      })
    }
    case SET_URL:
      return state.setIn(['mainHeader', 'url'], action.value)
    case SET_LOADERS:
      return state.setIn(['loaders', action.section], action.loading)
    case SET_URL_IMAGE_LIST: {
      return state.setIn(
        ['secondaryHeader', action.index, action.imageType],
        action.url
      )
    }
    case SET_LOADING_LIST: {
      return state.setIn(
        ['secondaryHeaderLoading', action.index, action.imageType],
        action.loading
      )
    }
    case SET_URL_LIST:
      return state.setIn(['secondaryHeader', action.index, 'url'], action.value)
    case SET_PRODUCTS_DATA: {
      const {
        data: {
          products: { products, fullCount }
        }
      } = action.data
      return state.merge({
        products,
        fullCount,
        offset: action.offset,
        currentPage: action.page,
        loading: false
      })
    }
    case SET_ITEM_SELECTED: {
      const selectedItems = state.get('selectedItems')
      const addItem = selectedItems.push(action.item)
      const itemsMap = addItem.map((item: any) => fromJS(item))
      return state.merge({ selectedItems: itemsMap })
    }
    case DELETE_ITEM_SELECTED: {
      const { id } = action
      const indexOfListingToDelete = state
        .get('selectedItems')
        .findIndex((productType: any) => {
          return productType.getIn(['product', 'id']) === id
        })
      const selectedItems = state.get('selectedItems')
      const updatedSelectedItems = selectedItems.delete(indexOfListingToDelete)
      return state.set('selectedItems', updatedSelectedItems)
    }
    case OPEN_MODAL:
      return state.merge({ productsModalOpen: action.open, selectedItems: [] })
    case ADD_ITEMS: {
      const items = state.get('items')
      const selectedItems = state.get('selectedItems')
      const addItem = items.push(...selectedItems)
      const itemsMap = addItem.map((item: any) => fromJS(item))
      return state.merge({
        items: itemsMap,
        productsModalOpen: false,
        selectedItems: []
      })
    }
    case DELETE_FROM_TABLE: {
      const { id } = action
      const indexOfListingToDelete = state
        .get('items')
        .findIndex((productType: any) => {
          return productType.getIn(['product', 'id']) === id
        })
      const selectedItems = state.get('items')
      const updatedSelectedItems = selectedItems.delete(indexOfListingToDelete)
      return state.set('items', updatedSelectedItems)
    }

    default:
      return state
  }
}

export default homepageAdminReducer
