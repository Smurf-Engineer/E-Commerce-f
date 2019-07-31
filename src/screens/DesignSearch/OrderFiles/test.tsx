/**
 * OrderFiles Test - Created by miguelcanobbio on 16/08/18.
 */
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { OrderFiles } from './index'
import { OrderSearchResult } from '../../../types/common'

describe('<OrderFiles />', () => {
  test('renders without exploding', () => {
    const div = document.createElement('div')
    const product: OrderSearchResult = jest.genMockFromModule(
      './__mocks__/productMock'
    )
    const order = {
      ...product
    }
    ReactDOM.render(
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
      />,
      div
    )
  })
})
