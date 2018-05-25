/**
 * FeaturedCategory Test - Created by cazarez on 25/05/18.
 */
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import FeaturedCategory from './index'

describe('<FeaturedCategory />', () => {
  test('renders without exploding', () => {
    const div = document.createElement('div')
    const history = {}
    ReactDOM.render(<FeaturedCategory {...{ history }} />, div)
  })
})
