import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { NotFound } from './index'

describe(' NotFound Screen', () => {
  it('renders without exploding', () => {
    const div = document.createElement('div')
    // tslint:disable-next-line:no-empty
    ReactDOM.render(<NotFound />, div)
  })
})