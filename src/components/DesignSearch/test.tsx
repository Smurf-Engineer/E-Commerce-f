/**
 * DesignSearch Test - Created by miguelcanobbio on 15/08/18.
 */
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import designSearchReducer, { initialState } from './reducer'
import { defaultAction } from './actions'
import { DesignSearchAdmin } from './index'

describe(' DesignSearch Screen', () => {
  it('renders without exploding', () => {
    const div = document.createElement('div')
    // tslint:disable-next-line:no-empty
    ReactDOM.render(<DesignSearchAdmin />, div)
  })
  // Test redux actions
  it('Return the default state for unknow action', () => {
    let state = designSearchReducer(initialState, { type: 'unknow' })
    expect(state).toEqual(initialState)
  })

  it('Update someKey correctly', () => {
    const testValue = 'Test value'
    const state = designSearchReducer(initialState, defaultAction(testValue))
    const someKey = state.get('someKey')
    expect(someKey).toEqual(testValue)

    const testValue2 = 'Test value 2'
    const state2 = designSearchReducer(initialState, defaultAction(testValue2))
    const someKey2 = state2.get('someKey')
    expect(someKey2).toEqual(testValue2)
  })
})
