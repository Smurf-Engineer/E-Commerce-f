/**
 * FitInfo Test - Created by gustavomedina on 08/03/18.
 */
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import FitInfo from './index'

describe('<FitInfo />', () => {
  test('renders without exploding', () => {
    const div = document.createElement('div')
    ReactDOM.render(<FitInfo open={false} />, div)
  })
})
