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
    const saveDesignChangesMutation = () => {}
    const closeSaveDesignModal = () => {}
    const setDesignNameAction = () => {}
    const setCheckedTerms = () => {}
    const afterSaveDesign = () => {}
    const setSaveDesignLoading = () => {}
    const productId = ''
    const design = {
      designBase64: 'string',
      canvasSvg: 'string',
      canvasJson: 'string',
      styleId: 0
    }
    const checkedTerms = false
    const saveDesignLoading = false
    const div = document.createElement('div')
    const format = (message: string) => 'string'
    ReactDOM.render(
      <IntlProvider {...props}>
        <SaveDesign
          {...{ open, productId, design, designName }}
          open={open}
          requestClose={closeSaveDesignModal}
          formatMessage={format}
          onDesignName={setDesignNameAction}
          colors={colors}
          saveDesignNameMutation={saveDesignNameMutation}
          saveDesignChangesMutation={saveDesignChangesMutation}
          afterSaveDesign={afterSaveDesign}
          savedDesignId={savedDesignId}
          checkedTerms={checkedTerms}
          setCheckedTerms={setCheckedTerms}
          setSaveDesignLoading={setSaveDesignLoading}
          saveDesignLoading={saveDesignLoading}
        />
      </IntlProvider>,
      div
    )
  })
})
