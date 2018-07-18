/**
 * OverviewHeader Test - Created by miguelcanobbio on 17/07/18.
 */
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import OverviewHeader from './index'

describe('<OverviewHeader />', () => {
  test('renders without exploding', () => {
    const div = document.createElement('div')
    ReactDOM.render(
      <OverviewHeader label="" width="100%" formatMessage={() => ''} />,
      div
    )
  })
})
