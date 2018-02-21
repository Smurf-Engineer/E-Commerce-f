/**
 * Menu Test - Created by david on 20/02/18.
 */
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import Menu from './index'

describe('<Menu />', () => {
  test('renders without exploding', () => {
    const testFunc = (obj: any) => {}
    const div = document.createElement('div')
    ReactDOM.render(<Menu currentRegion={0} onSelectRegion={testFunc} />, div)
  })
})
