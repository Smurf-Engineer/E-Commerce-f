/**
 * CustomModal Test - Created by cazarez on 20/02/18.
 */
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import CustomModal from './index'

describe('<CustomModal />', () => {
  test('renders without exploding', () => {
    const div = document.createElement('div')
    ReactDOM.render(<CustomModal open={false} />, div)
  })
})
