/**
 * Product Internals Test - Created by Jesús Apodaca on 04/08/20.
 */

import productInternalsReducer, { initialState } from './reducer'
import {
  openModalAction,
  setLoadingAction,
  setOrderByAction,
  setCurrentPageAction,
  resetDataAction,
  setSearchTextAction,
  setTextAction,
  onSelectChangeAction,
  resetModalAction,
  setInternalToUpdate,
  setDownloadingFileAction,
} from './actions'
import {
  OPEN_MODAL,
  SET_LOADING,
  SET_ORDER_BY,
  SET_CURRENT_PAGE,
  RESET_DATA,
  SET_SEARCH_TEXT,
  SET_TEXT,
  SELECT_CHANGE,
  RESET_MODAL,
  SET_INTERNAL_TO_UPDATE,
  SET_DOWNLOADING_FILE
} from './constants'

describe(' ProductInternals Screen', () => {
  describe('Actions', () => {
    it('onResetReducer', () => {
      const type = RESET_DATA
      expect(resetDataAction()).toEqual({
        type
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
    it('setLoadingAction', () => {
      const type = SET_LOADING
      const loading = true
      expect(setLoadingAction(loading)).toEqual({
        type,
        loading
      })
    })
    it('setOrderByAction', () => {
      const type = SET_ORDER_BY
      const orderBy = 'Test'
      const sort = 'asc'
      expect(setOrderByAction(orderBy, sort)).toEqual({
        type,
        orderBy, sort
      })
    })
    it('setCurrentPageAction', () => {
      const type = SET_CURRENT_PAGE
      const page = 1
      expect(setCurrentPageAction(page)).toEqual({
        type,
        page
      })
    })
    it('setSearchTextAction', () => {
      const type = SET_SEARCH_TEXT
      const searchText = 'Test'
      expect(setSearchTextAction(searchText)).toEqual({
        type,
        searchText
      })
    })
    it('setTextAction', () => {
      const type = SET_TEXT
      const field = 'Test'
      const value = 'Test'
      expect(setTextAction(field, value)).toEqual({
        type,
        field,
        value
      })
    })
    it('onSelectChangeAction', () => {
      const type = SELECT_CHANGE
      const value = 'Test'
      const id = 'Test'
      expect(onSelectChangeAction(value, id)).toEqual({
        type,
        value,
        id
      })
    })
    it('resetModalAction', () => {
      const type = RESET_MODAL
      expect(resetModalAction()).toEqual({
        type
      })
    })
    it('setInternalToUpdate', () => {
      const type = SET_INTERNAL_TO_UPDATE
      const internal = {
        id: 'Test'
      }
      expect(setInternalToUpdate(internal)).toEqual({
        type,
        internal
      })
    })
    it('setDownloadingFileAction', () => {
      const type = SET_DOWNLOADING_FILE
      const downloading = true
      expect(setDownloadingFileAction(downloading)).toEqual({
        type,
        downloading
      })
    })
  })

  describe('Reducer', () => {
    describe('RESET_DATA', () => {
      it('Should not have initial state undefined', () => {
        expect(initialState.get('currentPage')).toBeDefined()
      })
      it('Should be init with currentPage', () => {
        const selectedKeyState = productInternalsReducer(
          initialState,
          resetDataAction()
        )
        expect(selectedKeyState.get('currentPage')).toEqual(1)
      })
    })
    describe('INITIAL_STATE', () => {
      it('Should not have initial state undefined', () => {
        expect(initialState).toBeDefined()
      })
      it('Return the default state for unknow action', () => {
        let state = productInternalsReducer(initialState, { type: 'unknow' })
        expect(state).toEqual(initialState)
      })
    })
    describe('OPEN_MODAL', () => {
      it('Handles undefined value in modalOpen', () => {
        const customInitialValue = initialState.get('modalOpen')
        expect(customInitialValue).not.toBeUndefined()
      })
      it('Handles value type in modalOpen', () => {
        const customInitialValue = initialState.get('modalOpen')
        expect(typeof customInitialValue).toBe('boolean')
      })
      it('Handles initial value in modalOpen', () => {
        const customInitialValue = initialState.get('modalOpen')
        expect(customInitialValue).toBeFalsy()
      })
      it('Handles custom value in modalOpen', () => {
        const productInternalState = productInternalsReducer(
          initialState,
          openModalAction(true)
        )
        const customOpenModalValue = productInternalState.get('modalOpen')
        expect(customOpenModalValue).toBeTruthy()
      })
    })
    describe('SET_LOADING', () => {
      it('Handles undefined value in loading', () => {
        const customInitialValue = initialState.get('loading')
        expect(customInitialValue).not.toBeUndefined()
      })
      it('Handles initial value in loading', () => {
        const customInitialValue = initialState.get('loading')
        expect(customInitialValue).toBeFalsy()
      })
      it('Handles custom value in loading', () => {
        const loading = false
        const productInternalState = productInternalsReducer(
          initialState,
          setLoadingAction(loading)
        )
        const customLoadingValue = productInternalState.get('loading')
        expect(customLoadingValue).toBe(loading)
      })
    })
    describe('SET_ORDER_BY', () => {
      it('Handles undefined value in orderBy', () => {
        const customInitialValue = initialState.get('orderBy')
        expect(customInitialValue).not.toBeUndefined()
      })
      it('Handles initial value in orderBy', () => {
        const customInitialValue = initialState.get('orderBy')
        expect(customInitialValue).toBe('id')
      })
      it('Handles custom value in orderBy', () => {
        const orderBy = 'Test'
        const sort = 'asc'
        const productInternalState = productInternalsReducer(
          initialState,
          setOrderByAction(orderBy, sort)
        )
        const customOrderValue = productInternalState.get('orderBy')
        expect(customOrderValue).toBe(orderBy)
      })
    })
    describe('SET_CURRENT_PAGE', () => {
      it('Handles undefined value in currentPage', () => {
        const customInitialValue = initialState.get('currentPage')
        expect(customInitialValue).not.toBeUndefined()
      })
      it('Handles initial value in currentPage', () => {
        const customInitialValue = initialState.get('currentPage')
        expect(customInitialValue).toBe(1)
      })
      it('Handles custom value in currentPage', () => {
        const page = 1
        const productInternalState = productInternalsReducer(
          initialState,
          setCurrentPageAction(page)
        )
        const customPageValue = productInternalState.get('currentPage')
        expect(customPageValue).toBe(page)
      })
    })
    describe('SET_SEARCH_TEXT', () => {
      it('Handles undefined value in searchText', () => {
        const customInitialValue = initialState.get('searchText')
        expect(customInitialValue).not.toBeUndefined()
      })
      it('Handles initial value in searchText', () => {
        const customInitialValue = initialState.get('searchText')
        expect(customInitialValue).toBe('')
      })
      it('Handles custom value in searchText', () => {
        const search = 'Test'
        const productInternalState = productInternalsReducer(
          initialState,
          setSearchTextAction(search)
        )
        const customSearchValue = productInternalState.get('searchText')
        expect(customSearchValue).toBe(search)
      })
    })
    describe('SET_TEXT', () => {
      it('Handles undefined value in size', () => {
        const customInitialValue = initialState.get('size')
        expect(customInitialValue).not.toBeUndefined()
      })
      it('Handles initial value in size', () => {
        const customInitialValue = initialState.get('size')
        expect(customInitialValue).toBeNull()
      })
      it('Handles custom value in size', () => {
        const field = 'size'
        const value = 'Test'
        const productInternalState = productInternalsReducer(
          initialState,
          setTextAction(field, value)
        )
        const customFieldValue = productInternalState.get(field)
        expect(customFieldValue).toBe(value)
      })
    })
    describe('SELECT_CHANGE', () => {
      it('Handles undefined value in predyedColor', () => {
        const customInitialValue = initialState.get('predyedColor')
        expect(customInitialValue).not.toBeUndefined()
      })
      it('Handles initial value in predyedColor', () => {
        const customInitialValue = initialState.get('predyedColor')
        expect(customInitialValue).toBeNull()
      })
      it('Handles custom value in predyedColor', () => {
        const id = 'predyedColor'
        const value = 'Test'
        const productInternalState = productInternalsReducer(
          initialState,
          onSelectChangeAction(value, id)
        )
        const customSelectValue = productInternalState.get(id)
        expect(customSelectValue).toBe(value)
      })
    })
    describe('RESET_MODAL', () => {
      it('Handles undefined value in downloading', () => {
        const customInitialValue = initialState.get('downloading')
        expect(customInitialValue).not.toBeUndefined()
      })
      it('Handles initial value in downloading', () => {
        const customInitialValue = initialState.get('downloading')
        expect(customInitialValue).toBeFalsy()
      })
      it('Handles custom value in downloading', () => {
        const productInternalState = productInternalsReducer(
          initialState,
          resetModalAction()
        )
        const customColorValue = productInternalState.get('downloading')
        expect(customColorValue).toBeFalsy()
      })
    })
    describe('SET_INTERNAL_TO_UPDATE', () => {
      it('Handles undefined value in id', () => {
        const customInitialValue = initialState.get('id')
        expect(customInitialValue).not.toBeUndefined()
      })
      it('Handles initial value in id', () => {
        const customInitialValue = initialState.get('id')
        expect(customInitialValue).toBe(-1)
      })
      it('Handles custom value in id', () => {
        const internal = {
          id: 'Test'
        }
        const productInternalState = productInternalsReducer(
          initialState,
          setInternalToUpdate(internal)
        )
        const customIdValue = productInternalState.get('id')
        expect(customIdValue).toBe(internal.id)
      })
    })
    describe('SET_DOWNLOADING_FILE', () => {
      it('Handles undefined value in downloading', () => {
        const customInitialValue = initialState.get('downloading')
        expect(customInitialValue).not.toBeUndefined()
      })
      it('Handles initial value in downloading', () => {
        const customInitialValue = initialState.get('downloading')
        expect(customInitialValue).toBeFalsy()
      })
      it('Handles custom value in downloading', () => {
        const downloading = true
        const productInternalState = productInternalsReducer(
          initialState,
          setDownloadingFileAction(downloading)
        )
        const customDownloadingValue = productInternalState.get('downloading')
        expect(customDownloadingValue).toBe(downloading)
      })
    })
  })
})
