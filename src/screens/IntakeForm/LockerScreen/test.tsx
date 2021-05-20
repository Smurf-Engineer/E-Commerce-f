/**
 * LockerModal Test - Created by david on 10/04/18.
 */
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { LockerModal } from './index'

describe('<LockerModal />', () => {
  test('renders without exploding', () => {
    const div = document.createElement('div')
    const designsResult = { fullCount: '0', designs: [] }
    const selectedItems = { 0: false }
    const data = { designsResult, fetchMore: () => {} }
    ReactDOM.render(
      <LockerModal
        {...{ data, selectedItems }}
        tableItems={selectedItems}
        visible={false}
        onRequestClose={() => {}}
        onSelectItem={() => {}}
        onUnselectItem={() => {}}
        onAddItems={() => {}}
        currentPage={0}
        limit={0}
      />,
      div
    )
  })
})
