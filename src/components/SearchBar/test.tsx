/**
 * SearchBar Test - Created by cazarez on 13/02/18.
 */
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import SearchBar from './index'

describe('<SearchBar />', () => {
  test('renders without exploding', () => {
    const div = document.createElement('div')
    ReactDOM.render(<SearchBar search={() => {}} />, div)
  })
})
