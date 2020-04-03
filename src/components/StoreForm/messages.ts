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
  shipping: {
    id: 'components.StoreForm.shipping',
    defaultMessage: 'Orders ship within 7 days of receipt of order.'
  },
  onDemandMode: {
    id: 'components.StoreForm.onDemandMode',
    defaultMessage: 'ON DEMAND MODE'
  },
  fixedMode: {
    id: 'components.StoreForm.fixedMode',
    defaultMessage: 'BATCH ORDER'
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
    defaultMessage: `The maximum order cut-off date is 15 days from the current date.
    You will have the option, if necessary, to extend your Cut-Off date 1X once up to a maximum of +3 days
    or to an earlier date from your original cut-off date in the case you’ve collected all the
    orders and wish to go to production sooner.`
  },
  aboutDelivery: {
    id: 'components.StoreForm.aboutDelivery',
    defaultMessage: 'ABOUT DELIVERY DATE'
  },
  aboutDeliveryInfo: {
    id: 'components.StoreForm.aboutDeliveryInfo',
    defaultMessage: `You can set a delivery date anytime between14-19 days after the cut-off date.
    If you set your delivery date on a Federal holiday, your order may be delivered the next available
    business day so plan accordingly. We recommend setting a delivery date 2-3 days in advance of
    any specific event date you may have to allow for any unforeseen delays in transit.`
  }
})
