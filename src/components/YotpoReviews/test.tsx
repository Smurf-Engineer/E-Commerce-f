/**
 * YotpoReviews Test - Created by cazarez on 14/03/18.
 */
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import YotpoReviews from './index'

describe('<YotpoReviews />', () => {
  test('renders without exploding', () => {
    const div = document.createElement('div')
    ReactDOM.render(<YotpoReviews yotpoId="" />, div)
  })
})
