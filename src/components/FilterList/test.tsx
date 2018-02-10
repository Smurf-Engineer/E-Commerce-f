/**
 * FilterList Test - Created by david on 09/02/18.
 */
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import FilterList from './index'
import { Filter } from '../../types/common'

describe('<FilterList />', () => {
  test('renders without exploding', () => {
    const div = document.createElement('div')
    const filters = new Array<Filter>()
    ReactDOM.render(<FilterList filters={filters} />, div)
  })
})
