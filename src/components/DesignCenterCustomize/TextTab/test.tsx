/**
 * TextTab Test - Created by david on 17/04/18.
 */
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import TextTab from './index'

describe('<TextTab />', () => {
  test('renders without exploding', () => {
    const div = document.createElement('div')
    ReactDOM.render(<TextTab text="text" onUpdateText={() => {}} />, div)
  })
})
