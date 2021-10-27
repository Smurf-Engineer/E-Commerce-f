/**
 * OrderDetailsAdmin Component - Created by eduardoquintero on 07/05/19.
 */
import * as React from 'react'
import { FormattedMessage } from 'react-intl'
import { graphql, compose } from 'react-apollo'
import { get } from 'lodash'
import messages from './messages'
import {
  OrderDetailsInfo,
  QueryProps,
  Message,
  MessagePayload,
  DesignNote
} from '../../types/common'
import withError from '../WithError'
import withLoading from '../WithLoading'
import { getOrderQuery } from './data'
import Icon from 'antd/lib/icon'
import Spin from 'antd/lib/spin'
import {
  Container,
  ViewContainer,
  Div,
  ScreenTitle,
  // TODO: Commented to hide the receipt button until green light to continue with this implementation
  // ButtonWrapper,
  // Button,
  OrderInfo,
  OrderDelivery,
  DeliveryInfo,
  DeliveryLabels,
  DeliveryLabel,
  DeliveryData,
  Info,
  OrderSummaryContainer,
  Items,
  TitleStyled,
  CartList,
  ShippingBillingContainer,
  ShippingBillingCard,
  SubTitle,
  StyledImage,
  LoadingContainer,
  InvoiceDiv,
  InvoiceTitle,
  InvoiceSubtitle,
  InvoiceIcon,
  DataOrder,
  CartItem,
  ThumbnailImage,
  ItemInfo,
  DescriptionLabel,
  DesignInfo,
  DesignCode,
  PriceLabel,
  SummaryTitle,
  TotalLabel,
  PriceDiv,
  DesignDescription,
  TaxDiv,
  TaxPercent
} from './styledComponents'
import MyAddress from '../MyAddress'

import iconPaypal from '../../assets/Paypal.svg'
import jakrooLogo from '../../assets/Jackroologo.svg'
import PaymentData from '../PaymentData'
import { PaymentOptions } from '../../constants'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

interface Data extends QueryProps {
  orderQuery: OrderDetailsInfo
}

interface NotesData extends QueryProps {
  orderNotes: DesignNote[]
}

interface Props {
  orderId: string
  data?: Data
  orderNotesData: NotesData
  from: string
  history: History
  location: any
  canEdit: boolean
  currentCurrency: string
  formatMessage: (messageDescriptor: Message) => string
  onReturn: (id?: string) => void
  changeNetsuiteId: (variables: {}) => Promise<MessagePayload>
  changeTaxCode: (variables: {}) => Promise<MessagePayload>
  addNote: (variables: {}) => Promise<DesignNote>
  readNote: (variables: {}) => Promise<MessagePayload>
}

interface State {
  isLoading: boolean
  netsuiteIdValue: string
  isEditing: boolean
  savingNote: boolean
  showNoteModal: boolean
  savingPdf: boolean
}

export class ServiceOrderDetailsAdmin extends React.Component<Props, State> {

  handleOnReturn = () => {
    const { onReturn } = this.props
    onReturn('')
  }

  goToDesign = (itemId: string) => () => {
    if (itemId) {
      window.open(`/approval?id=${itemId}`)
    }
  }

  render() {
    const {
      data,
      orderId,
      formatMessage
    } = this.props
    if ((data && data.loading) || !data) {
      return (
        <LoadingContainer>
          <Spin />
        </LoadingContainer>
      )
    }

    if (!orderId) {
      return null
    }

    if (data && data.error) {
      return (
        <Container>
          <ViewContainer onClick={this.handleOnReturn}>
            <Icon type="left" />
            <span>{formatMessage(messages.backToOrders)}</span>
          </ViewContainer>
          <LoadingContainer>
            {formatMessage(messages.notFound)}
          </LoadingContainer>
        </Container>
      )
    }

    const {
      shortId,
      orderDate,
      currency: {
        shortName: currencyName
      },
      paymentMethod,
      taxAmount,
      projectName,
      billingFirstName,
      billingLastName,
      billingStreet,
      billingApartment,
      billingCountry,
      billingStateProvince,
      billingCity,
      billingZipCode,
      invoiceTerms,
      taxFee = 0,
      taxPst = 0,
      taxGst = 0,
      payment: { stripeCharge },
      cart,
      status,
    } = data.orderQuery

    const card = get(stripeCharge, 'cardData')
    const paymentMethodInfo =
      paymentMethod === PaymentOptions.CREDITCARD ? (
        <PaymentData {...{ card }} />
      ) : paymentMethod === PaymentOptions.INVOICE ?
          <InvoiceDiv>
            <InvoiceTitle><InvoiceIcon type="file-text" />{formatMessage(messages.invoice)}</InvoiceTitle>
            <InvoiceSubtitle>{formatMessage(messages.paymentTerms)} {invoiceTerms}</InvoiceSubtitle>
          </InvoiceDiv> : (
          <StyledImage src={iconPaypal} />
        )
    const subtotal = cart.reduce((sum, item) => sum + item.price, 0)
    const total = subtotal + taxFee + taxGst + taxPst
    return (
      <Container>
        <ViewContainer onClick={this.handleOnReturn}>
          <Icon type="left" />
          <span>{formatMessage(messages.backToOrders)}</span>
        </ViewContainer>
        <Div>
          <ScreenTitle>
            <FormattedMessage {...messages.title} />
          </ScreenTitle>
        </Div>
        <DataOrder>
          <OrderInfo>
            <OrderDelivery>
              <DeliveryInfo>
                <DeliveryLabels>
                  <DeliveryLabel>
                    {formatMessage(messages.orderNumber)}
                  </DeliveryLabel>
                  <DeliveryLabel>
                    {formatMessage(messages.orderDate)}
                  </DeliveryLabel>
                  <DeliveryLabel>{formatMessage(messages.status)}</DeliveryLabel>
                  {!!projectName && <DeliveryLabel>{formatMessage(messages.projectName)}</DeliveryLabel>}
                </DeliveryLabels>
                <DeliveryData>
                  <Info>{shortId}</Info>
                  <Info>{orderDate}</Info>
                  <Info>{status}</Info>
                  {!!projectName && <Info>{projectName}</Info>}
                </DeliveryData>
              </DeliveryInfo>
            </OrderDelivery>
            <OrderSummaryContainer>
              <SummaryTitle>
                {formatMessage(messages.orderSummary)}
              </SummaryTitle>
              <TotalLabel>
                {formatMessage(messages.subtotal)}
                <PriceDiv>
                  {currencyName} {(subtotal || 0).toFixed(2)}
                </PriceDiv>
              </TotalLabel>
              {(taxFee || taxGst || taxPst) ?
                <TotalLabel>
                  <TaxDiv>
                    {formatMessage(messages[taxFee ? 'taxes' : (taxGst ? 'taxGst' : 'taxPst')])}
                    {taxFee > 0 &&
                      <TaxPercent>
                        ({taxAmount}%)
                      </TaxPercent>
                    }
                  </TaxDiv>
                  <PriceDiv>
                    {currencyName} {(taxFee || taxGst || taxPst || 0).toFixed(2)}
                  </PriceDiv>
                </TotalLabel> : null
              }
              <TotalLabel bold={true}>
                {formatMessage(messages.total)}
                <PriceDiv>
                  {currencyName} {(total || 0).toFixed(2)}
                </PriceDiv>
              </TotalLabel>
            </OrderSummaryContainer>
          </OrderInfo>
          <Items>
            <TitleStyled>{formatMessage(messages.items)}</TitleStyled>
            <CartList>
              {cart.map((item, key: number) =>
                <CartItem {...{ key }}>
                  <ThumbnailImage src={item.designImage || jakrooLogo} />
                  <ItemInfo>
                    <DescriptionLabel>
                      {item.name}
                    </DescriptionLabel>
                    {item.designName &&
                      <DesignInfo>
                        {item.designName}
                      </DesignInfo>
                    }
                    {item.designCode &&
                      <DesignCode onClick={this.goToDesign(item.designId)}>
                        {item.designCode}
                      </DesignCode>
                    }
                    {item.description &&
                      <DesignDescription>
                        {item.description.length > 200 ? `${item.description.substring(0, 200)}...` : item.description}
                      </DesignDescription>
                    }
                  </ItemInfo>
                  <PriceLabel>
                    {currencyName} {(item.price || 0).toFixed(2)} 
                  </PriceLabel>
                </CartItem>
              )}
            </CartList>
          </Items>
          <ShippingBillingContainer>
            <ShippingBillingCard>
              <SubTitle>{formatMessage(messages.billingAddress)}</SubTitle>
              <MyAddress
                hideBottomButtons={true}
                name={`${billingFirstName} ${billingLastName}`}
                street={billingStreet}
                city={`${billingCity}, ${billingStateProvince}`}
                zipCode={billingZipCode}
                country={billingCountry}
                apartment={billingApartment}
                {...{ formatMessage }}
              />
            </ShippingBillingCard>
            <ShippingBillingCard>
              <SubTitle>{formatMessage(messages.payment)}</SubTitle>
              {paymentMethodInfo}
            </ShippingBillingCard>
          </ShippingBillingContainer>
        </DataOrder>
      </Container>
    )
  }
}

interface OwnProps {
  orderId?: string
}

const mapStateToProps = (state: any) => state.get('languageProvider').toJS()

const ServiceOrderServiceDetailsEnhance = compose(
  withRouter,
  connect(mapStateToProps),
  graphql(getOrderQuery, {
    options: ({ orderId }: OwnProps) => ({
      skip: !orderId,
      variables: { orderId },
      fetchPolicy: 'network-only',
      notifyOnNetworkStatusChange: true
    })
  }),
  withError,
  withLoading
)(ServiceOrderDetailsAdmin)

export default ServiceOrderServiceDetailsEnhance
