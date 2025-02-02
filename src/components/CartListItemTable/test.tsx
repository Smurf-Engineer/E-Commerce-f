/**
 * CartListItemTable Test - Created by gustavomedina on 04/05/18.
 */
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import CartListItemTable from './index'
import { ItemDetailType } from '../../types/common'

describe('<CartListItemTable />', () => {
  test('renders without exploding', () => {
    const div = document.createElement('div')
    const format = (message: string) => 'string'
    const handleDelete = (
      event: React.MouseEvent<EventTarget>,
      index: number,
      detailIndex: number
    ) => {}
    const handleLabel = (
      index: number,
      detailIndex: number,
      label: string
    ) => {}
    const handleQuantity = (
      index: number,
      detailIndex: number,
      quantity: number
    ) => {}
    const handleGender = (
      index: number,
      detailIndex: number,
      gender: ItemDetailType
    ) => {}
    const handleFit = (
      index: number,
      detailIndex: number,
      fit: ItemDetailType
    ) => {}
    const handleSize = (
      index: number,
      detailIndex: number,
      size: ItemDetailType
    ) => {}
    const item = {
      product: {
        id: 0,
        code: '0',
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
        shortDescription: '',
        description: '',
        priceRange: [],
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
        sizeRange: [
          {
            id: 0,
            name: ''
          }
        ],
        bodyChartId: 0,
        retailMen: false,
        retailWomen: false
      },
      itemDetails: []
    }
    const itemIndex = 0
    ReactDOM.render(
      <CartListItemTable
        formatMessage={format}
        cartItem={item}
        handledeleteItemDetail={handleDelete}
        itemIndex={itemIndex}
        setLabelItemDetail={handleLabel}
        setDetailQuantity={handleQuantity}
        setDetailFit={handleFit}
        setDetailGender={handleGender}
        setDetailSize={handleSize}
      />,
      div
    )
  })
})
