/**
 * ProductCatalog Test - Created by cazarez on 27/02/18.
 */
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import productCatalogReducer, { initialState } from './reducer'
import { defaultAction } from './actions'
import { ProductCatalog } from './index'

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
})
