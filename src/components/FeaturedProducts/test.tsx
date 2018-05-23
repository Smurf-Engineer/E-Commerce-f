/**
 * FeaturedProducts Test - Created by cazarez on 22/05/18.
 */
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import FeaturedProducts from './index'

describe('<FeaturedProducts />', () => {
  test('renders without exploding', () => {
    const div = document.createElement('div')
    ReactDOM.render(<FeaturedProducts  />, div)
  })
})