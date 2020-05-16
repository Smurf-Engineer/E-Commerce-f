/**
 * HomepageAdmin Test - Created by eduardoquintero on 18/10/19.
 */
import homepageAdminReducer, { initialState } from './reducer'

import {
  setUrlImageList,
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
  addCarouselItemAction,
  addMoreTilesAction,
  updatePlaceHolderListAction,
  updateProductTilesListAction,
  togglePreviewModalAction,
  setDurationAction,
  setTransitionAction,
  moveFile,
  addMedia,
  removeMedia,
  setMedia,
  setLoadingAction
} from './actions'
import {
  SET_URL_IMAGE_LIST,
  SET_HOMEPAGE_INFO,
  SET_URL_LIST,
  SET_LOADERS,
  SET_PRODUCTS_DATA,
  Sections,
  CarouselSections,
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
  EMPTY_HEADER,
  EMPTY_TILE,
  ADD_MORE_TILES,
  UPDATE_IMAGES_PLACEHOLDER_LIST,
  UPDATE_PRODUCT_TILES_LIST,
  TOGGLE_PREVIEW_MODAL,
  SET_DURATION,
  SET_TRANSITION,
  ADD_CAROUSEL_ITEM,
  SET_LOADING_LIST,
  MOVE_BANNER,
  REMOVE_MEDIA,
  SET_MEDIA,
  ADD_MEDIA,
  SET_LOADING
} from './constants'

describe(' HomepageAdmin Screen', () => {
  describe('Actions', () => {
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
    it('moveFile', () => {
      const type = MOVE_BANNER
      const index = 0
      const indexTo = 1
      expect(moveFile(index, indexTo)).toEqual({
        type,
        index,
        indexTo
      })
    })
    it('removeMedia', () => {
      const type = REMOVE_MEDIA
      const index = 0
      expect(removeMedia(index)).toEqual({
        type,
        index,
      })
    })
    it('setMedia', () => {
      const type = SET_MEDIA
      const id = 0
      const name = 'url'
      const value = 'url'
      expect(setMedia(id, name, value)).toEqual({
        type,
        id,
        name,
        value
      })
    })
    it('addMedia', () => {
      const type = ADD_MEDIA
      const value = {
        id: 0,
        url: 'Test',
        urlMobile: 'Test',
        isVideo: true
      }
      expect(addMedia(value)).toEqual({
        type,
        value
      })
    })
    it('setLoadingAction', () => {
      const type = SET_LOADING
      const loading = true
      expect(setLoadingAction(loading)).toEqual({
        type,
        loading,
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
  describe('Reducer', () => {
    describe('SET_HOMEPAGE_INFO', () => {
      it('Handles undefined value in items', () => {
        expect(initialState.get('items')).not.toBeUndefined()
      })
      it('Handles initial length in items', () => {
        const customInitialValue = initialState.get('items')
        expect(customInitialValue.size).toBe(0)
      })
      it('Handles custom values in items', () => {
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
        const customValueState = homepageAdminReducer(
          initialState,
          setHomepageInfoAction(data)
        )

        const customIdValue = customValueState.getIn([
          'mainHeaderCarousel',
          'duration'
        ])
        expect(customIdValue).toBe(data.mainHeaderCarousel.duration)
      })
    })
    describe('SET_LOADERS', () => {
      it('Handles undefined value in loaders', () => {
        expect(initialState.get('items')).not.toBeUndefined()
      })
      it('Handles custom values in loaders', () => {
        const section = Sections.MAIN_HEADER
        const loading = true

        const customValueState = homepageAdminReducer(
          initialState,
          setLoadersAction(section, loading)
        )

        const customValue = customValueState.getIn(['loaders', section])

        expect(customValue).toBeTruthy()
      })
    })
    describe('SET_URL_IMAGE_LIST', () => {
      it('Handles custom values in images', () => {
        const url = 'designlab.jakroo.com'
        const section = Sections.MAIN_HEADER
        const imageType = ImageTypes.DESKTOP
        const index = 0

        const customValueState = homepageAdminReducer(
          initialState,
          setUrlImageList(url, section, imageType, index)
        )

        const customValue = customValueState.getIn([section, index, imageType])

        expect(customValue).toBe(url)
      })
    })
    describe('SET_LOADING_LIST', () => {
      it('Handles custom values while loading images', () => {
        const imageType = ImageTypes.DESKTOP
        const loading = true
        const index = 0
        const section = Sections.MAIN_HEADER

        const customValueState = homepageAdminReducer(
          initialState,
          setLoadingListAction(imageType, loading, index, section)
        )

        const customValue = customValueState.getIn([section, index, imageType])

        expect(customValue).toBeTruthy()
      })
    })
    describe('SET_URL_LIST', () => {
      it('Handles custom values in headers url', () => {
        const value = 'jakroo'
        const index = 0
        const section = Sections.MAIN_HEADER

        const customValueState = homepageAdminReducer(
          initialState,
          setUrlListAction(value, index, section)
        )

        const customValue = customValueState.getIn([section, index, 'url'])

        expect(customValue).toBe(value)
      })
    })
    describe('SET_PRODUCTS_DATA', () => {
      it('Handles undefined value in products', () => {
        expect(initialState.get('products')).not.toBeUndefined()
      })
      it('Handles initial length in products', () => {
        const customInitialValue = initialState.get('products')
        expect(customInitialValue.size).toBe(0)
      })
      it('Handles custom values in products', () => {
        const productsData = {
          data: { products: { fullCount: '1', products: [] } }
        }
        const offset = 0
        const page = 1

        const customValueState = homepageAdminReducer(
          initialState,
          setProductsData(productsData, offset, page)
        )

        const customValue = customValueState.get('fullCount')

        expect(customValue).toBe(productsData.data.products.fullCount)
      })
    })
    describe('SET_ITEM_SELECTED', () => {
      it('Handles undefined value in selectedItems', () => {
        expect(initialState.get('selectedItems')).not.toBeUndefined()
      })
      it('Handles initial length in selectedItems', () => {
        const customInitialValue = initialState.get('selectedItems')
        expect(customInitialValue.size).toBe(0)
      })
      it('Handles custom values in selectedItems', () => {
        const item = { visible: true, product: {} }
        const checked = true

        const customValueState = homepageAdminReducer(
          initialState,
          setItemSelectedAction(item, checked)
        )

        const customValue = customValueState.getIn([
          'selectedItems',
          0,
          'visible'
        ])

        expect(customValue).toBeTruthy()
      })
    })
    describe('DELETE_ITEM_SELECTED', () => {
      it('Handles custom values in products', () => {
        const item = { visible: true, product: { id: 1 } }
        const checked = true

        const customValueState = homepageAdminReducer(
          initialState,
          setItemSelectedAction(item, checked)
        )

        const deletedItemState = homepageAdminReducer(
          customValueState,
          deleteItemSelectedAction(item.product.id)
        )
        const customValue = deletedItemState.get('selectedItems')

        expect(customValue.size).toBe(0)
      })
    })
    describe('OPEN_MODAL', () => {
      it('Should have empty value on init', () => {
        expect(initialState.get('productsModalOpen')).not.toBeUndefined()
      })
      it('Should be false on init', () => {
        expect(initialState.get('productsModalOpen')).toBeFalsy()
      })
      it('Handles value type in productsModalOpen', () => {
        const customInitialValue = initialState.get('productsModalOpen')
        expect(typeof customInitialValue).toBe('boolean')
      })
      it('Handles custom value type in productsModalOpen', () => {
        const customValueState = homepageAdminReducer(
          initialState,
          openModalAction(true)
        )
        expect(customValueState.get('productsModalOpen')).toBeTruthy()
      })
    })
    describe('ADD_ITEMS', () => {
      it('Handles custom values in items when add', () => {
        const item = { visible: true, product: {} }
        const checked = true

        const customSelectedItemsState = homepageAdminReducer(
          initialState,
          setItemSelectedAction(item, checked)
        )

        const customAddedItemsState = homepageAdminReducer(
          customSelectedItemsState,
          setItemsAddAction()
        )
        const customValue = customAddedItemsState.getIn(['items', 0, 'visible'])

        expect(customValue).toBeTruthy()
      })
    })
    describe('DELETE_FROM_TABLE', () => {
      it('Handles custom values in items when deleted', () => {
        const item = { visible: true, product: {} }
        const checked = true

        const customSelectedItemsState = homepageAdminReducer(
          initialState,
          setItemSelectedAction(item, checked)
        )

        const customAddedItemsState = homepageAdminReducer(
          customSelectedItemsState,
          setItemsAddAction()
        )

        const deletedItemState = homepageAdminReducer(
          customAddedItemsState,
          deleteFromTableAction(0)
        )

        const customValue = deletedItemState.get('items')

        expect(customValue.size).toBe(0)
      })
    })
    describe('ADD_MORE_TILES', () => {
      it('Handles undefined value in productTiles', () => {
        expect(initialState.get('productTiles')).not.toBeUndefined()
      })
      it('Handles initial length in productTiles', () => {
        const customInitialValue = initialState.get('productTiles')
        expect(customInitialValue.size).toBe(0)
      })
      it('Handles custom values in tiles when add', () => {
        const tilePlaceholder = EMPTY_TILE

        const customProductTileState = homepageAdminReducer(
          initialState,
          addMoreTilesAction(tilePlaceholder)
        )

        const customValue = customProductTileState.get('productTiles')

        expect(customValue.size).toBeGreaterThan(0)
      })
    })
    describe('MOVE_BANNER', () => {
      it('Handles undefined value in featuredBanners', () => {
        expect(initialState.get('featuredBanners')).not.toBeUndefined()
      })
      it('Handles initial length in featuredBanners', () => {
        const customInitialValue = initialState.get('featuredBanners')
        expect(customInitialValue.size).toBe(0)
      })
      it('Handles custom values in featuredBanners when moving', () => {
        const fileOne = {
          id: 0,
          url: 'Test',
          urlMobile: 'Test',
          isVideo: true
        }
        const fileTwo = {
          id: 1,
          url: 'Test2',
          urlMobile: 'Test2',
          isVideo: false
        }
        const customFirstAdd = homepageAdminReducer(
          initialState,
          addMedia(fileOne)
        )
        const customSecondAdd = homepageAdminReducer(
          customFirstAdd,
          addMedia(fileTwo)
        )
        const setMoveState = homepageAdminReducer(
          customSecondAdd,
          moveFile(0, 1)
        )

        const customValue = setMoveState.getIn(['featuredBanners', 0, 'id'])
        expect(customValue).toBe(fileTwo.id)
      })
    })
    describe('REMOVE_MEDIA', () => {
      it('Handles undefined value in featuredBanners', () => {
        expect(initialState.get('featuredBanners')).not.toBeUndefined()
      })
      it('Handles initial length in featuredBanners', () => {
        const customInitialValue = initialState.get('featuredBanners')
        expect(customInitialValue.size).toBe(0)
      })
      it('Handles custom values in featuredBanners when removing', () => {
        const fileOne = {
          id: 0,
          url: 'Test',
          urlMobile: 'Test',
          isVideo: true
        }
        const customFirstAdd = homepageAdminReducer(
          initialState,
          addMedia(fileOne)
        )
        const removeState = homepageAdminReducer(
          customFirstAdd,
          removeMedia(0)
        )

        const customValue = removeState.get('featuredBanners')
        expect(customValue.size).toBe(0)
      })
    })
    describe('SET_MEDIA', () => {
      it('Handles undefined value in featuredBanners', () => {
        expect(initialState.get('featuredBanners')).not.toBeUndefined()
      })
      it('Handles initial length in featuredBanners', () => {
        const customInitialValue = initialState.get('featuredBanners')
        expect(customInitialValue.size).toBe(0)
      })
      it('Handles custom values in featuredBanners when setting media', () => {
        const fileOne = {
          id: 0,
          url: 'Test',
          urlMobile: 'Test',
          isVideo: true
        }
        const index = 0
        const field = 'urlMobile'
        const newValue = 'exampleMobile'
        const customFirstAdd = homepageAdminReducer(
          initialState,
          addMedia(fileOne)
        )
        const setMediaState = homepageAdminReducer(
          customFirstAdd,
          setMedia(index, field, newValue)
        )

        const customValue = setMediaState.getIn(['featuredBanners', index, field])
        expect(customValue).toBe(newValue)
      })
    })
    describe('ADD_MEDIA', () => {
      it('Handles undefined value in featuredBanners', () => {
        expect(initialState.get('featuredBanners')).not.toBeUndefined()
      })
      it('Handles initial length in featuredBanners', () => {
        const customInitialValue = initialState.get('featuredBanners')
        expect(customInitialValue.size).toBe(0)
      })
      it('Handles custom values in featuredBanners when adding media', () => {
        const fileOne = {
          id: 0,
          url: 'Test',
          urlMobile: 'Test',
          isVideo: true
        }
        const addMediaState = homepageAdminReducer(
          initialState,
          addMedia(fileOne)
        )
        const customValue = addMediaState.get('featuredBanners')
        expect(customValue.size).toBe(1)
      })
    })
    describe('SET_LOADING', () => {
      it('Handles undefined value in loadingBanner', () => {
        expect(initialState.get('loadingBanner')).not.toBeUndefined()
      })
      it('Handles initial length in loadingBanner', () => {
        const customInitialValue = initialState.get('loadingBanner')
        expect(customInitialValue).toBeFalsy()
      })
      it('Handles custom values in loadingBanner', () => {
        const loading = true
        const loadingState = homepageAdminReducer(
          initialState,
          setLoadingAction(loading)
        )
        const customValue = loadingState.get('loadingBanner')
        expect(customValue).toBe(loading)
      })
    })
    describe('SET_PRODUCT_TILE_IMAGE', () => {
      it('Handles custom values in tiles when add image', () => {
        const tilePlaceholder = EMPTY_TILE

        const url = 'designlab.jakroo.com'
        const index = 0

        const customProductTileState = homepageAdminReducer(
          initialState,
          addMoreTilesAction(tilePlaceholder)
        )

        const customImageTileState = homepageAdminReducer(
          customProductTileState,
          setProductTileImage(url, index)
        )

        const customValue = customImageTileState.getIn([
          'productTiles',
          0,
          'image'
        ])

        expect(customValue).toBe(url)
      })
    })
    describe('SET_PRODUCT_TILE_LOADING', () => {
      it('Handles custom values while loading images', () => {
        const loading = true
        const index = 0

        const customValueState = homepageAdminReducer(
          initialState,
          setProductTileLoading(loading, index)
        )

        const customValue = customValueState.getIn([
          'productTiles',
          index,
          'loading'
        ])

        expect(customValue).toBeTruthy()
      })
    })
    describe('SET_TILES_TEXT', () => {
      it('Handles custom text values in product tiles', () => {
        const value = 'Black'
        const index = 0
        const section = 'contentTile'

        const customValueState = homepageAdminReducer(
          initialState,
          setTilesTextAction(index, section, value)
        )

        const customValue = customValueState.getIn([
          'productTiles',
          index,
          'contentTile'
        ])

        expect(customValue).toBe(value)
      })
    })
    describe('ADD_CAROUSEL_ITEM', () => {
      it('Handles custom values in tiles when remove', () => {
        const section = Sections.MAIN_HEADER
        const imagePlaceholder = EMPTY_HEADER

        const customState = homepageAdminReducer(
          initialState,
          addCarouselItemAction(imagePlaceholder, section)
        )

        const customValue = customState.get(section)

        expect(customValue.size).toBeGreaterThan(0)
      })
    })
    describe('UPDATE_PRODUCT_TILES_LIST', () => {
      it('Handles custom values in tiles when update', () => {
        const tilesList = [EMPTY_TILE]

        const customProductTileState = homepageAdminReducer(
          initialState,
          updateProductTilesListAction(tilesList)
        )

        expect(customProductTileState.get('productTiles').size).toBeGreaterThan(
          0
        )
      })
    })
    describe('TOGGLE_PREVIEW_MODAL', () => {
      it('Should have empty value on init', () => {
        expect(initialState.get('previewOpen')).not.toBeUndefined()
      })
      it('Should be false on init', () => {
        expect(initialState.get('previewOpen')).toBeFalsy()
      })
      it('Handles value type in previewOpen', () => {
        const customInitialValue = initialState.get('previewOpen')
        expect(typeof customInitialValue).toBe('boolean')
      })
      it('Handles custom value type in previewOpen', () => {
        const customValueState = homepageAdminReducer(
          initialState,
          togglePreviewModalAction()
        )
        expect(customValueState.get('previewOpen')).toBeTruthy()
      })
    })
    describe('SET_DURATION', () => {
      it('Should have empty value on init', () => {
        const section = CarouselSections.MAIN_HEADER_CAROUSEL
        expect(initialState.getIn([section, 'duration'])).not.toBeUndefined()
      })
      it('Should be 1000 on init', () => {
        const section = CarouselSections.MAIN_HEADER_CAROUSEL
        expect(initialState.getIn([section, 'duration'])).toBe('1000')
      })
      it('Handles value type in duration', () => {
        const section = CarouselSections.MAIN_HEADER_CAROUSEL
        const customInitialValue = initialState.getIn([section, 'duration'])
        expect(typeof customInitialValue).toBe('string')
      })
      it('Handles custom value type in previewOpen', () => {
        const section = CarouselSections.MAIN_HEADER_CAROUSEL
        const duration = '2000'

        const customValueState = homepageAdminReducer(
          initialState,
          setDurationAction(section, duration)
        )
        expect(customValueState.getIn([section, 'duration'])).toBe(duration)
      })
    })
    describe('SET_TRANSITION', () => {
      it('Should have empty value on init', () => {
        const section = CarouselSections.MAIN_HEADER_CAROUSEL
        expect(initialState.getIn([section, 'transition'])).not.toBeUndefined()
      })
      it('Should be slide on init', () => {
        const section = CarouselSections.MAIN_HEADER_CAROUSEL
        expect(initialState.getIn([section, 'transition'])).toBe('slide')
      })
      it('Handles value type in duration', () => {
        const section = CarouselSections.MAIN_HEADER_CAROUSEL
        const customInitialValue = initialState.getIn([section, 'transition'])
        expect(typeof customInitialValue).toBe('string')
      })
      it('Handles custom value type in previewOpen', () => {
        const section = CarouselSections.MAIN_HEADER_CAROUSEL
        const transition = 'fade'

        const customValueState = homepageAdminReducer(
          initialState,
          setTransitionAction(section, transition)
        )
        expect(customValueState.getIn([section, 'transition'])).toBe(transition)
      })
    })
  })
})
