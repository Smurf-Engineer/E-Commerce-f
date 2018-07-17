/**
 * HeaderOrdersTable Test - Created by miguelcanobbio on 16/07/18.
 */
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import HeaderOrdersTable from './index'

describe('<HeaderOrdersTable />', () => {
  test('renders without exploding', () => {
    const div = document.createElement('div')
    const label = ''
    const sort = 'asc'
    const onSortClick = () => {}
    const id = ''
    ReactDOM.render(
      <HeaderOrdersTable {...{ id, label, sort, onSortClick }} />,
      div
    )
  })
})
