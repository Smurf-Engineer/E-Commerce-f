/**
 * Checkout Screen - Created by cazarez on 05/05/18.
 */
import * as React from 'react'
import { injectIntl, InjectedIntl } from 'react-intl'
import { compose } from 'react-apollo'
import { connect } from 'react-redux'
import { RouteComponentProps } from 'react-router-dom'
import Steps from 'antd/lib/steps'
import SwipeableViews from 'react-swipeable-views'
import * as checkoutActions from './actions'
import messages from './messages'
import { AddAddressMutation } from './data'
import { GetAddressListQuery } from '../../components/Shippping/data'
import {
  Container,
  Content,
  CheckoutTitle,
  StepsContainer,
  SummaryContainer,
  ContinueButton,
  StepWrapper
  // SummaryTitle
} from './styledComponents'
import Layout from '../../components/MainLayout'
import Shipping from '../../components/Shippping'
import Payment from '../../components/Payment'
import Review from '../../components/Review'
import OrderSummary from '../../components/OrderSummary'
import {
  AddressType,
  CartItemDetail,
  Product,
  StripeCardData
} from '../../types/common'

const { Step } = Steps

// DELETE WHEN FUNCTION TO GET TOTAL GETS IMPLEMENTED
interface CartItems {
  product: Product
  itemDetails: CartItemDetail[]
}

interface Props extends RouteComponentProps<any> {
  intl: InjectedIntl
  firstName: string
  lastName: string
  street: string
  apartment: string
  country: string
  stateProvince: string
  city: string
  zipCode: string
  phone: string
  hasError: boolean
  showForm: boolean
  indexAddressSelected: number
  billingFirstName: string
  billingLastName: string
  billingStreet: string
  billingApartment: string
  billingCountry: string
  billingStateProvince: string
  billingCity: string
  billingZipCode: string
  billingPhone: string
  billingHasError: boolean
  sameBillingAndShipping: boolean
  currentStep: number
  addNewAddress: any
  cardHolderName: string
  stripeError: string
  cardNumber: string
  cardExpDate: string
  cardBrand: string
  loadingBilling: boolean
  setStripeCardDataAction: (stripeCardData: StripeCardData) => void
  setLoadingBillingAction: (loading: boolean) => void
  setStripeErrorAction: (error: string) => void
  stepAdvanceAction: (step: number) => void
  validFormAction: (hasError: boolean) => void
  invalidBillingFormAction: (hasError: boolean) => void
  selectDropdownAction: (id: string, value: string) => void
  inputChangeAction: (id: string, value: string) => void
  smsCheckAction: (checked: boolean) => void
  emailCheckAction: (checked: boolean) => void
  showAddressFormAction: (show: boolean) => void
  setSelectedAddressAction: (address: AddressType, indexAddress: number) => void
  sameBillingAndAddressCheckedAction: () => void
  sameBillingAndAddressUncheckedAction: () => void
  saveToStorage: (cart: CartItems[]) => void
  cart: CartItems[]
}

const stepperTitles = ['SHIPPING', 'PAYMENT', 'REVIEW']
class Checkout extends React.Component<Props, {}> {
  componentWillUnmount() {
    const { stepAdvanceAction } = this.props
    stepAdvanceAction(0)
  }
  render() {
    const {
      intl,
      history,
      currentStep,
      hasError,
      firstName,
      lastName,
      street,
      apartment,
      country,
      stateProvince,
      city,
      zipCode,
      phone,
      showForm,
      indexAddressSelected,
      billingFirstName,
      billingLastName,
      billingStreet,
      billingApartment,
      billingCountry,
      billingStateProvince,
      billingCity,
      billingZipCode,
      billingPhone,
      billingHasError,
      cardHolderName,
      cardNumber,
      cardExpDate,
      cardBrand,
      sameBillingAndShipping,
      smsCheckAction,
      emailCheckAction,
      inputChangeAction,
      selectDropdownAction,
      showAddressFormAction,
      sameBillingAndAddressCheckedAction,
      sameBillingAndAddressUncheckedAction,
      invalidBillingFormAction,
      stripeError,
      setStripeErrorAction,
      loadingBilling,
      setLoadingBillingAction,
      setStripeCardDataAction,
      cart
    } = this.props

    const shippingAddress: AddressType = {
      firstName,
      lastName,
      street,
      apartment,
      country,
      stateProvince,
      city,
      zipCode,
      phone
    }
    const billingAddress: AddressType = {
      firstName: billingFirstName,
      lastName: billingLastName,
      street: billingStreet,
      apartment: billingApartment,
      country: billingCountry,
      stateProvince: billingStateProvince,
      city: billingCity,
      zipCode: billingZipCode,
      phone: billingPhone
    }
    const cardData: StripeCardData = {
      cardNumber,
      cardExpDate,
      cardBrand
    }

    let totalSum = 0
    if (cart) {
      const total = cart.map((cartItem, index) => {
        const quantities = cartItem.itemDetails.map((itemDetail, ind) => {
          return itemDetail.quantity
        })

        const quantitySum = quantities.reduce((a, b) => a + b, 0)

        return cartItem.product.priceRange[0].price * quantitySum
      })

      totalSum = total.reduce((a, b) => a + b, 0)
    }

    const steps = stepperTitles.map((step, key) => (
      <Step title={step} {...{ key }} />
    ))

    return (
      <Layout {...{ history, intl }}>
        <Container>
          <CheckoutTitle>
            {intl.formatMessage(messages.title).toLocaleUpperCase()}
          </CheckoutTitle>
          <Content>
            <StepsContainer>
              <StepWrapper>
                <Steps current={currentStep}>{steps}</Steps>
              </StepWrapper>
              <SwipeableViews index={currentStep}>
                <Shipping
                  {...{
                    hasError,
                    shippingAddress,
                    smsCheckAction,
                    emailCheckAction,
                    inputChangeAction,
                    selectDropdownAction,
                    showForm,
                    showAddressFormAction,
                    indexAddressSelected
                  }}
                  setSelectedAddress={this.handleOnSelectAddress}
                  formatMessage={intl.formatMessage}
                />
                <Payment
                  formatMessage={intl.formatMessage}
                  hasError={billingHasError}
                  nextStep={this.nextStep}
                  {...{
                    billingAddress,
                    cardHolderName,
                    stripeError,
                    setStripeErrorAction,
                    inputChangeAction,
                    selectDropdownAction,
                    sameBillingAndShipping,
                    sameBillingAndAddressCheckedAction,
                    sameBillingAndAddressUncheckedAction,
                    invalidBillingFormAction,
                    loadingBilling,
                    setLoadingBillingAction,
                    setStripeCardDataAction
                  }}
                />
                <Review
                  formatMessage={intl.formatMessage}
                  {...{
                    shippingAddress,
                    billingAddress,
                    cardData,
                    cardHolderName
                  }}
                />
              </SwipeableViews>
              {/* <div>{this.renderStepContent(currentStep)}</div> */}
            </StepsContainer>
            <SummaryContainer>
              <OrderSummary
                total={totalSum}
                subtotal={totalSum}
                discount={10}
                formatMessage={intl.formatMessage}
              />
            </SummaryContainer>
          </Content>
          {currentStep !== 1 ? (
            <ContinueButton onClick={this.nextStep}>
              {'Continue'}
            </ContinueButton>
          ) : null}
        </Container>
      </Layout>
    )
  }

  nextStep = () => {
    const { currentStep } = this.props
    switch (currentStep) {
      case 0:
        this.verifyStepOne()
        break
      case 1:
        this.verifyStepTwo()
        break
      default:
        break
    }
  }

  verifyStepTwo = () => {
    const { currentStep, stepAdvanceAction } = this.props
    stepAdvanceAction(currentStep + 1)
  }

  verifyStepOne = () => {
    const {
      currentStep,
      stepAdvanceAction,
      firstName,
      lastName,
      street,
      apartment,
      country,
      stateProvince,
      city,
      zipCode,
      phone,
      validFormAction,
      showAddressFormAction,
      indexAddressSelected
      //   smsCheckAction,
      //   emailCheckAction
    } = this.props
    if (indexAddressSelected !== -1) {
      stepAdvanceAction(currentStep + 1)
      return
    }
    const error =
      !firstName ||
      !lastName ||
      !street ||
      !country ||
      !stateProvince ||
      !city ||
      !zipCode ||
      !phone
    if (error) {
      validFormAction(error)
      return
    }
    const address = {
      firstName,
      lastName,
      street,
      apartment,
      country,
      stateProvince,
      city,
      zipCode,
      phone,
      defaultBilling: false,
      defaultShipping: false
    }

    if (currentStep < stepperTitles.length - 1) {
      this.saveAddress(address)
      const response = stepAdvanceAction(currentStep + 1)
      if (response) {
        showAddressFormAction(false)
      }
    }
  }

  saveAddress = async (address: AddressType) => {
    const { addNewAddress } = this.props
    const {
      data: { createUserAddress }
    } = await addNewAddress({
      variables: { address },
      refetchQueries: [{ query: GetAddressListQuery }]
    })

    return createUserAddress
  }

  handleOnSelectAddress = (address: AddressType, index: number) => {
    const { setSelectedAddressAction } = this.props
    setSelectedAddressAction(address, index)
  }

  // DELETE AFTER DEMO
  renderStepContent = (step: number) => {
    const {
      firstName,
      lastName,
      street,
      apartment,
      country,
      stateProvince,
      city,
      zipCode,
      phone,
      hasError,
      intl,
      showForm,
      smsCheckAction,
      emailCheckAction,
      inputChangeAction,
      selectDropdownAction,
      showAddressFormAction
    } = this.props
    switch (step) {
      case 0:
        return (
          <Shipping
            {...{
              hasError,
              firstName,
              lastName,
              street,
              apartment,
              country,
              stateProvince,
              city,
              zipCode,
              phone,
              smsCheckAction,
              emailCheckAction,
              inputChangeAction,
              selectDropdownAction,
              showForm,
              showAddressFormAction
            }}
            formatMessage={intl.formatMessage}
          />
        )
      case 1:
        return 'step two'
      case 2:
        return 'step three'
      default:
        return null
    }
  }
}

const mapStateToProps = (state: any) => {
  const checkout = state.get('checkout').toJS()
  const shopppingCart = state.get('shoppingCartPage').toJS()

  return { ...checkout, ...shopppingCart }
}

const CheckoutEnhance = compose(
  injectIntl,
  AddAddressMutation,
  connect(mapStateToProps, { ...checkoutActions })
)(Checkout)

export default CheckoutEnhance
