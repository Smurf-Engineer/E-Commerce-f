/**
 * FillColor Test - Created by david on 29/05/18.
 */
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import FillColor from './index'

describe('<FillColor />', () => {
  test('renders without exploding', () => {
    const div = document.createElement('div')
    ReactDOM.render(
      <FillColor onSelectFill={() => {}} formatMessage={() => ''} />,
      div
    )
  })
})
