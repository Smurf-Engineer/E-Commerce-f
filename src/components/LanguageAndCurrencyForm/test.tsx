/**
 * LanguageAndCurrencyForm Test - Created by miguelcanobbio on 05/06/18.
 */
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import LanguageAndCurrencyForm from './index'
import { ClickParam, Region } from '../../types/common'

describe('<LanguageAndCurrencyForm />', () => {
  test('renders without exploding', () => {
    const region = ''
    const language = ''
    const currency = ''
    const regionsOptions: Region[] = []
    const formatMessage = (messageDescriptor: any) => ''
    const selectedDropDown = (param: ClickParam) => {}
    const div = document.createElement('div')
    ReactDOM.render(
      <LanguageAndCurrencyForm
        {...{
          region,
          language,
          currency,
          formatMessage,
          selectedDropDown,
          regionsOptions
        }}
      />,
      div
    )
  })
})
