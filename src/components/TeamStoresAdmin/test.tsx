/**
 * TeamStoresAdmin Test - Created by eduardoquintero on 12/08/19.
 */

import teamStoresAdminReducer, { initialState } from './reducer'
import {
  setOrderByAction,
  setCurrentPageAction,
  setSearchTextAction,
  setLoadingAction,
  setTeamStoreDataAction,
  setPriceAction,
  setLoadingItemAction,
  setNameAction,
  setFeaturedAction,
  setSavingAction,
  setImage,
  openModal,
  setOpenLockerAction,
  setItemSelectedAction,
  onUnselectItemAction,
  setItemsAddAction,
  setPaginationData,
  deleteItemSelectedAction,
  setItemVisibleAction,
  moveRowAction
} from './actions'
import {
  SET_ORDER_BY,
  SET_CURRENT_PAGE,
  SET_SEARCH_TEXT,
  SET_LOADING,
  SET_TEAM_STORE_DATA,
  SET_PRICE_ITEM,
  SET_LOADING_ITEM,
  SET_NAME,
  SET_FEATURED,
  SET_SAVING_ACTION,
  SET_IMAGE,
  SET_OPEN_MODAL,
  SET_OPEN_LOCKER_ACTION,
  SET_ITEM_SELECTED_ACTION,
  ON_UNSELECT_ITEM,
  SET_ITEMS_ADD_ACTION,
  SET_PAGINATION_DATA,
  DELETE_ITEM_SELECTED_ACTION,
  SET_ITEM_VISIBLE_ACTION,
  MOVE_ROW
} from './constants'

describe(' TeamStoresAdmin Screen', () => {
  describe('Actions', () => {
    it('setOrderByAction', () => {
      const type = SET_ORDER_BY
      const orderBy = 'id'
      const sort = 'asc'
      expect(setOrderByAction(orderBy, sort)).toEqual({
        type,
        orderBy,
        sort
      })
    })
    it('setCurrentPageAction', () => {
      const type = SET_CURRENT_PAGE
      const page = 2
      expect(setCurrentPageAction(page)).toEqual({
        type,
        page
      })
    })
    it('setSearchTextAction', () => {
      const type = SET_SEARCH_TEXT
      const searchText = 'SEARCH TEXT'
      expect(setSearchTextAction(searchText)).toEqual({
        type,
        searchText
      })
    })
    it('setLoadingAction', () => {
      const type = SET_LOADING
      const loading = true
      expect(setLoadingAction(loading)).toEqual({
        type,
        loading
      })
    })
    it('setTeamStoreDataAction', () => {
      const type = SET_TEAM_STORE_DATA
      const teamStore = {
        id: 1,
        name: 'NAME',
        private: false,
        featured: true,
        items: []
      }
      const currencies = [{ name: 'USD' }]
      expect(setTeamStoreDataAction({ teamStore, currencies })).toEqual({
        type,
        teamStore,
        currencies
      })
    })
    it('setPriceAction', () => {
      const type = SET_PRICE_ITEM
      const value = 10
      const currency = 'USD'
      const itemIndex = 0

      expect(setPriceAction(value, currency, itemIndex)).toEqual({
        type,
        value,
        currency,
        itemIndex
      })
    })
    it('setLoadingItemAction', () => {
      const type = SET_LOADING_ITEM
      const itemIndex = '0'
      const loading = true

      expect(setLoadingItemAction(itemIndex, loading)).toEqual({
        type,
        itemIndex,
        loading
      })
    })
    it('setNameAction', () => {
      const type = SET_NAME
      const name = 'NAME'

      expect(setNameAction(name)).toEqual({
        type,
        name
      })
    })
    it('setFeaturedAction', () => {
      const type = SET_FEATURED
      const featured = true

      expect(setFeaturedAction(featured)).toEqual({
        type,
        featured
      })
    })
    it('setSavingAction', () => {
      const type = SET_SAVING_ACTION
      const saving = true

      expect(setSavingAction(saving)).toEqual({
        type,
        saving
      })
    })
    it('setImage', () => {
      const type = SET_IMAGE
      const imagePreviewUrl = 'URL'
      const opened = true

      expect(setImage(imagePreviewUrl, opened)).toEqual({
        type,
        imagePreviewUrl,
        opened
      })
    })
    it('openModal', () => {
      const type = SET_OPEN_MODAL
      const opened = true

      expect(openModal(opened)).toEqual({
        type,
        opened
      })
    })
    it('setOpenLockerAction', () => {
      const type = SET_OPEN_LOCKER_ACTION
      const isOpen = true

      expect(setOpenLockerAction(isOpen)).toEqual({
        type,
        isOpen
      })
    })
    it('setItemSelectedAction', () => {
      const type = SET_ITEM_SELECTED_ACTION
      const item = {
        id: 1,
        code: 'CODE',
        name: 'NAME',
        shared: true,
        image: '',
        proDesign: false
      }
      const checked = true
      expect(setItemSelectedAction(item, checked)).toEqual({
        type,
        item,
        checked
      })
    })
    it('onUnselectItemAction', () => {
      const type = ON_UNSELECT_ITEM
      const keyName = '1'
      expect(onUnselectItemAction(keyName)).toEqual({
        type,
        keyName
      })
    })
    it('setItemsAddAction', () => {
      const type = SET_ITEMS_ADD_ACTION
      expect(setItemsAddAction()).toEqual({
        type
      })
    })
    it('setPaginationData', () => {
      const type = SET_PAGINATION_DATA
      const offset = 0
      const page = 1
      expect(setPaginationData(offset, page)).toEqual({
        type,
        offset,
        page
      })
    })
    it('deleteItemSelectedAction', () => {
      const type = DELETE_ITEM_SELECTED_ACTION
      const index = 1
      expect(deleteItemSelectedAction(index)).toEqual({
        type,
        index
      })
    })
    it('setItemVisibleAction', () => {
      const type = SET_ITEM_VISIBLE_ACTION
      const index = 0
      const visible = true
      expect(setItemVisibleAction(index, visible)).toEqual({
        type,
        index,
        visible
      })
    })
    it('moveRowAction', () => {
      const type = MOVE_ROW
      const index = 1
      const hoverIndex = 1
      const row = {
        id: 1,
        designId: 'DESIGN_ID'
      }
      expect(moveRowAction(index, hoverIndex, row)).toEqual({
        type,
        index,
        hoverIndex,
        row
      })
    })
  })

  describe('Reducer', () => {
    describe('INITIAL_STATE', () => {
      it('Should not have initial state undefined', () => {
        expect(initialState).toBeDefined()
      })
      it('Return the default state for unknow action', () => {
        let state = teamStoresAdminReducer(initialState, { type: 'unknow' })
        expect(state).toEqual(initialState)
      })
    })
    describe('SET_ORDER_BY', () => {
      describe('Order Table By', () => {
        it('Handles undefined value in orderBy', () => {
          const customInitialValue = initialState.get('orderBy')
          expect(customInitialValue).not.toBeUndefined()
        })
        it('Handles value type orderBy', () => {
          const customInitialValue = initialState.get('orderBy')
          expect(typeof customInitialValue).toBe('string')
        })
        it('Handles initial value in orderBy', () => {
          const customInitialValue = initialState.get('orderBy')
          expect(customInitialValue).toBe('id')
        })
        it('Handles values in orderBy and sort', () => {
          const orderByState = teamStoresAdminReducer(
            initialState,
            setOrderByAction('id', 'desc')
          )

          const customSortValue = orderByState.get('sort')
          expect(customSortValue).toBe('desc')

          const customOrderByValue = orderByState.get('orderBy')
          expect(customOrderByValue).toBe('id')
        })
      })
      describe('Sort property', () => {
        it('Handles undefined value in sort', () => {
          const customInitialValue = initialState.get('sort')
          expect(customInitialValue).not.toBeUndefined()
        })
        it('Handles value type in sort', () => {
          const customInitialValue = initialState.get('sort')
          expect(typeof customInitialValue).toBe('string')
        })
        it('Handles initial value in sort', () => {
          const customInitialValue = initialState.get('sort')
          expect(customInitialValue).toBe('desc')
        })
      })
    })
    describe('SET_CURRENT_PAGE', () => {
      describe('Current page', () => {
        it('Handles undefined value in currentPage', () => {
          const customInitialValue = initialState.get('currentPage')
          expect(customInitialValue).not.toBeUndefined()
        })
        it('Handles value type in currentPage', () => {
          const customInitialValue = initialState.get('currentPage')
          expect(typeof customInitialValue).toBe('number')
        })
        it('Handles initial value in currentPage', () => {
          const customInitialValue = initialState.get('currentPage')
          expect(customInitialValue).toBe(1)
        })
        it('Handles custom value in currentPage', () => {
          const currentPageState = teamStoresAdminReducer(
            initialState,
            setCurrentPageAction(2)
          )
          const customPageValue = currentPageState.get('currentPage')
          expect(customPageValue).toBe(2)
        })
      })
    })
  })
  describe('SET_SEARCH_TEXT', () => {
    describe('Search text', () => {
      it('Handles undefined value in currentPage', () => {
        const customInitialValue = initialState.get('searchText')
        expect(customInitialValue).not.toBeUndefined()
      })
      it('Handles value type in searchText', () => {
        const customInitialValue = initialState.get('searchText')
        expect(typeof customInitialValue).toBe('string')
      })
      it('Handles initial value in searchText', () => {
        const customInitialValue = initialState.get('searchText')
        expect(customInitialValue).toBe('')
      })
      it('Handles custom value in searchText', () => {
        const searchTextState = teamStoresAdminReducer(
          initialState,
          setSearchTextAction('VALUE')
        )
        const customSearchValue = searchTextState.get('searchText')
        expect(customSearchValue).toBe('VALUE')
      })
    })
  })
  describe('SET_LOADING', () => {
    describe('Loading', () => {
      it('Handles undefined value in loading', () => {
        const customInitialValue = initialState.get('loading')
        expect(customInitialValue).not.toBeUndefined()
      })
      it('Handles value type in loading', () => {
        const customInitialValue = initialState.get('loading')
        expect(typeof customInitialValue).toBe('boolean')
      })
      it('Handles initial value in loading', () => {
        const customInitialValue = initialState.get('loading')
        expect(customInitialValue).toBeTruthy()
      })
      it('Handles custom value in loading', () => {
        const loadingState = teamStoresAdminReducer(
          initialState,
          setLoadingAction(false)
        )
        const customLoadingValue = loadingState.get('loading')
        expect(customLoadingValue).toBeFalsy()
      })
    })
  })
  describe('SET_NAME', () => {
    describe('Update teamstore name', () => {
      it('Handles undefined value in name', () => {
        const customInitialValue = initialState.get('name')
        expect(customInitialValue).not.toBeUndefined()
      })
      it('Handles value type in name', () => {
        const customInitialValue = initialState.get('name')
        expect(typeof customInitialValue).toBe('string')
      })
      it('Handles initial value in name', () => {
        const customInitialValue = initialState.get('name')
        expect(customInitialValue).toBe('')
      })
      it('Handles custom values in name', () => {
        const customValue = 'NAME'
        const nameState = teamStoresAdminReducer(
          initialState,
          setNameAction(customValue)
        )
        const customNameValue = nameState.get('name')
        expect(customNameValue).toBe(customValue)
      })
    })
  })
  describe('SET_FEATURED', () => {
    describe('Update teamstore featured value', () => {
      it('Handles undefined value in featured', () => {
        const customInitialValue = initialState.get('featured')
        expect(customInitialValue).not.toBeUndefined()
      })
      it('Handles value type in featured', () => {
        const customInitialValue = initialState.get('featured')
        expect(typeof customInitialValue).toBe('boolean')
      })
      it('Handles initial value in featured', () => {
        const customInitialValue = initialState.get('featured')
        expect(customInitialValue).toBeFalsy()
      })
      it('Handles change value in featured', () => {
        const customValue = true
        const nameState = teamStoresAdminReducer(
          initialState,
          setFeaturedAction(customValue)
        )
        const customFeaturedValue = nameState.get('featured')
        expect(customFeaturedValue).toBe(customValue)
      })
    })
  })
  describe('SET_SAVING_ACTION', () => {
    describe('Update teamstore saving loader value', () => {
      it('Handles undefined value in saving loader', () => {
        const customInitialValue = initialState.get('saving')
        expect(customInitialValue).not.toBeUndefined()
      })
      it('Handles value type in saving loader', () => {
        const customInitialValue = initialState.get('saving')
        expect(typeof customInitialValue).toBe('boolean')
      })
      it('Handles initial value in saving loader', () => {
        const customInitialValue = initialState.get('saving')
        expect(customInitialValue).toBeFalsy()
      })
      it('Handles change value in saving loader', () => {
        const customValue = true
        const nameState = teamStoresAdminReducer(
          initialState,
          setSavingAction(customValue)
        )
        const customSavingValue = nameState.get('saving')
        expect(customSavingValue).toBe(customValue)
      })
    })
  })
  describe('SET_IMAGE', () => {
    describe('Update teamstore banner image', () => {
      it('Handles undefined value in banner', () => {
        const customInitialValue = initialState.get('imagePreviewUrl')
        expect(customInitialValue).not.toBeUndefined()
      })
      it('Handles value type in bannerImage', () => {
        const customInitialValue = initialState.get('imagePreviewUrl')
        expect(typeof customInitialValue).toBe('string')

        const customOpenCropper = initialState.get('openCropper')
        expect(typeof customOpenCropper).toBe('boolean')

        const savingValue = initialState.get('saving')
        expect(typeof savingValue).toBe('boolean')
      })
      it('Handles initial value in bannerImage', () => {
        const customInitialValue = initialState.get('imagePreviewUrl')
        expect(customInitialValue).toBe('')

        const customOpenCropper = initialState.get('openCropper')
        expect(customOpenCropper).toBeFalsy()

        const savingValue = initialState.get('saving')
        expect(savingValue).toBeFalsy()
      })
      it('Handles custom values in name', () => {
        const customValue = 'URL'
        const openCropper = true
        const nameState = teamStoresAdminReducer(
          initialState,
          setImage(customValue, openCropper)
        )
        const customURLValue = nameState.get('imagePreviewUrl')
        expect(customURLValue).toBe(customValue)

        const customOpenCropper = nameState.get('openCropper')
        expect(customOpenCropper).toBe(openCropper)

        const savingValue = nameState.get('saving')
        expect(savingValue).toBeFalsy()
      })
    })
  })
  describe('SET_OPEN_MODAL', () => {
    describe('Update teamstore open modal  value', () => {
      it('Handles undefined value in open modal value', () => {
        const customInitialValue = initialState.get('openCropper')
        expect(customInitialValue).not.toBeUndefined()
      })
      it('Handles value type in open modal', () => {
        const customInitialValue = initialState.get('openCropper')
        expect(typeof customInitialValue).toBe('boolean')
      })
      it('Handles initial value in open modal', () => {
        const customInitialValue = initialState.get('openCropper')
        expect(customInitialValue).toBeFalsy()
      })
      it('Handles change value in open modal', () => {
        const customValue = true
        const nameState = teamStoresAdminReducer(
          initialState,
          openModal(customValue)
        )
        const customOpenModal = nameState.get('openCropper')
        expect(customOpenModal).toBe(customValue)
      })
    })
  })
  describe('SET_OPEN_LOCKER_ACTION', () => {
    describe('openLocker', () => {
      it('Handles undefined value in openLocker', () => {
        const customInitialValue = initialState.get('openLocker')
        expect(customInitialValue).not.toBeUndefined()
      })
      it('Handles value type in passCode', () => {
        const customInitialValue = initialState.get('openLocker')
        expect(typeof customInitialValue).toBe('boolean')
      })
      it('Handles initial value in openLocker', () => {
        const customInitialValue = initialState.get('openLocker')
        expect(customInitialValue).toBeFalsy()
      })
      it('Handles custom values in openLocker', () => {
        const openLockerState = teamStoresAdminReducer(
          initialState,
          setOpenLockerAction(true)
        )
        const customPrivateStoreValue = openLockerState.get('openLocker')

        expect(customPrivateStoreValue).toBeTruthy()
      })
    })
  })
  describe('SET_ITEM_SELECTED_ACTION', () => {
    describe('selectedItems', () => {
      it('Handles undefined value in selectedItems', () => {
        const customInitialValue = initialState.get('selectedItems')
        expect(customInitialValue).not.toBeUndefined()
      })
      it('Handles initial length in selectedItems', () => {
        const customInitialValue = initialState.get('selectedItems')
        expect(customInitialValue.size).toBe(0)
      })
      it('Handles custom values in selectedItems', () => {
        const item = {
          design: {
            id: 1,
            code: 'CODE',
            name: 'NAME',
            shared: true,
            image: '',
            proDesign: false
          },
          visible: true
        }
        const checked = true
        const selectedItemsState = teamStoresAdminReducer(
          initialState,
          setItemSelectedAction(item, checked)
        )

        const checkedValue = selectedItemsState.getIn(
          ['selectedItems', '1'],
          'checked'
        )
        const design = selectedItemsState.getIn(
          ['selectedItems', '1'],
          'design'
        )
        const visible = selectedItemsState.getIn(
          ['selectedItems', '1'],
          'visible'
        )
        expect(checkedValue).toBeTruthy()
        expect(design.get('proDesign')).toBeFalsy()
        expect(visible).toBeTruthy()
      })
    })
  })
  describe('ON_UNSELECT_ITEM', () => {
    describe('selectedItems', () => {
      it('Handles custom values in selectedItems', () => {
        const item = {
          design: {
            id: 1,
            code: 'CODE',
            name: 'NAME',
            shared: true,
            image: '',
            proDesign: false
          },
          visible: true
        }

        const checked = true
        const selectedItemsState = teamStoresAdminReducer(
          initialState,
          setItemSelectedAction(item, checked)
        )
        const keyName = '1'
        const unselectedItemsState = teamStoresAdminReducer(
          selectedItemsState,
          onUnselectItemAction(keyName)
        )
        const selectedItemsValue = unselectedItemsState.get('selectedItems')

        expect(selectedItemsValue.size).toBeLessThanOrEqual(0)
      })
    })
  })
  describe('SET_ITEMS_ADD_ACTION', () => {
    describe('Set items add action selected', () => {
      it('Handles undefined value in items', () => {
        const customInitialValue = initialState.get('items')
        expect(customInitialValue).not.toBeUndefined()

        const customSelectedValue = initialState.get('selectedItems')
        expect(customSelectedValue).not.toBeUndefined()
      })
      it('Handles custom values in selectedItems', () => {
        const item = {
          design: {
            id: 1,
            code: 'CODE',
            name: 'NAME',
            shared: true,
            image: '',
            proDesign: false
          },
          visible: true
        }
        const checked = true
        const insertItemState = teamStoresAdminReducer(
          initialState,
          setItemSelectedAction(item, checked)
        )
        const selectedItemsState = teamStoresAdminReducer(
          insertItemState,
          setItemsAddAction()
        )
        const checkedValue = selectedItemsState.get('openLocker')
        const selectedItemsGet = selectedItemsState.getIn([
          'items',
          0,
          'design',
          'code'
        ])
        expect(checkedValue).toBeFalsy()
        expect(selectedItemsGet).toEqual(item.design.code)
      })
    })
  })
  describe('SET_PAGINATION_DATA', () => {
    describe('Set pagination data action', () => {
      it('Handles undefined value in offset, page and loading', () => {
        const customInitialValue = initialState.get('offset')
        expect(customInitialValue).not.toBeUndefined()

        const customPageValue = initialState.get('currentPageModal')
        expect(customPageValue).not.toBeUndefined()

        const customLoadingValue = initialState.get('loading')
        expect(customLoadingValue).not.toBeUndefined()
      })
      it('Handles value type in offset, page and loading', () => {
        const customInitialValue = initialState.get('offset')
        expect(typeof customInitialValue).toBe('number')

        const customPageValue = initialState.get('currentPageModal')
        expect(typeof customPageValue).toBe('number')

        const customLoadingValue = initialState.get('loading')
        expect(typeof customLoadingValue).toBe('boolean')
      })
      it('Handles initial value in offset, page and loading', () => {
        const customInitialValue = initialState.get('offset')
        expect(customInitialValue).toBe(0)

        const customPageValue = initialState.get('currentPageModal')
        expect(customPageValue).toBe(1)

        const customLoadingValue = initialState.get('loading')
        expect(customLoadingValue).toBeTruthy()
      })
      it('Handles custom values in offset, page and loading', () => {
        const offset = 0
        const page = 1
        const nameState = teamStoresAdminReducer(
          initialState,
          setPaginationData(offset, page)
        )
        const customOffsetValue = nameState.get('offset')
        expect(customOffsetValue).toBe(offset)

        const customPageValue = nameState.get('currentPageModal')
        expect(customPageValue).toBe(page)

        const customLoadingValue = nameState.get('loading')
        expect(customLoadingValue).toBeFalsy()
      })
    })
  })
  describe('DELETE_ITEM_SELECTED_ACTION', () => {
    describe('Delete items action', () => {
      it('Handles undefined value in items', () => {
        const customInitialValue = initialState.get('items')
        expect(customInitialValue).not.toBeUndefined()
      })
      it('Handles custom values in items add and delete action', () => {
        const item = {
          design: {
            id: 1,
            code: 'CODE',
            name: 'NAME',
            shared: true,
            image: '',
            proDesign: false
          },
          visible: true
        }
        const checked = true
        const selectedItemsState = teamStoresAdminReducer(
          initialState,
          setItemSelectedAction(item, checked)
        )
        const addedItemState = teamStoresAdminReducer(
          selectedItemsState,
          setItemsAddAction()
        )
        const index = 0
        const itemValueState = teamStoresAdminReducer(
          addedItemState,
          deleteItemSelectedAction(index)
        )
        const selectedItemsGet = itemValueState.get('items')
        expect(selectedItemsGet.size).toBe(0)
      })
    })
  })
  describe('SET_ITEM_VISIBLE_ACTION', () => {
    describe('Delete items action', () => {
      it('Handles undefined value in items', () => {
        const customInitialValue = initialState.get('items')
        expect(customInitialValue).not.toBeUndefined()
      })
      it('Handles custom values in items visible action', () => {
        const item = {
          design: {
            id: 1,
            code: 'CODE',
            name: 'NAME',
            shared: true,
            image: '',
            proDesign: false
          },
          visible: true
        }
        const checked = true
        const selectedItemsState = teamStoresAdminReducer(
          initialState,
          setItemSelectedAction(item, checked)
        )
        const addedItemState = teamStoresAdminReducer(
          selectedItemsState,
          setItemsAddAction()
        )
        const index = 0
        const itemValueState = teamStoresAdminReducer(
          addedItemState,
          setItemVisibleAction(index, false)
        )
        const visibleValue = itemValueState.getIn(['items', 0, 'visible'])
        expect(visibleValue).toBeFalsy()
      })
    })
  })
  describe('MOVE_ROW', () => {
    describe('Move row items action', () => {
      it('Handles undefined value in items', () => {
        const customInitialValue = initialState.get('items')
        expect(customInitialValue).not.toBeUndefined()
      })
      it('Handles custom values in items move row action', () => {
        const item = {
          design: {
            id: 1,
            code: 'CODE',
            name: 'NAME',
            shared: true,
            image: '',
            proDesign: false
          },
          visible: true
        }
        const firstItemState = teamStoresAdminReducer(
          initialState,
          setItemSelectedAction(item, true)
        )
        const secondItem = {
          design: {
            id: 2,
            code: 'CODE',
            name: 'NAME',
            shared: true,
            image: '',
            proDesign: false
          },
          visible: true
        }
        const secondItemState = teamStoresAdminReducer(
          firstItemState,
          setItemSelectedAction(secondItem, true)
        )
        const addedItemState = teamStoresAdminReducer(
          secondItemState,
          setItemsAddAction()
        )
        const index = 0
        const hoverIndex = 1
        const itemValueState = teamStoresAdminReducer(
          addedItemState,
          moveRowAction(index, hoverIndex, item)
        )
        const idValue = itemValueState.getIn(['items', 0, 'design', 'id'])
        expect(idValue).toBe(2)
      })
    })
  })
  describe('SET_TEAM_STORE_DATA', () => {
    describe('Team store data', () => {
      it('Handles undefined value in teamStore', () => {
        const customInitialValue = initialState.get('teamStore')
        expect(customInitialValue).not.toBeUndefined()
      })
      it('Handles value type in teamStore', () => {
        const customInitialValue = initialState.get('teamStore')
        expect(typeof customInitialValue).toBe('object')
      })
      it('Handles custom values in teamStore', () => {
        const teamStoreState = teamStoresAdminReducer(
          initialState,
          setTeamStoreDataAction({
            teamStore: {
              id: 1,
              name: 'NAME',
              private: false,
              featured: true,
              items: []
            },
            currencies: []
          })
        )

        const customTeamStore = teamStoreState.get('teamStore')
        expect(customTeamStore).not.toBeUndefined()

        const customPrivateValue = teamStoreState.getIn([
          'teamStore',
          'private'
        ])
        expect(customPrivateValue).toBeFalsy()

        const customFeaturedValue = teamStoreState.getIn([
          'teamStore',
          'featured'
        ])
        expect(customFeaturedValue).toBeTruthy()
      })
    })
    describe('Currencies data', () => {
      it('Handles undefined value in currencies', () => {
        const customInitialValue = initialState.get('currencies')
        expect(customInitialValue).not.toBeUndefined()
      })
      it('Handles initial length in currencies', () => {
        const customInitialValue = initialState.get('currencies')
        expect(customInitialValue.size).toBe(0)
      })
      it('Handles custom values in currencies', () => {
        const currenciesState = teamStoresAdminReducer(
          initialState,
          setTeamStoreDataAction({
            teamStore: {},
            currencies: [
              {
                id: 1,
                shortName: 'USD'
              }
            ]
          })
        )
        const customCurrencyValue = currenciesState.get('currencies')
        expect(customCurrencyValue.size).toBeGreaterThan(0)

        const customShortNameValue = currenciesState.getIn([
          'currencies',
          0,
          'shortName'
        ])
        expect(customShortNameValue).toBe('USD')
      })
    })
  })
  describe('SET_PRICE_ITEM', () => {
    describe('Team store prices', () => {
      it('Handles undefined value in prices', () => {
        const customInitialValue = initialState.getIn([
          'teamStore',
          'items',
          0,
          'pricesByCurrency'
        ])
        expect(customInitialValue).toBeUndefined()
      })
      it('Handles custom value in prices', () => {
        const teamStoreState = teamStoresAdminReducer(
          initialState,
          setTeamStoreDataAction({
            teamStore: {
              id: 1,
              name: 'NAME',
              private: false,
              featured: true,
              items: [
                {
                  pricesByCurrency: { USD: 0 }
                }
              ]
            },
            currencies: []
          })
        )
        const pricesState = teamStoresAdminReducer(
          teamStoreState,
          setPriceAction(10, 'USD', 0)
        )
        const teamStoreItems = pricesState.getIn(['teamStore', 'items']).toJS()
        const customPriceValue = teamStoreItems[0].pricesByCurrency.USD
        expect(customPriceValue).toBe(10)
      })
    })
  })
  describe('SET_LOADING_ITEM', () => {
    describe('Loading state for team store items', () => {
      it('Handles undefined value in loading item', () => {
        const customInitialValue = initialState.getIn([
          'teamStore',
          'items',
          0,
          'loading'
        ])
        expect(customInitialValue).toBeUndefined()
      })
      it('Handles custom value in loading item', () => {
        const teamStoreState = teamStoresAdminReducer(
          initialState,
          setTeamStoreDataAction({
            teamStore: {
              id: 1,
              name: 'NAME',
              private: false,
              featured: true,
              items: [
                {
                  pricesByCurrency: { USD: 0 }
                }
              ]
            },
            currencies: []
          })
        )
        const itemState = teamStoresAdminReducer(
          teamStoreState,
          setLoadingItemAction('0', true)
        )

        const teamStoreItems = itemState.getIn(['teamStore', 'items']).toJS()
        const loadingValue = teamStoreItems[0].loading
        expect(loadingValue).toBeTruthy()
      })
    })
  })
})
