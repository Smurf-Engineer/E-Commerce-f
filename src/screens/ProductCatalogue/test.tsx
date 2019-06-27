/**
 * ProductCatalog Test - Created by cazarez on 27/02/18.
 */

import productCatalogReducer, { initialState } from './reducer'
import { defaultAction, sortBySelected } from './actions'

describe(' ProductCatalog Screen', () => {
  // Test redux actions
  it('Return the default state for unknow action', () => {
    let state = productCatalogReducer(initialState, { type: 'unknow' })
    expect(state).toEqual(initialState)
  })

  it('Update someKey correctly', () => {
    const testValue = 'Test value'
    const state = productCatalogReducer(initialState, defaultAction(testValue))
    const someKey = state.get('someKey')
    expect(someKey).toEqual(testValue)

    const testValue2 = 'Test value 2'
    const state2 = productCatalogReducer(
      initialState,
      defaultAction(testValue2)
    )
    const someKey2 = state2.get('someKey')
    expect(someKey2).toEqual(testValue2)
  })

  describe('Test ORDERBY_SELECTED action', () => {
    it('Handles empty string value', () => {
      const orderBy = ''
      const orderByState = productCatalogReducer(
        initialState,
        sortBySelected(orderBy)
      )
      const orderByValue = orderByState.get('orderBy')
      expect(orderByValue).toEqual(orderBy)
    })

    it('Handle Top Seller Value', () => {
      const orderBy = 'topSeller'
      const orderByState = productCatalogReducer(
        initialState,
        sortBySelected(orderBy)
      )
      const orderByValue = orderByState.get('orderBy')
      expect(orderByValue).toEqual(orderBy)
    })

    it('Handle Lowest Price value', () => {
      const orderBy = 'pricelow'
      const orderByState = productCatalogReducer(
        initialState,
        sortBySelected(orderBy)
      )
      const orderByValue = orderByState.get('orderBy')
      expect(orderByValue).toEqual(orderBy)
    })

    it('Handles Highest Price value', () => {
      const orderBy = 'pricehigh'
      const orderByState = productCatalogReducer(
        initialState,
        sortBySelected(orderBy)
      )
      const orderByValue = orderByState.get('orderBy')
      expect(orderByValue).toEqual(orderBy)
    })
  })
})
