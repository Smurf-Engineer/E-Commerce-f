/**
 * ProductCatalogFilterComponent Test - Created by cazarez on 28/02/18.
 */
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import ProductCatalogFilterComponent from './index'

describe('<ProductCatalogFilterComponent />', () => {
  test('renders without exploding', () => {
    const div = document.createElement('div')
    const activeFilters = {}
    ReactDOM.render(
      <ProductCatalogFilterComponent
        title={''}
        options={[]}
        showOptions={false}
        toggleOptions={() => {}}
        selectOption={() => {}}
        {...{ activeFilters }}
      />,
      div
    )
  })
})
