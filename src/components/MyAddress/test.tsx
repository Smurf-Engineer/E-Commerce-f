/**
 * MyAddress Test - Created by cazarez on 10/05/18.
 */
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import MyAddress from './index'

describe('<MyAddress />', () => {
  test('renders without exploding', () => {
    const div = document.createElement('div')
    const format = (message: any) => 'strng'
    ReactDOM.render(
      <MyAddress
        name={''}
        street={''}
        city={''}
        country={''}
        zipCode={''}
        formatMessage={format}
      />,
      div
    )
  })
})
