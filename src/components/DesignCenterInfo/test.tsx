/**
 * DesignCenterInfo Test - Created by david on 23/02/18.
 */
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import DesignCenterInfo from './index'

describe('<DesignCenterInfo />', () => {
  test('renders without exploding', () => {
    const div = document.createElement('div')
    ReactDOM.render(
      <DesignCenterInfo
        label="none"
        model="none"
        onPressQuickView={() => {}}
      />,
      div
    )
  })
})
