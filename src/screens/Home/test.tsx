import homeReducer, { initialState } from './reducer'
import { defaultAction } from './actions'

describe('Home Reducer', () => {
  it('Return the default state for unknow action', () => {
    let state = homeReducer(initialState, { type: 'unknow' })
    expect(state).toEqual(initialState)
  })

  // Test redux actions
  it('Update someKey correctly', () => {
    const testValue = 'Test value'
    const state = homeReducer(initialState, defaultAction(testValue))
    const someKey = state.get('someKey')
    expect(someKey).toEqual(testValue)

    const testValue2 = 'Test value 2'
    const state2 = homeReducer(initialState, defaultAction(testValue2))
    const someKey2 = state2.get('someKey')
    expect(someKey2).toEqual(testValue2)
  })
})
