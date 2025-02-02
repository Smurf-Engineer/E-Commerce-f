/**
 * DesignCenterStyle Test - Created by david on 12/03/18.
 */
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { IntlProvider } from 'react-intl'
import { DesignCenterStyle } from './index'

describe('<DesignCenterStyle />', () => {
  test('renders without exploding', () => {
    const props = { locale: 'en' }
    const div = document.createElement('div')
    const testFunc = () => {}
    const data = {
      fetchMore: () => {},
      styles: []
    }
    const formatMessage = (messageDescriptor: any) => ''
    const openNewStyleModalAction = (open: boolean) => {}
    const styleModalData = {
      openNewStyleModal: false,
      indexStyle: -1,
      idStyle: -1
    }
    const styleIndex = 0
    const designHasChanges = false
    ReactDOM.render(
      <IntlProvider {...props}>
        <DesignCenterStyle
          {...{
            styleIndex,
            data,
            formatMessage,
            openNewStyleModalAction,
            styleModalData,
            designHasChanges
          }}
          productId={1}
          themeId={1}
          complexity={1}
          onSelectStyle={testFunc}
          onSelectStyleComplexity={() => {}}
        />
      </IntlProvider>,
      div
    )
  })
})
