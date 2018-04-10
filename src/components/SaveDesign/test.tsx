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
    const savedDesignId = ''
    const saveDesignNameMutation = () => {}
    const clearDesignInfo = () => {}
    const saveDesignChangesMutation = () => {}
    const closeSaveDesignModal = () => {}
    const setDesignNameAction = () => {}
    const setCheckedTerms = () => {}
    const afterSaveDesign = () => {}
    const productId = ''
    const designBase64 = ''
    const checkedTerms = false
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
          designBase64={designBase64}
          saveDesignNameMutation={saveDesignNameMutation}
          saveDesignChangesMutation={saveDesignChangesMutation}
          afterSaveDesign={afterSaveDesign}
          savedDesignId={savedDesignId}
          checkedTerms={checkedTerms}
          setCheckedTerms={setCheckedTerms}
          clearDesignInfo={clearDesignInfo}
        />
      </IntlProvider>,
      div
    )
  })
})
