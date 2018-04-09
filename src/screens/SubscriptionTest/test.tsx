/**
 * SubscriptionTest Test - Created by david on 05/04/18.
 */
import subscriptionTestReducer, { initialState } from './reducer'
import { defaultAction } from './actions'

describe(' SubscriptionTest Screen', () => {
  // Test redux actions
  it('Return the default state for unknow action', () => {
    let state = subscriptionTestReducer(initialState, { type: 'unknow' })
    expect(state).toEqual(initialState)
  })

  it('Update someKey correctly', () => {
    const testValue = 'Test value'
    const state = subscriptionTestReducer(
      initialState,
      defaultAction(testValue)
    )
    const someKey = state.get('someKey')
    expect(someKey).toEqual(testValue)

    const testValue2 = 'Test value 2'
    const state2 = subscriptionTestReducer(
      initialState,
      defaultAction(testValue2)
    )
    const someKey2 = state2.get('someKey')
    expect(someKey2).toEqual(testValue2)
  })
})
