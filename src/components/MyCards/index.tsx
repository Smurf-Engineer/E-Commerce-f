/**
 * MyCards Component - Created by miguelcanobbio on 28/05/18.
 */
import * as React from 'react'
import { graphql, compose } from 'react-apollo'
import { connect } from 'react-redux'
import AnimateHeight from 'react-animate-height'
import find from 'lodash/find'
import Modal from 'antd/lib/modal'
import Spin from 'antd/lib/spin'
import { StripeProvider, Elements } from 'react-stripe-elements'
import config from '../../config'
import * as MyCardsActions from './actions'
import withError from '../WithError'
import withLoading from '../WithLoading'
import MyCardsList from '../MyCardsList'
import ModalCreditCard from '../ModalCreditCard'
import CountryModal from '../../components/ConfirmCountryDialog'
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
  ButtonWrapper,
  StyledEmptyButton,
  DeleteConfirmMessage,
  LoadingContainer
} from './styledComponents'
import ModalTitle from '../ModalTitle'
import ModalFooter from '../ModalFooter'

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
  loading: boolean
  modalLoading: boolean
  deleteLoading: boolean
  defaultPayment: boolean
  hasError: boolean
  paymentsRender: boolean
  showCardForm: boolean
  listForMyAccount: boolean
  selectedCard: CreditCardData
  openCountryModal: boolean
  billingCountry: string
  formatMessage: (messageDescriptor: any) => string
  // Reducer Actions
  validFormAction: (hasError: boolean) => void
  inputChangeAction: (id: string, value: string) => void
  defaultPaymentAction: (checked: boolean) => void
  showCardModalAction: (show: boolean) => void
  showDeleteCardConfirmAction: (cardId: string) => void
  hideDeleteCardConfirmAction: () => void
  setLoadingAction: (loading: boolean) => void
  setModalLoadingAction: (loading: boolean) => void
  openCountryModalAction: (open: boolean) => void
  saveCountryAction: (countryCode: string | null) => void
  setDeleteLoadingAction: (loading: boolean) => void
  setDefaultPaymentCheckedAction: (checked: boolean) => void
  setCardToUpdateAction: (card: CreditCardData) => void
  resetReducerDataAction: () => void
  setStripeCardDataAction: (stripeCardData: StripeCardData) => void
  setStripeErrorAction: (error: string) => void
  showCardFormAction: (open: boolean, card?: object | string) => void
  selectCardToPayAction: (card: CreditCardData, selectedCardId?: string) => void
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
  componentWillUnmount() {
    const { listForMyAccount, resetReducerDataAction } = this.props
    if (listForMyAccount) {
      resetReducerDataAction()
    }
  }
  componentDidMount() {
    const {
      showCardFormAction = () => {},
      data: {
        userCards: { cards, default: idDefaultCard }
      }
    } = this.props
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

    if (!!cards && !!cards.length) {
      const defaultCard = find(cards, { id: idDefaultCard })
      showCardFormAction(false, defaultCard)
    } else {
      showCardFormAction(true)
    }
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
      validFormAction,
      loading,
      paymentsRender = true,
      listForMyAccount,
      openCountryModal,
      billingCountry,
      setStripeCardDataAction,
      selectCardToPayAction,
      selectedCard
    } = this.props

    const { stripe } = this.state

    if (loading) {
      return (
        <LoadingContainer>
          <Spin />
        </LoadingContainer>
      )
    }

    return (
      <Container>
        <ButtonWrapper {...{ listForMyAccount }}>
          <StyledEmptyButton type="danger" onClick={this.handleOnAddNewCard}>
            {formatMessage(messages.addCard)}
          </StyledEmptyButton>
        </ButtonWrapper>
        <AnimateHeight height={!billingCountry ? 0 : 'auto'} duration={500}>
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
        </AnimateHeight>
        <MyCardsList
          items={cards}
          {...{
            formatMessage,
            idDefaultCard,
            paymentsRender,
            listForMyAccount,
            setStripeCardDataAction,
            selectCardToPayAction,
            selectedCard
          }}
          showConfirmDelete={this.handleOnShowDeleteCardConfirm}
          selectCardAsDefault={this.handleOnSelectCardAsDefault}
        />
        <Modal
          visible={showDeleteCardConfirm}
          confirmLoading={deleteLoading}
          title={
            <ModalTitle title={formatMessage(messages.titleDeleteModal)} />
          }
          footer={
            <ModalFooter
              okText={formatMessage(messages.deleteCard)}
              onOk={this.handleOnDeleteCard}
              onCancel={this.handleOnHideDeleteCardConfirm}
              {...{ formatMessage }}
            />
          }
          maskClosable={false}
          closable={false}
          destroyOnClose={true}
        >
          <DeleteConfirmMessage>
            {formatMessage(messages.messageDeleteModal)}
          </DeleteConfirmMessage>
        </Modal>
        <CountryModal
          {...{ formatMessage }}
          open={openCountryModal}
          requestClose={this.handleCancelCountryModal}
          onSave={this.handleConfirmSaveCountryModal}
        />
      </Container>
    )
  }
  handleCancelCountryModal = () => {
    const { openCountryModalAction } = this.props
    openCountryModalAction(false)
  }

  handleConfirmSaveCountryModal = (countryCode: string | null) => {
    const { openCountryModalAction, saveCountryAction } = this.props
    openCountryModalAction(false)
    saveCountryAction(countryCode)
  }
  handleOnAddNewCard = () => {
    const {
      listForMyAccount,
      showCardFormAction,
      showCardForm,
      openCountryModalAction,
      data: {
        userCards: { cards, default: idDefaultCard }
      }
    } = this.props
    const defaultCard = find(cards, { id: idDefaultCard })

    if (listForMyAccount) {
      openCountryModalAction(true)
    } else {
      showCardFormAction(!showCardForm, defaultCard)
    }
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

  handleOnSelectCardAsDefault = async (index: number) => {
    const {
      updateCard,
      resetReducerDataAction,
      setLoadingAction,
      data: {
        refetch,
        userCards: { cards }
      }
    } = this.props
    setLoadingAction(true)
    const cardId = cards[index].id
    await updateCard({
      variables: { cardId }
    })
    await refetch()
    resetReducerDataAction()
    setLoadingAction(false)
  }
}

const mapStateToProps = (state: any) => state.get('cards').toJS()

const MyCardsEnhance = compose(
  graphql(cardsQuery),
  withLoading,
  withError,
  addCardMutation,
  updateCardMutation,
  deleteCardMutation,
  connect(
    mapStateToProps,
    { ...MyCardsActions }
  )
)(MyCards)

export default MyCardsEnhance
