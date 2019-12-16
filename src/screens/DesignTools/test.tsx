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
  hideSymbol,
  setUploadingSymbolAction,
  onTabClick,
  setSearchClipParamAction,
  setColorList,
  setUploadingColorsAction
} from './actions'
import {
  ADD_FONT_ACTION,
  ON_RESET_REDUCER,
  SET_GOOGLE_FONTS,
  CHANGE_FONT_ACTION,
  SET_UPLOADING_ACTION,
  UPDATE_SEARCH_TEXT_ACTION,
  ADD_SYMBOL_ACTION,
  HIDE_SYMBOL_ACTION,
  UPLOADING_SYMBOL_ACTION,
  ON_TAB_CLICK_ACTION,
  CustomizeTabs,
  SET_SEARCH_CLIPARTPARAM,
  SET_COLORS,
  SET_UPLOADING_COLORS_ACTION
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
      const data = { items: [{ family: 'Test' }] }
      expect(setGoogleFontsListAction(data)).toEqual({
        type,
        data
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
      const text = 'Test'
      expect(onUpdateSearchText(text)).toEqual({
        type,
        text
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
    it('setUploadingSymbolAction', () => {
      const type = UPLOADING_SYMBOL_ACTION
      const isLoading = true
      expect(setUploadingSymbolAction(isLoading)).toEqual({
        type,
        isLoading
      })
    })
    it('onTabClick', () => {
      const type = ON_TAB_CLICK_ACTION
      const selectedIndex = CustomizeTabs.ColorTab
      expect(onTabClick(selectedIndex)).toEqual({
        type,
        selectedIndex
      })
    })
    it('setSearchClipParamAction', () => {
      const type = SET_SEARCH_CLIPARTPARAM
      const param = 'Test'
      expect(setSearchClipParamAction(param)).toEqual({
        type,
        param
      })
    })
    it('setColorList', () => {
      const type = SET_COLORS
      const listType = 'colors'
      const colors = [
        {
          name: 'Test',
          value: 'Color'
        }
      ]
      expect(setColorList(listType, colors)).toEqual({
        type,
        listType,
        colors
      })
    })
    it('setUploadingColorsAction', () => {
      const type = SET_UPLOADING_COLORS_ACTION
      const listType = 'colors'
      const isUploading = true
      expect(setUploadingColorsAction(listType, isUploading)).toEqual({
        type,
        listType,
        isUploading
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
          const customValue = { items: [{ family: 'Test' }] }
          const designState = designToolsReducer(
            initialState,
            setGoogleFontsListAction(customValue)
          )
          const customFontsValue = designState.get('fonts')
          expect(customFontsValue.size).toBe(1)
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
            addSymbolAction(customValue)
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
    describe('UPLOADING_SYMBOL_ACTION', () => {
      describe('Update symbol loading action', () => {
        it('Handles undefined value in uploadingSymbol', () => {
          const customInitialValue = initialState.get('uploadingSymbol')
          expect(customInitialValue).not.toBeUndefined()
        })
        it('Handles initial value in uploadingSymbol', () => {
          const customInitialValue = initialState.get('uploadingSymbol')
          expect(customInitialValue).toBeFalsy()
        })
        it('Handles custom values in uploadingSymbol', () => {
          const isLoading = true
          const designState = designToolsReducer(
            initialState,
            setUploadingSymbolAction(isLoading)
          )
          const customSymbolLoading = designState.get('uploadingSymbol')
          expect(customSymbolLoading).toBeTruthy()
        })
      })
    })
    describe('ON_TAB_CLICK_ACTION', () => {
      describe('Update tab index action', () => {
        it('Handles undefined value in selectedTab', () => {
          const customInitialValue = initialState.get('selectedTab')
          expect(customInitialValue).not.toBeUndefined()
        })
        it('Handles initial value in selectedTab', () => {
          const customInitialValue = initialState.get('selectedTab')
          expect(customInitialValue).toBe(CustomizeTabs.ColorTab)
        })
        it('Handles custom values in selectedTab', () => {
          const selectedIndex = CustomizeTabs.SymbolTab
          const designState = designToolsReducer(
            initialState,
            onTabClick(selectedIndex)
          )
          const customTabIndex = designState.get('selectedTab')
          expect(customTabIndex).toBe(CustomizeTabs.SymbolTab)
        })
      })
    })
    describe('SET_SEARCH_CLIPARTPARAM', () => {
      describe('Update search clip param action', () => {
        it('Handles undefined value in searchClipParam', () => {
          const customInitialValue = initialState.get('searchClipParam')
          expect(customInitialValue).not.toBeUndefined()
        })
        it('Handles initial value in searchClipParam', () => {
          const customInitialValue = initialState.get('searchClipParam')
          expect(customInitialValue).toBe('')
        })
        it('Handles custom values in searchClipParam', () => {
          const searchParam = 'Test'
          const designState = designToolsReducer(
            initialState,
            setSearchClipParamAction(searchParam)
          )
          const customSearchParam = designState.get('searchClipParam')
          expect(customSearchParam).toBe(searchParam)
        })
      })
    })
    describe('SET_COLORS', () => {
      describe('Update colors list action', () => {
        it('Handles undefined value in colors', () => {
          const customInitialValue = initialState.get('colors')
          expect(customInitialValue).not.toBeUndefined()
        })
        it('Handles initial value in colors', () => {
          const customInitialValue = initialState.get('colors')
          expect(customInitialValue.size).toBe(0)
        })
        it('Handles custom values in colors', () => {
          const listType = 'colors'
          const colors = [
            {
              name: 'Test',
              value: 'Color'
            }
          ]
          const designState = designToolsReducer(
            initialState,
            setColorList(listType, colors)
          )
          const customColorsValue = designState.get('colors')
          expect(customColorsValue.size).toBe(1)
        })
      })
      describe('Update stitchingColors list action', () => {
        it('Handles undefined value in stitchingColors', () => {
          const customInitialValue = initialState.get('stitchingColors')
          expect(customInitialValue).not.toBeUndefined()
        })
        it('Handles initial value in stitchingColors', () => {
          const customInitialValue = initialState.get('stitchingColors')
          expect(customInitialValue.size).toBe(0)
        })
        it('Handles custom values in stitchingColors', () => {
          const listType = 'stitchingColors'
          const stitchingColors = [
            {
              name: 'Test',
              value: 'Color'
            }
          ]
          const designState = designToolsReducer(
            initialState,
            setColorList(listType, stitchingColors)
          )
          const customStitchingColors = designState.get('stitchingColors')
          expect(customStitchingColors.size).toBe(1)
        })
      })
    })
    describe('SET_UPLOADING_COLORS_ACTION', () => {
      describe('Update color list uploading action', () => {
        it('Handles undefined value in uploadingColors', () => {
          const customInitialValue = initialState.get('uploadingColors')
          expect(customInitialValue).not.toBeUndefined()
        })
        it('Handles initial value in uploadingColors', () => {
          const customInitialValue = initialState.get('uploadingColors')
          expect(customInitialValue).toBeFalsy()
        })
        it('Handles custom values in uploadingColors', () => {
          const listType = 'colors'
          const isUploading = true
          const designState = designToolsReducer(
            initialState,
            setUploadingColorsAction(listType, isUploading)
          )
          const customUploadingValue = designState.get('uploadingColors')
          expect(customUploadingValue).toBe(isUploading)
        })
      })
      describe('Update stitchingColor list uploading action', () => {
        it('Handles undefined value in uploadingStitchingColors', () => {
          const customInitialValue = initialState.get(
            'uploadingStitchingColors'
          )
          expect(customInitialValue).not.toBeUndefined()
        })
        it('Handles initial value in uploadingStitchingColors', () => {
          const customInitialValue = initialState.get(
            'uploadingStitchingColors'
          )
          expect(customInitialValue).toBeFalsy()
        })
        it('Handles custom values in uploadingStitchingColors', () => {
          const listType = 'stitchingColors'
          const isUploading = true
          const designState = designToolsReducer(
            initialState,
            setUploadingColorsAction(listType, isUploading)
          )
          const customUploadingValue = designState.get(
            'uploadingStitchingColors'
          )
          expect(customUploadingValue).toBe(isUploading)
        })
      })
    })
  })
})
