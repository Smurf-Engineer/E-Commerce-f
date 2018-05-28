/**
 * MyCards Component - Created by miguelcanobbio on 28/05/18.
 */
import * as React from 'react'
import { graphql, compose } from 'react-apollo'
import { connect } from 'react-redux'
import Modal from 'antd/lib/modal'
import config from '../../config'
import * as MyCardsActions from './actions'
import withError from '../WithError'
import withLoading from '../WithLoading'
import MyCard from '../MyCard'
import MyCardsList from '../MyCardsList'
import CreditCardForm from '../CreditCardForm'
import messages from './messages'
import {
  cardsQuery,
  addCardMutation,
  updateCardMutation,
  deleteCardMutation
} from './data'

import { CreditCardData } from '../../types/common'
import {
  Container,
  StyledEmptyButton,
  DeleteConfirmMessage
} from './styledComponents'

const dummyCards: CreditCardData[] = [
  {
    id: '1',
    name: 'Miguel Canobbio',
    last4: '1234',
    brand: 'Visa',
    expMonth: 4,
    expYear: 21,
    defaultPayment: true
  },
  {
    id: '2',
    name: 'Carlos Cazarez',
    last4: '9876',
    brand: 'Visa',
    expMonth: 12,
    expYear: 18
  },
  {
    id: '3',
    name: 'Gustavo Medina',
    last4: '4242',
    brand: 'Master Card',
    expMonth: 1,
    expYear: 19
  },
  {
    id: '4',
    name: 'David Gonzalez',
    last4: '5579',
    brand: 'Master Card',
    expMonth: 1,
    expYear: 19
  }
]

interface Props {
  cardHolderName: string
  stripeError: string
  cardIdToMutate: number
  showCardModal: boolean
  showDeleteCardConfirm: boolean
  modalLoading: boolean
  deleteLoading: boolean
  defaultPayment: boolean
  hasError: boolean
  formatMessage: (messageDescriptor: any) => string
  // Reducer Actions
  validFormAction: (hasError: boolean) => void
  inputChangeAction: (id: number, value: string) => void
  defaultPaymentAction: (checked: boolean) => void
  showCardModalAction: (show: boolean) => void
  showDeleteCardConfirmAction: (cardId: number) => void
  hideDeleteCardConfirmAction: () => void
  setModalLoadingAction: (loading: boolean) => void
  setDeleteLoadingAction: (loading: boolean) => void
  setCardToUpdateAction: (card: CreditCardData) => void
  resetReducerDataAction: () => void
}

interface MyWindow extends Window {
  Stripe: any
}

declare var window: MyWindow

class MyCards extends React.Component<Props, {}> {
  state = {
    stripe: null
  }
  componentDidMount() {
    // In addition to loading asynchronously, this code is safe to server-side render.
    const stripeJs = document.createElement('script')
    stripeJs.src = 'https://js.stripe.com/v3/'
    stripeJs.async = true
    stripeJs.onload = () => {
      this.setState({
        stripe: window.Stripe(config.pkStripe)
      })
    }
    // tslint:disable-next-line:no-unused-expression
    document.body && document.body.appendChild(stripeJs)
  }
  render() {
    const {
      formatMessage,
      cardHolderName,
      stripeError,
      showCardModal,
      showDeleteCardConfirm,
      modalLoading,
      deleteLoading,
      hasError
    } = this.props
    const { stripe } = this.state
    return (
      <Container>
        <StyledEmptyButton type="danger" onClick={this.handleOnAddNewAddress}>
          {formatMessage(messages.addCard)}
        </StyledEmptyButton>
        <MyCardsList items={dummyCards} {...{ formatMessage }} />
        <Modal visible={showCardModal} confirmLoading={modalLoading}>
          {/* <CreditCardForm
            {...{
              stripe,
              formatMessage,
              cardHolderName,
              billingAddress,
              hasError,
              stripeError,
              loadingBilling,
              setLoadingBillingAction,
              setStripeErrorAction,
              sameBillingAndShipping,
              sameBillingAndAddressCheckedAction,
              sameBillingAndAddressUncheckedAction,
              invalidBillingFormAction,
              setStripeCardDataAction,
              nextStep
            }}
          /> */}
        </Modal>
        <Modal visible={showDeleteCardConfirm} confirmLoading={deleteLoading}>
          <DeleteConfirmMessage>
            {formatMessage(messages.messageDeleteModal)}
          </DeleteConfirmMessage>
        </Modal>
      </Container>
    )
  }
  handleOnAddNewAddress = () => {
    const { showCardModalAction } = this.props
    showCardModalAction(true)
  }
}

const mapStateToProps = (state: any) => state.get('cards').toJS()

const MyCardsEnhance = compose(
  graphql(cardsQuery, {
    options: {
      fetchPolicy: 'network-only'
    }
  }),
  withLoading,
  withError,
  addCardMutation,
  updateCardMutation,
  deleteCardMutation,
  connect(mapStateToProps, { ...MyCardsActions })
)(MyCards)

export default MyCardsEnhance
