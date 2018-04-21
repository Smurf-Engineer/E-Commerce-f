/**
 * StoreForm Test - Created by david on 09/04/18.
 */
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import StoreForm from './index'

describe('<StoreForm />', () => {
  test('renders without exploding', () => {
    const div = document.createElement('div')
    const format = (message: string) => 'string'
    ReactDOM.render(
      <StoreForm
        onUpdateName={() => {}}
        name=""
        onSelectStartDate={() => {}}
        onSelectEndDate={() => {}}
        formatMessage={format}
      />,
      div
    )
  })
})
