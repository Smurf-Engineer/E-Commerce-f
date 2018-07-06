/**
 * ConfirmCountryDialog Test - Created by gustavomedina on 05/07/18.
 */
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { ConfirmCountryDialog } from './index'

describe('<ConfirmCountryDialog />', () => {
  test('renders without exploding', () => {
    const div = document.createElement('div')
    const format = (message: string) => 'string'
    const data = {
      countriesSubsidiaries: [
        {
          id: 0,
          country: '',
          subsidiary: 0
        }
      ],
      fetchMore: () => {}
    }
    ReactDOM.render(
      <ConfirmCountryDialog
        {...{ data }}
        open={false}
        requestClose={() => {}}
        onSave={() => {}}
        formatMessage={format}
      />,
      div
    )
  })
})
