/**
 * YotpoHome Test - Created by gustavomedina on 20/03/18.
 */
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import YotpoHome from './index'

describe('<YotpoHome />', () => {
  test('renders without exploding', () => {
    const div = document.createElement('div')
    ReactDOM.render(<YotpoHome  />, div)
  })
})