/**
 * DesignerTool Test - Created by david on 08/05/18.
 */
import designerToolReducer, { initialState } from './reducer'
import { defaultAction } from './actions'

describe(' DesignerTool Screen', () => {
  // Test redux actions
  it('Return the default state for unknow action', () => {
    let state = designerToolReducer(initialState, { type: 'unknow' })
    expect(state).toEqual(initialState)
  })

  it('Update someKey correctly', () => {
    const testValue = 'Test value'
    const state = designerToolReducer(initialState, defaultAction(testValue))
    const someKey = state.get('someKey')
    expect(someKey).toEqual(testValue)

    const testValue2 = 'Test value 2'
    const state2 = designerToolReducer(initialState, defaultAction(testValue2))
    const someKey2 = state2.get('someKey')
    expect(someKey2).toEqual(testValue2)
  })
})
