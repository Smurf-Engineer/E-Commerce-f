import message from 'antd/lib/message'
import { satPaymentIdAction } from './actions'

export const savePaymentId = (paymentId: string) => {
  return async (dispatch: any) => {
    try {
      dispatch(satPaymentIdAction(paymentId))
    } catch (e) {
      message.error('Error creating payment')
    }
  }
}
