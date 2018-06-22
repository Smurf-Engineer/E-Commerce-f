/**
 * OptionText Test - Created by david on 17/04/18.
 */
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import OptionText from './index'

describe('<OptionText />', () => {
  test('renders without exploding', () => {
    const div = document.createElement('div')
    ReactDOM.render(
      <OptionText title="title" option="option" onClick={() => {}} />,
      div
    )
  })
})
