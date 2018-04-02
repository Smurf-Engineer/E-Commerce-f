/**
 * QuickViewSlider Test - Created by cazarez on 12/02/18.
 */
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import QuickViewSlider from './index'

describe('<QuickViewSlider />', () => {
  test('renders without exploding', () => {
    const div = document.createElement('div')
    ReactDOM.render(
      <QuickViewSlider
        productImages={{ front: '', back: '', left: '', right: '' }}
        available={0}
        gotoCustomize={() => {}}
        isRetail={false}
      />,
      div
    )
  })
})
