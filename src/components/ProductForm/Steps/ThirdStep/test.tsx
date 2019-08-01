/**
 * AboutUs Test - Created by cazarez on 07/02/18.
 */
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { IntlProvider } from 'react-intl'
import { ThirdStep } from './index'
import { Product } from '../../../../types/common'

describe('<ThirdStep />', () => {
  test('renders without exploding', () => {
    const props = { locale: 'en' }
    const div = document.createElement('div')
    const format = (message: string) => 'string'
    const product: Product = jest.genMockFromModule(
      '../../../../../__mocks__/productMock'
    )

    ReactDOM.render(
      <IntlProvider {...props}>
        <ThirdStep
          {...{ product }}
          sizes={[]}
          colors={[]}
          fitStyles={[]}
          formatMessage={format}
          setValue={() => {}}
        />
      </IntlProvider>,
      div
    )
  })
})
