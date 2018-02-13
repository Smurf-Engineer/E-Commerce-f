/**
 * MainLayout Test - Created by david on 12/02/18.
 */
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import MainLayout from './index'

describe('<MainLayout />', () => {
  test('renders without exploding', () => {
    const div = document.createElement('div')
    ReactDOM.render(
      <MainLayout history={{}}>
        <div>TEST</div>
      </MainLayout>,
      div
    )
  })
})
