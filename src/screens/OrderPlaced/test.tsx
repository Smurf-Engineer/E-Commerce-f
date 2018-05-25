/**
 * OrderPlaced Test - Created by cazarez on 22/05/18.
 */
import orderPlacedReducer, { initialState } from './reducer'
import { defaultAction } from './actions'

describe(' OrderPlaced Screen', () => {
  // Test redux actions
  it('Return the default state for unknow action', () => {
    let state = orderPlacedReducer(initialState, { type: 'unknow' })
    expect(state).toEqual(initialState)
  })

  it('Update someKey correctly', () => {
    const testValue = 'Test value'
    const state = orderPlacedReducer(initialState, defaultAction(testValue))
    const someKey = state.get('someKey')
    expect(someKey).toEqual(testValue)

    const testValue2 = 'Test value 2'
    const state2 = orderPlacedReducer(initialState, defaultAction(testValue2))
    const someKey2 = state2.get('someKey')
    expect(someKey2).toEqual(testValue2)
  })
})
