/**
 * MainNavigationAdmin Test - Created by carloscazarez on 29/06/19.
 */
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import MainNavigationAdmin from './index'

describe('<MainNavigationAdmin />', () => {
  test('renders without exploding', () => {
    const div = document.createElement('div')
    ReactDOM.render(<MainNavigationAdmin />, div)
  })
})
