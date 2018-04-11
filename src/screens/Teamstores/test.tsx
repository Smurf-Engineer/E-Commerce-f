/**
 * Teamstores Test - Created by cazarez on 10/04/18.
 */
import teamstoresReducer, { initialState } from './reducer'
import { defaultAction } from './actions'
import { Teamstores } from './index'

describe(' Teamstores Screen', () => {
  // Test redux actions
  it('Return the default state for unknow action', () => {
    let state = teamstoresReducer(initialState, { type: 'unknow' })
    expect(state).toEqual(initialState)
  })

  it('Update someKey correctly', () => {
    const testValue = 'Test value'
    const state = teamstoresReducer(initialState, defaultAction(testValue))
    const someKey = state.get('someKey')
    expect(someKey).toEqual(testValue)

    const testValue2 = 'Test value 2'
    const state2 = teamstoresReducer(initialState, defaultAction(testValue2))
    const someKey2 = state2.get('someKey')
    expect(someKey2).toEqual(testValue2)
  })
})
