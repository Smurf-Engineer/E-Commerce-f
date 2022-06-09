/**
 * Review Component - Created by miguelcanobbio on 18/05/18.
 */
import * as React from 'react'
import filter from 'lodash/filter'
import messages from './messages'
import {
  Container,
  Title,
  BottomContainer,
  InfoContainer,
  EditInfoButton,
  CartList,
  CartContent,
  Text,
  InvoiceDiv,
  InvoiceTitle,
  InvoiceSubtitle,
  InvoiceIcon
} from './styledComponents'
import {
  AddressType,
  StripeCardData,
  CreditCardData,
  CartItems,
  IbanData
} from '../../types/common'
import MyAddress from '../MyAddress'
import PaymentData from '../PaymentData'
import CartListItem from '../../components/CartListItem'
import iconPaypal from '../../assets/Paypal.svg'
import { getShoppingCartData, getPriceRangeByItem, getItemQuantity } from '../../utils/utilsShoppingCart'
import { PaymentOptions } from '../../screens/Checkout/constants'

interface Props {
  showContent: boolean
  cart: CartItems[]
  shippingAddress: AddressType
  billingAddress: AddressType
  cardData: StripeCardData
  cardHolderName: string
  paymentMethod: string
  ibanData: IbanData
  selectedCard: CreditCardData
  currency: string
  invoiceTerms: string
  disabledMethods: boolean
  formatMessage: (messageDescriptor: any) => string
  goToStep: (step: number) => void
}

class Review extends React.PureComponent<Props, {}> {
  render() {
    const {
      disabledMethods = false,
      showContent,
      invoiceTerms,
      formatMessage,
      shippingAddress: {
        firstName,
        lastName,
        street,
        city,
        stateProvince,
        zipCode,
        phone,
        country,
        apartment
      },
      billingAddress: {
        firstName: billingFirstName,
        lastName: billingLastName,
        street: billingStreet,
        city: billingCity,
        stateProvince: billingStateProvince,
        zipCode: billingZipCode,
        country: billingCountry,
        apartment: billingApartment
      },
      cart,
      paymentMethod,
      selectedCard,
      ibanData,
      currency
    } = this.props

    if (!showContent) {
      return <div />
    }

    const shoppingCartData = getShoppingCartData(cart, currency)
    const { moreThanOneItem } = shoppingCartData

    const renderList = cart
      ? cart.map((cartItem, index) => {
        const {
          designId,
          designImage,
          proCertified,
          proDesign,
          designName,
          teamStoreItem,
          teamStoreId,
          isFixed,
          fixedPrices,
          product: { images, name, shortDescription, priceRange }
        } = cartItem
        const rangeToUse =
          fixedPrices && fixedPrices.length ? fixedPrices : priceRange

        const currencyPrices = filter(rangeToUse, { abbreviation: currency })

        const itemQuantity = getItemQuantity(cartItem)
        const itemRange = itemQuantity === 1 && moreThanOneItem ? 1 : getPriceRangeByItem(cartItem)
        const onDemandRuleItem = teamStoreId && itemQuantity === 1 ? 1 : itemRange
        const priceRangeToApply = currencyPrices[isFixed ? 0 : onDemandRuleItem]

        const itemImage = designId ? designImage || '' : images[0].front
        const itemTitle = designId ? designName || '' : name
        const itemDescription = designId
          ? `${name} ${shortDescription}`
          : shortDescription
        return (
          <CartListItem
            currentCurrency={currency}
            formatMessage={formatMessage}
            key={index}
            title={itemTitle}
            image={itemImage}
            description={itemDescription}
            price={priceRangeToApply}
            itemIndex={index}
            onlyRead={true}
            currencySymbol={currencyPrices[0].shortName}
            {...{ cartItem, isFixed, teamStoreItem, proDesign, proCertified }}
          />
        )
      })
      : null
    const isPaypalPayment = paymentMethod === PaymentOptions.PAYPAL
    const isIbanPayment = paymentMethod === PaymentOptions.IBAN
    const isCCPayment = paymentMethod === PaymentOptions.CREDITCARD
    return (
      <Container>
        <CartContent>
          <Title>{formatMessage(messages.items)}</Title>
          <CartList>{renderList}</CartList>
        </CartContent>
        <BottomContainer>
          <InfoContainer>
            <Title>{formatMessage(messages.shippingAddress)}</Title>
            <MyAddress
              hideBottomButtons={true}
              name={`${firstName} ${lastName}`}
              city={`${city}, ${stateProvince}`}
              {...{ street, zipCode, country, phone, formatMessage, apartment }}
            />
            <EditInfoButton onClick={this.handleOnGoToStepOne}>
              {formatMessage(messages.edit)}
            </EditInfoButton>
          </InfoContainer>
          <InfoContainer>
            <Title>{formatMessage(messages.billingAddress)}</Title>
            {isPaypalPayment ? (
              <Text>{billingCountry.toUpperCase()}</Text>
            ) : (
                <div>
                  <MyAddress
                    hideBottomButtons={true}
                    name={`${billingFirstName} ${billingLastName}`}
                    street={billingStreet}
                    city={`${billingCity}, ${billingStateProvince}`}
                    zipCode={billingZipCode}
                    simple={true}
                    country={billingCountry.toUpperCase()}
                    apartment={billingApartment}
                    {...{ formatMessage }}
                  />
                  <EditInfoButton onClick={this.handleOnGoToStepTwo}>
                    {formatMessage(messages.edit)}
                  </EditInfoButton>
                </div>
              )}
          </InfoContainer>
          {!disabledMethods &&
            <InfoContainer>
              <Title>{formatMessage(messages.payment)}</Title>
              {paymentMethod === PaymentOptions.INVOICE ?
                <InvoiceDiv>
                  <InvoiceTitle><InvoiceIcon type="file-text" />{formatMessage(messages.invoice)}</InvoiceTitle>
                  <InvoiceSubtitle>{formatMessage(messages.paymentTerms)} {invoiceTerms}</InvoiceSubtitle>
                </InvoiceDiv>
                : isCCPayment ? (
                  <div>
                    <PaymentData card={selectedCard} />
                    <EditInfoButton onClick={this.handleOnGoToStepTwo}>
                      {formatMessage(messages.edit)}
                    </EditInfoButton>
                  </div>
                ) : isIbanPayment ? (
                  <div>
                    <PaymentData iban={ibanData} />
                    <EditInfoButton onClick={this.handleOnGoToStepTwo}>
                      {formatMessage(messages.edit)}
                    </EditInfoButton>
                  </div>
                ) : (
                      <img src={iconPaypal} />
                    )
              }
            </InfoContainer>
          }
        </BottomContainer>
      </Container>
    )
  }

  handleOnGoToStepOne = () => {
    const { goToStep } = this.props
    goToStep(1)
  }
  handleOnGoToStepTwo = () => {
    const { goToStep } = this.props
    goToStep(2)
  }
}

export default Review
