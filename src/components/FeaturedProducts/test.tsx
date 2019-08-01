/**
 * FeaturedProducts Test - Created by cazarez on 22/05/18.
 */
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { FeaturedProducts } from './index'

describe('<FeaturedProducts />', () => {
  test('renders without exploding', () => {
    const div = document.createElement('div')
    const formatMessage = (message: any) => 'string'
    const history = {}
    const data: any = {
      featuredProducts: {
        fullCount: 0,
        products: []
      },
      fetchMore: () => {}
    }
    const openQuickView = () => {}
    ReactDOM.render(
      <FeaturedProducts
        {...{ formatMessage, data, history, openQuickView }}
        featuredProducts={[]}
      />,
      div
    )
  })
})
