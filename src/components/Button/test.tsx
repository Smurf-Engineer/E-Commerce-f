import * as React from 'react'
import * as ReactDOM from 'react-dom'
import Button from './index'

describe('<Button />', () => {
  test('renders without exploding', () => {
    const div = document.createElement('div')
    ReactDOM.render(<Button label="label" />, div)
  })
})
