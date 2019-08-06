/**
 * DesignSearch Test - Created by miguelcanobbio on 15/08/18.
 */
import designSearchReducer, { initialState } from './reducer'
import { defaultAction } from './actions'

describe(' DesignSearch Screen', () => {
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
