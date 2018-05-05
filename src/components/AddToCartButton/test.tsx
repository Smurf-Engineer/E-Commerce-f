/**
 * AddToCartButton Test - Created by cazarez on 02/05/18.
 */
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { AddToCartButton } from './index'

describe('<AddToCartButton />', () => {
  test('renders without exploding', () => {
    const div = document.createElement('div')
    const item: any = {
      itemDetails: [
        {
          id: 0,
          name: ''
        }
      ],
      product: {
        id: 1,
        shortId: '',
        images: {
          front: '',
          back: '',
          left: '',
          right: '',
          genderId: 0
        },
        type: '',
        description: '',
        priceRange: [
          {
            quantity: '',
            price: 0
          }
        ],
        collections: 0,
        isTopProduct: false,
        details: '',
        specs: '',
        name: '',
        customizable: false,
        yotpoId: '',
        yotpoAverageScore: {},
        fitStyles: [],
        genders: [],
        bodyChartId: 0,
        retailMen: false,
        retailWomen: false
      }
    }
    const onClick = () => false
    ReactDOM.render(
      <AddToCartButton
        label=""
        item={item}
        getTotalItemsIncart={() => {}}
        {...{ onClick }}
      />,
      div
    )
  })
})
