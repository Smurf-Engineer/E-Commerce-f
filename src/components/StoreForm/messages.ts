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
    defaultMessage: 'Delivery date cannot be on a Sunday or Federal Holiday'
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
    defaultMessage: 'FIXED DATE'
  }
})
