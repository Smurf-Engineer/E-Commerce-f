/**
 * SwitchWithLabel Test - Created by david on 10/04/18.
 */
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import SwitchWithLabel from './index'

describe('<SwitchWithLabel />', () => {
  test('renders without exploding', () => {
    const div = document.createElement('div')
    ReactDOM.render(
      <SwitchWithLabel
        label="test"
        message="test"
        onChange={() => {}}
        checked={false}
      />,
      div
    )
  })
})
