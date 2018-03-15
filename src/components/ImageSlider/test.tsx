/**
 * ImageSlider Test - Created by cazarez on 14/03/18.
 */
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import ImageSlider from './index'

describe('<ImageSlider />', () => {
  test('renders without exploding', () => {
    const div = document.createElement('div')
    const images = {
      front: '',
      back: '',
      left: '',
      right: ''
    }
    ReactDOM.render(<ImageSlider images={images} />, div)
  })
})
