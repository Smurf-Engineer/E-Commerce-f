/**
 * CreditCardFormBilling Component - Created by miguelcanobbio on 16/05/18.
 */
import * as React from 'react'
import { injectStripe, CardElement } from 'react-stripe-elements'
import AnimateHeight from 'react-animate-height'
import get from 'lodash/get'
import Modal from 'antd/lib/modal'
import message from 'antd/lib/message'
import { isApoCity, isNumberValue, isPoBox, isValidCity, isValidZip } from '../../utils/utilsAddressValidation'
import messages from './messages'
import { PHONE_FIELD, PHONE_MINIMUM } from '../../constants'
import {
  Container,
  ContainerBilling,
  ContainerInput,
  ContinueButton,
  Title,
  StyledCheckbox,
  StyledInput,
  MyCardsRow,
  Row,
  Column,
  RequiredSpan,
  InputTitleContainer,
  Label,
  ErrorMsg,
  StripeCardElement,
  modalStyle
} from './styledComponents'
import ShippingAddressForm from '../ShippingAddressForm'
import MyAddresses from '../MyAddressesList'
import MyAddress from '../MyAddress'
import MyCards from '../MyCards'
import { AddressType, CreditCardData, StripeCardData } from '../../types/common'

interface Props {
  stripe: any
  cardHolderName: string
  billingAddress: AddressType
  hasError: boolean
  stripeError: string
  loadingBilling: boolean
  sameBillingAndShipping: boolean
  showCardForm: boolean
  selectedCard: CreditCardData
  skip: number
  currentPage: number
  indexAddressSelected: number
  limit: number
  showBillingForm: boolean
  showBillingModal: boolean
  isEuSubsidiary: boolean
  isFixedTeamstore: boolean
  isInvoice: boolean
  showBillingAddressFormAction: (show: boolean, modal?: boolean) => void
  setSkipValueAction: (skip: number, currentPage: number) => void
  setStripeCardDataAction: (card: CreditCardData, stripeToken: string) => void
  setLoadingBillingAction: (loading: boolean) => void
  setStripeErrorAction: (error: string) => void
  invalidBillingFormAction: (hasError: boolean) => void
  selectDropdownAction: (id: string, value: string) => void
  formatMessage: (messageDescriptor: any) => string
  inputChangeAction: (id: string, value: string) => void
  sameBillingAndAddressCheckedAction: () => void
  sameBillingAndAddressUncheckedAction: () => void
  showCardFormAction: (open: boolean) => void
  selectCardToPayAction: (card: StripeCardData, selectedCardId: string) => void
  setSelectedAddress: (
    address: AddressType,
    indexAddress: number,
    billing: boolean
  ) => void
  nextStep: () => void
  createPaymentIntent: () => void
  setAddressEdit: (address: AddressType | {}, billing?: boolean) => void
  updateAddress: (variables: {}) => void
}

const PAYMENT_TYPE_CARD = 'card'
export class CreditCardFormBilling extends React.Component<Props, {}> {
  state = {
    addressIdToMutate: -1,
    showAddressModal: false,
    cardElement: null,
    modalLoading: false,
    hasError: false
  }
  private addressListRef: any

  render() {
    const {
      formatMessage,
      isInvoice,
      cardHolderName,
      billingAddress: {
        firstName,
        lastName,
        street,
        apartment,
        country,
        stateProvince,
        stateProvinceCode,
        city,
        zipCode,
        phone
      },
      hasError,
      stripeError,
      loadingBilling,
      selectDropdownAction,
      inputChangeAction,
      sameBillingAndShipping,
      showCardForm,
      selectedCard,
      showCardFormAction,
      selectCardToPayAction,
      skip,
      currentPage,
      indexAddressSelected,
      showBillingForm,
      showBillingModal,
      showBillingAddressFormAction,
      isEuSubsidiary
    } = this.props
    const { 
      modalLoading, 
      hasError: hasErrorState,
      showAddressModal,
      addressIdToMutate
    } = this.state

    const renderAddresses = (
      adressesToShow?: number | null,
      renderInModal?: boolean,
      withPagination = false
    ) => {
      return (
        <MyAddresses
          ref={(addressListRef: any) => {
            this.addressListRef = addressListRef
          }}
          itemsNumber={adressesToShow}
          selectAddressAction={this.handleSelectedAddress}
          renderForModal={renderInModal}
          changePage={this.handleChangePage}
          listForMyAccount={false}
          billingAddress={true}
          simple={true}
          showForm={showBillingForm}
          showAddressFormAction={(show: boolean) => showBillingAddressFormAction(show, true)}
          setAddressToUpdateAction={this.setAddressToUpdateAction}
          {...{
            withPagination,
            showAddressModal,
            addressIdToMutate,
            indexAddressSelected,
            currentPage,
            skip,
            formatMessage
          }}
        />
      )
    }

    return (
      <Container>
        {!isInvoice && <div>
          <Title>{formatMessage(messages.methodCreditCard)}</Title>
          <MyCardsRow>
            <MyCards
              {...{
                formatMessage,
                country,
                showCardFormAction,
                showCardForm,
                selectCardToPayAction,
                selectedCard,
                isEuSubsidiary
              }}
            />
          </MyCardsRow>
          <AnimateHeight height={!showCardForm ? 0 : 'auto'} duration={500}>
            <Row>
              <Column>
                <InputTitleContainer>
                  <Label>{formatMessage(messages.cardNumber)}</Label>
                  <RequiredSpan>*</RequiredSpan>
                </InputTitleContainer>
                <ContainerInput>
                  <CardElement
                    onReady={this.handleReady}
                    hidePostalCode={true}
                    style={StripeCardElement}
                  />
                </ContainerInput>
                {stripeError && <ErrorMsg>{stripeError}</ErrorMsg>}
              </Column>
            </Row>
            <Row>
              <Column>
                <InputTitleContainer>
                  <Label>{formatMessage(messages.cardholderName)}</Label>
                  <RequiredSpan>*</RequiredSpan>
                </InputTitleContainer>
                <StyledInput
                  id={'cardHolderName'}
                  value={cardHolderName}
                  onChange={this.handleInputChange}
                />
                {!cardHolderName && hasError && (
                  <ErrorMsg>{formatMessage(messages.requiredField)}</ErrorMsg>
                )}
              </Column>
            </Row>
          </AnimateHeight>
        </div>}
        <ContainerBilling>
          <Title>{formatMessage(messages.billingAddress)}</Title>
          <StyledCheckbox
            checked={sameBillingAndShipping}
            onChange={this.handleOnChangeDefaultShipping}
          >
            {formatMessage(messages.sameShippingAddress)}
          </StyledCheckbox>
          {(sameBillingAndShipping && (
            <MyAddress
              {...{ street, zipCode, country, formatMessage }}
              name={`${firstName} ${lastName}`}
              city={`${city}, ${stateProvince}`}
              addressIndex={-1}
              simple={true}
              hideBottomButtons={true}
            />
          )) ||
            renderAddresses(4, false, false)}
          <AnimateHeight duration={500} height={showBillingForm ? 'auto' : 0}>
            <ShippingAddressForm
              {...{
                firstName,
                lastName,
                street,
                apartment,
                country,
                stateProvince,
                stateProvinceCode,
                city,
                zipCode,
                phone,
                hasError,
                selectDropdownAction,
                inputChangeAction,
                formatMessage
              }}
              isCard={true}
            />
          </AnimateHeight>
        </ContainerBilling>
        <ContinueButton
          onClick={this.handleOnContinue}
          loading={loadingBilling}
        >
          {formatMessage(messages.continue)}
        </ContinueButton>
        <Modal
          visible={showAddressModal || showBillingModal}
          closable={false}
          maskClosable={false}
          okText={formatMessage(messages.saveAddress)}
          onOk={this.handleOnSaveAddress}
          confirmLoading={modalLoading}
          style={modalStyle}
          onCancel={this.handleOnResetData}
          destroyOnClose={true}
          width="864px"
        >
          <Title>{formatMessage(messages.title)}</Title>
          <ShippingAddressForm
            {...{
              firstName,
              lastName,
              street,
              apartment,
              country,
              stateProvince,
              stateProvinceCode,
              city,
              zipCode,
              phone,
              selectDropdownAction,
              inputChangeAction,
              formatMessage
            }}
            hasError={hasError || hasErrorState}
          />
        </Modal>
      </Container>
    )
  }

  handleReady = (cardElement: stripe.elements.Element) =>
    this.setState({ cardElement })

  handleOnContinue = async (ev: any) => {
    const {
      cardHolderName,
      isInvoice,
      billingAddress: {
        firstName,
        lastName,
        street,
        apartment,
        country,
        stateProvince,
        city,
        zipCode,
        phone
      },
      sameBillingAndShipping,
      invalidBillingFormAction,
      setStripeErrorAction,
      setLoadingBillingAction,
      setStripeCardDataAction,
      nextStep,
      selectedCard,
      stripe,
      createPaymentIntent,
      isEuSubsidiary,
      isFixedTeamstore
    } = this.props
    const selectedCardId = get(selectedCard, 'id', '')

    const emptyForm =
      !sameBillingAndShipping &&
      (!firstName ||
        !lastName ||
        !street ||
        !country ||
        !stateProvince ||
        !city ||
        !zipCode ||
        !phone)
    if (isInvoice && !emptyForm) {
      nextStep()
      return
    }
    if ((!cardHolderName && !selectedCardId) || emptyForm) {
      invalidBillingFormAction(true)
      return
    }
    const stripeTokenData = {
      name: cardHolderName,
      address: {
        line1: `${street}`,
        line2: `${apartment}`,
        city: `${city}`,
        state: `${stateProvince}`,
        postal_code: `${zipCode}`,
        country: `${country}`
      }
    }
    setLoadingBillingAction(true)

    let stripeResponse = {}

    if (!selectedCardId && (isFixedTeamstore || !isEuSubsidiary)) {
      stripeResponse = await stripe.createToken(stripeTokenData)
    } else if (isEuSubsidiary) {
      stripeResponse = await stripe.createPaymentMethod(
        PAYMENT_TYPE_CARD,
        this.state.cardElement,
        {
          billing_details: stripeTokenData
        }
      )
    }

    if (stripeResponse && stripeResponse.error) {
      setStripeErrorAction(stripeResponse.error.message)
    } else if (!emptyForm) {
      if (!selectedCardId) {
        const {
          [!isEuSubsidiary || isFixedTeamstore ? 'token' : 'paymentMethod']: {
            id: tokenId,
            card: { id, name, brand, last4, exp_month, exp_year }
          }
        } = stripeResponse

        const cardData: CreditCardData = {
          id,
          name,
          last4,
          expMonth: exp_month,
          expYear: exp_year,
          brand
        }
        setStripeCardDataAction(cardData, tokenId)
      } else if (isEuSubsidiary) {
        createPaymentIntent()
      }
      nextStep()
    }
  }

  handleInputChange = (evt: React.FormEvent<HTMLInputElement>) => {
    const { inputChangeAction } = this.props
    const {
      currentTarget: { id, value }
    } = evt

    if (value && id === PHONE_FIELD && !isNumberValue(value)) {
      return
    }
    inputChangeAction(id, value)
  }

  handleOnChangeDefaultShipping = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const {
      sameBillingAndAddressCheckedAction,
      sameBillingAndAddressUncheckedAction
    } = this.props
    const {
      target: { checked }
    } = event
    checked
      ? sameBillingAndAddressCheckedAction()
      : sameBillingAndAddressUncheckedAction()
  }

  handleChangePage = (pageNumber: number) => {
    const { setSkipValueAction, limit } = this.props
    const skip = (pageNumber - 1) * limit
    setSkipValueAction(skip, pageNumber)
  }

  handleSelectedAddress = (address: AddressType, indexAddress: number) => {
    const { setSelectedAddress } = this.props
    setSelectedAddress(address, indexAddress, true)
  }

  setAddressToUpdateAction = (address: AddressType) => {
    const { setAddressEdit } = this.props
    const { id } = address || {}
    this.setState({ addressIdToMutate: id, showAddressModal: true })
    setAddressEdit(address, true)
  }

  handleOnSaveAddress = async () => {
    const {
      billingAddress: {
        firstName,
        lastName,
        street,
        apartment,
        country,
        stateProvince,
        stateProvinceCode,
        city,
        zipCode,
        phone,
        defaultBilling,
        defaultShipping,
      },
      formatMessage
    } = this.props
    const { addressIdToMutate } = this.state
    if (addressIdToMutate !== -1) {
      const error =
      !firstName ||
      !lastName ||
      !street ||
      !country ||
      !stateProvince ||
      !stateProvinceCode ||
      !city ||
      !zipCode ||
      !phone ||
      (isPoBox(street) && defaultShipping) ||
      isApoCity(city)

      if (!isValidCity(city) || isNumberValue(city)) {
        message.error(formatMessage(messages.invalidCity))
        return
      }

      if (!isValidZip(zipCode)) {
        message.error(formatMessage(messages.invalidZip))
        return
      }

      if (!phone || (phone && phone.length < PHONE_MINIMUM)) {
        message.error(formatMessage(messages.invalidPhone))
        return
      }

      if (error) {
        this.setState({ hasError: error })
        return
      }

      const address = {
        id: addressIdToMutate,
        firstName,
        lastName,
        street,
        apartment,
        country,
        stateProvince,
        stateProvinceCode,
        city,
        zipCode: zipCode.trim(),
        phone,
        defaultBilling,
        defaultShipping
      }
      this.setState({ modalLoading: true })
      await this.updateAddAddress(address)
      this.handleOnResetData()
    }
  }

  handleOnResetData = () => {
    const { showBillingAddressFormAction } = this.props
    this.setState({
      showAddressModal: false,
      modalLoading: false,
      addressIdToMutate: -1,
    })
    showBillingAddressFormAction(false, true)
  }

  updateAddAddress = async (address: AddressType) => {
    const { updateAddress } = this.props
    await updateAddress({ variables: { address } })
    if (this.addressListRef && this.addressListRef.getWrappedInstance) {
      const wrapper = this.addressListRef.getWrappedInstance()
      const editButton = wrapper.getWrappedInstance()
      await editButton.reloadAddress()
    }
  }
}

export default injectStripe(CreditCardFormBilling, { withRef: true })
