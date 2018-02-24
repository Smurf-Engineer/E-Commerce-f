/**
 * DesignCenter Test - Created by david on 23/02/18.
 */
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import designCenterReducer, { initialState } from './reducer'
import { defaultAction } from './actions'
import { DesignCenter } from './index'

describe(' DesignCenter Screen', () => {
  // Test redux actions
  it('Return the default state for unknow action', () => {
    let state = designCenterReducer(initialState, { type: 'unknow' })
    expect(state).toEqual(initialState)
  })

  it('Update someKey correctly', () => {
    const testValue = 'Test value'
    const state = designCenterReducer(initialState, defaultAction(testValue))
    const someKey = state.get('someKey')
    expect(someKey).toEqual(testValue)

    const testValue2 = 'Test value 2'
    const state2 = designCenterReducer(initialState, defaultAction(testValue2))
    const someKey2 = state2.get('someKey')
    expect(someKey2).toEqual(testValue2)
  })
})
