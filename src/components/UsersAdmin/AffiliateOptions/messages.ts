/**
 * AffiliateOptions -  Messages
 */

import { defineMessages } from 'react-intl'

export default defineMessages({
  enabled: {
    id: 'components.affiliateOptions.enabled',
    defaultMessage: 'Enabled'
  },
  decline: {
    id: 'components.affiliateOptions.decline',
    defaultMessage: 'Decline request'
  },
  activationDate: {
    id: 'components.affiliateOptions.activationDate',
    defaultMessage: 'Activation Date'
  },
  taxForm: {
    id: 'components.affiliateOptions.taxForm',
    defaultMessage: 'Tax Form'
  },
  comissions: {
    id: 'components.affiliateOptions.comissions',
    defaultMessage: 'Affiliate Commission'
  },
  paypalAccount: {
    id: 'components.affiliateOptions.paypalAccount',
    defaultMessage: 'Paypal Account'
  },
  status: {
    id: 'components.affiliateOptions.status',
    defaultMessage: 'Status'
  },
  edit: {
    id: 'components.affiliateOptions.edit',
    defaultMessage: 'Edit'
  },
  retry: {
    id: 'components.affiliateOptions.retry',
    defaultMessage: 'Retry request'
  },
  settings: {
    id: 'components.affiliateOptions.settings',
    defaultMessage: 'Settings'
  },
  currency: {
    id: 'components.affiliateOptions.currency',
    defaultMessage: 'Payout Currency'
  },
  region: {
    id: 'components.affiliateOptions.region',
    defaultMessage: 'Region'
  },
  payoutDesc: {
    id: 'components.affiliateOptions.payoutDesc',
    defaultMessage: `Commissions are paid out in the currency based on your defined country of residence during 
    the sign-up stage. If your default PayPal account currency differs from the payout currency, PayPal will convert 
    the deposit amount into your default currency using the prevailing exchange rate determined by PayPal.`
  }
})
