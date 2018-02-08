/**
 * ContactAndLinks Test - Created by cazarez on 07/02/18.
 */
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import ContactAndLinks from './index'

describe('<ContactAndLinks />', () => {
  test('renders without exploding', () => {
    const div = document.createElement('div')
    ReactDOM.render(<ContactAndLinks  />, div)
  })
})