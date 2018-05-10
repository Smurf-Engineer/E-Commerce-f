/**
 * ShoppingCartPage Test - Created by gustavomedina on 02/05/18.
 */
import shoppingCartPageReducer, { initialState } from './reducer'
import { defaultAction } from './actions'

describe(' ShoppingCartPage Screen', () => {
  // Test redux actions
  it('Return the default state for unknow action', () => {
    let state = shoppingCartPageReducer(initialState, { type: 'unknow' })
    expect(state).toEqual(initialState)
  })

  it('Update someKey correctly', () => {
    const testValue = 'Test value'
    const state = shoppingCartPageReducer(
      initialState,
      defaultAction(testValue)
    )
    const someKey = state.get('someKey')
    expect(someKey).toEqual(testValue)

    const testValue2 = 'Test value 2'
    const state2 = shoppingCartPageReducer(
      initialState,
      defaultAction(testValue2)
    )
    const someKey2 = state2.get('someKey')
    expect(someKey2).toEqual(testValue2)
  })
})
