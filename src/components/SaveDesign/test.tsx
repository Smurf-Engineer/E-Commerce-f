/**
 * SaveDesign Test - Created by gustavomedina on 21/03/18.
 */
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { IntlProvider } from 'react-intl'
import { SaveDesign } from './index'

describe('<SaveDesign />', () => {
  test('renders without exploding', () => {
    const props = { locale: 'en' }
    const designName = ''
    const colors = ['']
    const open = false
    const savedDesignId = 0
    const saveDesignNameMutation = () => {}
    const closeSaveDesignModal = () => {}
    const setDesignNameAction = () => {}
    const afterSaveDesign = () => {}
    const productId = ''
    const div = document.createElement('div')
    const format = (message: string) => 'string'
    ReactDOM.render(
      <IntlProvider {...props}>
        <SaveDesign
          {...{ open, productId }}
          open={open}
          requestClose={closeSaveDesignModal}
          formatMessage={format}
          onDesignName={setDesignNameAction}
          designName={designName}
          colors={colors}
          saveDesignNameMutation={saveDesignNameMutation}
          afterSaveDesign={afterSaveDesign}
          savedDesignId={savedDesignId}
        />
      </IntlProvider>,
      div
    )
  })
})
