/**
 * DesignCenterCustomize Test - Created by david on 26/02/18.
 */
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import DesignCenterCustomize from './index'

describe('<DesignCenterCustomize />', () => {
  test('renders without exploding', () => {
    const div = document.createElement('div')
    const selectColor = (index: number) => {}
    ReactDOM.render(
      <DesignCenterCustomize onSelectColorBlock={selectColor} />,
      div
    )
  })
})
