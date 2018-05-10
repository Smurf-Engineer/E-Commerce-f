/**
 * Checkout Test - Created by cazarez on 05/05/18.
 */
import checkoutReducer, { initialState } from './reducer'
import { defaultAction } from './actions'

describe(' Checkout Screen', () => {
  // Test redux actions
  it('Return the default state for unknow action', () => {
    let state = checkoutReducer(initialState, { type: 'unknow' })
    expect(state).toEqual(initialState)
  })

  it('Update someKey correctly', () => {
    const testValue = 'Test value'
    const state = checkoutReducer(initialState, defaultAction(testValue))
    const someKey = state.get('someKey')
    expect(someKey).toEqual(testValue)

    const testValue2 = 'Test value 2'
    const state2 = checkoutReducer(initialState, defaultAction(testValue2))
    const someKey2 = state2.get('someKey')
    expect(someKey2).toEqual(testValue2)
  })
})
