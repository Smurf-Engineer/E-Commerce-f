/**
 * OrderFiles Test - Created by miguelcanobbio on 16/08/18.
 */
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { OrderFiles } from './index'
import { OrderSearchResult } from '../../../types/common'
import { configureBrowserClient } from '../../../apollo'
import { ApolloProvider } from 'react-apollo'
import { IntlProvider } from 'react-intl'
const client = configureBrowserClient()

describe('<OrderFiles />', () => {
  test('renders without exploding', () => {
    const div = document.createElement('div')
    const product: OrderSearchResult = jest.genMockFromModule(
      '../../../../__mocks__/productMock'
    )
    const order = {
      ...product,
      assets: {
        files: [],
        svgs: []
      }
    }
    const props = { locale: 'en' }
    ReactDOM.render(
      <ApolloProvider {...{ client }}>
        <IntlProvider {...props}>
          <OrderFiles
            {...{ order }}
            uploadingFile={false}
            actualSvg={''}
            uploadingThumbnail={false}
            changes={false}
            colorAccessories={{}}
            downloadFile={() => {}}
            onUploadFile={() => {}}
            formatMessage={() => ''}
            onSaveThumbnail={() => {}}
            setUploadingThumbnailAction={() => {}}
            onSelectStitchingColor={() => {}}
            onSelectColor={() => {}}
          />
        </IntlProvider>
      </ApolloProvider>,
      div
    )
  })
})
