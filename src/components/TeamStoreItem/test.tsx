/**
 * TeamStoreItem Test - Created by cazarez on 11/04/18.
 */
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import TeamStoreItem from './index'

describe('<TeamStoreItem />', () => {
  test('renders without exploding', () => {
    const div = document.createElement('div')
    const format = (message: string) => 'string'
    ReactDOM.render(<TeamStoreItem image={''} formatMessage={format} />, div)
  })
})
