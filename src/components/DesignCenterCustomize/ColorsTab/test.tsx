/**
 * ColorsTab Test - Created by miguelcanobbio on 31/07/18.
 */
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import ColorsTab from './index'

describe('<ColorsTab />', () => {
  test('renders without exploding', () => {
    const div = document.createElement('div')
    ReactDOM.render(<ColorsTab  />, div)
  })
})