/**
 * CartListItem Test - Created by gustavomedina on 04/05/18.
 */
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { CartListItem } from './index'
import { ItemDetailType } from '../../types/common'
import { IntlProvider } from 'react-intl'

describe('<CartListItem />', () => {
  test('renders without exploding', () => {
    const div = document.createElement('div')
    const format = (message: string) => 'string'
    const props = { locale: 'en' }
    const handleAdd = (
      event: React.MouseEvent<EventTarget>,
      index: number
    ) => {}
    const handleRemove = (
      event: React.MouseEvent<EventTarget>,
      index: number
    ) => {}
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

    const title = ''
    const description = ''
    const itemIndex = 0
    const price = {
      price: 0,
      quantity: '1',
      shortName: ''
    }
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
        description: '',
        shortDescription: '',
        priceRange: [
          {
            quantity: '1',
            price: 0,
            shortName: ''
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
        sizeRange: [
          {
            id: 0,
            name: ''
          }
        ],
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
        retailWomen: false,
        active: true,
        genderId: 1,
        label: '',
        relatedProducts: [],
        flatlock: '',
        bumpMap: '',
        weight: 10
      },
      itemDetails: [
        {
          quantity: 1
        }
      ]
    }
    const image = ''
    ReactDOM.render(
      <IntlProvider {...props}>
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
          setLabelItemDetail={handleLabel}
          setDetailQuantity={handleQuantity}
          setDetailFit={handleFit}
          setDetailGender={handleGender}
          setDetailSize={handleSize}
          removeItem={handleRemove}
          openFitInfoAction={() => {}}
          currentCurrency={''}
          openFitInfo={false}
        />
      </IntlProvider>,
      div
    )
  })
})
