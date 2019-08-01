/**
 * OrderDetails Test - Created by jorge on 23/07/18.
 */
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { IntlProvider } from 'react-intl'
import { createMemoryHistory } from 'history'
import { ProductForm } from './index'
import { Product } from '../../types/common'

describe('<ProductForm />', () => {
  test('renders without exploding', () => {
    const div = document.createElement('div')
    const product: Product = jest.genMockFromModule(
      '../../../__mocks__/productMock'
    )
    const history = createMemoryHistory()
    const dataExtra = {
      categories: [],
      sports: [],
      fetchMore: jest.fn()
    }
    const uploadFilesAction = jest.fn()
    const upsertProductAction = jest.fn()
    const getDataProduct = jest.fn()
    const getExtraDataAction = jest.fn()

    ReactDOM.render(
      <IntlProvider locale="en">
        <ProductForm
          {...{
            product,
            history,
            dataExtra,
            upsertProductAction,
            getDataProduct,
            getExtraDataAction,
            uploadFilesAction
          }}
          uploadMediaFile={() => {}}
          addMedia={() => {}}
          removeMedia={() => {}}
          resetData={() => {}}
          setSpec={() => {}}
          setMaterial={() => {}}
          setPrompt={() => {}}
          enableNewSportAction={() => {}}
          setNewSport={() => {}}
          setValue={() => {}}
          removeBanner={() => {}}
          setDesignCenter={() => {}}
          setColors={() => {}}
          addBanner={() => {}}
          setBanner={() => {}}
          removeFile={() => {}}
          moveFile={() => {}}
          moveBanner={() => {}}
          addFile={() => {}}
          setFileField={() => {}}
          setGenderAction={() => {}}
          setCheck={() => {}}
          setCurrencies={() => {}}
          setProductAction={() => {}}
          formatMessage={() => ''}
          setUploadingAction={() => {}}
          bannerMaterials={[]}
          newSport={''}
          newSportEnabled={false}
          match={{}}
          client={{}}
          bannersLoading={false}
          loading={false}
          openPrompt={false}
          loadingMessage={''}
          specDetail={''}
          materialDetail={''}
        />
      </IntlProvider>,
      div
    )
  })
})
