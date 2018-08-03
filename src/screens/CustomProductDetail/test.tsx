/**
 * CustomProductDetail Test - Created by jorge on 03/08/18.
 */
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import customProductDetailReducer, { initialState } from './reducer'
import { defaultAction } from './actions'
import { CustomProductDetail } from './index'
import { IntlProvider } from 'react-intl'

describe(' CustomProductDetail Screen', () => {
  it('renders without exploding', () => {
    const div = document.createElement('div')
    // tslint:disable-next-line:no-empty
    ReactDOM.render(
      <IntlProvider>
        <CustomProductDetail />
      </IntlProvider>,
      div
    )
  })
  // Test redux actions
  it('Return the default state for unknow action', () => {
    let state = customProductDetailReducer(initialState, { type: 'unknow' })
    expect(state).toEqual(initialState)
  })

  it('Update someKey correctly', () => {
    const testValue = 'Test value'
    const state = customProductDetailReducer(
      initialState,
      defaultAction(testValue)
    )
    const someKey = state.get('someKey')
    expect(someKey).toEqual(testValue)

    const testValue2 = 'Test value 2'
    const state2 = customProductDetailReducer(
      initialState,
      defaultAction(testValue2)
    )
    const someKey2 = state2.get('someKey')
    expect(someKey2).toEqual(testValue2)
  })
})
