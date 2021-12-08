/**
 * ProductThumbnail Test - Created by david on 12/02/18.
 */
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { ProductThumbnail } from './index'
import { MemoryRouter } from 'react-router-dom'

describe('<ProductThumbnail />', () => {
  test('renders without exploding', () => {
    const div = document.createElement('div')
    ReactDOM.render(
      <MemoryRouter>
        <ProductThumbnail
          id={0}
          isTopProduct={false}
          onPressCustomize={() => {}}
          onPressQuickView={() => {}}
          intl={{
            formatMessage: () => ''
          }}
          yotpoId="fondo"
        />
      </MemoryRouter>,
      div
    )
  })
})
