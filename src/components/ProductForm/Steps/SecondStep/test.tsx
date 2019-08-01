/**
 * AboutUs Test - Created by Apodaca on 16/05/19.
 */
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { IntlProvider } from 'react-intl'
import { SecondStep } from './index'
import { Product } from '../../../../types/common'

describe('<SecondStep />', () => {
  test('renders without exploding', () => {
    const props = { locale: 'en' }
    const div = document.createElement('div')
    const format = (message: string) => 'string'
    const product: Product = jest.genMockFromModule(
      '../../../../../__mocks__/productMock'
    )

    ReactDOM.render(
      <IntlProvider {...props}>
        <SecondStep
          {...{ product }}
          setColors={() => {}}
          setCheck={() => {}}
          setValue={() => {}}
          formatMessage={format}
          sizes={[]}
          colors={[]}
          fitStyles={[]}
        />
      </IntlProvider>,
      div
    )
  })
})
