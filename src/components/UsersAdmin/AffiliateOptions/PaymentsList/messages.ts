/**
 * PaymentsList -  Messages
 */

import { defineMessages } from 'react-intl'

export default defineMessages({
  title: {
    id: 'components.PaymentsList.title',
    defaultMessage: 'Payment History'
  },
  emptyMessage: {
    id: 'components.PaymentsList.emptyMessage',
    defaultMessage: 'Your applied payments will show here'
  },
  number: {
    id: 'components.PaymentsList.number',
    defaultMessage: 'Payment No.'
  },
  date: {
    id: 'components.PaymentsList.date',
    defaultMessage: 'Payment Date'
  },
  status: {
    id: 'components.PaymentsList.status',
    defaultMessage: 'Status'
  },
  amount: {
    id: 'components.PaymentsList.amount',
    defaultMessage: 'Amount'
  },
  receipt: {
    id: 'components.PaymentsList.receipt',
    defaultMessage: 'Receipt'
  },
  subtitle: {
    id: 'components.PaymentsList.subtitle',
    defaultMessage: `Payouts are made on or before the 15th of each month and cover commissions
    payable on orders from the previous month.`
  }
})
