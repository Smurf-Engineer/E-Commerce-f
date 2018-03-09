/**
 * OptionsController Test - Created by david on 05/03/18.
 */
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import OptionsController from './index'

describe('<OptionsController />', () => {
  test('renders without exploding', () => {
    const div = document.createElement('div')
    const testFunction = () => {}
    ReactDOM.render(
      <OptionsController
        undoEnabled={false}
        redoEnabled={false}
        onClickUndo={testFunction}
        onClickRedo={testFunction}
        onClickReset={testFunction}
        onClickClear={testFunction}
      />,
      div
    )
  })
})
