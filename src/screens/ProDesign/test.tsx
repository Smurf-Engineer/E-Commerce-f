/**
 * ProDesign Test - Created by eduardoquintero on 30/09/19.
 */

import proDesignReducer, { initialState } from './reducer'
import {
  onTabClickAction,
  setProductToSearchAction,
  setProductCodeAction
} from './actions'
import {
  ON_TAB_CLICK,
  UPLOAD,
  COLOR,
  SET_PRODUCT_TO_SEARCH,
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
    it('setProductToSearchAction', () => {
      const type = SET_PRODUCT_TO_SEARCH
      const value = 'velo'

      expect(setProductToSearchAction(value)).toEqual({
        type,
        value
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
    describe('SET_PRODUCT_TO_SEARCH', () => {
      it('Should not have initial state undefined', () => {
        expect(initialState.get('productToSearch')).not.toBeUndefined()
      })
      it('Handle value type of productToSearch', () => {
        expect(typeof initialState.get('selectedKey')).toEqual('string')
      })
      it('Handle custom value for productToSearch', () => {
        const value = 'velo'
        const customValueState = proDesignReducer(
          initialState,
          setProductToSearchAction(value)
        )
        expect(customValueState.get('productToSearch')).toEqual(value)
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
  })
})
