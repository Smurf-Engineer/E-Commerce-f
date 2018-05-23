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
import unset from 'lodash/unset'
import forEach from 'lodash/forEach'
import get from 'lodash/get'
import * as checkoutActions from './actions'
import { getTotalItemsIncart } from '../../components/MainLayout/actions'
import messages from './messages'
import { AddAddressMutation, PlaceOrderMutation } from './data'
import {
  Container,
  Content,
  CheckoutTitle,
  StepsContainer,
  SummaryContainer,
  ContinueButton,
  StepWrapper,
  PlaceOrderButton
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
  placeOrder: any
  cardHolderName: string
  stripeError: string
  cardNumber: string
  cardExpDate: string
  cardBrand: string
  stripeToken: string
  loadingBilling: boolean
  loadingPlaceOrder: boolean
  setStripeCardDataAction: (stripeCardData: StripeCardData) => void
  setLoadingBillingAction: (loading: boolean) => void
  setLoadingPlaceOrderAction: (loading: boolean) => void
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
  resetReducerAction: () => void
  getTotalItemsIncart: () => void
  cart: CartItems[]
}

const stepperTitles = ['SHIPPING', 'PAYMENT', 'REVIEW']
class Checkout extends React.Component<Props, {}> {
  componentWillUnmount() {
    const { resetReducerAction } = this.props
    resetReducerAction()
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
      stripeError,
      loadingBilling,
      loadingPlaceOrder,
      smsCheckAction,
      emailCheckAction,
      inputChangeAction,
      selectDropdownAction,
      showAddressFormAction,
      sameBillingAndAddressCheckedAction,
      sameBillingAndAddressUncheckedAction,
      invalidBillingFormAction,
      setStripeErrorAction,
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
                  goToStep={this.handleOnGoToStep}
                  {...{
                    shippingAddress,
                    billingAddress,
                    cardData,
                    cardHolderName,
                    cart
                  }}
                />
              </SwipeableViews>
            </StepsContainer>
            <SummaryContainer>
              <OrderSummary
                total={totalSum}
                subtotal={totalSum}
                discount={10}
                formatMessage={intl.formatMessage}
              />
              {currentStep === 2 ? (
                <PlaceOrderButton
                  onClick={this.handleOnPlaceOrder}
                  loading={loadingPlaceOrder}
                >
                  {intl.formatMessage(messages.placeOrder)}
                </PlaceOrderButton>
              ) : null}
            </SummaryContainer>
          </Content>
          {currentStep === 0 ? (
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

  handleOnGoToStep = (step: number) => {
    const { stepAdvanceAction } = this.props
    stepAdvanceAction(step - 1)
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
      variables: { address }
    })

    return createUserAddress
  }

  handleOnSelectAddress = (address: AddressType, index: number) => {
    const { setSelectedAddressAction } = this.props
    setSelectedAddressAction(address, index)
  }

  handleOnPlaceOrder = async () => {
    const {
      placeOrder,
      firstName,
      lastName,
      street,
      apartment,
      country,
      stateProvince,
      city,
      zipCode,
      phone,
      billingFirstName,
      billingLastName,
      billingStreet,
      billingApartment,
      billingCountry,
      billingStateProvince,
      billingCity,
      billingZipCode,
      billingPhone,
      stripeToken,
      cart,
      setLoadingPlaceOrderAction,
      getTotalItemsIncart: getTotalItemsIncartAction
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

    /*
    * TODO: Find a better solution to unset these properties
    * from cart Object.
    * Maybe don't save them on localStorage
    */
    forEach(cart, cartItem => {
      unset(cartItem, 'product.shortDescription')
      unset(cartItem, 'product.isTopProduct')
      unset(cartItem, 'product.__typename')
      unset(cartItem, 'product.genders')
      unset(cartItem, 'product.fitStyles')
      unset(cartItem, 'product.retailMen')
      unset(cartItem, 'product.collections')
      unset(cartItem, 'product.images')
      unset(cartItem, 'product.type')
      unset(cartItem, 'product.retailWomen')
      unset(cartItem, 'product.customizable')
      unset(cartItem, 'product.description')
      forEach(cartItem.product.priceRange, priceRange => {
        unset(priceRange, '__typename')
      })
      forEach(cartItem.itemDetails, itemDetail => {
        unset(itemDetail, 'gender.__typename')
        unset(itemDetail, 'fit.__typename')
      })
    })
    const orderObj = {
      paymentMethod: 'credit card',
      token: stripeToken,
      cart,
      shippingAddress,
      billingAddress
    }
    try {
      setLoadingPlaceOrderAction(true)
      const response = await placeOrder({
        variables: { orderObj }
      })
      const orderId = get(response, 'data.charge.short_id', '')
      console.log(orderId)
      localStorage.removeItem('cart')
      setLoadingPlaceOrderAction(false)
      getTotalItemsIncartAction()
      const { history } = this.props
      history.push(`/order-placed?orderId=${orderId}`)
    } catch (e) {
      console.log(e)
      setLoadingPlaceOrderAction(false)
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
  PlaceOrderMutation,
  connect(mapStateToProps, {
    ...checkoutActions,
    getTotalItemsIncart
  })
)(Checkout)

export default CheckoutEnhance
