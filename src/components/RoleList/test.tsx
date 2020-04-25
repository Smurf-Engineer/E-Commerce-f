/**
 * RoleList Test - Created by Jesús Apodaca on 07/02/20.
 */

import roleCatalogReducer, { initialState } from './reducer'
import {
  resetDataAction, setFilterAction, setCurrentPageAction, setSearchTextAction,
} from './actions'
import {
  RESET_DATA, SET_FILTER, SET_CURRENT_PAGE, SET_SEARCH_TEXT,
} from './constants'

describe('Design Search Admin Screen', () => {
  describe('Actions', () => {
    it('onResetReducer', () => {
      const type = RESET_DATA
      expect(resetDataAction()).toEqual({
        type
      })
    })
    it('setFilterAction', () => {
      const type = SET_FILTER
      const filter = 'Test'
      expect(setFilterAction(filter)).toEqual({
        type,
        filter
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
      const searchText = 'Test'
      expect(setSearchTextAction(searchText)).toEqual({
        type,
        searchText
      })
    })
  })
  describe('Reducer', () => {
    describe('RESET_DATA', () => {
      it('Should not have initial state undefined', () => {
        expect(initialState.get('currentPage')).toBeDefined()
      })
      it('Should be init with loading', () => {
        const selectedKeyState = roleCatalogReducer(
          initialState,
          resetDataAction()
        )
        expect(selectedKeyState.get('currentPage')).toEqual(1)
      })
    })
    describe('SET_FILTER', () => {
      describe('Set filter search value action', () => {
        it('Handles undefined value in filter', () => {
          const customInitialValue = initialState.get('filter')
          expect(customInitialValue).not.toBeUndefined()
        })
        it('Handles initial value in filter', () => {
          const customInitialValue = initialState.get('filter')
          expect(customInitialValue).toBe('')
        })
        it('Handles custom values in filter', () => {
          const filter = 'Test'
          const roleState = roleCatalogReducer(
            initialState,
            setFilterAction(filter)
          )
          const customFiltervalue = roleState.get('filter')
          expect(customFiltervalue).toBe(filter)
        })
      })
    })
    describe('SET_CURRENT_PAGE', () => {
      describe('Set current page value action', () => {
        it('Handles undefined value in currentPage', () => {
          const customInitialValue = initialState.get('currentPage')
          expect(customInitialValue).not.toBeUndefined()
        })
        it('Handles initial value in currentPage', () => {
          const customInitialValue = initialState.get('currentPage')
          expect(customInitialValue).toBe(1)
        })
        it('Handles custom values in currentPage', () => {
          const page = 2
          const roleState = roleCatalogReducer(
            initialState,
            setCurrentPageAction(page)
          )
          const customPageValue = roleState.get('currentPage')
          expect(customPageValue).toBe(page)
        })
      })
    })
    describe('SET_SEARCH_TEXT', () => {
      describe('Set search text value action', () => {
        it('Handles undefined value in searchText', () => {
          const customInitialValue = initialState.get('searchText')
          expect(customInitialValue).not.toBeUndefined()
        })
        it('Handles initial value in searchText', () => {
          const customInitialValue = initialState.get('searchText')
          expect(customInitialValue).toBe('')
        })
        it('Handles custom values in searchText', () => {
          const text = 'Test'
          const roleState = roleCatalogReducer(
            initialState,
            setSearchTextAction(text)
          )
          const customSearchValue = roleState.get('searchText')
          expect(customSearchValue).toBe(text)
        })
      })
    })
  })
})
