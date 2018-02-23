/**
 * CustomInput Test - Created by cazarez on 22/02/18.
 */
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import CustomInput from './index'

describe('<CustomInput />', () => {
  test('renders without exploding', () => {
    const div = document.createElement('div')
    ReactDOM.render(<CustomInput  />, div)
  })
})