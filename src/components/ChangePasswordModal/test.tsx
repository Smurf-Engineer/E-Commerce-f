/**
 * ChangePasswordModal Test - Created by miguelcanobbio on 05/06/18.
 */
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import ChangePasswordModal from './index'

describe('<ChangePasswordModal />', () => {
  test('renders without exploding', () => {
    const div = document.createElement('div')
    const showPasswordModal = false
    const passwordModalLoading = false
    const currentPassword = ''
    const newPassword = ''
    const newPasswordConfirm = ''
    const formatMessage = (messageDescriptor: any) => 'string'
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {}
    const toggleModalPassword = () => {}
    ReactDOM.render(
      <ChangePasswordModal
        {...{
          toggleModalPassword,
          showPasswordModal,
          passwordModalLoading,
          currentPassword,
          newPassword,
          newPasswordConfirm,
          formatMessage,
          handleInputChange
        }}
      />,
      div
    )
  })
})
