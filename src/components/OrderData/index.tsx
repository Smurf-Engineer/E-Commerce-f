/**
 * OrderData Component - Created by miguelcanobbio on 23/05/18.
 */
import * as React from 'react'
import { graphql, compose } from 'react-apollo'
import get from 'lodash/get'
import head from 'lodash/head'
import domtoimage from 'dom-to-image'
import messages from './messages'
import { FormattedHTMLMessage } from 'react-intl'
import {
  Container,
  InfoContainer,
  ShippingBillingContainer,
  SubTitle,
  StyledImage,
  SummaryContainer,
  OrderNumberContainer,
  StyledText,
  TitleStyled,
  CartList,
  Title,
  Content,
  FAQSection,
  FAQBody,
  InvoiceDiv,
  InvoiceTitle,
  InvoiceSubtitle,
  InvoiceIcon,
  DownloadInvoice,
  DownloadIcon,
  StyledInfoText,
  SavingContainer,
  FedexLabel,
  OpenIcon,
  FedexIcon
} from './styledComponents'
import { getOrderQuery } from './data'

import { PURCHASE, PAYMENT_ISSUE, VARIABLE_PRICE, JAKROO_LOGO_BASE64 } from '../../constants'
import MyAddress from '../MyAddress'
import OrderSummary from '../OrderSummary'
import withError from '..//WithError'
import withLoading from '../WithLoading'
import iconFedex from '../../assets/fedexicon.svg'
import iconPaypal from '../../assets/Paypal.svg'
import iconSepa from '../../assets/Sepa.svg'
import { QueryProps, OrderDataInfo, FulfillmentNetsuite } from '../../types/common'
import CartListItem from '../CartListItem'
import { PaymentOptions } from '../../screens/Checkout/constants'
import PaymentData from '../PaymentData'
import ProductInfo from '../ProductInfo'
import ReactDOM from 'react-dom'
import { getSizeInCentimeters } from '../../utils/utilsFiles'
import Spin from 'antd/lib/spin'

const FEDEX_URL = 'https://www.fedex.com/fedextrack/'
const PRO_DESIGN_FEE = 15

interface Data extends QueryProps {
  orderData: OrderDataInfo
}

interface Props {
  formatMessage: (messageDescriptor: any) => string
  orderId: string
  title: string
  data: Data
  sendEmailAlert: boolean
  sendSmsAlert: boolean
  currentCurrency: string
  // actions
  emailAlertCheckedAction: (checked: boolean) => void
  smsAlertCheckedAction: (checked: boolean) => void
}

class OrderData extends React.Component<Props, {}> {
  state = {
    showPricing: false,
    showOrder: false,
    showIssue: false,
    savingPdf: false,
    showArrive: false,
    showReturn: false
  }
  private copyInput: any
  private html2pdf: any
  componentDidMount() {
    const {
      orderId,
      data: {
        orderData: { cart, taxFee, shippingAmount }
      }
    } = this.props

    if (cart) {
      let subtotal = 0
      const items: any = []
      cart.map((cartItem, index) => {
        const {
          product: { name },
          product,
          productTotal,
          unitPrice,
          itemDetails
        } = cartItem

        subtotal += productTotal || 0
        items.push({
          sku: get(product, 'mpn', ''),
          name,
          price: unitPrice,
          quantity: get(head(itemDetails), 'quantity', 1)
        })
      })
      window.dataLayer.push({
        event: PURCHASE,
        transactionId: orderId,
        transactionTotal: subtotal,
        transactionTax: taxFee,
        transactionShipping: shippingAmount,
        transactionProducts: items
      })
    }
  }
  downloadInvoice = async () => {
    const { orderId } = this.props
    const { savingPdf } = this.state
    if (!savingPdf) {
      this.setState({ savingPdf: true })
      const element = ReactDOM.findDOMNode(this.copyInput) as HTMLElement
      const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent)
      element.style.fontFamily = isSafari ? 'Avenir-Medium' : 'Avenir'
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
  toggleProductInfo = (id: string) => {
    const stateValue = this.state[id]
    this.setState({ [id]: !stateValue } as any)
  }
  openFedexTracking = (trackingNumber: string) => () => {
    if (trackingNumber) {
      window.open(`${FEDEX_URL}?trknbr=${trackingNumber}`)
    }
  }
  render() {
    const {
      formatMessage,
      orderId,
      title,
      data: {
        orderData: {
          orderDate,
          estimatedDate,
          firstName,
          lastName,
          netsuite,
          street,
          phone,
          city,
          freeShipping,
          couponType,
          invoiceTerms,
          stateProvince,
          zipCode,
          country,
          apartment,
          billingFirstName,
          billingLastName,
          billingStreet,
          billingCity,
          billingStateProvince,
          billingZipCode,
          billingCountry,
          billingApartment,
          shippingAmount,
          payment,
          cart,
          paymentMethod,
          currency,
          proDesign,
          taxGst,
          taxPst,
          taxVat,
          taxFee,
          total,
          discount,
          status,
          teamStoreName,
          teamStoreId,
          coupon
        }
      },
      currentCurrency
    } = this.props

    const {
      showPricing,
      showOrder,
      showIssue,
      savingPdf,
      showArrive,
      showReturn
    } = this.state

    const card = get(payment, 'stripeCharge.cardData', {})
    const netsuiteObject = get(netsuite, 'orderStatus')

    const netsuiteStatus = netsuiteObject && netsuiteObject.orderStatus
    const fulfillments = get(
      netsuiteObject,
      'fulfillments',
      [] as FulfillmentNetsuite[]
    )
    const packages = get(fulfillments, '[0].packages')
    const trackingNumber = packages && packages.replace('<BR>', ', ')
    const paymentMethodInfo =
      paymentMethod === PaymentOptions.CREDITCARD ? (
        <PaymentData {...{ card }} />
      ) : paymentMethod === PaymentOptions.INVOICE ?
          <InvoiceDiv>
            <InvoiceTitle><InvoiceIcon type="file-text" />{formatMessage(messages.invoice)}</InvoiceTitle>
            <InvoiceSubtitle>{formatMessage(messages.paymentTerms)} {invoiceTerms}</InvoiceSubtitle>
          </InvoiceDiv> : (
          <StyledImage
            src={paymentMethod === PaymentOptions.PAYPAL ? iconPaypal : iconSepa}
          />
        )
    let subtotal = 0
    let upgrades = 0
    let variables = 0
    const cartItems = cart || []
    const showDiscount = cartItems.some(({ isReseller }) => !isReseller)
    const renderList = cart
      ? cart.map((cartItem, index) => {
        const {
          designId,
          designImage,
          proCertified,
          proDesign: proDesignItem,
          designName,
          product: { images, name, shortDescription, priceRange },
          productTotal,
          unitPrice,
          itemDetails,
        } = cartItem

        const subUpgrade = itemDetails.reduce((sum, { quantity, upgradeOnePrice = 0, upgradeTwoPrice = 0}) =>
          sum + (upgradeOnePrice * quantity) + (quantity * upgradeTwoPrice)
        // tslint:disable-next-line: align
        , 0)
        const subVariables = itemDetails.reduce((sum, { quantity, variableOneValue, variableTwoValue }) => {
          if ((variableOneValue && variableOneValue.trim()) || (variableTwoValue && variableTwoValue.trim())) {
            sum += (VARIABLE_PRICE * quantity)
          }
          return sum
        }
        // tslint:disable-next-line: align
        , 0)
        variables += subVariables || 0
        upgrades += subUpgrade || 0
        subtotal += productTotal || 0

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
              proCertified,
              currentCurrency
            }}
            currencySymbol={currency.shortName}
            key={index}
            proDesign={proDesignItem}
            image={itemImage}
            title={itemTitle}
            description={itemDescription}
            price={priceRange}
            itemIndex={index}
            onlyRead={true}
            canReorder={false}
          />
        )
      })
      : null
    return (
      <Container>
        <Title>{title}</Title>
        {savingPdf && <SavingContainer><Spin size="large" /></SavingContainer>}
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
        <Content
          {...{ savingPdf }}
          invoice={paymentMethod === PaymentOptions.INVOICE}
          ref={content => (this.copyInput = content)}
        >
          <InfoContainer {...{ savingPdf }}>
            <OrderNumberContainer {...{ savingPdf }}>
              <TitleStyled>{formatMessage(messages.orderPoint)}</TitleStyled>
              <StyledText>
                {teamStoreId ? teamStoreName : formatMessage(messages.cart)}
              </StyledText>
            </OrderNumberContainer>
            <OrderNumberContainer {...{ savingPdf }}>
              <TitleStyled>{formatMessage(messages.orderNumber)}</TitleStyled>
              <StyledText>{orderId}</StyledText>
            </OrderNumberContainer>
            <OrderNumberContainer {...{ savingPdf }}>
              <TitleStyled>{formatMessage(messages.orderDate)}</TitleStyled>
              <StyledText>{orderDate}</StyledText>
            </OrderNumberContainer>
            {paymentMethod === PaymentOptions.INVOICE && invoiceTerms &&
              <OrderNumberContainer {...{ savingPdf }}>
                <TitleStyled>{formatMessage(messages.paymentTerms)}</TitleStyled>
                <StyledText>{invoiceTerms}</StyledText>
              </OrderNumberContainer>
            }
            <OrderNumberContainer {...{ savingPdf }}>
              <TitleStyled>{formatMessage(messages.trackingNumber)}</TitleStyled>
              {trackingNumber ?
                <FedexLabel onClick={this.openFedexTracking(trackingNumber)}>
                  {trackingNumber}
                  <OpenIcon type="select" />
                  <FedexIcon src={iconFedex} />
                </FedexLabel> : '-'
              }
            </OrderNumberContainer>
            <OrderNumberContainer {...{ savingPdf }}>
              <TitleStyled>{formatMessage(messages.estimatedDate)}</TitleStyled>
              <StyledText>{estimatedDate}</StyledText>
            </OrderNumberContainer>
            <OrderNumberContainer {...{ savingPdf }}>
              <TitleStyled>{formatMessage(messages.orderStatus)}</TitleStyled>
              <StyledText redColor={status === PAYMENT_ISSUE}>
                {netsuiteStatus || status}
              </StyledText>
            </OrderNumberContainer>
            <StyledInfoText>
              <FormattedHTMLMessage
                {...messages[
                teamStoreId ? 'messageTeamstore' : 'messageRetail'
                ]}
              />
            </StyledInfoText>
            <ShippingBillingContainer>
              <div>
                <SubTitle>{formatMessage(messages.shippingAddress)}</SubTitle>
                <MyAddress
                  hideBottomButtons={true}
                  name={`${firstName} ${lastName}`}
                  city={`${city}, ${stateProvince}`}
                  {...{ street, zipCode, country, apartment, phone, formatMessage }}
                />
              </div>
              <div>
                <SubTitle>{formatMessage(messages.billingAddress)}</SubTitle>
                <MyAddress
                  hideBottomButtons={true}
                  simple={true}
                  name={`${billingFirstName} ${billingLastName}`}
                  street={billingStreet}
                  city={`${billingCity}, ${billingStateProvince}`}
                  zipCode={billingZipCode}
                  country={billingCountry}
                  apartment={billingApartment}
                  {...{ formatMessage }}
                />
              </div>
              <div>
                <SubTitle>{formatMessage(messages.payment)}</SubTitle>
                {paymentMethodInfo}
              </div>
            </ShippingBillingContainer>
            <TitleStyled>{formatMessage(messages.items)}</TitleStyled>
            <CartList>{renderList}</CartList>
            {/* TODO: For fixed price teamstores
              isThereTeamstoreProduct ? (
              <div>
                <SubTitle>{formatMessage(messages.priceDropAlert)}</SubTitle>
                <StyledDropText>
                  {formatMessage(messages.priceDropMessage)}
                </StyledDropText>
                // TODO: Add button to save these alerts settings 
                <ContainerCheckBox>
                  <StyledCheckbox
                    checked={sendEmailAlert}
                    onChange={this.handleOnCheckedSendEmailAlert}
                  >
                    {formatMessage(messages.sendEmail)}
                  </StyledCheckbox>
                  // TODO: get real email
                  <StyledEmailPhoneText>joe@smith.com</StyledEmailPhoneText>
                </ContainerCheckBox>
                <ContainerCheckBox>
                  <StyledCheckbox
                    checked={sendSmsAlert}
                    onChange={this.handleOnCheckedSendSmsAlert}
                  >
                    {formatMessage(messages.sendSms)}
                  </StyledCheckbox>
                  // TODO: get real phone
                  <StyledEmailPhoneText> 111-111-1111</StyledEmailPhoneText>
                </ContainerCheckBox>
              </div>
              ) : null */}
          </InfoContainer>
          <SummaryContainer {...{ savingPdf }}>
            <OrderSummary
              totalSum={total}
              shippingTotal={shippingAmount}
              onlyRead={true}
              currencySymbol={currency.shortName}
              totalWithoutDiscount={subtotal}
              youSaved={!!coupon && discount}
              proDesignReview={proDesign && PRO_DESIGN_FEE}
              couponName={coupon}
              couponCode={{ type: couponType, freeShipping }}
              {...{
                formatMessage,
                taxGst,
                taxPst,
                upgrades,
                taxVat,
                variables,
                taxFee,
                showDiscount,
                discount,
                subtotal
              }}
            />
          </SummaryContainer>
        </Content>
        {!!teamStoreId &&
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
              <ProductInfo
                id="showArrive"
                title={formatMessage(messages.arriveQuestion)}
                showContent={showArrive}
                toggleView={this.toggleProductInfo}
              >
                <div
                  dangerouslySetInnerHTML={{
                    __html: formatMessage(messages.arriveQuestionDesc)
                  }}
                />
              </ProductInfo>
              <ProductInfo
                id="showReturn"
                title={formatMessage(messages.returnQuestion)}
                showContent={showReturn}
                toggleView={this.toggleProductInfo}
              >
                <div
                  dangerouslySetInnerHTML={{
                    __html: formatMessage(messages.returnQuestionDesc)
                  }}
                />
              </ProductInfo>
            </FAQBody>
          </FAQSection>
        }
        {!teamStoreId && !savingPdf &&
          <FAQSection>
            <Title>
              {formatMessage(messages.faqTitle)}
            </Title>
            <FAQBody>
              <ProductInfo
                id="showPricing"
                titleWidth={'100%'}
                title={formatMessage(messages.makeChange)}
                showContent={showPricing}
                toggleView={this.toggleProductInfo}
              >
                <div
                  dangerouslySetInnerHTML={{
                    __html: formatMessage(messages.makeChangeDescription)
                  }}
                />
              </ProductInfo>
              <ProductInfo
                id="showIssue"
                richText={true}
                title={formatMessage(messages.orderArrive)}
                showContent={showIssue}
                toggleView={this.toggleProductInfo}
              >
                <div
                  dangerouslySetInnerHTML={{
                    __html: formatMessage(messages.orderArriveDesc)
                  }}
                />
              </ProductInfo>
              <ProductInfo
                id="showOrder"
                title={formatMessage(messages.returnPolicy)}
                showContent={showOrder}
                toggleView={this.toggleProductInfo}
              >
                <div
                  dangerouslySetInnerHTML={{
                    __html: formatMessage(messages.returnPolicyDesc)
                  }}
                />
              </ProductInfo>
            </FAQBody>
          </FAQSection>
        }
      </Container>
    )
  }

  handleOnCheckedSendEmailAlert = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { emailAlertCheckedAction } = this.props
    const {
      target: { checked }
    } = event
    emailAlertCheckedAction(checked)
  }
  handleOnCheckedSendSmsAlert = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { smsAlertCheckedAction } = this.props
    const {
      target: { checked }
    } = event
    smsAlertCheckedAction(checked)
  }
}

type OwnProps = {
  orderId?: string
}

const OrderDataEnhanced = compose(
  graphql<Data>(getOrderQuery, {
    options: ({ orderId }: OwnProps) => {
      return {
        fetchPolicy: 'network-only',
        variables: {
          orderId
        }
      }
    }
  }),
  withLoading,
  withError
)(OrderData)

export default OrderDataEnhanced
