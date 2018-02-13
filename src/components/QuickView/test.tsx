/**
 * QuickView Test - Created by cazarez on 08/02/18.
 */
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import QuickView from './index'

describe('<QuickView />', () => {
  test('renders without exploding', () => {
    const div = document.createElement('div')
    const data = {
      quantityPrice: [],
      images: {
        front: '',
        back: '',
        left: '',
        right: ''
      }
    }
    ReactDOM.render(<QuickView open={true} title={''} data={data} />, div)
  })
})
