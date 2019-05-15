/**
 * Admin -  Messages
 */

import { defineMessages } from 'react-intl'

export default defineMessages({
  adminTitle: {
    id: 'screens.Admin.adminTitle',
    defaultMessage: 'Admin'
  },
  welcomeMessage: {
    id: 'screens.Admin.welcomeMessage',
    defaultMessage: 'Hi {name}! Welcome to Jakroo'
  },
  forbidden: {
    id: 'screens.Admin.forbidden',
    // tslint:disable-next-line:quotemark
    defaultMessage: "You don't have permissions for this section"
  }
})
