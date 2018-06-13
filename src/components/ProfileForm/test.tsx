/**
 * ProfileForm Test - Created by miguelcanobbio on 05/06/18.
 */
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import ProfileForm from './index'
import { UserProfileSettings } from '../../types/common'

describe('<ProfileForm />', () => {
  test('renders without exploding', () => {
    const div = document.createElement('div')
    const firstName = ''
    const lastName = ''
    const email = ''
    const phone = ''
    const loading = false
    const userProfile: UserProfileSettings = {
      firstName,
      lastName,
      email,
      phone
    }
    const formatMessage = (messageDescriptor: any) => ''
    const handleInputChange = (evt: React.FormEvent<HTMLInputElement>) => {}
    const onSaveProfileSettings = () => {}
    const onToggleModalPassword = () => {}
    ReactDOM.render(
      <ProfileForm
        {...{
          onToggleModalPassword,
          onSaveProfileSettings,
          userProfile,
          loading,
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
