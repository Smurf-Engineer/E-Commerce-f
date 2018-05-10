/**
 * MyAddressesList Test - Created by cazarez on 10/05/18.
 */
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import MyAddressesList from './index'

describe('<MyAddressesList />', () => {
  test('renders without exploding', () => {
    const div = document.createElement('div')
    const format = (message: any) => 'string'
    ReactDOM.render(<MyAddressesList formatMessage={format} />, div)
  })
})
