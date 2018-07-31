/**
 * JobOpenings Test - Created by jorge on 31/07/18.
 */
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import JobOpenings from './index'

describe('<JobOpenings />', () => {
  test('renders without exploding', () => {
    const div = document.createElement('div')
    const jobOpenings = [
      {
        id: 'jrAccountManager',
        header: 'jrAccountManagerHeader',
        content: 'jrAccountManagerContent'
      }
    ]
    const formatMessage = () => ''
    ReactDOM.render(<JobOpenings {...{ jobOpenings, formatMessage }} />, div)
  })
})
