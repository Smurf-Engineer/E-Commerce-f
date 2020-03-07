/**
 * DesignSearch Test - Created by Jesús Apodaca on 06/03/20.
 */

import designToolsReducer, { initialState } from './reducer'
import {
  resetDataAction,
  setLoadingAction,
  setNoteAction,
  setLoadingNote,
  openNoteAction
} from './actions'
import {
  RESET_DATA,
  SET_NOTE,
  SET_LOADING,
  SET_LOADING_NOTE,
  OPEN_NOTES
} from './constants'

describe(' ProductCatalog Screen', () => {
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
    it('setLoadingNote', () => {
      const type = SET_LOADING_NOTE
      const loading = true
      expect(setLoadingNote(loading)).toEqual({
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
        const selectedKeyState = designToolsReducer(
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
          const designState = designToolsReducer(
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
          const designState = designToolsReducer(
            initialState,
            setNoteAction(text)
          )
          const customTextValue = designState.get('note')
          expect(customTextValue).toBe(text)
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
          const designState = designToolsReducer(
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
          const designState = designToolsReducer(
            initialState,
            openNoteAction(test)
          )
          const customOpenNotes = designState.get('openNotes')
          expect(customOpenNotes).toBe(test)
        })
      })
    })
  })
})
