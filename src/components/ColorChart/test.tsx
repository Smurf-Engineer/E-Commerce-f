/**
 * ColorChart Test - Created by eduardoquintero on 19/03/18.
 */
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { ColorChart } from './index'

describe('<ColorChart />', () => {
  test('renders without exploding', () => {
    const div = document.createElement('div')
    ReactDOM.render(
      <ColorChart
        open={true}
        handleClose={() => {}}
        formatMessage={() => ''}
      />,
      div
    )
  })
})
