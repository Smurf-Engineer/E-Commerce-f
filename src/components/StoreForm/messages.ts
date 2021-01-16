/**
 * StoreForm -  Messages
 */

import { defineMessages } from 'react-intl'

export default defineMessages({
  title: {
    id: 'components.StoreForm.tittle',
    defaultMessage: 'StoreForm'
  },
  teamStoreName: {
    id: 'components.StoreForm.teamStoreName',
    defaultMessage: 'Team Store Name'
  },
  storeName: {
    id: 'components.StoreForm.storeName',
    defaultMessage: 'Store Name'
  },
  orderCutOffLabel: {
    id: 'components.StoreForm.cutOff',
    defaultMessage: 'Cut Off Date'
  },
  requiredFieldLabel: {
    id: 'components.StoreForm.requiredFieldLabel',
    defaultMessage: 'This field is required'
  },
  desiredDeliveryLabel: {
    id: 'components.StoreForm.desiredDeliveryLabel',
    defaultMessage: 'Desired Delivery Date'
  },
  deliveryErrorLabel: {
    id: 'components.StoreForm.deliveryErrorLabel',
    defaultMessage: 'Delivery date cannot be on a Saturday or Sunday'
  },
  errorMsg: {
    id: 'components.StoreForm.errorMsg',
    defaultMessage: 'Something wrong happened. Please try again!'
  },
  onDemandMode: {
    id: 'components.StoreForm.onDemandMode',
    defaultMessage: 'ON DEMAND MODE'
  },
  fixedMode: {
    id: 'components.StoreForm.fixedMode',
    defaultMessage: 'BATCH ORDER MODE'
  },
  gotIt: {
    id: 'components.StoreForm.gotIt',
    defaultMessage: 'Got it!'
  },
  aboutCutOff: {
    id: 'components.StoreForm.aboutCutOff',
    defaultMessage: 'ABOUT CUT-OFF DATES'
  },
  aboutCutOffInfo: {
    id: 'components.StoreForm.aboutCutOffInfo',
    defaultMessage: `Team pricing on batch order stores starts at the 20% discount tier. The price will
    Automatically drop for each item as members place orders and reach the next discount tier.
    `
  },
  aboutDelivery: {
    id: 'components.StoreForm.aboutDelivery',
    defaultMessage: 'ABOUT DELIVERY DATE'
  },
  aboutDeliveryInfo: {
    id: 'components.StoreForm.aboutDeliveryInfo',
    defaultMessage: `You can set a delivery date anytime between 14-19 days after the order cut-off date.
    If you set your delivery date on a Federal holiday, your order will be delivered the next available business
    day so plan accordingly. We recommend setting a delivery date 2-3 days in advance of any specific event date
    you may have to allow for any unforeseen delays in transit.`
  }
})
