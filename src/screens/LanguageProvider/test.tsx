/**
 * LanguageProvider Test - Created by david on 20/02/18.
 */

import languageProviderReducer, { initialState } from './reducer'
import { changeLocaleAction } from './actions'

describe(' LanguageProvider Screen', () => {
  // Test redux actions
  it('Return the default state for unknow action', () => {
    let state = languageProviderReducer(initialState, { type: 'unknow' })
    expect(state).toEqual(initialState)
  })

  it('Update locale correctly', () => {
    const testValue = 'es'
    const state = languageProviderReducer(
      initialState,
      changeLocaleAction(testValue)
    )
    const someKey = state.get('locale')
    expect(someKey).toEqual(testValue)

    const testValue2 = 'fr'
    const state2 = languageProviderReducer(
      initialState,
      changeLocaleAction(testValue2)
    )
    const someKey2 = state2.get('locale')
    expect(someKey2).toEqual(testValue2)
  })
})
