/**
 * CountrySelect Test - Created by gustavomedina on 30/07/18.
 */
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { CountrySelect } from './index'

describe('<CountrySelect />', () => {
  test('renders without exploding', () => {
    const div = document.createElement('div')
    const data: any = {
      fetchMore: () => { }
    }
    const countries = []
    const selectedCountry = ''
    const handleCountryChange = (value: any) => { }
    const formatMessage = (message: any) => 'string'
    ReactDOM.render(
      <CountrySelect
        {...{ data, selectedCountry, handleCountryChange, formatMessage, countries }}
      />,
      div
    )
  })
})
