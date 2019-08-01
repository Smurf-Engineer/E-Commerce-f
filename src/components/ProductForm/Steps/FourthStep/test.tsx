/**
 * FourthStep Test - Created by Apodaca on 07/02/19.
 */
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { IntlProvider } from 'react-intl'
import { FourthStep } from './index'

describe('<FourthStep />', () => {
  test('renders without exploding', () => {
    const props = { locale: 'en' }
    const div = document.createElement('div')
    const format = (message: string) => 'string'

    ReactDOM.render(
      <IntlProvider {...props}>
        <FourthStep
          formatMessage={format}
          productMaterials={[]}
          mediaFiles={[]}
          selectedGenders={{}}
          colorsProducts={[]}
          genders={[]}
          customizable={false}
          bannerMaterials={[]}
          colors={[]}
          removeBanner={() => {}}
          uploadMediaFile={() => {}}
          addMedia={() => {}}
          removeMedia={() => {}}
          moveFile={() => {}}
          moveBanner={() => {}}
          addBanner={() => {}}
          setBanner={() => {}}
          removeFile={() => {}}
          addFile={() => {}}
          setFileField={() => {}}
          setCheck={() => {}}
          setValue={() => {}}
        />
      </IntlProvider>,
      div
    )
  })
})
