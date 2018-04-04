/**
 * ShareDesignModal Test - Created by cazarez on 21/03/18.
 */
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import ShareDesignModal from './index'

describe('<ShareDesignModal />', () => {
  test('renders without exploding', () => {
    const format = (message: string) => 'string'
    const div = document.createElement('div')
    ReactDOM.render(
      <ShareDesignModal
        formatMessage={format}
        open={false}
        requestClose={() => {}}
        savedDesignId={''}
      />,
      div
    )
  })
})
