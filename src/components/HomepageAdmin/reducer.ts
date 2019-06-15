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
  SET_PRODUCT_TILE_IMAGE,
  SET_PRODUCT_TILE_LOADING,
  SET_TILES_TEXT,
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
    [Sections.SECONDARY_HEADER]: false,
    [Sections.PRODUCT_TILES]: false
  },
  fullCount: '',
  products: [],
  limit: 12,
  offset: 0,
  currentPage: 1,
  selectedItems: [],
  productsModalOpen: false,
  items: [],
  productTiles: []
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
        headerImageMobile,
        items,
        productTiles
      } = action.data
      return state.withMutations((map: any) => {
        map.set('items', fromJS(items))
        map.set('secondaryHeader', List.of(...fromJS(homepageImages)))
        map.set('productTiles', List.of(...fromJS(productTiles)))
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
        return map
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
      // TODO Change selectedItems array to store a object with id & status of selection
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
      const itemToAdd = items.push(...selectedItems)
      const itemsMap = itemToAdd.map((item: any) => fromJS(item))
      return state.merge({
        items: itemsMap,
        productsModalOpen: false,
        selectedItems: []
      })
    }
    case DELETE_FROM_TABLE: {
      const { index } = action
      const selectedItems = state.get('items')
      const updatedSelectedItems = selectedItems.delete(index)
      return state.set('items', updatedSelectedItems)
    }
    case SET_PRODUCT_TILE_IMAGE:
      return state.setIn(['productTiles', action.index, 'image'], action.url)
    case SET_PRODUCT_TILE_LOADING:
      return state.setIn(
        ['productTiles', action.index, 'loading'],
        action.loading
      )
    case SET_TILES_TEXT: {
      const { index, section, value } = action
      return state.setIn(['productTiles', index, section], value)
    }
    default:
      return state
  }
}

export default homepageAdminReducer
