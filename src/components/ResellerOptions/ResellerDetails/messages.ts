/**
 * ResellerDetails -  Messages
 */

import { defineMessages } from 'react-intl'

export default defineMessages({
  enabled: {
    id: 'components.ResellerDetails.enabled',
    defaultMessage: 'Enabled'
  },
  decline: {
    id: 'components.ResellerDetails.decline',
    defaultMessage: 'Decline request'
  },
  activationDate: {
    id: 'components.ResellerDetails.activationDate',
    defaultMessage: 'Activation Date'
  },
  taxForm: {
    id: 'components.ResellerDetails.taxForm',
    defaultMessage: 'Tax Form'
  },
  comissions: {
    id: 'components.ResellerDetails.comissions',
    defaultMessage: 'Reseller Commission'
  },
  resellerOptions: {
    id: 'components.ResellerDetails.resellerOptions',
    defaultMessage: 'Reseller Options'
  },
  paypalAccount: {
    id: 'components.ResellerDetails.paypalAccount',
    defaultMessage: 'Paypal Account'
  },
  status: {
    id: 'components.ResellerDetails.status',
    defaultMessage: 'Status'
  },
  edit: {
    id: 'components.ResellerDetails.edit',
    defaultMessage: 'Edit'
  },
  retry: {
    id: 'components.ResellerDetails.retry',
    defaultMessage: 'Retry request'
  },
  settings: {
    id: 'components.ResellerDetails.settings',
    defaultMessage: 'Settings'
  },
  currency: {
    id: 'components.ResellerDetails.currency',
    defaultMessage: 'Payout Currency'
  },
  region: {
    id: 'components.ResellerDetails.region',
    defaultMessage: 'Region'
  },
  payoutDesc: {
    id: 'components.ResellerDetails.payoutDesc',
    defaultMessage: `Commissions are paid out in the currency based on your defined country of residence during 
    the sign-up stage. If your default PayPal account currency differs from the payout currency, PayPal will convert 
    the deposit amount into your default currency using the prevailing exchange rate determined by PayPal.`
  }
})
