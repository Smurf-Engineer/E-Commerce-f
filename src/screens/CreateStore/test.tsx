/**
 * CreateStore Test - Created by david on 09/04/18.
 */
import createStoreReducer, { initialState } from './reducer'
import { defaultAction } from './actions'

describe(' CreateStore Screen', () => {
  // Test redux actions
  it('Return the default state for unknow action', () => {
    let state = createStoreReducer(initialState, { type: 'unknow' })
    expect(state).toEqual(initialState)
  })

  it('Update someKey correctly', () => {
    const testValue = 'Test value'
    const state = createStoreReducer(initialState, defaultAction(testValue))
    const someKey = state.get('someKey')
    expect(someKey).toEqual(undefined)

    const testValue2 = 'Test value 2'
    const state2 = createStoreReducer(initialState, defaultAction(testValue2))
    const someKey2 = state2.get('someKey')
    expect(someKey2).toEqual(undefined)
  })
})
