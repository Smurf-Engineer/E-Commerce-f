/**
 * OrderSMSAlertsModal -  Messages
 */

import { defineMessages } from 'react-intl'

export default defineMessages({
  title: {
    id: 'components.OrderSMSAlertsModal.title',
    defaultMessage: 'Stay connected with SMS alerts',
  },
  description: {
    id: 'components.OrderSMSAlertsModal.description',
    defaultMessage: `
      Opt in to receive SMS alerts related to your order 
      including status and payment updates and shipping notifications.`,
  },
  certify: {
    id: 'components.OrderSMSAlertsModal.certify',
    defaultMessage:
      'Rates may apply by your carrier.',
  },
  optOut: {
    id: 'components.OrderSMSAlertsModal.optOut',
    defaultMessage: 'Rates may apply by your carrier. Opt out any time by texting STOP',
  },
  ok: {
    id: 'components.OrderSMSAlertsModal.ok',
    defaultMessage: 'OK',
  },
  signUp: {
    id: 'components.OrderSMSAlertsModal.signUp',
    defaultMessage: 'Sign Up',
  },
  noThanks: {
    id: 'components.OrderSMSAlertsModal.noThanks',
    defaultMessage: 'No, thanks',
  },
  phoneSaved: {
    id: 'components.OrderSMSAlertsModal.phoneSaved',
    defaultMessage: 'Phone number saved!',
  },
  invalidPhone: {
    id: 'components.OrderSMSAlertsModal.invalidPhone',
    defaultMessage: 'Phone number must be at least 11 characters including the country code'
  },
  updateNotificationSuccessMessage: {
    id: 'components.Notifications.Preferences.updateNotificationSuccessMessage',
    defaultMessage: 'Notification Settings has been updated!',
  },
  phone: {
    id: 'components.ProfileForm.phone',
    defaultMessage: 'Mobile Number',
  },
  footer: {
    id: 'components.OrderSMSAlertsModal.footer',
    defaultMessage: `
      See all available notifications on your 
      <a href="/account?option=notifications">Notifications Dashboard</a>`
  },
})
