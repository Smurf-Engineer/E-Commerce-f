/**
 * Account Test - Created by david on 05/04/18.
 */
import accountReducer, { initialState } from './reducer'

describe(' Account Screen', () => {
  // Test redux actions
  it('Return the default state for unknow action', () => {
    let state = accountReducer(initialState, { type: 'unknow' })
    expect(state).toEqual(initialState)
  })
})
