/**
 * DesignCenterGrid Test - Created by david on 26/02/18.
 */
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import DesignCenterGrid from './index'
import { Theme } from '../../types/common'

describe('<DesignCenterGrid />', () => {
  test('renders without exploding', () => {
    const div = document.createElement('div')
    const themes: Theme[] = []
    ReactDOM.render(<DesignCenterGrid {...{ themes }} />, div)
  })
})
