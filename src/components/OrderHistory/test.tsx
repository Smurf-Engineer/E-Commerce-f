/**
 * OrderHistory Test - Created by miguelcanobbio on 13/07/18.
 */
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import OrderHistory from './index'

describe('<OrderHistory />', () => {
  test('renders without exploding', () => {
    const div = document.createElement('div')
    const formatMessage = () => ''
    ReactDOM.render(<OrderHistory {...{ formatMessage }} />, div)
  })
})
