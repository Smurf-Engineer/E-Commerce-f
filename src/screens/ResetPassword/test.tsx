/**
 * ResetPassword Test - Created by gustavomedina on 05/03/18.
 */
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import resetReducer, { initialState } from './reducer'
import { defaultAction } from './actions'
import { ResetPassword } from './index'

describe('Reset Reducer', () => {
  it('Return the default state for unknow action', () => {
    let state = resetReducer(initialState, { type: 'unknow' })
    expect(state).toEqual(initialState)
  })

  // Test redux actions
  it('Update someKey correctly', () => {
    const testValue = 'Test value'
    const state = resetReducer(initialState, defaultAction(testValue))
    const someKey = state.get('someKey')
    expect(someKey).toEqual(testValue)

    const testValue2 = 'Test value 2'
    const state2 = resetReducer(initialState, defaultAction(testValue2))
    const someKey2 = state2.get('someKey')
    expect(someKey2).toEqual(testValue2)
  })
})
