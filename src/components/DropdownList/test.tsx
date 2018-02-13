/**
 * DropdownList Test - Created by david on 07/02/18.
 */
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { DropdownList } from './index'

describe('<DropdownList />', () => {
  test('renders without exploding', () => {
    const div = document.createElement('div')
    ReactDOM.render(<DropdownList history={{}} dispatch={{}} />, div)
  })
})
