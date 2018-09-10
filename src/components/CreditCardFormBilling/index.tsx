/**
 * CreditCardFormBilling Component - Created by miguelcanobbio on 16/05/18.
 */
import * as React from 'react'
import { graphql, compose } from 'react-apollo'
import { StripeProvider, Elements } from 'react-stripe-elements'
import get from 'lodash/get'
import { isNumberValue } from '../../utils/utilsAddressValidation'
import messages from './messages'
import { PHONE_FIELD } from '../../constants'
import { getSubsidiaryQuery } from './data'
import config from '../../config'
import {
  Container,
  ContainerBilling,
  Title,
  StyledCheckbox,
  MyCardsRow
} from './styledComponents'
import ShippingAddressForm from '../ShippingAddressForm'
import MyAddresses from '../MyAddressesList'
import MyAddress from '../MyAddress'
import MyCards from '../MyCards'
import CreditCardForm from '../CreditCardForm'
import { AddressType, CreditCardData, StripeCardData } from '../../types/common'

interface Props {
  cardHolderName: string
  billingAddress: AddressType
  billingCountry: string
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
  subsidiaryQuery?: number
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
  state = {
    stripe: null,
    reloadStripe: false
  }

  componentDidUpdate(oldProps: any) {
    // Unload stripe script and reload in country changed
    const {
      billingCountry,
      subsidiaryQuery
    } = this.props

    const loading = get(subsidiaryQuery, 'loading', false)
    const subsidiary = get(subsidiaryQuery, 'subsidiary', null)

    if (billingCountry && (billingCountry !== oldProps.billingCountry)) {
      this.setState({ reloadStripe: true })
    }

    if (!loading && subsidiary && this.state.reloadStripe) {
      this.setState({ reloadStripe: false })
      const stripeNode = document.getElementById('stripeScript')
      if (!!stripeNode) { this.unloadStripe(stripeNode) }
      this.loadStripe(subsidiary)
    }
  }

  loadStripe = (subsidiary: number) => {
    let stripeKey
    switch (subsidiary) {
      case 1:
        stripeKey = config.pkStripeUS
        break
      case 6:
        stripeKey = config.pkStripeCA
        break
      case 9:
        stripeKey = config.pkStripeEU
        break
      default:
        stripeKey = config.pkStripeUS
        break
    }

    // this code is safe to server-side render.
    const stripeJs = document.createElement('script')
    stripeJs.id = 'stripeScript'
    stripeJs.src = 'https://js.stripe.com/v3/'
    stripeJs.onload = () => {
      this.setState({
        stripe: window.Stripe(stripeKey)
      })
    }
    // tslint:disable-next-line:no-unused-expression
    document.body && document.body.appendChild(stripeJs)
    return true
  }

  unloadStripe = (stripeNode: any) => {
    document.body.removeChild(stripeNode)
    this.setState({
      stripe: null
    })
    window.Stripe = null
  }

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
      invalidBillingFormAction,
      setStripeCardDataAction,
      nextStep,
      setStripeErrorAction,
      setLoadingBillingAction
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
            <StripeProvider {...{ stripe }}>
              <Elements>
                <CreditCardForm
                  {...{
                    stripe,
                    stripeError,
                    cardHolderName,
                    firstName,
                    lastName,
                    street,
                    apartment,
                    country,
                    stateProvince,
                    city,
                    zipCode,
                    phone,
                    sameBillingAndShipping,
                    hasError,
                    showCardForm,
                    inputChangeAction,
                    formatMessage,
                    loadingBilling,
                    invalidBillingFormAction,
                    setStripeErrorAction,
                    setLoadingBillingAction,
                    setStripeCardDataAction,
                    nextStep,
                    selectedCard
                  }}
                />
              </Elements>
            </StripeProvider>
          </div>
        )}
      </Container>
    )
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
}

interface OwnProps {
  billingCountry?: string
}

const CreditCardFormBillingEnhanced = compose(
  graphql(getSubsidiaryQuery, {
    name: 'subsidiaryQuery',
    options: ({ billingCountry }: OwnProps) => ({
      skip: !billingCountry,
      variables: { code: billingCountry },
      fetchPolicy: 'network-only'
    })
  })
)(CreditCardFormBilling)

export default CreditCardFormBillingEnhanced
