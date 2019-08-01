/**
 * FirstStep Test - Created by Apodaca on 15/02/19.
 */
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { IntlProvider } from 'react-intl'
import { FirstStep } from './index'
import { Product } from '../../../../types/common'

describe('<FirstStep />', () => {
  test('renders without exploding', () => {
    const props = { locale: 'en' }
    const div = document.createElement('div')
    const format = (message: string) => 'string'
    const product: Product = jest.genMockFromModule(
      '../../../../../__mocks__/productMock'
    )

    ReactDOM.render(
      <IntlProvider {...props}>
        <FirstStep
          {...{
            product
          }}
          setMaterial={() => {}}
          setSpec={() => {}}
          removeFile={() => {}}
          addFile={() => {}}
          moveFile={() => {}}
          setValue={() => {}}
          enableNewSportAction={() => {}}
          setNewSport={() => {}}
          setDesignCenter={() => {}}
          setGenderAction={() => {}}
          setCheck={() => {}}
          formatMessage={format}
          genders={[]}
          categories={[]}
          materials={[]}
          sports={[]}
          relatedTags={[]}
          seasons={[]}
          newSport={''}
          newSportEnabled={false}
          specDetail={''}
          materialDetail={''}
        />
      </IntlProvider>,
      div
    )
  })
})
