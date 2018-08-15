/**
 * RelatedProducts Test - Created by jorge on 10/08/18.
 */
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import RelatedProducts from './index'

describe('<RelatedProducts />', () => {
  test('renders without exploding', () => {
    const div = document.createElement('div')
    ReactDOM.render(<RelatedProducts  />, div)
  })
})