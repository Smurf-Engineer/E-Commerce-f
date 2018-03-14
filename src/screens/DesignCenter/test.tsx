/**
 * DesignCenter Test - Created by david on 23/02/18.
 */
import designCenterReducer, { initialState } from './reducer'
import { setCurrentTabAction } from './actions'

describe(' DesignCenter Screen', () => {
  // Test redux actions
  it('Return the default state for unknow action', () => {
    let state = designCenterReducer(initialState, { type: 'unknow' })
    expect(state).toEqual(initialState)
  })

  it('Update currentTab correctly', () => {
    const testValue = 0
    const state = designCenterReducer(initialState, setCurrentTabAction(0))
    const someKey = state.get('currentTab')
    expect(someKey).toEqual(testValue)

    const testValue2 = 10
    const state2 = designCenterReducer(
      initialState,
      setCurrentTabAction(testValue2)
    )
    const someKey2 = state2.get('currentTab')
    expect(someKey2).toEqual(testValue2)
  })
})
