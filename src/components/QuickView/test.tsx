/**
 * QuickView Test - Created by cazarez on 08/02/18.
 */
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { QuickView } from './index'

describe('<QuickView />', () => {
  test('renders without exploding', () => {
    const div = document.createElement('div')
    const data = {
      product: {
        id: 0,
        images: {
          front: '',
          back: '',
          left: '',
          right: ''
        },
        type: '',
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
        bodyChartId: 0,
        retailMen: false,
        retailWomen: false
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
      />,
      div
    )
  })
})
