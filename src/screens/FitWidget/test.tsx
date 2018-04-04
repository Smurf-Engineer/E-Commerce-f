/**
 * FitWidget Test - Created by gustavomedina on 27/03/18.
 */
import fitWidgetReducer, { initialState } from './reducer'
import { defaultAction } from './actions'

describe(' FitWidget Screen', () => {
  // Test redux actions
  it('Return the default state for unknow action', () => {
    let state = fitWidgetReducer(initialState, { type: 'unknow' })
    expect(state).toEqual(initialState)
  })

  it('Update someKey correctly', () => {
    const testValue = 'Test value'
    const state = fitWidgetReducer(initialState, defaultAction(testValue))
    const someKey = state.get('someKey')
    expect(someKey).toEqual(testValue)

    const testValue2 = 'Test value 2'
    const state2 = fitWidgetReducer(initialState, defaultAction(testValue2))
    const someKey2 = state2.get('someKey')
    expect(someKey2).toEqual(testValue2)
  })
})
