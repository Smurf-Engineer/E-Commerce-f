/**
 * DesignSearch Test - Created by Jesús Apodaca on 07/02/20.
 */

import designSearchAdminReducer, { initialState } from './reducer'
import {
  setLoadingAction,
  setPreflightAction,
  setLoadingPreflight,
  setOrderAction,
  resetDataAction,
  setNoteAction,
  setLoadingNote,
  openNoteAction,
  setSearchRep,
  setSearchManager,
  setUserRepAction,
  setManagerAction
} from './actions'
import {
  SET_LOADING,
  SET_PREFLIGHT,
  SET_LOADING_PREFLIGHT,
  RESET_DATA,
  SET_NOTE,
  SET_LOADING_NOTE,
  OPEN_NOTES,
  SET_SEARCH_REP,
  SET_SEARCH_MANAGER,
  SET_USER_REP,
  SET_ACCOUNT_MANAGER
} from './constants'

describe('Design Search Admin Screen', () => {
  describe('Actions', () => {
    it('onResetReducer', () => {
      const type = RESET_DATA
      expect(resetDataAction()).toEqual({
        type
      })
    })
    it('setLoadingAction', () => {
      const type = SET_LOADING
      expect(setLoadingAction()).toEqual({
        type
      })
    })
    it('setNoteAction', () => {
      const type = SET_NOTE
      const text = 'Test'
      expect(setNoteAction(text)).toEqual({
        type,
        text
      })
    })
    it('setSearchRep', () => {
      const type = SET_SEARCH_REP
      const value = 'Test'
      expect(setSearchRep(value)).toEqual({
        type,
        value
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
    it('setUserRepAction', () => {
      const type = SET_USER_REP
      const userRep = {
        id: 1,
        firstName: 'Test',
        lastName: 'Test'
      }
      expect(setUserRepAction(userRep)).toEqual({
        type,
        userRep
      })
    })
    it('setManagerAction', () => {
      const type = SET_ACCOUNT_MANAGER
      const manager = {
        id: 1,
        firstName: 'Test',
        lastName: 'Test'
      }
      expect(setManagerAction(manager)).toEqual({
        type,
        manager
      })
    })
    it('setLoadingNote', () => {
      const type = SET_LOADING_NOTE
      const loading = true
      expect(setLoadingNote(loading)).toEqual({
        type,
        loading
      })
    })
    it('setPreflightAction', () => {
      const type = SET_PREFLIGHT
      const checked = true
      expect(setPreflightAction(checked)).toEqual({
        type,
        checked
      })
    })
    it('setLoadingPreflight', () => {
      const type = SET_LOADING_PREFLIGHT
      const loading = true
      expect(setLoadingPreflight(loading)).toEqual({
        type,
        loading
      })
    })
    it('openNoteAction', () => {
      const type = OPEN_NOTES
      const openNotes = true
      expect(openNoteAction(openNotes)).toEqual({
        type,
        openNotes
      })
    })
  })
  describe('Reducer', () => {
    describe('RESET_DATA', () => {
      it('Should not have initial state undefined', () => {
        expect(initialState.get('loading')).toBeDefined()
      })
      it('Should be init with loading', () => {
        const selectedKeyState = designSearchAdminReducer(
          initialState,
          resetDataAction()
        )
        expect(selectedKeyState.get('loading')).toEqual(false)
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
          const designState = designSearchAdminReducer(
            initialState,
            setLoadingAction()
          )
          const customLoadingValue = designState.get('loading')
          expect(customLoadingValue).toBeTruthy()

          const customNotFoundValue = designState.get('notFound')
          expect(customNotFoundValue).toBeFalsy()
        })
      })
    })
    describe('SET_NOTE', () => {
      describe('Set note text value action', () => {
        it('Handles undefined value in note', () => {
          const customInitialValue = initialState.get('note')
          expect(customInitialValue).not.toBeUndefined()
        })
        it('Handles initial value in note', () => {
          const customInitialValue = initialState.get('note')
          expect(customInitialValue).toBe('')
        })
        it('Handles custom values in note', () => {
          const text = 'Test'
          const designState = designSearchAdminReducer(
            initialState,
            setNoteAction(text)
          )
          const customTextValue = designState.get('note')
          expect(customTextValue).toBe(text)
        })
      })
    })
    describe('SET_SEARCH_REP', () => {
      describe('Set search rep text value action', () => {
        it('Handles undefined value in repSearchText', () => {
          const customInitialValue = initialState.get('repSearchText')
          expect(customInitialValue).not.toBeUndefined()
        })
        it('Handles initial value in repSearchText', () => {
          const customInitialValue = initialState.get('repSearchText')
          expect(customInitialValue).toBe('')
        })
        it('Handles custom values in repSearchText', () => {
          const value = 'Test'
          const designState = designSearchAdminReducer(
            initialState,
            setSearchRep(value)
          )
          const customTextValue = designState.get('repSearchText')
          expect(customTextValue).toBe(value)
        })
      })
    })
    describe('SET_SEARCH_MANAGER', () => {
      describe('Set search manager text value action', () => {
        it('Handles undefined value in managerSearchText', () => {
          const customInitialValue = initialState.get('managerSearchText')
          expect(customInitialValue).not.toBeUndefined()
        })
        it('Handles initial value in managerSearchText', () => {
          const customInitialValue = initialState.get('managerSearchText')
          expect(customInitialValue).toBe('')
        })
        it('Handles custom values in managerSearchText', () => {
          const value = 'Test'
          const designState = designSearchAdminReducer(
            initialState,
            setSearchManager(value)
          )
          const customTextValue = designState.get('managerSearchText')
          expect(customTextValue).toBe(value)
        })
      })
    })
    describe('SET_USER_REP', () => {
      describe('Set sales rep user value action', () => {
        it('Handles undefined value in order', () => {
          const customInitialValue = initialState.get('order')
          expect(customInitialValue).not.toBeUndefined()
        })
        it('Handles custom values in salesRep in order', () => {
          const userRep = {
            id: 1,
            firstName: 'Test',
            lastName: 'Test'
          }
          const order = {
            code: 'Test'
          }
          const orderState = designSearchAdminReducer(
            initialState,
            setOrderAction(order)
          )
          const designState = designSearchAdminReducer(
            orderState,
            setUserRepAction(userRep)
          )
          const customRepValue = designState.getIn(['order', 'salesRep'])
          expect(customRepValue).toBe(userRep)
        })
      })
    })
    describe('SET_ACCOUNT_MANAGER', () => {
      describe('Set search manager text value action', () => {
        it('Handles undefined value in order', () => {
          const customInitialValue = initialState.get('order')
          expect(customInitialValue).not.toBeUndefined()
        })
        it('Handles custom values in accountManager in order', () => {
          const manager = {
            id: 1,
            firstName: 'Test',
            lastName: 'Test'
          }
          const order = {
            code: 'Test'
          }
          const orderState = designSearchAdminReducer(
            initialState,
            setOrderAction(order)
          )
          const designState = designSearchAdminReducer(
            orderState,
            setManagerAction(manager)
          )
          const customManagerValue = designState.getIn(['order', 'accountManager'])
          expect(customManagerValue).toBe(manager)
        })
      })
    })
    describe('SET_LOADING_NOTE', () => {
      describe('Set loading note value action', () => {
        it('Handles undefined value in addingNote', () => {
          const customInitialValue = initialState.get('addingNote')
          expect(customInitialValue).not.toBeUndefined()
        })
        it('Handles initial value in addingNote', () => {
          const customInitialValue = initialState.get('addingNote')
          expect(customInitialValue).toBeFalsy()
        })
        it('Handles custom values in addingNote', () => {
          const test = true
          const designState = designSearchAdminReducer(
            initialState,
            setLoadingNote(test)
          )
          const customAddingNoteValue = designState.get('addingNote')
          expect(customAddingNoteValue).toBe(test)
        })
      })
    })
    describe('OPEN_NOTES', () => {
      describe('Set open notes value action', () => {
        it('Handles undefined value in openNotes', () => {
          const customInitialValue = initialState.get('openNotes')
          expect(customInitialValue).not.toBeUndefined()
        })
        it('Handles initial value in openNotes', () => {
          const customInitialValue = initialState.get('openNotes')
          expect(customInitialValue).toBeFalsy()
        })
        it('Handles custom values in addingNote', () => {
          const test = true
          const designState = designSearchAdminReducer(
            initialState,
            openNoteAction(test)
          )
          const customOpenNotes = designState.get('openNotes')
          expect(customOpenNotes).toBe(test)
        })
      })
    })
    describe('SET_PREFLIGHT', () => {
      describe('Set preflight check action', () => {
        it('Handles undefined value in order', () => {
          const customInitialValue = initialState.get('order')
          expect(customInitialValue).not.toBeUndefined()
        })
        it('Handles initial value in loadingPreflight', () => {
          const customInitialValue = initialState.get('loadingPreflight')
          expect(customInitialValue.size).toBeFalsy()
        })
        it('Handles custom values in order', () => {
          const checked = true
          const order = {
            code: 'Test'
          }
          const designState = designSearchAdminReducer(
            initialState,
            setOrderAction(order)
          )
          const orderState = designSearchAdminReducer(
            designState,
            setPreflightAction(checked)
          )
          const customOrderValue = orderState.getIn(['order', 'preflightCheck'])
          expect(customOrderValue).toBe(checked)
        })
      })
    })
    describe('SET_LOADING_PREFLIGHT', () => {
      describe('Set preflight loading action', () => {
        it('Handles undefined value in loadingPreflight', () => {
          const customInitialValue = initialState.get('loadingPreflight')
          expect(customInitialValue).not.toBeUndefined()
        })
        it('Handles initial value in loadingPreflight', () => {
          const customInitialValue = initialState.get('loadingPreflight')
          expect(customInitialValue.size).toBeFalsy()
        })
        it('Handles custom values in loadingPreflight', () => {
          const loading = true
          const designState = designSearchAdminReducer(
            initialState,
            setLoadingPreflight(loading)
          )
          const customOrderValue = designState.get('loadingPreflight')
          expect(customOrderValue).toBe(loading)
        })
      })
    })
  })
})
