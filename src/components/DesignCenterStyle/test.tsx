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
      styles: {
        fullCount: '0',
        styles: []
      }
    }
    const formatMessage = (messageDescriptor: any) => ''
    const openNewStyleModalAction = (open: boolean) => {}
    const styleModalData = {
      openNewStyleModal: false,
      indexStyle: -1,
      idStyle: -1
    }
    const currentStyle = 0
    ReactDOM.render(
      <IntlProvider {...props}>
        <DesignCenterStyle
          {...{
            currentStyle,
            data,
            formatMessage,
            openNewStyleModalAction,
            styleModalData
          }}
          onSelectStyle={testFunc}
          onSelectStyleComplexity={() => {}}
        />
      </IntlProvider>,
      div
    )
  })
})
