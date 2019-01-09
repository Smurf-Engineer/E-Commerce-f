/**
 * DesignCenterInspiration Test - Created by eduardo on 24/12/18.
 */
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { MobileDesignCenterInspiration } from './index'
import { DesignResultType, Filter } from '../../types/common'

describe('<DesignCenterInspiration />', () => {
  test('renders without exploding', () => {
    const div = document.createElement('div')
    const designs: DesignResultType = {
      fullCount: '0',
      designs: []
    } as DesignResultType
    const category: Filter = {
      id: 1,
      name: '2js'
    }
    const sportFilter: Filter = {
      id: 1,
      name: '2js'
    }
    const data = {
      designs,
      fetchMore: () => {}
    }
    ReactDOM.render(
      <MobileDesignCenterInspiration
        {...{ designs, category, data, sportFilter, open }}
        setPaletteAction={() => {}}
        hideList={() => {}}
      />,
      div
    )
  })
})
