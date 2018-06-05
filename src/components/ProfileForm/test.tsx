/**
 * ProfileForm Test - Created by miguelcanobbio on 05/06/18.
 */
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import ProfileForm from './index'

describe('<ProfileForm />', () => {
  test('renders without exploding', () => {
    const div = document.createElement('div')
    const firstName = ''
    const lastName = ''
    const email = ''
    const phone = ''
    const formatMessage = (messageDescriptor: any) => ''
    const handleInputChange = (evt: React.FormEvent<HTMLInputElement>) =>
      void ReactDOM.render(
        <ProfileForm
          {...{
            firstName,
            lastName,
            email,
            phone,
            formatMessage,
            handleInputChange
          }}
        />,
        div
      )
  })
})
