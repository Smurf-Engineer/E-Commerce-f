/**
 * Notifications -  Messages
 */

import { defineMessages } from 'react-intl'

export default defineMessages({
  title: {
    id: 'components.Notifications.title',
    defaultMessage: 'Notification Center'
  },
  latest: {
    id: 'components.Notifications.latest',
    defaultMessage: 'LATEST'
  },
  markAll: {
    id: 'components.Notifications.markAll',
    defaultMessage: 'Mark all as read'
  },
  notFound: {
    id: 'components.Notifications.notFound',
    defaultMessage: 'You don´t have notifications yet'
  },
  readError: {
    id: 'components.Notifications.notFound',
    defaultMessage: 'There was an error trying to update notifications, please try again'
  }
})
