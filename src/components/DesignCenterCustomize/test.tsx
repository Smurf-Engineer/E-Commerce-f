/**
 * DesignCenterCustomize Test - Created by david on 26/02/18.
 */
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import DesignCenterCustomize from './index'

describe('<DesignCenterCustomize />', () => {
  test('renders without exploding', () => {
    const div = document.createElement('div')
    const selectColorBlock = (index: number) => {}
    const selectColor = (color: string) => {}
    const selectPalette = (colorsTest: string[]) => {}
    const colors: string[] = []
    ReactDOM.render(
      <DesignCenterCustomize
        {...{ colors }}
        onSelectColorBlock={selectColorBlock}
        colorBlock={0}
        onSelectColor={selectColor}
        onSelectPalette={selectPalette}
      />,
      div
    )
  })
})
