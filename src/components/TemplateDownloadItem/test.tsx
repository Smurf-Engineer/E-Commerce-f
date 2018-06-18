/**
 * TemplateDownloadItem Test - Created by miguelcanobbio on 15/06/18.
 */
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import TemplateDownloadItem from './index'

describe('<TemplateDownloadItem />', () => {
  test('renders without exploding', () => {
    const div = document.createElement('div')
    const imageSource = ''
    const name = ''
    const description = ''
    const fileUrl = ''
    const formatMessage = (messageDescriptor: any) => ''
    ReactDOM.render(
      <TemplateDownloadItem
        {...{ imageSource, name, description, fileUrl, formatMessage }}
      />,
      div
    )
  })
})
