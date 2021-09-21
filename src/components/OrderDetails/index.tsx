/**
 * OrderDetails Component - Created by jorge on 23/07/18.
 */
import * as React from 'react'
import { FormattedMessage } from 'react-intl'
import { graphql, compose } from 'react-apollo'
import { FormattedHTMLMessage } from 'react-intl'
import message from 'antd/lib/message'
import domtoimage from 'dom-to-image'
import moment from 'moment'
import get from 'lodash/get'
import messages from './messages'
import { OrderDetailsInfo, QueryProps, FulfillmentNetsuite } from '../../types/common'
import Modal from 'antd/lib/modal'
import { getOrderQuery, deleteOrderMutation } from './data'
import Icon from 'antd/lib/icon'
import Spin from 'antd/lib/spin'
import Button from 'antd/lib/button'
import {
  Container,
  ViewContainer,
  Div,
  ScreenTitle,
  // TODO: Commented to hide the receipt button until green light to continue with this implementation
  ButtonWrapper,
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
  Annotation,
  LoadingContainer,
  OrderActions,
  DeleteButton,
  StyledText,
  ErrorMessage,
  Paragraph,
  FAQSection,
  Title,
  FAQBody,
  FedexLabel,
  FedexIcon,
  OpenIcon,
  InvoiceDiv,
  InvoiceTitle,
  InvoiceIcon,
  InvoiceSubtitle,
  DownloadInvoice,
  DownloadIcon,
  DataDiv,
  SavingContainer
} from './styledComponents'
import OrderSummary from '../OrderSummary'
import CartListItem from '../CartListItem'
import MyAddress from '../MyAddress'
import AddToCartButton from '../AddToCartButton'

import iconPaypal from '../../assets/Paypal.svg'
import iconFedex from '../../assets/fedexicon.svg'
import { ORDER_HISTORY } from '../../screens/Account/constants'
import PaymentData from '../PaymentData'
import { PaymentOptions } from '../../screens/Checkout/constants'
import { PREORDER, PAYMENT_ISSUE, VARIABLE_PRICE, JAKROO_LOGO_BASE64 } from '../../constants'
import ProductInfo from '../ProductInfo'
import { getSizeInCentimeters } from '../../utils/utilsFiles'
import ReactDOM from 'react-dom'

const FEDEX_URL = 'https://www.fedex.com/fedextrack/'
const PRO_DESIGN_FEE = 15

interface Data extends QueryProps {
  orderQuery: OrderDetailsInfo
}

interface Props {
  orderId: string
  data?: Data
  from: string
  currentCurrency: string
  formatMessage: (messageDescriptor: any) => string
  onReturn: (id: string) => void
  deleteOrder: (variables: {}) => Promise<any>
  goToCart: () => void
}

const { confirm } = Modal

export class OrderDetails extends React.Component<Props, {}> {
  editOrderButton: any
  state = {
    showPricing: false,
    showOrder: false,
    showIssue: false,
    savingPdf: false
  }
  private copyInput: any
  private html2pdf: any
  toggleProductInfo = (id: string) => {
    const stateValue = this.state[id]
    this.setState({ [id]: !stateValue } as any)
  }
  openFedexTracking = (trackingNumber: string) => () => {
    if (trackingNumber) {
      window.open(`${FEDEX_URL}?trknbr=${trackingNumber}`)
    }
  }
  downloadInvoice = async () => {
    const { orderId } = this.props
    const { savingPdf } = this.state
    if (!savingPdf) {
      this.setState({ savingPdf: true })
      const element = ReactDOM.findDOMNode(this.copyInput) as HTMLElement
      element.style.fontFamily = 'Avenir'
      element.style.width = '1280px'
      element.style.flexWrap = 'nowrap'
      if (!this.html2pdf) {
        this.html2pdf = new window.jsPDF('p', 'cm', 'letter')
      }
      const image = await domtoimage.toPng(element)
      const imageWidth = getSizeInCentimeters(element.clientWidth)
      const imageHeight = getSizeInCentimeters(element.clientHeight)
      let position = 2
      const pdfWidth = this.html2pdf.internal.pageSize.width - 2 
      const pdfHeight = (imageHeight * pdfWidth) / imageWidth
      let heightLeft = imageHeight
      const img = new Image()
      img.src = JAKROO_LOGO_BASE64
      this.html2pdf.addImage(img, 'JPEG', 0.75, 0.5, 4, 1)
      this.html2pdf.addImage(image, 'PNG', 1, 2, pdfWidth, pdfHeight)
      heightLeft -= this.html2pdf.internal.pageSize.height
      while (heightLeft > 18) {
        position += heightLeft - imageHeight // top padding for other pages
        this.html2pdf.addPage()
        this.html2pdf.addImage(image, 'PNG', 1, position, pdfWidth, pdfHeight)
        heightLeft -= this.html2pdf.internal.pageSize.height
      }
      this.html2pdf.save(`invoice-${orderId}.pdf`)    
      this.setState({ savingPdf: false })
      element.style.fontFamily = 'unset'
      element.style.flexWrap = 'wrap'
      element.style.width = 'auto'
    }
  }
  render() {
    const {
      data,
      orderId,
      from,
      formatMessage,
      onReturn,
      currentCurrency
    } = this.props

    if (data && data.loading) {
      return (
        <LoadingContainer>
          <Spin />
        </LoadingContainer>
      )
    }

    const {
      showPricing,
      showOrder,
      showIssue,
      savingPdf
    } = this.state

    const handleOnReturn = () => onReturn('')

    const getBackMessage =
      from === ORDER_HISTORY ? messages.backToHistory : messages.backToOverview

    if (!orderId) {
      return null
    }

    if (!data || !data.orderQuery) {
      return <Container />
    }

    const {
      shortId,
      orderDate,
      invoiceTerms,
      estimatedDate,
      paymentMethod,
      shippingFirstName,
      shippingLastName,
      shippingStreet,
      owner,
      shippingApartment,
      shippingPhone,
      shippingCountry,
      shippingStateProvince,
      shippingCity,
      shippingZipCode,
      billingFirstName,
      billingLastName,
      billingStreet,
      billingApartment,
      billingCountry,
      billingStateProvince,
      billingCity,
      billingZipCode,
      netsuite,
      payment: { stripeCharge },
      cart,
      status,
      currency,
      cutoffDate,
      shippingAmount,
      proDesign,
      taxGst,
      teamStoreName,
      taxPst,
      taxVat,
      taxFee,
      total,
      discount,
      teamStoreId,
      lastDrop,
      canUpdatePayment,
      onDemand,
      coupon
    } = data.orderQuery

    const netsuiteObject = get(netsuite, 'orderStatus')

    const netsuiteStatus = netsuiteObject && netsuiteObject.orderStatus

    const fulfillments = get(
      netsuiteObject,
      'fulfillments',
      [] as FulfillmentNetsuite[]
    )
    const packages = get(fulfillments, '[0].packages')
    const trackingNumber = packages && packages.replace('<BR>', ', ')

    let subtotal = 0
    let upgrades = 0
    let variables = 0
    const cartItems = cart || []
    const showDiscount = cartItems.some(({ isReseller }) => !isReseller)
    const renderItemList = cart
      ? cart.map((cartItem, index) => {
        const {
          designId,
          designImage,
          designName,
          product: { images, name, shortDescription },
          productTotal,
          unitPrice,
          teamStoreItem,
          itemDetails
        } = cartItem

        // This function is used to SUM all the upgrades prices applied to a product and have it on the subtotal
        // Upgrades prices * quantities
        const subUpgrade = itemDetails.reduce((sum, { quantity, upgradeOnePrice = 0, upgradeTwoPrice = 0}) =>
          sum + (upgradeOnePrice * quantity) + (quantity * upgradeTwoPrice)
        // tslint:disable-next-line: align
        , 0)
        const subVariables = itemDetails.reduce((sum, { quantity, variableOneValue, variableTwoValue }) => {
          if ((variableOneValue && variableOneValue.trim()) || (variableTwoValue && variableTwoValue.trim())) {
            sum += (VARIABLE_PRICE * quantity)
          }
          return sum
        }// tslint:disable-next-line: align
        , 0)
        variables += subVariables || 0
        upgrades += subUpgrade || 0
        subtotal += productTotal || 0
        cartItem.isFixed = onDemand === false
        cartItem.teamStoreItem = teamStoreItem
        const priceRange = {
          quantity: '0',
          price: 0,
          shortName: ''
        }

        const itemImage = designId ? designImage || '' : images[0].front
        const itemTitle = designId ? designName || '' : name
        const itemDescription = designId
          ? `${name} ${shortDescription}`
          : shortDescription
        return (
          <CartListItem
            {...{
              formatMessage,
              productTotal,
              unitPrice,
              cartItem,
              currentCurrency
            }}
            currencySymbol={currency.shortName}
            key={index}
            image={itemImage}
            title={itemTitle}
            description={itemDescription}
            price={priceRange}
            itemIndex={index}
            onlyRead={true}
            canReorder={!teamStoreId && owner && !savingPdf}
          />
        )
      })
      : null

    const card = get(stripeCharge, 'cardData')
    const paymentMethodInfo =
      paymentMethod === PaymentOptions.CREDITCARD ? (
        <PaymentData {...{ card }} />
      ) : paymentMethod === PaymentOptions.INVOICE ?
          <InvoiceDiv>
            <InvoiceTitle><InvoiceIcon type="file-text" />{formatMessage(messages.invoice)}</InvoiceTitle>
            <InvoiceSubtitle>{formatMessage(messages.paymentTerms)} {invoiceTerms}</InvoiceSubtitle>
          </InvoiceDiv> : (
          <StyledImage crossOrigin="anonymous" src={iconPaypal} />
        )

    return (
      <Container>
        {savingPdf && <SavingContainer><Spin size="large" /></SavingContainer>}
        {status === PAYMENT_ISSUE && (
          <ErrorMessage>
            <Paragraph
              dangerouslySetInnerHTML={{
                __html: formatMessage(messages.paymentIssue)
              }}
            />
          </ErrorMessage>
        )}
        <ViewContainer onClick={handleOnReturn}>
          <Icon type="left" />
          <span>{formatMessage(getBackMessage)}</span>
        </ViewContainer>
        <Div>
          <ScreenTitle>
            <FormattedMessage {...messages.title} />
          </ScreenTitle>
          {paymentMethod === PaymentOptions.INVOICE &&
            <DownloadInvoice onClick={this.downloadInvoice}>
              {savingPdf ? 
                <Spin size="small" /> :
                <>
                  <DownloadIcon type="download"/>
                  {formatMessage(messages.downloadInvoice)}
                </>
              }
            </DownloadInvoice>
          }
        </Div>
        <DataDiv ref={content => (this.copyInput = content)}>
          <OrderInfo {...{ savingPdf }}>
            <OrderDelivery>
              <DeliveryInfo>
                <DeliveryLabels {...{ savingPdf }}>
                  <DeliveryLabel>
                    {formatMessage(messages.orderPoint)}
                  </DeliveryLabel>
                  <DeliveryLabel>
                    {formatMessage(messages.orderNumber)}
                  </DeliveryLabel>
                  <DeliveryLabel>
                    {formatMessage(messages.orderDate)}
                  </DeliveryLabel>
                  {teamStoreId && cutoffDate &&
                    <DeliveryLabel>
                      {formatMessage(messages.cutoffDate)}
                    </DeliveryLabel>
                  }
                  {paymentMethod === PaymentOptions.INVOICE && invoiceTerms &&
                    <DeliveryLabel>
                      {formatMessage(messages.paymentTerms)}
                    </DeliveryLabel>
                  }
                  <DeliveryLabel>
                    {formatMessage(messages.trackingNumber)}
                  </DeliveryLabel>
                  <DeliveryLabel>
                    {formatMessage(messages.deliveryDate)}
                  </DeliveryLabel>
                  <DeliveryLabel>{formatMessage(messages.status)}</DeliveryLabel>
                  <DeliveryLabel>
                    {formatMessage(messages.lastUpdated)}
                  </DeliveryLabel>
                </DeliveryLabels>
                <DeliveryData>
                  <Info {...{ savingPdf }}>
                    {teamStoreId ? teamStoreName : formatMessage(messages.cart)}
                  </Info>
                  <Info {...{ savingPdf }}>{shortId}</Info>
                  <Info {...{ savingPdf }}>{orderDate}</Info>
                  {teamStoreId && cutoffDate && <Info {...{ savingPdf }}>{cutoffDate}</Info>}
                  {paymentMethod === PaymentOptions.INVOICE && invoiceTerms && 
                    <Info {...{ savingPdf }}>{invoiceTerms}</Info>
                  }
                  <Info {...{ savingPdf }}>
                    {trackingNumber ? 
                      <FedexLabel onClick={this.openFedexTracking(trackingNumber)}>
                        {trackingNumber}
                        <OpenIcon type="select" />
                        <FedexIcon src={iconFedex} />
                      </FedexLabel> : '-'
                    }
                  </Info>
                  <Info {...{ savingPdf }}>{estimatedDate}</Info>
                  <Info {...{ savingPdf }} redColor={status === PAYMENT_ISSUE}>
                    {netsuiteStatus || status}
                  </Info>
                  <Info {...{ savingPdf }}>
                    {lastDrop ? moment(lastDrop).format('DD/MM/YYYY HH:mm') : '-'}
                  </Info>
                </DeliveryData>
              </DeliveryInfo>
            </OrderDelivery>
            <OrderSummaryContainer {...{ savingPdf }}>
              <OrderSummary
                onlyRead={true}
                totalSum={total}
                shippingTotal={shippingAmount}
                totalWithoutDiscount={subtotal}
                youSaved={!!coupon && discount}
                currencySymbol={currency.shortName}
                proDesignReview={proDesign && PRO_DESIGN_FEE}
                couponName={coupon}
                {...{
                  formatMessage,
                  taxGst,
                  taxPst,
                  variables,
                  upgrades,
                  taxVat,
                  taxFee,
                  showDiscount,
                  discount,
                  subtotal
                }}
              />
            </OrderSummaryContainer>
          </OrderInfo>
          <StyledText>
            <FormattedHTMLMessage
              {...messages[teamStoreId ? 'messageTeamstore' : 'messageRetail']}
            />
          </StyledText>
          <Items>
            {!teamStoreId && owner && !savingPdf && false && (
              <TitleStyled>
                {formatMessage(messages.items)}
                <AddToCartButton
                  ref={(addToCartButton: any) => {
                    this.editOrderButton = addToCartButton
                  }}
                  label={formatMessage(messages.reorderAll)}
                  renderForThumbnail={false}
                  items={cart}
                  {...{ formatMessage }}
                  withoutTop={true}
                  myLockerList={false}
                  itemProdPage={true}
                  orderDetails={true}
                  onClick={() => true}
                />
              </TitleStyled>
            )}
            <CartList>{renderItemList}</CartList>
          </Items>
          <ShippingBillingContainer>
            <ShippingBillingCard>
              <SubTitle>{formatMessage(messages.shippingAddress)}</SubTitle>
              <MyAddress
                hideBottomButtons={true}
                name={`${shippingFirstName} ${shippingLastName}`}
                city={`${shippingCity}, ${shippingStateProvince}`}
                street={shippingStreet}
                phone={shippingPhone}
                zipCode={shippingZipCode}
                country={shippingCountry}
                apartment={shippingApartment}
                {...{ formatMessage }}
              />
            </ShippingBillingCard>
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
        </DataDiv>
        {owner && !savingPdf &&
          <AddToCartButton
            ref={(addToCartButton: any) => {
              this.editOrderButton = addToCartButton
            }}
            label={formatMessage(messages.edit)}
            renderForThumbnail={false}
            items={cart}
            {...{ formatMessage }}
            withoutTop={true}
            myLockerList={false}
            itemProdPage={true}
            isFixed={teamStoreId && !onDemand}
            orderDetails={true}
            onClick={() => true}
            hide={true}
            fixedCart={status === PAYMENT_ISSUE}
            replaceOrder={shortId}
          />
        }
        {(teamStoreId && owner) && !savingPdf &&
          (status === PREORDER || canUpdatePayment) ? (
            <OrderActions>
              <ButtonWrapper>
                <Button type="primary" onClick={this.handleOnEditOrder}>
                  {formatMessage(
                    status === PAYMENT_ISSUE
                      ? messages.updatePayment
                      : messages.edit
                  )}
                </Button>
              </ButtonWrapper>
              <DeleteButton onClick={this.handleOnDeleteOrder}>
                {formatMessage(messages.deleteOrder)}
              </DeleteButton>
            </OrderActions>
          ) : (
            <Annotation>{formatMessage(messages.annotation)}</Annotation>
          )}
        {!!teamStoreId && !savingPdf &&
          <FAQSection>
            <Title>
              {formatMessage(messages.faqTitle)}
            </Title>
            <FAQBody>
              <ProductInfo
                id="showPricing"
                titleWidth={'100%'}
                title={formatMessage(messages.priceQuestion)}
                showContent={showPricing}
                toggleView={this.toggleProductInfo}
              >
                <div
                  dangerouslySetInnerHTML={{
                    __html: formatMessage(messages.priceAnswer)
                  }}
                />
              </ProductInfo>
              <ProductInfo
                id="showIssue"
                richText={true}
                title={formatMessage(messages.issueQuestion)}
                showContent={showIssue}
                toggleView={this.toggleProductInfo}
              >
                <div
                  dangerouslySetInnerHTML={{
                    __html: formatMessage(messages.issueAnswer)
                  }}
                />
              </ProductInfo>
              <ProductInfo
                id="showOrder"
                title={formatMessage(messages.orderQuestion)}
                showContent={showOrder}
                toggleView={this.toggleProductInfo}
              >
                <div
                  dangerouslySetInnerHTML={{
                    __html: formatMessage(messages.orderAnswer)
                  }}
                />
              </ProductInfo>
            </FAQBody>
          </FAQSection>
        }
      </Container>
    )
  }

  handleOnEditOrder = () => {
    const { formatMessage, goToCart } = this.props
    confirm({
      title: formatMessage(messages.editOrderTitle),
      content: formatMessage(messages.editOrderMessage),
      okText: formatMessage(messages.proceed),
      onOk: async () => {
        try {
          await this.deleteOrder()
          const wrapper = this.editOrderButton.getWrappedInstance()
          const editButton = wrapper.getWrappedInstance()
          await editButton.addToCart()
          goToCart()
        } catch (e) {
          message.error(e.message)
        }
      }
    })
  }

  handleOnDeleteOrder = () => {
    const { formatMessage, onReturn } = this.props
    confirm({
      title: formatMessage(messages.deleteTeamstoreTitle),
      content: formatMessage(messages.deleteTeamstoreMessage),
      okText: formatMessage(messages.delete),
      onOk: async () => {
        try {
          await this.deleteOrder()
          onReturn('')
        } catch (e) {
          message.error(e.message)
        }
      }
    })
  }

  deleteOrder = async () => {
    const { deleteOrder, data } = this.props
    const { shortId } = data.orderQuery
    try {
      if (typeof window !== 'undefined') {
        const cartList = JSON.parse(localStorage.getItem('cart') as any)
        if (cartList) {
          localStorage.removeItem('cart')
        }
      }
      const response = await deleteOrder({
        variables: { orderId: shortId }
      })
      const responseMessage = get(response, 'data.cancelOrder.message', '')
      message.success(responseMessage)
    } catch (e) {
      message.error(e.message)
    }
  }

  handleOnClickReceipt = () => {
    // TODO: Implement action for Receipt button.
  }
}

interface OwnProps {
  orderId?: string
}

const OrderDetailsEnhance = compose(
  deleteOrderMutation,
  graphql(getOrderQuery, {
    options: ({ orderId }: OwnProps) => ({
      skip: !orderId,
      variables: { orderId }
    })
  })
)(OrderDetails)

export default OrderDetailsEnhance
