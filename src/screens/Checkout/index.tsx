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
import OrderSummary from '../../components/OrderSummary'
import { AddressType, CartItemDetail, Product } from '../../types/common'

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
  state: string
  city: string
  zipCode: string
  phone: string
  currentStep: number
  hasError: boolean
  showForm: boolean
  addNewAddress: any
  stepAdvanceAction: (step: number) => void
  validFormAction: (hasError: boolean) => void
  selectDropdownAction: (id: string, value: string) => void
  inputChangeAction: (id: string, value: string) => void
  smsCheckAction: (checked: boolean) => void
  emailCheckAction: (checked: boolean) => void
  showAddressFormAction: (show: boolean) => void
  saveToStorage: (cart: CartItems[]) => void
  cart: CartItems[]
}

const stepperTitles = ['SHIPPING', 'PAYMENT', 'REVIEW']
class Checkout extends React.Component<Props, {}> {
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
      state,
      city,
      zipCode,
      phone,
      showForm,
      smsCheckAction,
      emailCheckAction,
      inputChangeAction,
      selectDropdownAction,
      showAddressFormAction,
      cart
    } = this.props

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
                    firstName,
                    lastName,
                    street,
                    apartment,
                    country,
                    state,
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
                <div>{'PAYMENT'}</div>
                <div>{'REVIEW'}</div>
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
          <ContinueButton onClick={this.nextStep}>{'Continue'}</ContinueButton>
        </Container>
      </Layout>
    )
  }

  nextStep = () => {
    const {
      currentStep,
      stepAdvanceAction,
      firstName,
      lastName,
      street,
      apartment,
      country,
      state: stateProvince,
      city,
      zipCode,
      phone,
      validFormAction,
      showAddressFormAction
      //   smsCheckAction,
      //   emailCheckAction
    } = this.props
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
      phone
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
    } = await addNewAddress({ variables: { address } })

    return createUserAddress
  }

  // DELETE AFTER DEMO
  renderStepContent = (step: number) => {
    const {
      firstName,
      lastName,
      street,
      apartment,
      country,
      state,
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
              state,
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
