/**
 * ConfirmCountryDialog Test - Created by gustavomedina on 05/07/18.
 */
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import ConfirmCountryDialog from './index'

describe('<ConfirmCountryDialog />', () => {
  test('renders without exploding', () => {
    const div = document.createElement('div')
    ReactDOM.render(<ConfirmCountryDialog  />, div)
  })
})