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
  CartContent
} from './styledComponents'
import {
  AddressType,
  StripeCardData,
  CreditCardData,
  CartItems
} from '../../types/common'
import MyAddress from '../MyAddress'
import PaymentData from '../PaymentData'
import CartListItem from '../../components/CartListItem'
import iconVisa from '../../assets/card-visa.svg'
import iconMasterCard from '../../assets/card-master.svg'
import iconAE from '../../assets/card-AE.svg'
import iconDiscover from '../../assets/card-discover.svg'
import iconCreditCard from '../../assets/card-default.svg'
import iconPaypal from '../../assets/Paypal.svg'
import { getShoppingCartData } from '../../utils/utilsShoppingCart'

interface Props {
  showContent: boolean
  cart: CartItems[]
  shippingAddress: AddressType
  billingAddress: AddressType
  cardData: StripeCardData
  cardHolderName: string
  paymentMethod: string
  selectedCard: CreditCardData
  currency: string
  formatMessage: (messageDescriptor: any) => string
  goToStep: (step: number) => void
}

class Review extends React.PureComponent<Props, {}> {
  render() {
    const {
      showContent,
      formatMessage,
      shippingAddress: {
        firstName,
        lastName,
        street,
        city,
        stateProvince,
        zipCode,
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
      currency
    } = this.props

    if (!showContent) {
      return <div />
    }

    const shoppingCartData = getShoppingCartData(cart)
    const { priceRangeToApply } = shoppingCartData

    const renderList = cart
      ? cart.map((cartItem, index) => {
          const {
            designId,
            designImage,
            designName,
            product: { images, name, shortDescription, priceRange }
          } = cartItem

          const currencyPrices = filter(priceRange, { abbreviation: currency })

          const itemImage = designId ? designImage || '' : images[0].front
          const itemTitle = designId ? designName || '' : name
          const itemDescription = designId
            ? `${name} ${shortDescription}`
            : shortDescription
          return (
            <CartListItem
              formatMessage={formatMessage}
              key={index}
              title={itemTitle}
              image={itemImage}
              description={itemDescription}
              price={currencyPrices[priceRangeToApply]}
              itemIndex={index}
              onlyRead={true}
              {...{ cartItem }}
            />
          )
        })
      : null

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
              city={`${city} ${stateProvince}`}
              {...{ street, zipCode, country, formatMessage, apartment }}
            />
            <EditInfoButton onClick={this.handleOnGoToStepOne}>
              {formatMessage(messages.edit)}
            </EditInfoButton>
          </InfoContainer>
          <InfoContainer>
            <Title>{formatMessage(messages.billingAddress)}</Title>
            <MyAddress
              hideBottomButtons={true}
              name={`${billingFirstName} ${billingLastName}`}
              street={billingStreet}
              city={`${billingCity} ${billingStateProvince}`}
              zipCode={billingZipCode}
              country={billingCountry}
              apartment={billingApartment}
              {...{ formatMessage }}
            />
            <EditInfoButton onClick={this.handleOnGoToStepTwo}>
              {formatMessage(messages.edit)}
            </EditInfoButton>
          </InfoContainer>
          <InfoContainer>
            <Title>{formatMessage(messages.payment)}</Title>
            {paymentMethod === 'credit card' ? (
              <div>
                <PaymentData card={selectedCard} />
                <EditInfoButton onClick={this.handleOnGoToStepTwo}>
                  {formatMessage(messages.edit)}
                </EditInfoButton>
              </div>
            ) : (
              <img src={iconPaypal} />
            )}
          </InfoContainer>
        </BottomContainer>
      </Container>
    )
  }

  getCardIcon = (brand: string) => {
    switch (brand) {
      case 'Visa':
        return iconVisa
      case 'MasterCard':
        return iconMasterCard
      case 'American Express':
        return iconAE
      case 'Discover':
        return iconDiscover
      default:
        return iconCreditCard
    }
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
