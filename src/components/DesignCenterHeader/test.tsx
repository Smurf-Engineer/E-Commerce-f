/**
 * DesignCenterHeader Test - Created by david on 23/02/18.
 */
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import DesignCenterHeader from './index'

describe('<DesignCenterHeader />', () => {
  test('renders without exploding', () => {
    const div = document.createElement('div')
    ReactDOM.render(<DesignCenterHeader onPressBack={() => {}} />, div)
  })
})
