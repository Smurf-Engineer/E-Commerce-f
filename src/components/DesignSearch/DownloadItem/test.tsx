/**
 * DownloadItem Test - Created by miguelcanobbio on 17/08/18.
 */
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import DownloadItem from './index'

describe('<DownloadItem />', () => {
  test('renders without exploding', () => {
    const div = document.createElement('div')
    ReactDOM.render(<DownloadItem  />, div)
  })
})