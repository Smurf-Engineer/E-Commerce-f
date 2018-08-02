/**
 * ExtraFile Test - Created by david on 30/07/18.
 */
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import ExtraFile from './index'

describe('<ExtraFile />', () => {
  test('renders without exploding', () => {
    const div = document.createElement('div')
    ReactDOM.render(<ExtraFile  />, div)
  })
})