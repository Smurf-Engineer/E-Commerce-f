/**
 * Tab Test - Created by david on 23/02/18.
 */
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import Tab from './index'

describe('<Tab />', () => {
  test('renders without exploding', () => {
    const div = document.createElement('div')
    ReactDOM.render(
      <Tab index={0} onSelectTab={() => {}}>
        <div />
      </Tab>,
      div
    )
  })
})
