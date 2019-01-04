import { defineMessages } from 'react-intl'

export default defineMessages({
  name: {
    id: 'components.IbanForm.name',
    defaultMessage: 'Name'
  },
  iban: {
    id: 'components.IbanForm.iban',
    defaultMessage: 'IBAN'
  },
  email: {
    id: 'components.IbanForm.email',
    defaultMessage: 'Email'
  },
  error: {
    id: 'components.IbanForm.error',
    defaultMessage:
      'IBAN payments only allowed for Austria, France, Germany, Italy, Spain and Switzerland'
  },
  continue: {
    id: 'components.IbanForm.continue',
    defaultMessage: 'Continue'
  },
  requiredField: {
    id: 'components.IbanForm.requiredField',
    defaultMessage: 'This field is required'
  },
  mandate: {
    id: 'components.IbanForm.mandate',
    defaultMessage:
      'By providing your IBAN and confirming this payment, you are authorizing JAKROO Custom Apparel and Stripe, \
      our payment service provider, to send instructions to your bank to debit your account and your bank to \
      debit your account in accordance with those instructions. You are entitled to a refund from your bank under \
      the terms and conditions of your agreement with your bank. A refund must be claimed within 8 weeks \
      starting from the date on which your account was debited.'
  },
  unknowError: {
    id: 'components.IbanForm.unknowError',
    defaultMessage: 'Oops! Something went wrong'
  }
})
