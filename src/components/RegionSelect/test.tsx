/**
 * RegionSelect Test - Created by gustavomedina on 30/07/18.
 */
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { RegionSelect } from './index'

describe('<RegionSelect />', () => {
  test('renders without exploding', () => {
    const div = document.createElement('div')
    const data: any = {
      regions: [],
      fetchMore: () => {}
    }
    const region = ''
    const handleRegionChange = (value: any) => {}
    const formatMessage = (message: any) => 'string'
    const disabled = false
    ReactDOM.render(
      <RegionSelect
        {...{
          data,
          region,
          handleRegionChange,
          formatMessage,
          disabled
        }}
      />,
      div
    )
  })
})
