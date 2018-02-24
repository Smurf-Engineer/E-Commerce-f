/**
 * DesignCenterTabs Test - Created by david on 23/02/18.
 */
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import DesignCenterTabs from './index'

describe('<DesignCenterTabs />', () => {
  test('renders without exploding', () => {
    const div = document.createElement('div')
    ReactDOM.render(
      <DesignCenterTabs currentTab={0} onSelectTab={() => {}} />,
      div
    )
  })
})
