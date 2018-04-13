/**
 * DesignsCatalogueThumbnailList Test - Created by gustavomedina on 12/04/18.
 */
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { DesignsCatalogueThumbnailList } from './index'

describe('<DesignsCatalogueThumbnailList />', () => {
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
      <DesignsCatalogueThumbnailList
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
