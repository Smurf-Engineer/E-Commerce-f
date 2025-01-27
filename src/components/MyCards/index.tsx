/**
 * MyCards Component - Created by miguelcanobbio on 28/05/18.
 */
import * as React from 'react'
import { graphql, compose } from 'react-apollo'
import { connect } from 'react-redux'
import find from 'lodash/find'
import get from 'lodash/get'
import Modal from 'antd/lib/modal'
import Spin from 'antd/lib/spin'
import { StripeProvider, Elements } from 'react-stripe-elements'
import config from '../../config'
import * as MyCardsActions from './actions'
import MyCardsList from '../MyCardsList'
import ModalCreditCard from '../ModalCreditCard'
import messages from './messages'
import withError from '../../components/WithError'
import withLoading from '../../components/WithLoading'
import {
  cardsQuery,
  addCardMutation,
  updateCardMutation,
  deleteCardMutation,
  setupIntentQuery
} from './data'
import { CreditCardData, QueryProps, StripeCardData, User } from '../../types/common'
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

interface SetupIntentData extends QueryProps {
  setupIntent: {
    clientSecret: string
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
  user: User
  paymentsRender: boolean
  showCardForm: boolean
  listForMyAccount: boolean
  selectedCard: CreditCardData
  setupIntent: SetupIntentData
  formatMessage: (messageDescriptor: any) => string
  isEuSubsidiary?: boolean
  // Reducer Actions
  validFormAction: (hasError: boolean) => void
  inputChangeAction: (id: string, value: string) => void
  defaultPaymentAction: (checked: boolean) => void
  showCardModalAction: (show: boolean) => void
  showDeleteCardConfirmAction: (cardId: string) => void
  hideDeleteCardConfirmAction: () => void
  setLoadingAction: (loading: boolean) => void
  setModalLoadingAction: (loading: boolean) => void
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
    const { showCardFormAction = () => {}, data } = this.props
    if (window.Stripe) {
      this.setState({
        stripe: window.Stripe(config.pkStripeUS)
      })
    } else {
      // this code is safe to server-side render.
      const stripeJs = document.createElement('script')
      stripeJs.id = 'stripe-js'
      stripeJs.async = true
      stripeJs.src = 'https://js.stripe.com/v3/'
      stripeJs.onload = () => {
        this.setState({
          stripe: window.Stripe(config.pkStripeUS)
        })
      }
      // tslint:disable-next-line:no-unused-expression
      document.body && document.body.appendChild(stripeJs)
    }

    if (data && data.userCards) {
      const {
        userCards: { cards, default: idDefaultCard }
      } = data
      if (!!cards && !!cards.length) {
        const defaultCard = find(cards, { id: idDefaultCard })
        return showCardFormAction(false, defaultCard)
      }
    }
    showCardFormAction(true)
  }
  render() {
    const {
      data,
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
      user,
      inputChangeAction,
      setStripeErrorAction,
      setModalLoadingAction,
      setDefaultPaymentCheckedAction,
      validFormAction,
      loading,
      paymentsRender = true,
      listForMyAccount,
      setStripeCardDataAction,
      selectCardToPayAction,
      selectedCard,
      setupIntent,
      isEuSubsidiary
    } = this.props

    const { stripe } = this.state

    if (loading) {
      return (
        <Container>
          <LoadingContainer>
            <Spin />
          </LoadingContainer>
        </Container>
      )
    }
    const onBehalf = user ? user.onBehalf : false
    const userCards = get(data, 'userCards', {})
    const cards = get(userCards, 'cards', [] as CreditCardData[]) || []
    const idDefaultCard = get(userCards, 'default', '')
    const clientSecret = isEuSubsidiary
      ? get(setupIntent, 'setupIntent.clientSecret', '')
      : ''
    return (
      <Container>
        {(listForMyAccount || !!cards.length) && !onBehalf && (
          <ButtonWrapper {...{ listForMyAccount }}>
            <StyledEmptyButton type="danger" onClick={this.handleOnAddNewCard}>
              {formatMessage(messages.addCard)}
            </StyledEmptyButton>
          </ButtonWrapper>
        )}
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
                cardAsDefaultPayment,
                clientSecret
              }}
              saveAddress={this.handleOnSaveCard}
              visible={showCardModal}
              newCardLoading={modalLoading}
            />
          </Elements>
        </StripeProvider>
        {!isEuSubsidiary && (
          <MyCardsList
            items={cards}
            {...{
              onBehalf,
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
        )}
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
      </Container>
    )
  }

  handleOnAddNewCard = () => {
    const {
      listForMyAccount,
      showCardModalAction,
      showCardFormAction,
      showCardForm,
      data
    } = this.props

    const userCards = get(data, 'userCards', {})
    const cards = get(userCards, 'cards', [] as CreditCardData[])
    const idDefaultCard = get(userCards, 'default', '')

    const defaultCard = find(cards, { id: idDefaultCard })

    if (listForMyAccount) {
      showCardModalAction(true)
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
      resetReducerDataAction,
      data: { refetch }
    } = this.props
    setDeleteLoadingAction(true)
    await deleteCard({
      variables: { cardId: cardIdToMutate },
      refetchQueries: [{ query: cardsQuery }]
    })
    await refetch()
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
      cardAsDefaultPayment,
      data: { refetch }
    } = this.props
    await addNewCard({
      variables: {
        token: stripeToken,
        defaultValue: cardAsDefaultPayment
      },
      refetchQueries: [{ query: cardsQuery }]
    })
    await refetch()
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

type OwnProps = {
  isFixedTeamstore?: boolean
  isEuSubsidiary?: boolean
}
const MyCardsEnhance = compose(
  graphql(cardsQuery, {
    name: 'data',
    options: (ownprops: OwnProps) => {
      const { isFixedTeamstore, isEuSubsidiary } = ownprops
      return {
        skip: isFixedTeamstore && !isEuSubsidiary
      }
    }
  }),
  graphql(setupIntentQuery, { name: 'setupIntent' }),
  withLoading,
  withError,
  addCardMutation,
  updateCardMutation,
  deleteCardMutation,
  connect(mapStateToProps, { ...MyCardsActions })
)(MyCards)

export default MyCardsEnhance
