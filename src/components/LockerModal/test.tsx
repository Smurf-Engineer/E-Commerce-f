/**
 * LockerModal Test - Created by david on 10/04/18.
 */
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import LockerModal from './index'

describe('<LockerModal />', () => {
  test('renders without exploding', () => {
    const div = document.createElement('div')
    ReactDOM.render(<LockerModal  />, div)
  })
})