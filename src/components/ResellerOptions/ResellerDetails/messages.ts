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
    defaultMessage: 'Dealer Margin'
  },
  marginPopover: {
    id: 'components.ResellerDetails.marginPopover',
    // tslint:disable-next-line: max-line-length
    defaultMessage: '<span>Dealer Margin</span><p><b>Custom products</b> are items which either you or Jakroo Designers have designed specifically for you. <b>Inline products</b> are items that have been pre-made by Jakroo and are sold as part of a retail collection and not customizable.</p><p>The Dealer margin is fixed and used to determine your purchase price of each type of product.</p>'
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
  customMargin: {
    id: 'components.ResellerDetails.customMargin',
    defaultMessage: 'Custom Prod. Margin'
  },
  inlineMargin: {
    id: 'components.ResellerDetails.inlineMargin',
    defaultMessage: 'Inline Prod. Margin'
  },
  payoutDesc: {
    id: 'components.ResellerDetails.payoutDesc',
    // tslint:disable-next-line: max-line-length
    defaultMessage: `<span>Payout Currency</span><p>Commissions are paid out in the currency based on your defined country of residence during the sign-up stage. If your default PayPal account currency differs from the payout currency, PayPal will convert the deposit amount into your default currency using the prevailing exchange rate determined by PayPal.</p>`
  }
})
