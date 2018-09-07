/**
 * CreditCardFormBilling Component - Created by miguelcanobbio on 16/05/18.
 */
import * as React from 'react'
import { StripeProvider, Elements, CardElement } from 'react-stripe-elements'
import AnimateHeight from 'react-animate-height'
import get from 'lodash/get'
import { isNumberValue } from '../../utils/utilsAddressValidation'
import messages from './messages'
import { PHONE_FIELD } from '../../constants'
import config from '../../config'
import {
  Container,
  Row,
  Column,
  InputTitleContainer,
  Label,
  RequiredSpan,
  ContainerInput,
  StyledInput,
  ContainerBilling,
  Title,
  ErrorMsg,
  StyledCheckbox,
  ContinueButton,
  StripeCardElement,
  MyCardsRow
} from './styledComponents'
import ShippingAddressForm from '../ShippingAddressForm'
import MyAddresses from '../MyAddressesList'
import MyAddress from '../MyAddress'
import MyCards from '../MyCards'
import { AddressType, CreditCardData, StripeCardData } from '../../types/common'

interface Props {
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
  showBillingAddressFormAction: (show: boolean) => void
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
}
interface MyWindow extends Window {
  Stripe: any
}

declare var window: MyWindow

class CreditCardFormBilling extends React.Component<Props, {}> {
  state = { stripe: null }

  render() {
    const {
      formatMessage,
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
      showBillingAddressFormAction
    } = this.props

    const renderAddresses = (
      adressesToShow?: number | null,
      renderInModal?: boolean,
      withPagination = false
    ) => {
      return (
        <MyAddresses
          itemsNumber={adressesToShow}
          selectAddressAction={this.handleSelectedAddress}
          renderForModal={renderInModal}
          changePage={this.handlechangePage}
          listForMyAccount={false}
          billingAddress={true}
          showForm={showBillingForm}
          showAddressFormAction={showBillingAddressFormAction}
          {...{
            withPagination,
            indexAddressSelected,
            currentPage,
            skip,
            formatMessage
          }}
        />
      )
    }

    const { stripe } = this.state
    return (
      <Container>
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
              city={`${city} ${stateProvince}`}
              addressIndex={-1}
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
            />
          </AnimateHeight>
          ) : (
              <MyAddress
            {...{ street, zipCode, country, formatMessage }}
            name={`${firstName} ${lastName}`}
            city={`${city} ${stateProvince}`}
            addressIndex={-1}
            hideBottomButtons={true}
          />
          )}
        </ContainerBilling>
        {country && (
          <div>
            <Title>{formatMessage(messages.methodCreditCard)}</Title>
            <StripeProvider {...{ stripe }}>
              <Elements>
                <AnimateHeight height={!showCardForm ? 0 : 'auto'} duration={500}>
                  <Row>
                    <Column>
                      <InputTitleContainer>
                        <Label>{formatMessage(messages.cardNumber)}</Label>
                        <RequiredSpan>*</RequiredSpan>
                      </InputTitleContainer>
                      <ContainerInput>
                        <CardElement
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
                      {!cardHolderName &&
                        hasError && (
                          <ErrorMsg>
                            {formatMessage(messages.requiredField)}
                          </ErrorMsg>
                        )}
                    </Column>
                  </Row>
                </AnimateHeight>
              </Elements>
            </StripeProvider>
            <MyCardsRow>
              <MyCards
                {...{
                  formatMessage,
                  country,
                  showCardFormAction,
                  showCardForm,
                  selectCardToPayAction,
                  selectedCard
                }}
              />
            </MyCardsRow>
          </div>
        )}
        <ContinueButton
          onClick={this.handleOnContinue}
          loading={loadingBilling}
        >
          {formatMessage(messages.continue)}
        </ContinueButton>
      </Container>
    )
  }

  loadStripe = () => {
    // In addition to loading asynchronously, this code is safe to server-side render.
    // const { billingAddress: { country } } = this.props
    // const { billingAddress } = state
    const stripeJs = document.createElement('script')
    stripeJs.src = 'https://js.stripe.com/v3/'
    stripeJs.async = true
    stripeJs.onload = () => {
      this.setState({
        stripe: window.Stripe(config.pkStripeUS)
      })
    }
    // tslint:disable-next-line:no-unused-expression
    document.body && document.body.appendChild(stripeJs)
    console.log('loadStripe========', billingCountry)
    return true
  }

  handleOnContinue = async (ev: any) => {
    const {
      cardHolderName,
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
      selectedCard
    } = this.props
    const { stripe } = this.state
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

    if ((!cardHolderName && !selectedCardId) || emptyForm) {
      invalidBillingFormAction(true)
      return
    }
    const stripeTokenData = {
      name: cardHolderName,
      address_line1: `${street}`,
      address_line2: `${apartment}`,
      address_city: `${city}`,
      address_state: `${stateProvince}`,
      address_zip: `${zipCode}`,
      address_country: `${country}`
    }
    setLoadingBillingAction(true)

    const stripeResponse = !selectedCardId
      ? await stripe.createToken(stripeTokenData)
      : {}

    if (stripeResponse && stripeResponse.error) {
      setStripeErrorAction(stripeResponse.error.message)
    } else if (!emptyForm) {
      if (!selectedCardId) {
        const {
          token: {
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

    if (checked) {
      sameBillingAndAddressCheckedAction()
      this.loadStripe()
    } else {
      sameBillingAndAddressUncheckedAction()
    }
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
}

export default CreditCardFormBilling
