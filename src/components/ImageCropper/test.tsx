/**
 * ImageCropper Test - Created by Jesus Apodaca on 07/02/18.
 */
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { IntlProvider } from 'react-intl'
import ImageCropper from './index'

describe('<ImageCropper />', () => {
  test('renders without exploding', () => {
    const props = { locale: 'en' }
    const div = document.createElement('div')
    const formatMessage = (message: string) => 'string'
    const image = ''
    const setImage = (img: Blob) => {}
    const requestClose = () => {}
    const open = false
    ReactDOM.render(
      <IntlProvider {...props}>
        <BrowserRouter>
          <ImageCropper
            {...{ image, setImage, requestClose, open, formatMessage }}
          />
        </BrowserRouter>
      </IntlProvider>,
      div
    )
  })
})
