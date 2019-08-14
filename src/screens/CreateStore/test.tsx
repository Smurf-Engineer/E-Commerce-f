/**
 * CreateStore Test - Created by david on 09/04/18.
 */
import createStoreReducer, { initialState } from './reducer'
import moment from 'moment'
import {
  setTeamSizeAction,
  updateNameAction,
  openModal,
  setLoadingAction,
  updateStartDateAction,
  updateEndDateAction,
  updatePrivateAction,
  updateOnDemandAction,
  updatePassCodeAction,
  setItemSelectedAction,
  deleteItemSelectedAction,
  setItemsAddAction,
  clearStoreAction,
  setItemVisibleAction,
  moveRowAction,
  setDataToEditAction,
  deleteBannerOnEditAction,
  clearDataAction,
  setTeamStoreStatusAction,
  setPaginationDataAction,
  setOpenLockerAction
} from './actions'
import {
  SET_TEAM_SIZE_ACTION,
  UPDATE_NAME_ACTION,
  OPEN_MODAL,
  SET_LOADING_ACTION,
  UPDATE_START_DATE_ACTION,
  UPDATE_END_DATE_ACTION,
  UPDATE_PRIVATE_ACTION,
  UPDATE_ON_DEMAND_ACTION,
  UPDATE_PASS_CODE_ACTION,
  SET_ITEM_SELECTED_ACTION,
  DELETE_ITEM_SELECTED_ACTION,
  SET_ITEMS_ADD_ACTION,
  CREATE_STORE_SUCCESS,
  SET_ITEM_VISIBLE_ACTION,
  MOVE_ROW,
  SET_STORE_DATA_TO_EDIT,
  DELETE_BANNER_ON_EDIT,
  CLEAR_DATA,
  SET_TEAM_STORE_STATUS,
  SET_PAGINATION_DATA
} from './constants'

describe(' CreateStore Screen', () => {
  describe('Actions', () => {
    it('setTeamSizeAction', () => {
      const type = SET_TEAM_SIZE_ACTION
      const id = 1
      const range = '2-5'
      expect(setTeamSizeAction(id, range)).toEqual({
        type,
        id,
        range
      })
    })
    it('updateNameAction', () => {
      const type = UPDATE_NAME_ACTION
      const name = 'NAME'
      expect(updateNameAction(name)).toEqual({
        type,
        name
      })
    })
    it('openModal', () => {
      const type = OPEN_MODAL
      const open = false
      expect(openModal(open)).toEqual({
        type,
        open
      })
    })
    it('setLoadingAction', () => {
      const type = SET_LOADING_ACTION
      const isLoading = false
      expect(setLoadingAction(isLoading)).toEqual({
        type,
        isLoading
      })
    })
    it('updateStartDateAction', () => {
      const type = UPDATE_START_DATE_ACTION
      const date = '2019-01-01'
      const dateMoment = moment(date)
      expect(updateStartDateAction(dateMoment, date)).toEqual({
        type,
        dateMoment,
        date
      })
    })
    it('updateEndDateAction', () => {
      const type = UPDATE_END_DATE_ACTION
      const date = '2019-01-01'
      const dateMoment = moment(date)
      expect(updateEndDateAction(dateMoment, date)).toEqual({
        type,
        dateMoment,
        date
      })
    })
    it('updatePrivateAction', () => {
      const type = UPDATE_PRIVATE_ACTION
      const active = false
      expect(updatePrivateAction(active)).toEqual({
        type,
        active
      })
    })
    it('updateOnDemandAction', () => {
      const type = UPDATE_ON_DEMAND_ACTION
      const active = false
      expect(updateOnDemandAction(active)).toEqual({
        type,
        active
      })
    })
    it('updatePassCodeAction', () => {
      const type = UPDATE_PASS_CODE_ACTION
      const code = 'PASS'
      expect(updatePassCodeAction(code)).toEqual({
        type,
        code
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
    it('deleteItemSelectedAction', () => {
      const type = DELETE_ITEM_SELECTED_ACTION
      const index = 1
      expect(deleteItemSelectedAction(index)).toEqual({
        type,
        index
      })
    })
    it('setItemsAddAction', () => {
      const type = SET_ITEMS_ADD_ACTION
      expect(setItemsAddAction()).toEqual({
        type
      })
    })
    it('clearStoreAction', () => {
      const type = CREATE_STORE_SUCCESS
      expect(clearStoreAction()).toEqual({
        type
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
    it('setDataToEditAction', () => {
      const type = SET_STORE_DATA_TO_EDIT
      const data = {
        id: 1,
        shortId: 'ID',
        name: 'NAME',
        banner: '',
        privateStore: false
      }
      expect(setDataToEditAction(data)).toEqual({
        type,
        data
      })
    })
    it('deleteBannerOnEditAction', () => {
      const type = DELETE_BANNER_ON_EDIT
      expect(deleteBannerOnEditAction()).toEqual({
        type
      })
    })
    it('clearDataAction', () => {
      const type = CLEAR_DATA
      expect(clearDataAction()).toEqual({
        type
      })
    })
    it('setTeamStoreStatusAction', () => {
      const type = SET_TEAM_STORE_STATUS
      const show = false
      expect(setTeamStoreStatusAction(show)).toEqual({
        type,
        show
      })
    })
    it('setPaginationDataAction', () => {
      const type = SET_PAGINATION_DATA
      const offset = 0
      const page = 1
      expect(setPaginationDataAction(offset, page)).toEqual({
        type,
        offset,
        page
      })
    })
  })
  describe('Reducer', () => {
    describe('INITIAL_STATE', () => {
      it('Should not have initial state undefined', () => {
        expect(initialState).toBeDefined()
      })
      it('Return the default state for unknow action', () => {
        let state = createStoreReducer(initialState, { type: 'unknow' })
        expect(state).toEqual(initialState)
      })
    })
    describe('OPEN_MODAL', () => {
      describe('Locker modal', () => {
        it('Handles undefined value in open', () => {
          const customInitialValue = initialState.get('open')
          expect(customInitialValue).not.toBeUndefined()
        })
        it('Handles value type in open', () => {
          const customInitialValue = initialState.get('open')
          expect(typeof customInitialValue).toBe('boolean')
        })
        it('Handles initial value in open', () => {
          const customInitialValue = initialState.get('open')
          expect(customInitialValue).toBeFalsy()
        })
      })
    })
    describe('SET_LOADING_ACTION', () => {
      describe('Loading action', () => {
        it('Handles undefined value in loading', () => {
          const customInitialValue = initialState.get('loading')
          expect(customInitialValue).not.toBeUndefined()
        })
        it('Handles value type in loading', () => {
          const customInitialValue = initialState.get('loading')
          expect(typeof customInitialValue).toBe('boolean')
        })
        it('Handles initial value in loading', () => {
          const customInitialValue = initialState.get('open')
          expect(customInitialValue).toBeFalsy()
        })
      })
    })
    describe('UPDATE_NAME_ACTION', () => {
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
          const nameState = createStoreReducer(
            initialState,
            updateNameAction(customValue)
          )
          const customNameValue = nameState.get('name')
          expect(customNameValue).toBe(customValue)
        })
      })
    })
    describe('UPDATE_START_DATE_ACTION', () => {
      describe('Update teamstore startDate', () => {
        it('Handles undefined value in startDate', () => {
          const customInitialValue = initialState.get('startDate')
          expect(customInitialValue).not.toBeUndefined()
        })
        it('Handles value type in startDate', () => {
          const customInitialValue = initialState.get('startDate')
          expect(typeof customInitialValue).toBe('string')
        })
        it('Handles initial value in startDate', () => {
          const customInitialValue = initialState.get('startDate')
          expect(customInitialValue).toBe('')
        })
        it('Handles custom values in startDate', () => {
          const startDate = '2019-01-01'
          const startDateMoment = moment(startDate)

          const startDateState = createStoreReducer(
            initialState,
            updateStartDateAction(startDateMoment, startDate)
          )
          const customStartDateValue = startDateState.get('startDate')
          const customStartDateMomentValue = startDateState.get(
            'startDateMoment'
          )

          expect(customStartDateValue).toBe(startDate)
          expect(customStartDateMomentValue).toBe(startDateMoment)
        })
      })
    })
    describe('UPDATE_END_DATE_ACTION', () => {
      describe('Update teamstore endDate', () => {
        it('Handles undefined value in endDate', () => {
          const customInitialValue = initialState.get('endDate')
          expect(customInitialValue).not.toBeUndefined()
        })
        it('Handles value type in endDate', () => {
          const customInitialValue = initialState.get('endDate')
          expect(typeof customInitialValue).toBe('string')
        })
        it('Handles initial value in endDate', () => {
          const customInitialValue = initialState.get('endDate')
          expect(customInitialValue).toBe('')
        })
        it('Handles custom values in endDate', () => {
          const endDate = '2019-01-01'
          const endDateMoment = moment(endDate)

          const endDateState = createStoreReducer(
            initialState,
            updateEndDateAction(endDateMoment, endDate)
          )
          const customEndDateValue = endDateState.get('endDate')
          const customEndDateMomentValue = endDateState.get('endDateMoment')

          expect(customEndDateValue).toBe(endDate)
          expect(customEndDateMomentValue).toBe(endDateMoment)
        })
      })
    })
    describe('UPDATE_PRIVATE_ACTION', () => {
      describe('privateStore', () => {
        it('Handles undefined value in privateStore', () => {
          const customInitialValue = initialState.get('privateStore')
          expect(customInitialValue).not.toBeUndefined()
        })
        it('Handles value type in privateStore', () => {
          const customInitialValue = initialState.get('privateStore')
          expect(typeof customInitialValue).toBe('boolean')
        })
        it('Handles initial value in privateStore', () => {
          const customInitialValue = initialState.get('open')
          expect(customInitialValue).toBeFalsy()
        })
        it('Handles custom values in privateStore', () => {
          const privateStoreState = createStoreReducer(
            initialState,
            updatePrivateAction(false)
          )
          const customPrivateStoreValue = privateStoreState.get('privateStore')

          expect(customPrivateStoreValue).toBeFalsy()
        })
      })
    })
    describe('UPDATE_PASS_CODE_ACTION', () => {
      describe('teamstore password', () => {
        it('Handles undefined value in passCode', () => {
          const customInitialValue = initialState.get('passCode')
          expect(customInitialValue).not.toBeUndefined()
        })
        it('Handles value type in passCode', () => {
          const customInitialValue = initialState.get('passCode')
          expect(typeof customInitialValue).toBe('string')
        })
        it('Handles initial value in passCode', () => {
          const customInitialValue = initialState.get('passCode')
          expect(customInitialValue).toBe('')
        })
        it('Handles custom values in passCode', () => {
          const password = 'PASS'
          const passCodeState = createStoreReducer(
            initialState,
            updatePassCodeAction(password)
          )
          const customPrivateStoreValue = passCodeState.get('passCode')

          expect(customPrivateStoreValue).toBe(password)
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
          const openLockerState = createStoreReducer(
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
            id: 1,
            code: 'CODE',
            name: 'NAME',
            shared: true,
            image: '',
            proDesign: false
          }
          const checked = true
          const selectedItemsState = createStoreReducer(
            initialState,
            setItemSelectedAction(item, checked)
          )
          const customSelectedItemsValue = selectedItemsState.get(
            'selectedItems'
          )
          expect(customSelectedItemsValue.size).toBeGreaterThan(0)

          const sharedValue = selectedItemsState.getIn([
            'selectedItems',
            0,
            'shared'
          ])
          const proDesignValue = selectedItemsState.getIn([
            'selectedItems',
            0,
            'proDesign'
          ])
          const nameValue = selectedItemsState.getIn([
            'selectedItems',
            0,
            'name'
          ])

          expect(sharedValue).toBeTruthy()
          expect(proDesignValue).toBeFalsy()
          expect(nameValue).toBe(item.name)
        })
      })
    })
    describe('SET_STORE_DATA_TO_EDIT', () => {
      describe('Edit data', () => {
        it('Handles custom values', () => {
          const data = {
            id: 1,
            shortId: 'ID',
            name: 'NAME',
            banner: '',
            startDate: '2019-01-01',
            endDate: '2019-30-01',
            privateStore: false,
            onDemand: true,
            items: [],
            teamSize: { id: 1, size: '2-5' }
          }
          const editDataState = createStoreReducer(
            initialState,
            setDataToEditAction(data)
          )
          const storeIdValue = editDataState.get('storeId')
          expect(storeIdValue).toBe(1)

          const shortIdValue = editDataState.get('storeShortId')
          expect(shortIdValue).toBe(data.shortId)

          const bannerValue = editDataState.get('banner')
          expect(bannerValue).toBe(data.banner)

          const startDateValue = editDataState.get('startDate')
          expect(startDateValue).toBe(data.startDate)

          const endDateValue = editDataState.get('endDate')
          expect(endDateValue).toBe(data.endDate)

          const privateStoreValue = editDataState.get('privateStore')
          expect(privateStoreValue).toBeFalsy()

          const onDemandValue = editDataState.get('onDemand')
          expect(onDemandValue).toBeTruthy()
        })
      })
    })
    describe('DELETE_BANNER_ON_EDIT', () => {
      describe('banner', () => {
        it('Handles undefined value in banner', () => {
          const customInitialValue = initialState.get('banner')
          expect(customInitialValue).not.toBeUndefined()
        })
        it('Handles initial value in banner', () => {
          const customInitialValue = initialState.get('banner')
          expect(customInitialValue).toBe('')
        })
        it('Delete banner value in banner', () => {
          const bannerState = initialState.set('banner', 'BANNER')
          const deletedBannerState = createStoreReducer(
            bannerState,
            deleteBannerOnEditAction()
          )
          const bannerValue = deletedBannerState.get('banner')
          expect(bannerValue).toBe('')
        })
      })
    })
    describe('SET_TEAM_STORE_STATUS', () => {
      describe('showTeamStores', () => {
        it('Handles undefined value in showTeamStores', () => {
          const customInitialValue = initialState.get('showTeamStores')
          expect(customInitialValue).not.toBeUndefined()
        })
        it('Handles initial value in showTeamStores', () => {
          const customInitialValue = initialState.get('showTeamStores')
          expect(customInitialValue).toBeFalsy()
        })
        it('custom value in showTeamStores', () => {
          const showTeamStoresState = createStoreReducer(
            initialState,
            setTeamStoreStatusAction(true)
          )
          const showTeamStoresValue = showTeamStoresState.get('showTeamStores')
          expect(showTeamStoresValue).toBeTruthy()
        })
      })
    })
    describe('SET_DESIGNS_DATA', () => {
      describe('offset', () => {
        it('Handles undefined value in offset', () => {
          const customInitialValue = initialState.get('offset')
          expect(customInitialValue).not.toBeUndefined()
        })
        it('Handles initial value in offset', () => {
          const customInitialValue = initialState.get('offset')
          expect(customInitialValue).toBe(0)
        })
        it('custom value in offset', () => {
          const offset = 10
          const showTeamStoresState = createStoreReducer(
            initialState,
            setPaginationDataAction(offset, 0)
          )
          const showTeamStoresValue = showTeamStoresState.get('offset')
          expect(showTeamStoresValue).toBe(offset)
        })
      })
      describe('currentPage', () => {
        it('Handles undefined value in currentPage', () => {
          const customInitialValue = initialState.get('currentPage')
          expect(customInitialValue).not.toBeUndefined()
        })
        it('Handles initial value in currentPage', () => {
          const customInitialValue = initialState.get('currentPage')
          expect(customInitialValue).toBe(1)
        })
        it('custom value in currentPage', () => {
          const page = 2
          const showTeamStoresState = createStoreReducer(
            initialState,
            setPaginationDataAction(0, page)
          )
          const showTeamStoresValue = showTeamStoresState.get('currentPage')
          expect(showTeamStoresValue).toBe(page)
        })
      })
    })
  })
})
