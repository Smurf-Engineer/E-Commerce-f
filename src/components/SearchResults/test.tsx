/**
 * SearchResults Test - Created by cazarez on 14/02/18.
 */
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import SearchResults from './index'

describe('<SearchResults />', () => {
  test('renders without exploding', () => {
    const div = document.createElement('div')
    ReactDOM.render(
      <SearchResults
        showResults={true}
        closeResults={() => {}}
        searchParam={''}
        history={{}}
      />,
      div
    )
  })
})
