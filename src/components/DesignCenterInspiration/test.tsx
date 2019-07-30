/**
 * DesignCenterInspiration Test - Created by gustavomedina on 23/04/18.
 */
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { DesignCenterInspiration } from './index'
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
      <DesignCenterInspiration
        {...{ designs, category, data, sportFilter }}
        setPaletteAction={() => {}}
        hideBottomSheet={() => {}}
        formatMessage={() => ''}
      />,
      div
    )
  })
})
