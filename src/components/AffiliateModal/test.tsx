/**
 * AffiliateModal Test - Created by Jesús on 20/05/20.
 */
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { AffiliateModal } from './index'
import { MemoryRouter } from 'react-router-dom'

describe('<AffiliateModal />', () => {
  test('renders without exploding', () => {
    const div = document.createElement('div')
    ReactDOM.render(
      <MemoryRouter>
        <AffiliateModal
          open={true}
          link={false}
          formatMessage={() => { }}
        />
      </MemoryRouter>,
      div
    )
  })
})
