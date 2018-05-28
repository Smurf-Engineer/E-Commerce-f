/**
 * MyCards Test - Created by miguelcanobbio on 28/05/18.
 */
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import MyCards from './index'

describe('<MyCards />', () => {
  test('renders without exploding', () => {
    const div = document.createElement('div')
    const format = (message: any) => 'string'
    ReactDOM.render(<MyCards formatMessage={format} />, div)
  })
})
