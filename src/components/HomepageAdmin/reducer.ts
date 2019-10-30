/**
 * HomepageAdminActions Reducer - Created by eduardoquintero on 30/05/19.
 */

import { fromJS, List } from 'immutable'
import fill from 'lodash/fill'
import {
  SET_HOMEPAGE_INFO,
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
  REMOVE_TILE_DATA,
  REMOVE_HEADER,
  EMPTY_TILE,
  ADD_MORE_TILES,
  UPDATE_IMAGES_PLACEHOLDER_LIST,
  UPDATE_PRODUCT_TILES_LIST,
  ADD_CAROUSEL_ITEM,
  EMPTY_HEADER,
  TOGGLE_PREVIEW_MODAL,
  SET_DURATION,
  SET_TRANSITION,
  ImageTypes,
  Sections,
  LoadingSections
} from './constants'
import {
  Reducer,
  HeaderImagePlaceHolder,
  ProductTilePlaceHolder
} from '../../types/common'

export const initialState = fromJS({
  mainHeader: [],
  secondaryHeader: [],
  mainHeaderLoading: [],
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
  productTiles: [],
  previewOpen: false,
  mainHeaderCarousel: {
    duration: '1000',
    transition: 'slide'
  },
  secondaryHeaderCarousel: {
    duration: '1000',
    transition: 'slide'
  },
  currentPreview: ''
})

const homepageAdminReducer: Reducer<any> = (state = initialState, action) => {
  switch (action.type) {
    case SET_HOMEPAGE_INFO: {
      const {
        homepageImages,
        mainHeaderImages,
        items,
        productTiles,
        mainHeaderCarousel,
        secondaryHeaderCarousel
      } = action.data
      return state.withMutations((map: any) => {
        map.set('items', fromJS(items))
        map.set('secondaryHeader', fromJS(homepageImages))
        map.set('productTiles', fromJS(productTiles))
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
        map.merge({ mainHeader: mainHeaderImages })
        map.set(
          'mainHeaderLoading',
          List.of(
            ...fill(
              Array(mainHeaderImages.length),
              fromJS({
                [ImageTypes.DESKTOP]: false,
                [ImageTypes.MOBILE]: false
              })
            )
          )
        )
        map.merge({ mainHeaderCarousel, secondaryHeaderCarousel })
        return map
      })
    }
    case SET_LOADERS:
      return state.setIn(['loaders', action.section], action.loading)
    case SET_URL_IMAGE_LIST: {
      return state.setIn(
        [action.section, action.index, action.imageType],
        action.url
      )
    }
    case SET_LOADING_LIST: {
      return state.setIn(
        [action.section, action.index, action.imageType],
        action.loading
      )
    }
    case SET_URL_LIST:
      return state.setIn([action.section, action.index, 'url'], action.value)
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
    case REMOVE_TILE_DATA: {
      const { index } = action
      return state.updateIn(['productTiles', index], (productTile: any) => {
        return productTile.merge(EMPTY_TILE)
      })
    }
    case REMOVE_HEADER: {
      const { index, assetType, section } = action
      return state.updateIn([section, index], (header: any) => {
        return header.merge({ ...EMPTY_HEADER, assetType })
      })
    }
    case ADD_CAROUSEL_ITEM:
      return state.withMutations((tempState: any) => {
        const initialLoadingValues = { desktopImage: false, mobileImage: false }
        tempState.updateIn(
          [action.section],
          (images: [HeaderImagePlaceHolder]) =>
            images.push(fromJS(action.imagePlaceholder))
        )
        tempState.updateIn(
          [
            action.section === Sections.MAIN_HEADER
              ? LoadingSections.MAIN_HEADER_LOADING
              : LoadingSections.SECONDARY_HEADER_LOADING
          ],
          (loadings: [any]) => loadings.push(fromJS(initialLoadingValues))
        )
        return tempState
      })
    case UPDATE_IMAGES_PLACEHOLDER_LIST:
      return state.merge({ [action.section]: action.list })
    case ADD_MORE_TILES:
      return state.updateIn(
        ['productTiles'],
        (tiles: [ProductTilePlaceHolder]) =>
          tiles.push(fromJS(action.tilePlaceholder))
      )
    case UPDATE_PRODUCT_TILES_LIST:
      return state.merge({ productTiles: action.tilesList })
    case TOGGLE_PREVIEW_MODAL:
      return state.merge({
        previewOpen: !state.get('previewOpen'),
        currentPreview: action.section
      })
    case SET_DURATION:
      return state.setIn([action.section, 'duration'], action.duration)
    case SET_TRANSITION:
      return state.setIn([action.section, 'transition'], action.transition)
    default:
      return state
  }
}

export default homepageAdminReducer
