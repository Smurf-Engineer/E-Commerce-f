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
    const handleAdd = (
      event: React.MouseEvent<EventTarget>,
      index: number
    ) => {}
    const handleDelete = (
      event: React.MouseEvent<EventTarget>,
      index: number,
      detailIndex: number
    ) => {}
    const title = ''
    const description = ''
    const itemIndex = 0
    const price = {
      price: 0,
      quantity: '1'
    }
    const item = {
      product: {
        id: 0,
        images: [
          {
            front: '',
            back: '',
            left: '',
            right: '',
            genderId: 0
          }
        ],
        type: '',
        description: '',
        priceRange: [
          {
            quantity: '1',
            price: 0
          }
        ],
        collections: 0,
        isTopProduct: false,
        details: '',
        specs: '',
        name: '',
        temperature: '',
        materials: '',
        customizable: false,
        yotpoId: '',
        yotpoAverageScore: {
          total: 0,
          averageScore: 0
        },
        fitStyles: [
          {
            id: 0,
            name: '',
            info: '',
            image: ''
          }
        ],
        genders: [
          {
            id: 0,
            name: ''
          }
        ],
        bodyChartId: 0,
        retailMen: false,
        retailWomen: false
      },
      itemDetails: [
        {
          quantity: 1
        }
      ]
    }
    const image = ''
    ReactDOM.render(
      <CartListItem
        formatMessage={format}
        title={title}
        description={description}
        price={price}
        image={image}
        cartItem={item}
        handleAddItemDetail={handleAdd}
        handledeleteItemDetail={handleDelete}
        itemIndex={itemIndex}
      />,
      div
    )
  })
})
