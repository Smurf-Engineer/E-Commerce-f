import message from 'antd/lib/message'
import { satPaymentIdAction } from './actions'
import { PaymentIntent } from '../../types/common'

export const savePaymentId = (paymentIntent: PaymentIntent) => {
  return async (dispatch: any) => {
    try {
      dispatch(
        satPaymentIdAction(
          paymentIntent.paymentClientSecret,
          paymentIntent.intentId
        )
      )
    } catch (e) {
      message.error('Error creating payment')
    }
  }
}
