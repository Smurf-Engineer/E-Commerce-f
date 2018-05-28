/**
 * MyCard Test - Created by miguelcanobbio on 28/05/18.
 */
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import MyCard from './index'

describe('<MyCard />', () => {
  test('renders without exploding', () => {
    const div = document.createElement('div')
    const last4 = '4242'
    const name = 'Miguel'
    const expMonth = 12
    const expYear = 2019
    const brand = 'Visa'
    const defaultPayment = false
    const formatMessage = (message: any) => 'string'
    ReactDOM.render(
      <MyCard
        {...{
          last4,
          expYear,
          expMonth,
          name,
          brand,
          formatMessage,
          defaultPayment
        }}
      />,
      div
    )
  })
})
