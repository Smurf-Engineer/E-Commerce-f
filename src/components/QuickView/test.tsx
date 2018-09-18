/**
 * QuickView Test - Created by cazarez on 08/02/18.
 */
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { QuickView } from './index'
import { Product, QueryProps } from '../../types/common'

interface ProductPageTypes extends Product {
  temperature: string
  materials: string
}

interface Data extends QueryProps {
  product: ProductPageTypes
}

describe('<QuickView />', () => {
  test('renders without exploding', () => {
    const div = document.createElement('div')
    const data: Data = {
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
        genderId: 0,
        description: '',
        label: '',
        priceRange: [],
        collections: 0,
        isTopProduct: false,
        details: '',
        specs: '',
        shortDescription: '',
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
        retailWomen: false,
        flatlock: '',
        bumpMap: '',
        weight: 0
      },
      fetchMore: () => {}
    }
    ReactDOM.render(
      <QuickView
        open={true}
        data={data}
        handleClose={() => {}}
        productId={0}
        history={{}}
        yotpoId=""
        formatMessage={() => ''}
      />,
      div
    )
  })
})