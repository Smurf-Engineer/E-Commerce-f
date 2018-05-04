/**
 * CartForHeader Test - Created by cazarez on 02/05/18.
 */
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import CartForHeader from './index'

describe('<CartForHeader />', () => {
  test('renders without exploding', () => {
    const div = document.createElement('div')
    ReactDOM.render(<CartForHeader  />, div)
  })
})