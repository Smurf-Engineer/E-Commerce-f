/**
 * ChangePasswordModal -  Messages
 */

import { defineMessages } from 'react-intl'

export default defineMessages({
  title: {
    id: 'components.ChangePasswordModal.title',
    defaultMessage: 'Change Password'
  },
  currentPassword: {
    id: 'components.ChangePasswordModal.currentPassword',
    defaultMessage: 'Current Password'
  },
  newPassword: {
    id: 'components.ChangePasswordModal.newPassword',
    defaultMessage: 'New Password'
  },
  reEnterPassword: {
    id: 'components.ChangePasswordModal.reEnterPassword',
    defaultMessage: 'Re-enter New Password'
  },
  save: {
    id: 'components.ChangePasswordModal.save',
    defaultMessage: 'Save'
  },
  requiredField: {
    id: 'components.ChangePasswordModal.requiredField',
    defaultMessage: 'This field is required'
  },
  confirmPasswordError: {
    id: 'components.ChangePasswordModal.confirmError',
    defaultMessage: 'This field is required and must be equal to new password'
  }
})
