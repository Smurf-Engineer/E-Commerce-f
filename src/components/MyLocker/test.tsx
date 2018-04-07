/**
 * MyLocker Test - Created by david on 06/04/18.
 */
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { MyLocker } from './index'

describe('<MyLocker />', () => {
  const formatMessage = (message: string) => 'string'
  test('renders without exploding', () => {
    const div = document.createElement('div')
    const data = {
      designs: [],
      fetchMore: () => {}
    }
    ReactDOM.render(<MyLocker {...{ formatMessage, data }} />, div)
  })
})
