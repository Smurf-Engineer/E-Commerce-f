/**
 * ImagesGrid Test - Created by gustavomedina on 22/02/18.
 */
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { ImagesGrid } from './index'

describe('<ImagesGrid />', () => {
  test('renders without exploding', () => {
    const div = document.createElement('div')
    const data = {
      productsHome: [],
      fetchMore: () => {}
    }
    ReactDOM.render(<ImagesGrid data={data} />, div)
  })
})
