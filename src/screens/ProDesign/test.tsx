/**
 * ProDesign Test - Created by eduardoquintero on 30/09/19.
 */

import proDesignReducer, { initialState } from './reducer'
import {
  onTabClickAction,
  setSearchProductAction,
  setProductCodeAction,
  setUploadingAction
} from './actions'
import {
  ON_TAB_CLICK,
  UPLOAD,
  COLOR,
  SET_SEARCH_PRODUCT,
  SET_PRODUCT_CODE
} from './constants'

describe(' ProductCatalog Screen', () => {
  describe('Actions', () => {
    it('onTabClickAction', () => {
      const type = ON_TAB_CLICK
      const selectedKey = 'color'

      expect(onTabClickAction(selectedKey)).toEqual({
        type,
        selectedKey
      })
    })
    it('setSearchProductAction', () => {
      const type = SET_SEARCH_PRODUCT
      const products = [{ name: 'Name', code: '4040' }]

      expect(setSearchProductAction(products)).toEqual({
        type,
        products
      })
    })
    it('setProductCodeAction', () => {
      const type = SET_PRODUCT_CODE
      const productCode = '005'

      expect(setProductCodeAction(productCode)).toEqual({
        type,
        productCode
      })
    })
  })

  describe('Reducer', () => {
    describe('ON_TAB_CLICK', () => {
      it('Should not have initial state undefined', () => {
        expect(initialState.get('selectedKey')).toBeDefined()
      })
      it('Should be init with UPLOAD tab key', () => {
        expect(initialState.get('selectedKey')).toEqual(UPLOAD)
      })
      it('Should be init with UPLOAD tab key', () => {
        const selectedKeyState = proDesignReducer(
          initialState,
          onTabClickAction(COLOR)
        )
        expect(selectedKeyState.get('selectedKey')).toEqual(COLOR)
      })
    })
    describe('SET_SEARCH_PRODUCT', () => {
      it('Should not have initial state undefined', () => {
        expect(initialState.get('productSearchResults')).toBeDefined()
      })
      it('productSearchResults shouldn´t have length on init', () => {
        expect(initialState.get('productSearchResults').size).toEqual(0)
      })
      it('Handles custom values in productSearchResults', () => {
        const searchResults = [{ name: 'Name', code: '4040' }]
        const selectedKeyState = proDesignReducer(
          initialState,
          setSearchProductAction(searchResults)
        )
        expect(selectedKeyState.get('productSearchResults').size).toEqual(1)
      })
    })
    describe('SET_PRODUCT_CODE', () => {
      it('Should have empty value on init', () => {
        expect(initialState.get('productCode')).not.toBeUndefined()
      })
      it('Handles value type in productCode', () => {
        const customInitialValue = initialState.get('productCode')
        expect(typeof customInitialValue).toBe('string')
      })
      it('Handles custom value type in productCode', () => {
        const customValue = '005'
        const customValueState = proDesignReducer(
          initialState,
          setProductCodeAction(customValue)
        )
        expect(customValueState.get('productCode')).toEqual(customValue)
      })
    })
    describe('SET_UPLOADING_FILE_ACTION', () => {
      it('Should have empty value on init', () => {
        expect(initialState.get('uploadingFile')).not.toBeUndefined()
      })
      it('Should be false on init', () => {
        expect(initialState.get('uploadingFile')).toBeFalsy()
      })
      it('Handles value type in uploadingFile', () => {
        const customInitialValue = initialState.get('uploadingFile')
        expect(typeof customInitialValue).toBe('boolean')
      })
      it('Handles custom value type in uploadingFile', () => {
        const customValue = true
        const customValueState = proDesignReducer(
          initialState,
          setUploadingAction(customValue)
        )
        expect(customValueState.get('uploadingFile')).toBeTruthy()
      })
    })
  })
})
