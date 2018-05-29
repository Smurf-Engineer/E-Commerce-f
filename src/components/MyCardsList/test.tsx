/**
 * MyCardsList Test - Created by miguelcanobbio on 28/05/18.
 */
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import MyCardsList from './index'
import { CreditCardData } from '../../types/common'

describe('<MyCardsList />', () => {
  test('renders without exploding', () => {
    const div = document.createElement('div')
    const format = (message: any) => 'string'
    const idDefaultCard = ''
    const items: CreditCardData[] = []
    ReactDOM.render(
      <MyCardsList formatMessage={format} {...{ items, idDefaultCard }} />,
      div
    )
  })
})
