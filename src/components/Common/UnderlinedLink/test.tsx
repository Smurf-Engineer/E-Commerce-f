/**
 * UnderlinedLink Test - Created by cazarez on 02/03/18.
 */
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import UnderlinedLink from './index'

describe('<UnderlinedLink />', () => {
  test('renders without exploding', () => {
    const div = document.createElement('div')
    ReactDOM.render(<UnderlinedLink link={''} />, div)
  })
})
