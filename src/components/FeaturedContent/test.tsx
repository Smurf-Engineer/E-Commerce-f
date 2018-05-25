/**
 * FeaturedContent Test - Created by cazarez on 24/05/18.
 */
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { FeaturedContent } from './index'

describe('<FeaturedContent />', () => {
  test('renders without exploding', () => {
    const div = document.createElement('div')
    const history = {}
    const data: any = {
      featuredContent: [],
      fetchMore: () => {}
    }
    ReactDOM.render(<FeaturedContent {...{ history, data }} />, div)
  })
})
