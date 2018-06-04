/**
 * CreditCardForm Test - Created by miguelcanobbio on 29/05/18.
 */
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import CreditCardForm from './index'
import { Elements } from 'react-stripe-elements'
import { StripeCardData } from '../../types/common'

describe('<CreditCardForm />', () => {
  test('renders without exploding', () => {
    const div = document.createElement('div')
    const stripeError = ''
    const cardHolderName = ''
    const hasError = false
    const formatMessage = (messageDescriptor: any) => 'string'
    const inputChangeAction = (id: string, value: string) => {}
    const setStripeCardDataAction = (stripeCardData: StripeCardData) => {}
    const setStripeErrorAction = (error: string) => {}
    const visible = false
    const newCardLoading = false
    const showCardModalAction = (show: boolean) => {}
    const saveAddress = (token: string) => {}
    const validFormAction = (valid: boolean) => {}
    const setModalLoadingAction = (loading: boolean) => {}
    const setDefaultPaymentCheckedAction = (checked: boolean) => {}
    const cardAsDefaultPayment = false
    ReactDOM.render(
      <Elements>
        <CreditCardForm
          {...{
            showCardModalAction,
            newCardLoading,
            visible,
            stripeError,
            cardHolderName,
            hasError,
            formatMessage,
            inputChangeAction,
            setStripeCardDataAction,
            setStripeErrorAction,
            saveAddress,
            validFormAction,
            setModalLoadingAction,
            setDefaultPaymentCheckedAction,
            cardAsDefaultPayment
          }}
        />
      </Elements>,
      div
    )
  })
})
