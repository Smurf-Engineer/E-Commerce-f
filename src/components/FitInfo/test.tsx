/**
 * FitInfo Test - Created by gustavomedina on 08/03/18.
 */
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import fitInfoReducer, { initialState } from './reducer'
import { defaultAction } from './actions'
import FitInfo from './index'

describe('<FitInfo />', () => {
  it('Return the default state for unknow action', () => {
    let state = fitInfoReducer(initialState, { type: 'unknow' })
    expect(state).toEqual(initialState)
  })

  // Test redux actions
  it('Update someKey correctly', () => {
    const testValue = 'Test value'
    const state = fitInfoReducer(initialState, defaultAction(testValue))
    const someKey = state.get('someKey')
    expect(someKey).toEqual(testValue)

    const testValue2 = 'Test value 2'
    const state2 = fitInfoReducer(initialState, defaultAction(testValue2))
    const someKey2 = state2.get('someKey')
    expect(someKey2).toEqual(testValue2)
  })
})
