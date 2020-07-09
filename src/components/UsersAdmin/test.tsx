/**
 * UsersAdmin Test - Created by eduardoquintero on 04/02/20.
 */

import usersAdminReducer, { initialState } from './reducer'

import {
  setOrderByAction,
  setCurrentPageAction,
  setSearchTextAction,
  setLoadingAction,
  onInputChangeAction,
  onChangeSectionAction,
  onToggleModalAction,
  setNoteText,
  setDesignSelected,
  setSearchManager,
  setSearchRep
} from './actions'

import {
  SET_ORDER_BY,
  SET_CURRENT_PAGE,
  SET_SEARCH_TEXT,
  SET_LOADING,
  ON_INPUT_CHANGE,
  ON_CHANGE_SECTION,
  ON_TOGGLE_MODAL,
  CHANGE_NOTE,
  SET_DESIGN,
  SET_SEARCH_MANAGER,
  SET_SEARCH
} from './constants'

describe(' DiscountsAdmin Screen', () => {
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
    it('setLoading', () => {
      const type = SET_LOADING
      const loading = true
      expect(setLoadingAction(loading)).toEqual({
        type,
        loading
      })
    })
    it('onInputChangeAction', () => {
      const type = ON_INPUT_CHANGE
      const id = 'name'
      const value = 'John'
      expect(onInputChangeAction(id, value)).toEqual({
        type,
        id,
        value
      })
    })
    it('onChangeSectionAction', () => {
      const type = ON_CHANGE_SECTION
      const section = true

      expect(onChangeSectionAction(section)).toEqual({
        type,
        section
      })
    })
    it('onToggleModalAction', () => {
      const type = ON_TOGGLE_MODAL

      expect(onToggleModalAction()).toEqual({
        type
      })
    })
    it('setNoteText', () => {
      const type = CHANGE_NOTE
      const text = 'Test'
      expect(setNoteText(text)).toEqual({
        type,
        text
      })
    })
    it('setSearchManager', () => {
      const type = SET_SEARCH_MANAGER
      const value = 'Test'
      expect(setSearchManager(value)).toEqual({
        type,
        value
      })
    })
    it('setSearchRep', () => {
      const type = SET_SEARCH
      const value = 'Test'
      expect(setSearchRep(value)).toEqual({
        type,
        value
      })
    })
    it('setDesignSelected', () => {
      const type = SET_DESIGN
      const designId = 'Test'
      expect(setDesignSelected(designId)).toEqual({
        type,
        designId
      })
    })
  })
  describe('Reducer', () => {
    describe('INITIAL_STATE', () => {
      it('Should not have initial state undefined', () => {
        expect(initialState).toBeDefined()
      })
      it('Return the default state for unknow action', () => {
        let state = usersAdminReducer(initialState, { type: 'unknow' })
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
          const orderByState = usersAdminReducer(
            initialState,
            setOrderByAction('pro_assist.id', 'desc')
          )

          const customSortValue = orderByState.get('sort')
          expect(customSortValue).toBe('desc')

          const customOrderByValue = orderByState.get('orderBy')
          expect(customOrderByValue).toBe('pro_assist.id')
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
          const currentPageState = usersAdminReducer(
            initialState,
            setCurrentPageAction(2)
          )
          const customPageValue = currentPageState.get('currentPage')
          expect(customPageValue).toBe(2)
        })
      })
    })
    describe('SET_SEARCH_TEXT', () => {
      describe('Search text', () => {
        it('Handles undefined value in searchText', () => {
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
          const value = 'VALUE'
          const searchTextState = usersAdminReducer(
            initialState,
            setSearchTextAction(value)
          )
          const customSearchValue = searchTextState.get('searchText')
          expect(customSearchValue).toBe(value)
        })
      })
    })
    describe('SET_LOADING', () => {
      describe('Set loading switch action', () => {
        it('Handles undefined value in loading', () => {
          const customInitialValue = initialState.get('loading')
          expect(customInitialValue).not.toBeUndefined()
        })
        it('Handles initial value in loading', () => {
          const customInitialValue = initialState.get('loading')
          expect(customInitialValue).toBeFalsy()
        })
        it('Handles custom value in loading', () => {
          const value = true
          const loadingState = usersAdminReducer(
            initialState,
            setLoadingAction(value)
          )
          const customLoadingValue = loadingState.get('loading')
          expect(customLoadingValue).toBe(value)
        })
      })
    })
    describe('ON_INPUT_CHANGE', () => {
      describe('on name change', () => {
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
        it('Handles custom value in name', () => {
          const id = 'name'
          const value = 'VALUE'
          const searchTextState = usersAdminReducer(
            initialState,
            onInputChangeAction(id, value)
          )
          const customSearchValue = searchTextState.get('name')
          expect(customSearchValue).toBe(value)
        })
      })
      describe('on lastName change', () => {
        it('Handles undefined value in lastName', () => {
          const customInitialValue = initialState.get('lastName')
          expect(customInitialValue).not.toBeUndefined()
        })
        it('Handles value type in lastName', () => {
          const customInitialValue = initialState.get('lastName')
          expect(typeof customInitialValue).toBe('string')
        })
        it('Handles initial value in lastName', () => {
          const customInitialValue = initialState.get('lastName')
          expect(customInitialValue).toBe('')
        })
        it('Handles custom value in lastName', () => {
          const id = 'lastName'
          const value = 'VALUE'
          const searchTextState = usersAdminReducer(
            initialState,
            onInputChangeAction(id, value)
          )
          const customSearchValue = searchTextState.get('lastName')
          expect(customSearchValue).toBe(value)
        })
      })
      describe('on email change', () => {
        it('Handles undefined value in lastName', () => {
          const customInitialValue = initialState.get('email')
          expect(customInitialValue).not.toBeUndefined()
        })
        it('Handles value type in email', () => {
          const customInitialValue = initialState.get('email')
          expect(typeof customInitialValue).toBe('string')
        })
        it('Handles initial value in email', () => {
          const customInitialValue = initialState.get('email')
          expect(customInitialValue).toBe('')
        })
        it('Handles custom value in email', () => {
          const id = 'email'
          const value = 'VALUE'
          const searchTextState = usersAdminReducer(
            initialState,
            onInputChangeAction(id, value)
          )
          const customSearchValue = searchTextState.get('email')
          expect(customSearchValue).toBe(value)
        })
      })
      describe('ON_CHANGE_SECTION', () => {
        describe('Set showLocker', () => {
          it('Handles undefined value in optionSelected', () => {
            const customInitialValue = initialState.get('optionSelected')
            expect(customInitialValue).not.toBeUndefined()
          })
          it('Handles initial value in optionSelected', () => {
            const customInitialValue = initialState.get('optionSelected')
            expect(customInitialValue).toBe(0)
          })
          it('Handles custom value in optionSelected', () => {
            const value = 3
            const showLockerState = usersAdminReducer(
              initialState,
              onChangeSectionAction(value)
            )
            const customSectionValue = showLockerState.get('optionSelected')
            expect(customSectionValue).toBe(value)
          })
        })
      })
      describe('ON_TOGGLE_MODAL', () => {
        describe('Set openModal', () => {
          it('Handles undefined value in openModal', () => {
            const customInitialValue = initialState.get('openModal')
            expect(customInitialValue).not.toBeUndefined()
          })
          it('Handles initial value in section', () => {
            const customInitialValue = initialState.get('openModal')
            expect(customInitialValue).toBeFalsy()
          })
          it('Handles custom value in openModal', () => {
            const value = false
            const openModalState = usersAdminReducer(
              initialState,
              onToggleModalAction()
            )
            const customSectionValue = openModalState.get('openModal')
            expect(customSectionValue).toBe(!value)
          })
        })
      })
      describe('CHANGE_NOTE', () => {
        describe('Set note text action', () => {
          it('Handles undefined value in note', () => {
            const customInitialValue = initialState.get('note')
            expect(customInitialValue).not.toBeUndefined()
          })
          it('Handles initial value in note', () => {
            const customInitialValue = initialState.get('note')
            expect(customInitialValue).toBe('')
          })
          it('Handles custom value in note', () => {
            const value = 'Test'
            const noteState = usersAdminReducer(
              initialState,
              setNoteText(value)
            )
            const customNoteValue = noteState.get('note')
            expect(customNoteValue).toBe(value)
          })
        })
      })
      describe('SET_DESIGN', () => {
        describe('Set designId selected action', () => {
          it('Handles undefined value in designSelected', () => {
            const customInitialValue = initialState.get('designSelected')
            expect(customInitialValue).not.toBeUndefined()
          })
          it('Handles initial value in designSelected', () => {
            const customInitialValue = initialState.get('designSelected')
            expect(customInitialValue).toBe('')
          })
          it('Handles custom value in designSelected', () => {
            const value = 'Test'
            const noteState = usersAdminReducer(
              initialState,
              setDesignSelected(value)
            )
            const customDesignValue = noteState.get('designSelected')
            expect(customDesignValue).toBe(value)
          })
        })
      })
      describe('SET_SEARCH_MANAGER', () => {
        describe('Set search manager value action', () => {
          it('Handles undefined value in managerSearchText', () => {
            const customInitialValue = initialState.get('managerSearchText')
            expect(customInitialValue).not.toBeUndefined()
          })
          it('Handles initial value in managerSearchText', () => {
            const customInitialValue = initialState.get('managerSearchText')
            expect(customInitialValue).toBe('')
          })
          it('Handles custom value in managerSearchText', () => {
            const value = 'Test'
            const noteState = usersAdminReducer(
              initialState,
              setSearchManager(value)
            )
            const customSearchValue = noteState.get('managerSearchText')
            expect(customSearchValue).toBe(value)
          })
        })
      })
      describe('SET_SEARCH', () => {
        describe('Set search rep value action', () => {
          it('Handles undefined value in repSearchText', () => {
            const customInitialValue = initialState.get('repSearchText')
            expect(customInitialValue).not.toBeUndefined()
          })
          it('Handles initial value in repSearchText', () => {
            const customInitialValue = initialState.get('repSearchText')
            expect(customInitialValue).toBe('')
          })
          it('Handles custom value in repSearchText', () => {
            const value = 'Test'
            const noteState = usersAdminReducer(
              initialState,
              setSearchRep(value)
            )
            const customSearchValue = noteState.get('repSearchText')
            expect(customSearchValue).toBe(value)
          })
        })
      })
    })
  })
})
