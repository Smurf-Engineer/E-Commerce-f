/**
 * Ratings Test - Created by cazarez on 12/02/18.
 */
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import Ratings from './index'

describe('<Ratings />', () => {
  test('renders without exploding', () => {
    const div = document.createElement('div')
    ReactDOM.render(
      <Ratings totalReviews={1} stars={0} rating={0} starDimension={''} />,
      div
    )
  })
})
