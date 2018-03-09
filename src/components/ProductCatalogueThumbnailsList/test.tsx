/**
 * ProductCatalogueThumbnailsList Test - Created by cazarez on 01/03/18.
 */
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { ProductCatalogueThumbnailsList } from './index'

describe('<ProductCatalogueThumbnailsList />', () => {
  test('renders without exploding', () => {
    const div = document.createElement('div')
    const products = {
      fullCount: '0',
      products: []
    }
    const format = (message: string) => 'string'
    const data = {
      products,
      fetchMore: () => {}
    }
    ReactDOM.render(
      <ProductCatalogueThumbnailsList
        formatMessage={format}
        data={data}
        history={{}}
        openQuickView={() => {}}
        sortByLabel={''}
        handleChangePage={() => {}}
        handleOrderBy={() => {}}
        currentPage={0}
        limit={0}
      />,
      div
    )
  })
})
