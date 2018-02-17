/**
 * SearchResults Test - Created by cazarez on 14/02/18.
 */
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { SearchResults } from './index'
// import { Product } from '../../types/common'

describe('<SearchResults />', () => {
  test('renders without exploding', () => {
    const div = document.createElement('div')
    const data = {
      productSearch: [],
      fetchMore: () => {}
    }
    ReactDOM.render(
      <SearchResults
        showResults={true}
        closeResults={() => {}}
        openResults={() => {}}
        searchParam={''}
        history={{}}
        data={data}
      />,
      div
    )
  })
})
