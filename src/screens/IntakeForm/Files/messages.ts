/**
 * Files -  Messages
 */

import { defineMessages } from 'react-intl'

export default defineMessages({
  description: {
    id: 'screens.IntakeForm.Files.description',
    defaultMessage: 'I agree that I have the permission and/or rights of use for the uploaded files'
  },
  imageExtensionError: {
    id: 'components.IntakeForm.Files.imageExtensionError',
    defaultMessage: 'Oh no! Your file has to be an jpg, jpeg or png'
  },
  imageSizeError: {
    id: 'components.IntakeForm.Files.imageSizeError',
    defaultMessage: 'Oh no! Max file size is limited to 256MB'
  },
  loginMessage: {
    id: 'components.IntakeForm.Files.loginMessage',
    defaultMessage: 'To continue log in please'
  },
  login: {
    id: 'components.IntakeForm.Files.login',
    defaultMessage: `Log in / Sign up`
  },
  delete: {
    id: 'components.IntakeForm.Files.delete',
    defaultMessage: `Delete`
  },
  edit: {
    id: 'components.IntakeForm.Files.edit',
    defaultMessage: `Rename`
  },
  yesUpload: {
    id: 'components.IntakeForm.Files.yesUpload',
    defaultMessage: `<strong>YES</strong> • Upload`
  },
  noUpload: {
    id: 'components.IntakeForm.Files.noUpload',
    defaultMessage: `<strong>NO</strong> • Not now`
  },
})
