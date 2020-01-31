/**
 * UsersAdmin -  Messages
 */

import { defineMessages } from 'react-intl'

export default defineMessages({
  title: {
    id: 'components.UsersAdmin.title',
    defaultMessage: 'Users List'
  },
  unexpectedError: {
    id: 'components.UsersAdmin.unexpectedError',
    defaultMessage: 'Oops! Something went wrong.'
  },
  requiredFieldsError: {
    id: 'components.UsersAdmin.requiredFieldsError',
    defaultMessage: 'All fields are required!.'
  },
  userAdded: {
    id: 'components.UsersAdmin.userAdded',
    defaultMessage: '{name} added!.'
  },
  invalidEmail: {
    id: 'components.UsersAdmin.invalidEmail',
    defaultMessage: 'Invalid email, please verify.'
  }
})
