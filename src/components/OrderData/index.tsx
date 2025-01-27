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
  FedexIcon,
  AboutCollab,
  CollabIcon,
  StatusTitle,
  StatusDescription,
  BottomSectionStatus,
  CloseButtonStatus,
  StatusLabel,
  TopSection,
  BottomSection,
  PaymentLink,
  StripeIcon,
  LinkCopyIcon,
  ResellerTagImg,
} from './styledComponents'
import { getOrderQuery } from './data'

import {
  PURCHASE,
  PAYMENT_ISSUE,
  VARIABLE_PRICE,
  JAKROO_LOGO_BASE64,
  excludeVariables,
  PREORDER,
  INVOICED,
  INVOICE_SENT
} from '../../constants'
import MyAddress from '../MyAddress'
import OrderSummary from '../OrderSummary'
import withError from '..//WithError'
import withLoading from '../WithLoading'
import iconFedex from '../../assets/fedexicon.svg'
import iconPaypal from '../../assets/Paypal.svg'
import stripeLogo from '../../assets/stripelogo.png'
import iconSepa from '../../assets/Sepa.svg'
import resellerTag from '../../assets/resellertag.svg'
import { QueryProps, OrderDataInfo, FulfillmentNetsuite } from '../../types/common'
import CartListItem from '../CartListItem'
import { PaymentOptions } from '../../screens/Checkout/constants'
import PaymentData from '../PaymentData'
import ProductInfo from '../ProductInfo'
import ReactDOM from 'react-dom'
import { getSizeInCentimeters } from '../../utils/utilsFiles'
import Spin from 'antd/lib/spin'
import Modal from 'antd/lib/modal'
import filter from 'lodash/filter'
import message from 'antd/lib/message'
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
    showReturn: false,
    openStatusInfo: true,
    savedStatus: false
  }
  private copyInput: any
  private html2pdf: any
  componentDidUpdate() {
    const { data } = this.props
    const { savedStatus } = this.state
    if (data && !data.loading && !savedStatus) {
      this.setState({ savedStatus: true })
      const {
        orderId,
        data: {
          orderData: { cart, taxFee, shippingAmount, currency: { shortName } }
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
        window.uetq = window.uetq || []
        window.uetq.push('event', 'purchase', {'revenue_value': subtotal, 'currency': shortName })
      }
      // if (paymentMethod === PaymentOptions.PAYMENT_LINK && invoiceLink) {
      //   info({
      //     title: (
      //       <ModalTitle>
      //         {formatMessage(messages.paymentLink)}
      //         <StripeLogo src={stripeLogo} />
      //       </ModalTitle>
      //     ),
      //     icon: ' ',
      //     okText: formatMessage(messages.gotIt),
      //     okButtonProps: {
      //       style: buttonStyle,
      //     },
      //     content: (
      //       <InfoBody>
      //         {formatMessage(messages.paymentLinkInfo)}
      //         <ApprovalLink onClick={this.copyLink}>
      //           {invoiceLink}
      //           <LinkCopyIcon type="link"/>
      //         </ApprovalLink>
      //       </InfoBody>
      //     ),
      //   })
      // }
    }
  }
  copyLink = () => {
    const { formatMessage, data } = this.props
    const tempInput = document.createElement('input')
    const invoiceLink = get(data, 'orderData.invoiceLink', '')
    tempInput.value = invoiceLink
    document.body.appendChild(tempInput)
    tempInput.select()
    document.execCommand('copy')
    document.body.removeChild(tempInput)
    message.success(formatMessage(messages.copiedLink))
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
  openStatusModal = () => {
    if (window.navigator && window.navigator.vibrate) {
      navigator.vibrate([70, 50, 20])
    }
    this.setState({ openStatusInfo: true })
  }
  closeStatusModal = () => {
    if (window.navigator && window.navigator.vibrate) {
      navigator.vibrate([70, 50, 20])
    }
    this.setState({ openStatusInfo: false })
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
          userId,
          resellerComission = 0,
          resellerInline = 0,
          resellerMargin = 0,
          phone,
          city,
          placedAuthor,
          freeShipping,
          couponType,
          invoiceLink,
          invoiceTerms,
          stateProvince,
          zipCode,
          referenceNumber,
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
          coupon,
          fixedPriceStore
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
      showReturn,
      openStatusInfo
    } = this.state

    const card = get(payment, 'stripeCharge.cardData', {})
    const netsuiteObject = get(netsuite, 'orderStatus')
    const isMobileModal = typeof window !== 'undefined' && window.matchMedia('(max-width: 1023px)').matches
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
          </InvoiceDiv> : 
          paymentMethod === PaymentOptions.PAYMENT_LINK ?
          <PaymentLink>
            <StripeIcon crossOrigin="anonymous" src={stripeLogo} />
            {formatMessage(messages.paymentLink)}
          </PaymentLink> : (
          <StyledImage
            src={paymentMethod === PaymentOptions.PAYPAL ? iconPaypal : iconSepa}
          />
        )
    let subtotal = 0
    let upgrades = 0
    let variables = 0
    let totalWithoutDiscount = 0
    const cartItems = cart || []
    const isReseller = resellerComission > 0 || resellerInline > 0
    const showDiscount = cartItems.some(({ isReseller: isResellerItem }) => !isResellerItem)
    const renderList = cart
      ? cart.map((cartItem, index) => {
        const {
          designId,
          designImage,
          designOwner,
          proCertified,
          proDesign: proDesignItem,
          designName,
          product: { images, name, shortDescription, priceRange: productRange },
          productTotal,
          unitPrice,
          itemDetails,
        } = cartItem
        let priceRange = productRange
        if ((userId === designOwner && isReseller) || (isReseller && !designId)) {
          let comissionToApply = cartItem.designId ? resellerComission :  resellerInline
          if (cartItem.teamStoreId && cartItem.designId) {
            comissionToApply = resellerMargin
          }
          priceRange = priceRange.map((priceItem) => {
            const price = (priceItem.price * (1 - (comissionToApply / 100))).toFixed(2)
            return { ...priceItem, price }
          })
        }
        const quantitySum = itemDetails.reduce((a, b) => a + b.quantity, 0)
        const currencyPrices = filter(priceRange, {
          abbreviation: currency && currency.shortName ? currency.shortName.toLowerCase() : 'usd'
        })

        totalWithoutDiscount += quantitySum * (currencyPrices && currencyPrices[0] ? currencyPrices[0].price : 0)

        // tslint:disable-next-line: max-line-length
        const subUpgrade = itemDetails.reduce((sum, { quantity, upgradeOnePrice = 0, upgradeTwoPrice = 0, upgradeThreePrice = 0}) =>
          sum + (upgradeOnePrice * quantity) + (quantity * upgradeTwoPrice) + (quantity * upgradeThreePrice)
        // tslint:disable-next-line: align
        , 0)
        const productId = get(cartItem, 'product.id', '')
        const subVariables = itemDetails.reduce((sum, { quantity, variableOneValue, variableTwoValue }) => {
          if ((variableOneValue && variableOneValue.trim()) || (variableTwoValue && variableTwoValue.trim())) {
            sum += ((excludeVariables[productId] ? 0 : VARIABLE_PRICE) * quantity)
          }
          return sum
        }
        // tslint:disable-next-line: align
        , 0)
        variables += subVariables || 0
        upgrades += subUpgrade || 0
        subtotal += productTotal || 0
        cartItem.fixedPrice = fixedPriceStore
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
        <Title secondary={status === PREORDER}>{title}</Title>
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
          <TopSection>
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
              {referenceNumber &&
                <OrderNumberContainer>
                  <TitleStyled>{formatMessage(messages.referenceNumber)}</TitleStyled>
                  <StyledText>{referenceNumber}</StyledText>
                </OrderNumberContainer>
              }
              <OrderNumberContainer {...{ savingPdf }}>
                <TitleStyled>{formatMessage(messages.orderDate)}</TitleStyled>
                <StyledText>{orderDate}</StyledText>
              </OrderNumberContainer>
              <OrderNumberContainer {...{ savingPdf }}>
                <TitleStyled>{formatMessage(messages.orderStatus)}</TitleStyled>
                <StyledText redColor={status === PAYMENT_ISSUE}>
                  {netsuiteStatus || (status === INVOICED ? 'Invoice-Order' 
                  : (status === INVOICE_SENT ? 'Invoiced' : status))}
                </StyledText>
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
              {placedAuthor && placedAuthor.firstName &&
                <OrderNumberContainer {...{ savingPdf }}>
                  <TitleStyled>{formatMessage(messages.placedBy)}</TitleStyled>
                  <StyledText>{placedAuthor.firstName} {placedAuthor.lastName}  (Jakroo)</StyledText>
                </OrderNumberContainer>
              }
              {paymentMethod === PaymentOptions.PAYMENT_LINK && invoiceLink &&
                <OrderNumberContainer {...{ savingPdf }}>
                  <TitleStyled>{formatMessage(messages.paymentLink)}</TitleStyled>
                  <StyledText><a href={invoiceLink}>{invoiceLink}<LinkCopyIcon type="link"/></a></StyledText>
                </OrderNumberContainer>
              }
            </InfoContainer>
            <SummaryContainer {...{ savingPdf }}>
              {status === PREORDER && !savingPdf && !fixedPriceStore &&
                <AboutCollab onClick={this.openStatusModal}>
                  <CollabIcon twoToneColor="#2673CA" type="info-circle" theme="twoTone" />
                  {formatMessage(messages.aboutDynamicPricing)}
                </AboutCollab>
              }
              {isReseller &&
                <ResellerTagImg
                  secondary={status === PREORDER && !savingPdf && !fixedPriceStore}
                  src={resellerTag}
                />
              }
              <OrderSummary
                totalSum={total}
                shippingTotal={shippingAmount}
                onlyRead={true}
                currencySymbol={currency.shortName}
                totalWithoutDiscount={totalWithoutDiscount}
                youSaved={totalWithoutDiscount - subtotal}
                proDesignReview={proDesign && PRO_DESIGN_FEE}
                couponName={coupon}
                isFixedStore={fixedPriceStore}
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
          </TopSection>
          <BottomSection>
            <StyledInfoText>
              <FormattedHTMLMessage
                {...messages[
                  teamStoreId ? 'messageTeamstore' : 
                  ((paymentMethod === PaymentOptions.INVOICE ||
                    paymentMethod === PaymentOptions.PAYMENT_LINK) ? 
                    'messageRetailPreparing'
                    : 'messageRetail')
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
          </BottomSection>
        </Content>
        {!!teamStoreId &&
          <FAQSection>
            <Title>
              {formatMessage(messages.faqTitle)}
            </Title>
            <FAQBody>
              {!fixedPriceStore &&
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
              }
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
        {status === PREORDER && !savingPdf && !fixedPriceStore &&
          <Modal
            visible={openStatusInfo}
            footer={null}
            closable={false}
            width={isMobileModal ? '100%' : '564px'}
            wrapClassName={isMobileModal ? 'transparentMask' : ''}
            maskStyle={isMobileModal ? { background: 'rgb(0 0 0 / 80%)', backdropFilter: 'blur(7px)' } : {}}
          >
            <StatusLabel>{formatMessage(messages.statusLabel)}</StatusLabel>
            <StatusTitle>
              {formatMessage(messages.dynamicPrice)}
            </StatusTitle>
            <StatusDescription
              dangerouslySetInnerHTML={{
                __html: formatMessage(messages.dynamicPriceDesc)
              }}
            />
            <BottomSectionStatus>
              <CloseButtonStatus onClick={this.closeStatusModal}>
                {formatMessage(messages.close)}
              </CloseButtonStatus>
            </BottomSectionStatus>
          </Modal>
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
