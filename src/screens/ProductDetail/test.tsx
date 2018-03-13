/**
 * ProductDetail Test - Created by cazarez on 12/03/18.
 */
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import productDetailReducer, { initialState } from './reducer'
import { defaultAction } from './actions'
import { ProductDetail } from './index'

describe(' ProductDetail Screen', () => {
  // Test redux actions
  it('Return the default state for unknow action', () => {
    let state = productDetailReducer(initialState, { type: 'unknow' })
    expect(state).toEqual(initialState)
  })

  it('Update someKey correctly', () => {
    const testValue = 'Test value'
    const state = productDetailReducer(initialState, defaultAction(testValue))
    const someKey = state.get('someKey')
    expect(someKey).toEqual(testValue)

    const testValue2 = 'Test value 2'
    const state2 = productDetailReducer(initialState, defaultAction(testValue2))
    const someKey2 = state2.get('someKey')
    expect(someKey2).toEqual(testValue2)
  })
})
