/**
 * PayModal Component - Created by miguelcanobbio on 23/05/18.
 */
import * as React from 'react'
import { graphql, compose } from 'react-apollo'
import {
  Container,
  ContainerMethods,
  MethodButton
} from './styledComponents'
import withError from '../WithError'
import withLoading from '../WithLoading'
import config from '../../config'
import Modal from 'antd/lib/modal/Modal'
import { StripeProvider, Elements } from 'react-stripe-elements'
import * as PayModalActions from './actions'
import { connect } from 'react-redux'
import { InjectedIntl, injectIntl } from 'react-intl'
import { PaymentOptions } from '../../screens/Checkout/constants'
import messages from './messages'

const { CREDITCARD, PAYPAL } = PaymentOptions

interface Props {
  open: boolean
  intl: InjectedIntl
  paymentMethod: string
  setStripeAction: (stripe: any) => void
  setPaymentMethodAction: (method: string) => void
  formatMessage: (messageDescriptor: any) => string
}

interface MyWindow extends Window {
  Stripe: any
}

declare var window: MyWindow

class PayModal extends React.Component<Props, {}> {
  state = {
    stripe: null,
    openConfirm: false,
    showPricing: false,
  }

  componentDidMount() {
    if (window.Stripe) {
      this.setState(
        {
          stripe: window.Stripe(config.pkStripeUS)
        },
        () => this.setStripeAction(this.state.stripe)
      )
    } else {
      // this code is safe to server-side render.
      const stripeJs = document.createElement('script')
      stripeJs.id = 'stripe-js'
      stripeJs.async = true
      stripeJs.src = 'https://js.stripe.com/v3/'
      stripeJs.onload = () => {
        this.setState(
          {
            stripe: window.Stripe(config.pkStripeUS),
          },
          () => this.setStripeAction(this.state.stripe)
        )
      }
      // tslint:disable-next-line:no-unused-expression
      document.body && document.body.appendChild(stripeJs)
    }
  }

  setStripeAction = async (stripe: any) => {
    this.setState({
      stripe
    })
  }

  handlePaypalClick = () => {
    const { setPaymentMethodAction } = this.props
    setPaymentMethodAction(PAYPAL)
    this.setState({
      openConfirm: true
    })
  }

  handleCreditCardClick = () => {
    const { setPaymentMethodAction } = this.props
    setPaymentMethodAction(CREDITCARD)
  }
  render() {
    const {
      open,
      paymentMethod,
      intl: {
        formatMessage
      }
    } = this.props
    const { stripe } = this.state
    return (
      <Modal
        visible={open}
        footer={null}
        closable={false}
        width={'352px'}
      >
        <Container>
          <ContainerMethods>
            <MethodButton
              selected={paymentMethod === CREDITCARD}
              onClick={this.handleCreditCardClick}
            >
              {formatMessage(messages.methodCreditCard)}
            </MethodButton>
            <MethodButton
              selected={paymentMethod === PAYPAL}
              onClick={this.handlePaypalClick}
            >
              {formatMessage(messages.methodPaypal)}
            </MethodButton>
          </ContainerMethods>
          {paymentMethod === CREDITCARD && (
            <StripeProvider stripe={stripe}>
              <Elements>{'PEARS'}</Elements>
            </StripeProvider>
          )}
        </Container>
      </Modal>
    )
  }
}

type OwnProps = {
  orderId?: string
}

const mapStateToProps = (state: any) => state.get('payModal').toJS()

const PayModalEnhanced = compose(
  injectIntl,
  withLoading,
  withError,
  connect(mapStateToProps, { ...PayModalActions })
)(PayModal)

export default PayModalEnhanced
