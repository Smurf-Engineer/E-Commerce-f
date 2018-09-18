/**
 * OrderFiles Test - Created by miguelcanobbio on 16/08/18.
 */
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import OrderFiles from './index'

describe('<OrderFiles />', () => {
  test('renders without exploding', () => {
    const div = document.createElement('div')
    const order = {
      code: '',
      image: '',
      status: '',
      svgUrl: '',
      assets: { files: [], svgs: [] }
    }
    ReactDOM.render(<OrderFiles {...{ order }} />, div)
  })
})