/**
 * DropdownList Test - Created by david on 07/02/18.
 */
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { QueryProps, Filter } from '../../types/common'
import { DropdownList } from './index'

describe('<DropdownList />', () => {
  test('renders without exploding', () => {
    const div = document.createElement('div')
    const sports: Filter[] = []
    const categories: Filter[] = []
    const data = {
      sports,
      categories,
      fetchMore: () => {}
    }
    ReactDOM.render(
      <DropdownList history={{}} dispatch={{}} data={data} />,
      div
    )
  })
})
