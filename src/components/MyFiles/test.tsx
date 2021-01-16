/**
 * MyFiles Test - Created by Jesús Apodaca on 27/10/20.
 */

import myFilesReducer, { initialState } from './reducer'
import {
  hideDeleteImageConfirmAction,
  hideDeletePaletteConfirmAction,
  resetReducerDataAction,
  setDeleteLoadingAction,
  setPalettesAction,
  setUploadingAction,
  showDeleteImageConfirmAction,
  showDeletePaletteConfirmAction,
  uploadFileSuccessAction
} from './actions'
import {
  HIDE_DELETE_IMAGE_CONFIRM,
  HIDE_DELETE_PALETTE_CONFIRM,
  RESET_REDUCER_DATA,
  SET_DELETE_LOADING,
  SET_PALETTES_ACTION,
  SET_UPLOADING,
  SHOW_DELETE_IMAGE_CONFIRM,
  SHOW_DELETE_PALETTE_CONFIRM,
  UPLOAD_SUCCESS
} from './constants'

describe('My Files Screen', () => {
  describe('Actions', () => {
    it('onResetReducer', () => {
      const type = SET_PALETTES_ACTION
      const palettes = [{ name: 'Test', colors: ['test']}]
      expect(setPalettesAction(palettes)).toEqual({
        type,
        palettes
      })
    })
    it('showDeletePaletteConfirmAction', () => {
      const type = SHOW_DELETE_PALETTE_CONFIRM
      const index = 1
      expect(showDeletePaletteConfirmAction(index)).toEqual({
        type,
        index
      })
    })
    it('hideDeletePaletteConfirmAction', () => {
      const type = HIDE_DELETE_PALETTE_CONFIRM
      expect(hideDeletePaletteConfirmAction()).toEqual({
        type
      })
    })
    it('showDeleteImageConfirmAction', () => {
      const type = SHOW_DELETE_IMAGE_CONFIRM
      const id = 'Test'
      expect(showDeleteImageConfirmAction(id)).toEqual({
        type,
        id
      })
    })
    it('hideDeleteImageConfirmAction', () => {
      const type = HIDE_DELETE_IMAGE_CONFIRM
      expect(hideDeleteImageConfirmAction()).toEqual({
        type
      })
    })
    it('setDeleteLoadingAction', () => {
      const type = SET_DELETE_LOADING
      const loading = true
      expect(setDeleteLoadingAction(loading)).toEqual({
        type,
        loading
      })
    })
    it('resetReducerDataAction', () => {
      const type = RESET_REDUCER_DATA
      expect(resetReducerDataAction()).toEqual({
        type
      })
    })
    it('setUploadingAction', () => {
      const type = SET_UPLOADING
      const loading = true
      expect(setUploadingAction(loading)).toEqual({
        type,
        loading
      })
    })
    it('uploadFileSuccessAction', () => {
      const type = UPLOAD_SUCCESS
      const url = 'Test'
      expect(uploadFileSuccessAction(url)).toEqual({
        type,
        url
      })
    })
  })
  describe('Reducer', () => {
    describe('RESET_DATA', () => {
      it('Should not have initial state undefined', () => {
        expect(initialState.get('uploading')).toBeDefined()
      })
      it('Should be init with uploading', () => {
        const selectedKeyState = myFilesReducer(
          initialState,
          resetReducerDataAction()
        )
        expect(selectedKeyState.get('uploading')).toEqual(false)
      })
    })
    describe('SET_PALETTES_ACTION', () => {
      describe('Set palettes value action', () => {
        it('Handles undefined value in palettes', () => {
          const customInitialValue = initialState.get('palettes')
          expect(customInitialValue).not.toBeUndefined()
        })
        it('Handles initial value in palettes', () => {
          const customInitialValue = initialState.get('palettes')
          expect(customInitialValue.size).toBe(0)
        })
        it('Handles custom values in palettes', () => {
          const palettes = [{ name: 'Test', colors: ['test']}]
          const filesState = myFilesReducer(
            initialState,
            setPalettesAction(palettes)
          )
          const customPalettesValue = filesState.get('palettes')
          expect(customPalettesValue).toBe(palettes)
        })
      })
    })
    describe('SHOW_DELETE_PALETTE_CONFIRM', () => {
      describe('Set showDeleteModal value action', () => {
        it('Handles undefined value in showDeleteModal', () => {
          const customInitialValue = initialState.get('showDeleteModal')
          expect(customInitialValue).not.toBeUndefined()
        })
        it('Handles initial value in showDeleteModal', () => {
          const customInitialValue = initialState.get('showDeleteModal')
          expect(customInitialValue).toBeFalsy()
        })
        it('Handles custom values in showDeleteModal', () => {
          const index = 1
          const filesState = myFilesReducer(
            initialState,
            showDeletePaletteConfirmAction(index)
          )
          const customPalettesValue = filesState.get('indexPaletteToDelete')
          expect(customPalettesValue).toBe(index)
        })
      })
    })
    describe('HIDE_DELETE_PALETTE_CONFIRM', () => {
      describe('Set hideDeletePalette value action', () => {
        it('Handles undefined value in indexPaletteToDelete', () => {
          const customInitialValue = initialState.get('indexPaletteToDelete')
          expect(customInitialValue).not.toBeUndefined()
        })
        it('Handles initial value in indexPaletteToDelete', () => {
          const customInitialValue = initialState.get('indexPaletteToDelete')
          expect(customInitialValue).toBe(-1)
        })
        it('Handles custom values in indexPaletteToDelete', () => {
          const filesState = myFilesReducer(
            initialState,
            hideDeletePaletteConfirmAction()
          )
          const customPalettesValue = filesState.get('indexPaletteToDelete')
          expect(customPalettesValue).toBe(-1)
        })
      })
    })
    describe('SHOW_DELETE_IMAGE_CONFIRM', () => {
      describe('Set idImageToDelete value action', () => {
        it('Handles undefined value in idImageToDelete', () => {
          const customInitialValue = initialState.get('idImageToDelete')
          expect(customInitialValue).not.toBeUndefined()
        })
        it('Handles initial value in idImageToDelete', () => {
          const customInitialValue = initialState.get('idImageToDelete')
          expect(customInitialValue).toBe(-1)
        })
        it('Handles custom values in idImageToDelete', () => {
          const id = 'Test'
          const filesState = myFilesReducer(
            initialState,
            showDeleteImageConfirmAction(id)
          )
          const customIdValue = filesState.get('idImageToDelete')
          expect(customIdValue).toBe(id)
        })
      })
    })
    describe('HIDE_DELETE_IMAGE_CONFIRM', () => {
      describe('Set showDeleteModal value action', () => {
        it('Handles undefined value in showDeleteModal', () => {
          const customInitialValue = initialState.get('showDeleteModal')
          expect(customInitialValue).not.toBeUndefined()
        })
        it('Handles initial value in showDeleteModal', () => {
          const customInitialValue = initialState.get('showDeleteModal')
          expect(customInitialValue).toBeFalsy()
        })
        it('Handles custom values in showDeleteModal', () => {
          const filesState = myFilesReducer(
            initialState,
            hideDeleteImageConfirmAction()
          )
          const customIdValue = filesState.get('showDeleteModal')
          expect(customIdValue).toBeFalsy()
        })
      })
    })
    describe('SET_DELETE_LOADING', () => {
      describe('Set deleteLoading value action', () => {
        it('Handles undefined value in deleteLoading', () => {
          const customInitialValue = initialState.get('deleteLoading')
          expect(customInitialValue).not.toBeUndefined()
        })
        it('Handles initial value in deleteLoading', () => {
          const customInitialValue = initialState.get('deleteLoading')
          expect(customInitialValue).toBeFalsy()
        })
        it('Handles custom values in deleteLoading', () => {
          const loading = true
          const filesState = myFilesReducer(
            initialState,
            setDeleteLoadingAction(loading)
          )
          const customLoadingValue = filesState.get('deleteLoading')
          expect(customLoadingValue).toBe(loading)
        })
      })
    })
    describe('SET_UPLOADING', () => {
      describe('Set uploading value action', () => {
        it('Handles undefined value in uploading', () => {
          const customInitialValue = initialState.get('uploading')
          expect(customInitialValue).not.toBeUndefined()
        })
        it('Handles initial value in uploading', () => {
          const customInitialValue = initialState.get('uploading')
          expect(customInitialValue).toBeFalsy()
        })
        it('Handles custom values in uploading', () => {
          const loading = true
          const filesState = myFilesReducer(
            initialState,
            setUploadingAction(loading)
          )
          const customLoadingValue = filesState.get('uploading')
          expect(customLoadingValue).toBe(loading)
        })
      })
    })
    describe('UPLOAD_SUCCESS', () => {
      describe('Set uploading value action', () => {
        it('Handles undefined value in uploading', () => {
          const customInitialValue = initialState.get('uploading')
          expect(customInitialValue).not.toBeUndefined()
        })
        it('Handles initial value in uploading', () => {
          const customInitialValue = initialState.get('uploading')
          expect(customInitialValue).toBeFalsy()
        })
        it('Handles custom values in uploading', () => {
          const url = 'Test'
          const filesState = myFilesReducer(
            initialState,
            uploadFileSuccessAction(url)
          )
          const customLoadingValue = filesState.get('uploading')
          expect(customLoadingValue).toBeFalsy()
        })
      })
    })
  })
})
