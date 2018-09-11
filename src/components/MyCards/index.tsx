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
// import config from '../../config'
import * as MyCardsActions from './actions'
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
  SelectCountryMessage,
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
  country?: string
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

// interface MyWindow extends Window {
//   Stripe: any
// }

// declare var window: MyWindow

class MyCards extends React.Component<Props, {}> {
  state = {
    stripe: null
  }
  componentWillMount() {
    const { listForMyAccount } = this.props
    if (listForMyAccount) {
      this.handleOpenCountryModal()
    }
  }
  componentWillUnmount() {
    const { listForMyAccount, resetReducerDataAction } = this.props
    if (listForMyAccount) {
      resetReducerDataAction()
    }
  }
  componentDidMount() {
    const { showCardFormAction = () => { }, data } = this.props
    // In addition to loading asynchronously, this code is safe to server-side render.
    // const stripeJs = document.createElement('script')
    // stripeJs.src = 'https://js.stripe.com/v3/'
    // stripeJs.async = true
    // stripeJs.onload = () => {
    //   this.setState({
    //     stripe: window.Stripe(config.pkStripe)
    //   })
    // }
    // // tslint:disable-next-line:no-unused-expression
    // document.body && document.body.appendChild(stripeJs)

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
      country,
      setStripeCardDataAction,
      selectCardToPayAction,
      selectedCard
    } = this.props

    const { stripe } = this.state

    const countryModal = (
      <CountryModal
        {...{ formatMessage }}
        open={openCountryModal}
        requestClose={this.handleCancelCountryModal}
        onSave={this.handleConfirmSaveCountryModal}
      />
    )

    const countryCode = billingCountry || country

    if (loading || (!countryCode && openCountryModal)) {
      return (
        <Container>
          <LoadingContainer>
            <Spin />
          </LoadingContainer>
          {countryModal}
        </Container>
      )
    }

    if (!countryCode && !openCountryModal) {
      return (
        <Container>
          <SelectCountryMessage>
            {formatMessage(messages.selectCountryMessage)}
          </SelectCountryMessage>
          <ButtonWrapper {...{ listForMyAccount }}>
            <StyledEmptyButton onClick={this.handleOpenCountryModal}>
              {formatMessage(messages.selectCountry)}
            </StyledEmptyButton>
          </ButtonWrapper>
          {countryModal}
        </Container>
      )
    }

    const userCards = get(data, 'userCards', {})
    const cards = get(userCards, 'cards', [] as CreditCardData[])
    const idDefaultCard = get(userCards, 'default', '')

    return (
      <Container>
        {(listForMyAccount || !!cards.length) && (
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
                cardAsDefaultPayment
              }}
              saveAddress={this.handleOnSaveCard}
              visible={showCardModal}
              newCardLoading={modalLoading}
            />
          </Elements>
        </StripeProvider>
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
      </Container>
    )
  }
  handleOpenCountryModal = () => {
    const { openCountryModalAction } = this.props
    openCountryModalAction(true)
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
      billingCountry,
      cardAsDefaultPayment
    } = this.props
    await addNewCard({
      variables: {
        token: stripeToken,
        defaultValue: cardAsDefaultPayment,
        countryCode: billingCountry
      },
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

interface OwnProps {
  billingCountry?: string
}

const mapStateToProps = (state: any) => state.get('cards').toJS()

const MyCardsEnhance = compose(
  graphql(cardsQuery, {
    options: ({ billingCountry }: OwnProps) => ({
      fetchPolicy: 'network-only',
      variables: { countryCode: billingCountry },
      skip: !billingCountry
    })
  }),
  addCardMutation,
  updateCardMutation,
  deleteCardMutation,
  connect(
    mapStateToProps,
    { ...MyCardsActions }
  )
)(MyCards)

export default MyCardsEnhance
