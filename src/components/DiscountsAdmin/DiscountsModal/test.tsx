/**
 * DiscountsModals Test - Created by eduardoquintero on 27/05/19.
 */
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import DiscountsModals from './index'

describe('<DiscountsModals />', () => {
  test('renders without exploding', () => {
    const div = document.createElement('div')
    ReactDOM.render(<DiscountsModals open={false} />, div)
  })
})
