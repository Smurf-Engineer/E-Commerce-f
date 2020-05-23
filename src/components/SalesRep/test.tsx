/**
 * SalesRep Test - Created by Jesús Apodaca on 07/02/20.
 */

import salesRepReducer, { initialState } from './reducer'
import {
  resetDataAction, setCurrentPageAction, setSearchTextAction, setNameAction, setOpenModal, setLoading, selectUser,
} from './actions'
import {
  RESET_DATA, SET_CURRENT_PAGE, SET_SEARCH_TEXT, SET_NAME, SET_LOADING, SET_OPEN_MODAL, SELECT_USER,
} from './constants'

describe('Design Search Admin Screen', () => {
  describe('Actions', () => {
    it('onResetReducer', () => {
      const type = RESET_DATA
      expect(resetDataAction()).toEqual({
        type
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
    it('setNameAction', () => {
      const type = SET_NAME
      const field = 'name'
      const value = 'Test'
      expect(setNameAction(field, value)).toEqual({
        type,
        field,
        value
      })
    })
    it('setOpenModal', () => {
      const type = SET_OPEN_MODAL
      const open = true
      expect(setOpenModal(open)).toEqual({
        type,
        open
      })
    })
    it('setLoading', () => {
      const type = SET_LOADING
      const loading = true
      expect(setLoading(loading)).toEqual({
        type,
        loading
      })
    })
    it('selectUser', () => {
      const type = SELECT_USER
      const user = {
        id: 1,
        shortId: 'test',
        firstName: 'test',
        lastName: 'test',
      }
      expect(selectUser(user)).toEqual({
        type,
        user
      })
    })
  })
  describe('Reducer', () => {
    describe('RESET_DATA', () => {
      it('Should not have initial state undefined', () => {
        expect(initialState.get('currentPage')).toBeDefined()
      })
      it('Should be init with loading', () => {
        const selectedKeyState = salesRepReducer(
          initialState,
          resetDataAction()
        )
        expect(selectedKeyState.get('currentPage')).toEqual(1)
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
          const salesState = salesRepReducer(
            initialState,
            setCurrentPageAction(page)
          )
          const customPageValue = salesState.get('currentPage')
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
          const salesState = salesRepReducer(
            initialState,
            setSearchTextAction(text)
          )
          const customSearchValue = salesState.get('searchText')
          expect(customSearchValue).toBe(text)
        })
      })
    })
    describe('SET_NAME', () => {
      describe('Set name field value action', () => {
        it('Handles undefined value in name', () => {
          const customInitialValue = initialState.get('name')
          expect(customInitialValue).not.toBeUndefined()
        })
        it('Handles initial value in name', () => {
          const customInitialValue = initialState.get('name')
          expect(customInitialValue).toBe('')
        })
        it('Handles custom values in name', () => {
          const field = 'name'
          const value = 'Test'
          const salesState = salesRepReducer(
            initialState,
            setNameAction(field, value)
          )
          const customNameValue = salesState.get('name')
          expect(customNameValue).toBe(value)
        })
      })
    })
    describe('SET_OPEN_MODAL', () => {
      describe('Set open value for modal action', () => {
        it('Handles undefined value in open', () => {
          const customInitialValue = initialState.get('open')
          expect(customInitialValue).not.toBeUndefined()
        })
        it('Handles initial value in open', () => {
          const customInitialValue = initialState.get('open')
          expect(customInitialValue).toBeFalsy()
        })
        it('Handles custom values in open', () => {
          const open = true
          const salesState = salesRepReducer(
            initialState,
            setOpenModal(open)
          )
          const customOpenValue = salesState.get('open')
          expect(customOpenValue).toBe(open)
        })
      })
    })
    describe('SET_LOADING', () => {
      describe('Set loading value action', () => {
        it('Handles undefined value in loading', () => {
          const customInitialValue = initialState.get('loading')
          expect(customInitialValue).not.toBeUndefined()
        })
        it('Handles initial value in loading', () => {
          const customInitialValue = initialState.get('loading')
          expect(customInitialValue).toBeFalsy()
        })
        it('Handles custom values in loading', () => {
          const loading = true
          const salesState = salesRepReducer(
            initialState,
            setLoading(loading)
          )
          const customLoadingValue = salesState.get('loading')
          expect(customLoadingValue).toBe(loading)
        })
      })
    })
    describe('SELECT_USER', () => {
      describe('Set user value action', () => {
        it('Handles undefined value in selected user id', () => {
          const customInitialValue = initialState.get('shortId')
          expect(customInitialValue).not.toBeUndefined()
        })
        it('Handles initial value in selected id', () => {
          const customInitialValue = initialState.get('shortId')
          expect(customInitialValue).toBe('')
        })
        it('Handles custom values in user selected id', () => {
          const user = {
            id: 1,
            shortId: 'test',
            firstName: 'test',
            lastName: 'test',
          }
          const salesState = salesRepReducer(
            initialState,
            selectUser(user)
          )
          const customUserId = salesState.get('shortId')
          expect(customUserId).toBe(user.shortId)
        })
      })
    })
  })
})
