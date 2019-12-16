/**
 * DesignTools Test - Created by Jesús Apodaca on 30/09/19.
 */

import designToolsReducer, { initialState } from './reducer'
import {
  onResetReducer,
  onUpdateSearchText,
  setGoogleFontsListAction,
  setUploadingAction,
  changeFont,
  addFont,
  addSymbolAction,
  hideSymbol
} from './actions'
import {
  ADD_FONT_ACTION,
  ON_RESET_REDUCER,
  SET_GOOGLE_FONTS,
  CHANGE_FONT_ACTION,
  SET_UPLOADING_ACTION,
  UPDATE_SEARCH_TEXT_ACTION,
  ADD_SYMBOL_ACTION,
  HIDE_SYMBOL_ACTION
} from './constants'

describe(' ProductCatalog Screen', () => {
  describe('Actions', () => {
    it('onResetReducer', () => {
      const type = ON_RESET_REDUCER
      expect(onResetReducer()).toEqual({
        type
      })
    })
    it('setGoogleFontsListAction', () => {
      const type = SET_GOOGLE_FONTS
      const customValue = [{ family: 'Test' }]
      expect(setGoogleFontsListAction(customValue)).toEqual({
        type
      })
    })
    it('changeFont', () => {
      const type = CHANGE_FONT_ACTION
      const font = 'Test'
      const active = true
      expect(changeFont(font, active)).toEqual({
        type,
        font,
        active
      })
    })
    it('onUpdateSearchText', () => {
      const type = UPDATE_SEARCH_TEXT_ACTION
      const search = 'Test'
      expect(onUpdateSearchText(search)).toEqual({
        type,
        search
      })
    })
    it('setUploadingAction', () => {
      const type = SET_UPLOADING_ACTION
      const isLoading = true
      expect(setUploadingAction(isLoading)).toEqual({
        type,
        isLoading
      })
    })
    it('addFontAction', () => {
      const type = ADD_FONT_ACTION
      const font = 'Test'
      expect(addFont(font)).toEqual({
        type,
        font
      })
    })
    it('addSymbolAction', () => {
      const type = ADD_SYMBOL_ACTION
      const url = 'Test'
      expect(addSymbolAction(url)).toEqual({
        type,
        url
      })
    })
    it('hideSymbol', () => {
      const type = HIDE_SYMBOL_ACTION
      const url = 'Test'
      const id = 'SYM1'
      expect(hideSymbol(url, id)).toEqual({
        type,
        url,
        id
      })
    })
  })

  describe('Reducer', () => {
    describe('ON_RESET_REDUCER', () => {
      it('Should not have initial state undefined', () => {
        expect(initialState.get('loading')).toBeDefined()
      })
      it('Should be init with loading', () => {
        const selectedKeyState = designToolsReducer(
          initialState,
          onResetReducer()
        )
        expect(selectedKeyState.get('loading')).toEqual(false)
      })
    })
    describe('SET_GOOGLE_FONTS', () => {
      describe('Google fonts reponse', () => {
        it('Handles undefined value in fonts', () => {
          const customInitialValue = initialState.get('fonts')
          expect(customInitialValue).not.toBeUndefined()
        })
        it('Handles initial value in fonts', () => {
          const customInitialValue = initialState.get('fonts')
          expect(customInitialValue.size).toBe(0)
        })
        it('Handles custom values in fonts', () => {
          const customValue = [{ family: 'Test' }]
          const designState = designToolsReducer(
            initialState,
            setGoogleFontsListAction(customValue)
          )
          const customFontsValue = designState.getIn(['fonts', 0])
          expect(customFontsValue).toBe(customValue[0].family)
        })
      })
    })
    describe('CHANGE_FONT_ACTION', () => {
      describe('Change fonts action', () => {
        it('Handles undefined value in selectedFonts', () => {
          const customInitialValue = initialState.get('selectedFonts')
          expect(customInitialValue).not.toBeUndefined()
        })
        it('Handles initial value in selectedFonts', () => {
          const customInitialValue = initialState.get('selectedFonts')
          expect(customInitialValue.size).toBe(0)
        })
        it('Handles custom values in selectedFonts', () => {
          const customValue = 'Test'
          const designState = designToolsReducer(
            initialState,
            changeFont(customValue, true)
          )
          const customSelectedValue = designState.getIn([
            'selectedFonts',
            customValue
          ])
          expect(customSelectedValue).toBeTruthy()
        })
      })
    })
    describe('UPDATE_SEARCH_TEXT_ACTION', () => {
      describe('Update search text action', () => {
        it('Handles undefined value in searchText', () => {
          const customInitialValue = initialState.get('searchText')
          expect(customInitialValue).not.toBeUndefined()
        })
        it('Handles initial value in searchText', () => {
          const customInitialValue = initialState.get('searchText')
          expect(customInitialValue).toBe('')
        })
        it('Handles custom values in searchText', () => {
          const customValue = 'Test'
          const designState = designToolsReducer(
            initialState,
            onUpdateSearchText(customValue)
          )
          const customSearchValue = designState.get('searchText')
          expect(customSearchValue).toBe(customValue)
        })
      })
    })
    describe('SET_UPLOADING_ACTION', () => {
      describe('Update loading action', () => {
        it('Handles undefined value in loading', () => {
          const customInitialValue = initialState.get('loading')
          expect(customInitialValue).not.toBeUndefined()
        })
        it('Handles initial value in loading', () => {
          const customInitialValue = initialState.get('loading')
          expect(customInitialValue).toBeFalsy()
        })
        it('Handles custom values in loading', () => {
          const customValue = true
          const designState = designToolsReducer(
            initialState,
            setUploadingAction(customValue)
          )
          const customLoadingValue = designState.get('loading')
          expect(customLoadingValue).toBeTruthy()
        })
      })
    })
    describe('ADD_FONT_ACTION', () => {
      describe('Update visible fonts action', () => {
        it('Handles undefined value in visibleFonts', () => {
          const customInitialValue = initialState.get('visibleFonts')
          expect(customInitialValue).not.toBeUndefined()
        })
        it('Handles initial value in visibleFonts', () => {
          const customInitialValue = initialState.get('visibleFonts')
          expect(customInitialValue.size).toBe(0)
        })
        it('Handles custom values in visibleFonts', () => {
          const customValue = 'Test'
          const designState = designToolsReducer(
            initialState,
            addFont(customValue)
          )
          const customVisibleValues = designState.get('visibleFonts')
          expect(customVisibleValues.size).toBe(1)
        })
      })
    })
    describe('ADD_SYMBOL_ACTION', () => {
      describe('Update symbols action', () => {
        it('Handles undefined value in symbols', () => {
          const customInitialValue = initialState.get('symbols')
          expect(customInitialValue).not.toBeUndefined()
        })
        it('Handles initial value in symbols', () => {
          const customInitialValue = initialState.get('symbols')
          expect(customInitialValue.size).toBe(0)
        })
        it('Handles custom values in symbols', () => {
          const customValue = 'Test'
          const designState = designToolsReducer(
            initialState,
            addFont(customValue)
          )
          const customSymbolsValue = designState.get('symbols')
          expect(customSymbolsValue.size).toBe(1)
        })
      })
    })
    describe('HIDE_SYMBOL_ACTION', () => {
      describe('Update hiddenSymbols action', () => {
        it('Handles undefined value in hiddenSymbols', () => {
          const customInitialValue = initialState.get('hiddenSymbols')
          expect(customInitialValue).not.toBeUndefined()
        })
        it('Handles initial value in hiddenSymbols', () => {
          const customInitialValue = initialState.get('hiddenSymbols')
          expect(customInitialValue.size).toBe(0)
        })
        it('Handles custom values in hiddenSymbols', () => {
          const customValue = 'Test'
          const id = 'SYM1'
          const designState = designToolsReducer(
            initialState,
            hideSymbol(customValue, id)
          )
          const customSymbolsValue = designState.get('hiddenSymbols')
          expect(customSymbolsValue.size).toBe(1)
        })
      })
    })
  })
})
