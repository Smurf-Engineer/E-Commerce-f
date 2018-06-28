/**
 * LockerTable -  Messages
 */

import { defineMessages } from 'react-intl'

export default defineMessages({
  starting: {
    id: 'components.LockerTable.starting',
    defaultMessage: 'Starting Price'
  },
  target: {
    id: 'components.LockerTable.target',
    defaultMessage: 'Target Price'
  },
  orders: {
    id: 'components.LockerTable.orders',
    defaultMessage: 'Current Orders'
  },
  current: {
    id: 'components.LockerTable.current',
    defaultMessage: 'Current Price'
  },
  visible: {
    id: 'components.LockerTable.visible',
    defaultMessage: 'Visible'
  },
  cannotHide: {
    id: 'components.ProductRow.cannotHide',
    defaultMessage:
      'During the ordering period, you cannot hide items with orders.'
  },
  cannotDelete: {
    id: 'components.ProductRow.cannotDelete',
    defaultMessage:
      'During the ordering period, you cannot delete items with orders.'
  }
})
