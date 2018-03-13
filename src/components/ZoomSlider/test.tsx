/**
 * Slider Test - Created by david on 05/03/18.
 */
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import Slider from './index'

describe('<Slider />', () => {
  test('renders without exploding', () => {
    const div = document.createElement('div')
    ReactDOM.render(<Slider onChangeZoom={() => {}} />, div)
  })
})
