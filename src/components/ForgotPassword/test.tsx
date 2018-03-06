/**
 * ForgotPassword Test - Created by cazarez on 20/02/18.
 */
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import forgotReducer, { initialState } from './reducer'
import { defaultAction } from './actions'
import ForgotPassword from './index'

describe('Forgot Reducer', () => {
  it('Return the default state for unknow action', () => {
    let state = forgotReducer(initialState, { type: 'unknow' })
    expect(state).toEqual(initialState)
  })

  // Test redux actions
  it('Update someKey correctly', () => {
    const testValue = 'Test value'
    const state = forgotReducer(initialState, defaultAction(testValue))
    const someKey = state.get('someKey')
    expect(someKey).toEqual(testValue)

    const testValue2 = 'Test value 2'
    const state2 = forgotReducer(initialState, defaultAction(testValue2))
    const someKey2 = state2.get('someKey')
    expect(someKey2).toEqual(testValue2)
  })
})
