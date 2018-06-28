/**
 * DesignCenterGrid Test - Created by david on 26/02/18.
 */
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { DesignCenterGrid } from './index'
import { Theme } from '../../types/common'

describe('<DesignCenterGrid />', () => {
  test('renders without exploding', () => {
    const div = document.createElement('div')
    const themes: Theme[] = []
    const testFunc = () => {}
    const data = {
      fetchMore: () => {}
    }
    const formatMessage = (messageDescriptor: any) => ''
    const openNewThemeModalAction = (open: boolean) => {}
    const themeModalData = {
      openNewThemeModal: false,
      themeId: -1
    }
    const currentTheme = -1
    const designHasChanges = false
    ReactDOM.render(
      <DesignCenterGrid
        {...{
          themes,
          data,
          formatMessage,
          openNewThemeModalAction,
          themeModalData,
          currentTheme,
          designHasChanges
        }}
        loadingModel={false}
        onSelectTheme={testFunc}
      />,
      div
    )
  })
})
