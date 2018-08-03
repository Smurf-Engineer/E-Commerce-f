/**
 * CitySelect Test - Created by gustavomedina on 30/07/18.
 */
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { CitySelect } from './index'

describe('<CitySelect />', () => {
  test('renders without exploding', () => {
    const div = document.createElement('div')
    const data: any = {
      cities: [],
      fetchMore: () => {}
    }
    const disabled = false
    const handleCityChange = (value: any) => {}
    const formatMessage = (message: any) => 'string'
    const selectedCity = ''
    ReactDOM.render(
      <CitySelect
        {...{
          data,
          disabled,
          handleCityChange,
          formatMessage,
          selectedCity
        }}
      />,
      div
    )
  })
})
