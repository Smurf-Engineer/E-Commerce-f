/**
 * ProDesign Test - Created by eduardoquintero on 30/09/19.
 */

import proDesignReducer, { initialState } from './reducer'
import {
  onTabClickAction,
  setSearchProductAction,
  setProductCodeAction
} from './actions'
import { ON_TAB_CLICK, UPLOAD, COLOR } from './constants'

describe(' ProductCatalog Screen', () => {
  describe('Actions', () => {
    it('setSelectedFilters', () => {
      const type = ON_TAB_CLICK
      const selectedKey = 'color'

      expect(onTabClickAction(selectedKey)).toEqual({
        type,
        selectedKey
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
  })
})
