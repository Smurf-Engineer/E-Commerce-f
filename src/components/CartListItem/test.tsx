/**
 * CartListItem Test - Created by gustavomedina on 04/05/18.
 */
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import CartListItem from './index'

describe('<CartListItem />', () => {
  test('renders without exploding', () => {
    const div = document.createElement('div')
    const format = (message: string) => 'string'
    const title = ''
    const description = ''
    const price = {
      price: 0,
      quantity: '1'
    }
    const image = ''
    ReactDOM.render(
      <CartListItem
        formatMessage={format}
        title={title}
        description={description}
        price={price}
        image={image}
      />,
      div
    )
  })
})
