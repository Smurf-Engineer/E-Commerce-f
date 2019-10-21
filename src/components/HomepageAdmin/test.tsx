/**
 * HomepageAdmin Test - Created by eduardoquintero on 18/10/19.
 */
// import homepageAdminReducer, { initialState } from './reducer'

import {
  setUrlImage,
  setUrlImageList,
  setLoadingAction,
  setLoadingListAction,
  setHomepageInfoAction,
  setUrlListAction,
  setLoadersAction,
  setProductsData,
  setItemSelectedAction,
  deleteItemSelectedAction,
  deleteFromTableAction,
  openModalAction,
  setItemsAddAction,
  setProductTileImage,
  setProductTileLoading,
  setTilesTextAction,
  removeTileDataAction,
  removeHeaderAction,
  addMoreImagesAction,
  addCarouselItemAction,
  addMoreTilesAction,
  updatePlaceHolderListAction,
  updateProductTilesListAction,
  togglePreviewModalAction,
  setDurationAction,
  setTransitionAction
} from './actions'
import {
  SET_URL_IMAGE,
  SET_URL_IMAGE_LIST,
  SET_LOADING,
  SET_HOMEPAGE_INFO,
  SET_URL_LIST,
  SET_LOADERS,
  SET_PRODUCTS_DATA,
  Sections,
  ImageTypes,
  SET_ITEM_SELECTED,
  DELETE_ITEM_SELECTED,
  DELETE_FROM_TABLE,
  OPEN_MODAL,
  ADD_ITEMS,
  SET_PRODUCT_TILE_IMAGE,
  SET_PRODUCT_TILE_LOADING,
  SET_TILES_TEXT,
  REMOVE_TILE_DATA,
  VIDEO_TYPE,
  REMOVE_HEADER,
  ADD_MORE_IMAGES,
  EMPTY_HEADER,
  EMPTY_TILE,
  ADD_MORE_TILES,
  UPDATE_IMAGES_PLACEHOLDER_LIST,
  UPDATE_PRODUCT_TILES_LIST,
  TOGGLE_PREVIEW_MODAL,
  SET_DURATION,
  SET_TRANSITION,
  ADD_CAROUSEL_ITEM,
  SET_LOADING_LIST
} from './constants'

describe(' HomepageAdmin Screen', () => {
  describe('Actions', () => {
    it('setUrlImage', () => {
      const type = SET_URL_IMAGE
      const url = 'designlab.jakroo.com'
      const section = Sections.MAIN_HEADER
      const imageType = ImageTypes.DESKTOP

      expect(setUrlImage(url, section, imageType)).toEqual({
        type,
        url,
        section,
        imageType
      })
    })
    it('setUrlImageList', () => {
      const type = SET_URL_IMAGE_LIST
      const url = 'designlab.jakroo.com'
      const section = Sections.MAIN_HEADER
      const imageType = ImageTypes.DESKTOP
      const index = 0

      expect(setUrlImageList(url, section, imageType, index)).toEqual({
        type,
        url,
        section,
        imageType,
        index
      })
    })
    it('setLoadingAction', () => {
      const type = SET_LOADING
      const imageType = ImageTypes.DESKTOP
      const loading = true

      expect(setLoadingAction(imageType, loading)).toEqual({
        type,
        imageType,
        loading
      })
    })
    it('setLoadingListAction', () => {
      const type = SET_LOADING_LIST
      const imageType = ImageTypes.DESKTOP
      const loading = true
      const index = 0
      const section = Sections.MAIN_HEADER

      expect(setLoadingListAction(imageType, loading, index, section)).toEqual({
        type,
        imageType,
        loading,
        index,
        section
      })
    })
    it('setHomepageInfoAction', () => {
      const type = SET_HOMEPAGE_INFO
      const data = {
        id: 1,
        items: [],
        homepageImages: [],
        mainHeaderImages: [],
        productTiles: [],
        mainHeaderCarousel: {
          duration: 5000,
          transition: 'slide'
        },
        secondaryHeaderCarousel: {
          duration: 5000,
          transition: 'slide'
        }
      }

      expect(setHomepageInfoAction(data)).toEqual({
        type,
        data
      })
    })
    it('setUrlListAction', () => {
      const type = SET_URL_LIST
      const value = 'jakroo'
      const index = 0
      const section = Sections.MAIN_HEADER

      expect(setUrlListAction(value, index, section)).toEqual({
        type,
        value,
        index,
        section
      })
    })
    it('setLoadersAction', () => {
      const type = SET_LOADERS
      const section = Sections.MAIN_HEADER
      const loading = true

      expect(setLoadersAction(section, loading)).toEqual({
        type,
        section,
        loading
      })
    })
    it('setProductsData', () => {
      const type = SET_PRODUCTS_DATA
      const data = { fullCount: '0', products: [] }
      const offset = 0
      const page = 1

      expect(setProductsData(data, offset, page)).toEqual({
        type,
        data,
        offset,
        page
      })
    })
    it('setItemSelectedAction', () => {
      const type = SET_ITEM_SELECTED
      const item = { visible: true, product: {} }
      const checked = true

      expect(setItemSelectedAction(item, checked)).toEqual({
        type,
        item,
        checked
      })
    })
    it('deleteItemSelectedAction', () => {
      const type = DELETE_ITEM_SELECTED
      const id = 1

      expect(deleteItemSelectedAction(id)).toEqual({
        type,
        id
      })
    })
    it('deleteFromTableAction', () => {
      const type = DELETE_FROM_TABLE
      const index = 0

      expect(deleteFromTableAction(index)).toEqual({
        type,
        index
      })
    })
    it('openModalAction', () => {
      const type = OPEN_MODAL
      const open = true

      expect(openModalAction(open)).toEqual({
        type,
        open
      })
    })
    it('setItemsAddAction', () => {
      const type = ADD_ITEMS

      expect(setItemsAddAction()).toEqual({
        type
      })
    })
    it('setProductTileImage', () => {
      const type = SET_PRODUCT_TILE_IMAGE
      const url = 'designlab.jakroo.com'
      const index = 0

      expect(setProductTileImage(url, index)).toEqual({
        type,
        url,
        index
      })
    })
    it('setProductTileLoading', () => {
      const type = SET_PRODUCT_TILE_LOADING
      const loading = true
      const index = 0

      expect(setProductTileLoading(loading, index)).toEqual({
        type,
        loading,
        index
      })
    })
    it('setTilesTextAction', () => {
      const type = SET_TILES_TEXT
      const index = 0
      const section = Sections.MAIN_HEADER
      const value = 'Black'

      expect(setTilesTextAction(index, section, value)).toEqual({
        type,
        index,
        section,
        value
      })
    })
    it('removeTileDataAction', () => {
      const type = REMOVE_TILE_DATA
      const index = 0

      expect(removeTileDataAction(index)).toEqual({
        type,
        index
      })
    })
    it('removeHeaderAction', () => {
      const type = REMOVE_HEADER
      const index = 0
      const assetType = VIDEO_TYPE
      const section = Sections.MAIN_HEADER

      expect(removeHeaderAction(index, assetType, section)).toEqual({
        type,
        index,
        assetType,
        section
      })
    })
    it('addMoreImagesAction', () => {
      const type = ADD_MORE_IMAGES
      const imagePlaceholder = EMPTY_HEADER

      expect(addMoreImagesAction(imagePlaceholder)).toEqual({
        type,
        imagePlaceholder
      })
    })
    it('addCarouselItemAction', () => {
      const type = ADD_CAROUSEL_ITEM
      const imagePlaceholder = EMPTY_HEADER
      const section = Sections.MAIN_HEADER

      expect(addCarouselItemAction(imagePlaceholder, section)).toEqual({
        type,
        imagePlaceholder,
        section
      })
    })
    it('addMoreTilesAction', () => {
      const type = ADD_MORE_TILES
      const tilePlaceholder = EMPTY_TILE

      expect(addMoreTilesAction(tilePlaceholder)).toEqual({
        type,
        tilePlaceholder
      })
    })
    it('updatePlaceHolderListAction', () => {
      const type = UPDATE_IMAGES_PLACEHOLDER_LIST
      const list = [EMPTY_HEADER]
      const section = Sections.MAIN_HEADER

      expect(updatePlaceHolderListAction(list, section)).toEqual({
        type,
        list,
        section
      })
    })
    it('updateProductTilesListAction', () => {
      const type = UPDATE_PRODUCT_TILES_LIST
      const tilesList = [EMPTY_TILE]

      expect(updateProductTilesListAction(tilesList)).toEqual({
        type,
        tilesList
      })
    })
    it('togglePreviewModalAction', () => {
      const type = TOGGLE_PREVIEW_MODAL
      const section = Sections.MAIN_HEADER

      expect(togglePreviewModalAction(section)).toEqual({
        type,
        section
      })
    })
    it('setDurationAction', () => {
      const type = SET_DURATION
      const section = Sections.MAIN_HEADER
      const duration = '5000'

      expect(setDurationAction(section, duration)).toEqual({
        type,
        section,
        duration
      })
    })
    it('setTransitionAction', () => {
      const type = SET_TRANSITION
      const section = Sections.MAIN_HEADER
      const transition = 'fade'

      expect(setTransitionAction(section, transition)).toEqual({
        type,
        section,
        transition
      })
    })
  })
  /* describe('Reducer', () => {
    describe('ON_TAB_CLICK', () => {
      it('Should not have initial state undefined', () => {
        expect(initialState.get('selectedKey')).toBeDefined()
      })
      it('Should be init with UPLOAD tab key', () => {
        expect(initialState.get('selectedKey')).toEqual(UPLOAD)
      })
      it('Should be init with UPLOAD tab key', () => {
        const selectedKeyState = homepageAdminReducer(
          initialState,
          onTabClickAction(COLOR)
        )
        expect(selectedKeyState.get('selectedKey')).toEqual(COLOR)
      })
    })
  }) */
})
