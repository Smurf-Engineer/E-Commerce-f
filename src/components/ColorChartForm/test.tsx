/**
 * ColorChartForm Test - Created by eduardoquintero on 19/03/18.
 */
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { ColorChartForm } from './index'

describe('<ColorChartForm />', () => {
  test('renders without exploding', () => {
    const div = document.createElement('div')
    ReactDOM.render(
      <ColorChartForm
        open={true}
        handleClose={() => {}}
        formatMessage={() => ''}
      />,
      div
    )
  })
})
