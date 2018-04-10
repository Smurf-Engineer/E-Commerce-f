/**
 * TeamSizes Test - Created by david on 09/04/18.
 */
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import TeamSizes from './index'

describe('<TeamSizes />', () => {
  test('renders without exploding', () => {
    const div = document.createElement('div')
    ReactDOM.render(
      <TeamSizes currentSelected={1} onSelectRange={() => {}} />,
      div
    )
  })
})
