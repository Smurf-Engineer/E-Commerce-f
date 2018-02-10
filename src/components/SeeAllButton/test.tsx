/**
 * SeeAllButton Test - Created by david on 09/02/18.
 */
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import SeeAllButton from './index'

describe('<SeeAllButton />', () => {
  test('renders without exploding', () => {
    const div = document.createElement('div')
    ReactDOM.render(<SeeAllButton  />, div)
  })
})