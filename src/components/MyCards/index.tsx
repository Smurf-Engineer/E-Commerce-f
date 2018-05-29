/**
 * MyCards Component - Created by miguelcanobbio on 28/05/18.
 */
import * as React from 'react'
import { graphql, compose } from 'react-apollo'
import { connect } from 'react-redux'
import Modal from 'antd/lib/modal'
import { StripeProvider, Elements } from 'react-stripe-elements'
import config from '../../config'
import * as MyCardsActions from './actions'
import withError from '../WithError'
import withLoading from '../WithLoading'
import MyCardsList from '../MyCardsList'
import ModalCreditCard from '../ModalCreditCard'
import messages from './messages'
import {
  cardsQuery,
  addCardMutation,
  updateCardMutation,
  deleteCardMutation
} from './data'

import { CreditCardData, QueryProps, StripeCardData } from '../../types/common'
import {
  Container,
  StyledEmptyButton,
  DeleteConfirmMessage
} from './styledComponents'

interface Data extends QueryProps {
  userCards: {
    cards: CreditCardData[]
    default: string
  }
}

interface Props {
  data: Data
  cardHolderName: string
  stripeError: string
  cardIdToMutate: number
  cardAsDefaultPayment: boolean
  showCardModal: boolean
  showDeleteCardConfirm: boolean
  modalLoading: boolean
  deleteLoading: boolean
  defaultPayment: boolean
  hasError: boolean
  formatMessage: (messageDescriptor: any) => string
  // Reducer Actions
  validFormAction: (hasError: boolean) => void
  inputChangeAction: (id: string, value: string) => void
  defaultPaymentAction: (checked: boolean) => void
  showCardModalAction: (show: boolean) => void
  showDeleteCardConfirmAction: (cardId: string) => void
  hideDeleteCardConfirmAction: () => void
  setModalLoadingAction: (loading: boolean) => void
  setDeleteLoadingAction: (loading: boolean) => void
  setDefaultPaymentCheckedAction: (checked: boolean) => void
  setCardToUpdateAction: (card: CreditCardData) => void
  resetReducerDataAction: () => void
  setStripeCardDataAction: (stripeCardData: StripeCardData) => void
  setStripeErrorAction: (error: string) => void
  // mutations apollo
  addNewCard: (variables: {}) => void
  updateCard: (variables: {}) => void
  deleteCard: (variables: {}) => void
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
      data: {
        userCards: { cards, default: idDefaultCard }
      },
      formatMessage,
      cardHolderName,
      stripeError,
      showCardModal,
      showCardModalAction,
      showDeleteCardConfirm,
      cardAsDefaultPayment,
      modalLoading,
      deleteLoading,
      hasError,
      inputChangeAction,
      setStripeErrorAction,
      setModalLoadingAction,
      setDefaultPaymentCheckedAction,
      validFormAction
    } = this.props
    const { stripe } = this.state
    return (
      <Container>
        <StyledEmptyButton type="danger" onClick={this.handleOnAddNewAddress}>
          {formatMessage(messages.addCard)}
        </StyledEmptyButton>
        <MyCardsList
          items={cards}
          {...{ formatMessage, idDefaultCard }}
          showConfirmDeleteAction={this.handleOnShowDeleteCardConfirm}
        />
        <StripeProvider {...{ stripe }}>
          <Elements>
            <ModalCreditCard
              {...{
                stripe,
                formatMessage,
                cardHolderName,
                hasError,
                stripeError,
                inputChangeAction,
                setStripeErrorAction,
                showCardModalAction,
                validFormAction,
                setModalLoadingAction,
                setDefaultPaymentCheckedAction,
                cardAsDefaultPayment
              }}
              saveAddress={this.handleOnSaveCard}
              visible={showCardModal}
              newCardLoading={modalLoading}
            />
          </Elements>
        </StripeProvider>
        <Modal
          visible={showDeleteCardConfirm}
          confirmLoading={deleteLoading}
          maskClosable={false}
          okText={formatMessage(messages.deleteCard)}
          onOk={this.handleOnDeleteCard}
          onCancel={this.handleOnHideDeleteCardConfirm}
        >
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

  handleOnShowDeleteCardConfirm = (index: number) => {
    const {
      showDeleteCardConfirmAction,
      data: {
        userCards: { cards }
      }
    } = this.props
    const cardId = cards[index].id
    showDeleteCardConfirmAction(cardId as string)
  }

  handleOnHideDeleteCardConfirm = () => {
    const { hideDeleteCardConfirmAction } = this.props
    hideDeleteCardConfirmAction()
  }

  handleOnDeleteCard = async () => {
    const {
      cardIdToMutate,
      deleteCard,
      setDeleteLoadingAction,
      resetReducerDataAction
    } = this.props
    setDeleteLoadingAction(true)
    await deleteCard({
      variables: { cardId: cardIdToMutate },
      refetchQueries: [{ query: cardsQuery }]
    })
    resetReducerDataAction()
  }

  handleOnResetData = () => {
    const { resetReducerDataAction } = this.props
    resetReducerDataAction()
  }

  handleOnSaveCard = async (stripeToken: string) => {
    const {
      resetReducerDataAction,
      addNewCard,
      cardAsDefaultPayment
    } = this.props
    await addNewCard({
      variables: { token: stripeToken, defaultValue: cardAsDefaultPayment },
      refetchQueries: [{ query: cardsQuery }]
    })
    resetReducerDataAction()
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
