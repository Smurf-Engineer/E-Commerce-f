/**
 * CartListItemTable Test - Created by gustavomedina on 04/05/18.
 */
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import CartListItemTable from './index'

describe('<CartListItemTable />', () => {
  test('renders without exploding', () => {
    const div = document.createElement('div')
    const format = (message: string) => 'string'
    ReactDOM.render(<CartListItemTable formatMessage={format} />, div)
  })
})
