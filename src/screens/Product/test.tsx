/**
 * Product Test - Created by cazarez on 09/03/18.
 */
import * as React from 'react'
import productReducer, { initialState } from './reducer'
import { defaultAction } from './actions'
import { Product } from './index'

describe(' Product Screen', () => {
  // Test redux actions
  it('Return the default state for unknow action', () => {
    let state = productReducer(initialState, { type: 'unknow' })
    expect(state).toEqual(initialState)
  })

  it('Update someKey correctly', () => {
    const testValue = 'Test value'
    const state = productReducer(initialState, defaultAction(testValue))
    const someKey = state.get('someKey')
    expect(someKey).toEqual(testValue)

    const testValue2 = 'Test value 2'
    const state2 = productReducer(initialState, defaultAction(testValue2))
    const someKey2 = state2.get('someKey')
    expect(someKey2).toEqual(testValue2)
  })
})
