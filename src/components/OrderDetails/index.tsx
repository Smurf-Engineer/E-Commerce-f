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
import {
  Container,
  ViewContainer,
  Div,
  ScreenTitle,
  // TODO: Commented to hide the receipt button until green light to continue with this implementation
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
  SavingContainer,
  ModalTitle,
  WarningIcon,
  buttonStyle,
  InfoBody,
  AboutCollab,
  CollabIcon,
  StatusIcon,
  BottomSectionStatus,
  CloseButtonStatus,
  StatusDescription,
  StatusTitle,
  ButtonEdit,
  StatusLabel
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
import {
  PREORDER,
  PAYMENT_ISSUE,
  VARIABLE_PRICE,
  JAKROO_LOGO_BASE64,
  INVOICE_SENT,
  excludeVariables,
  CANCELLED
} from '../../constants'
import ProductInfo from '../ProductInfo'
import { getSizeInCentimeters } from '../../utils/utilsFiles'
import ReactDOM from 'react-dom'
import filter from 'lodash/filter'
import { BLUE, GRAY } from '../../theme/colors'

const { warning } = Modal
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
  showDelete: boolean
  showEdit: boolean
  history: any
  formatMessage: (messageDescriptor: any, variables?: {}) => string
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
    savingPdf: false,
    showPaymentIssue: true,
    showArrive: false,
    showReturn: false,
    openStatusInfo: false,
    shownAction: false
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
  componentWillUnmount() {
    this.setState({ showPaymentIssue: true, shownAction: false })
  }
  componentDidUpdate() {
    const { data, formatMessage, showEdit, showDelete } = this.props
    const { showPaymentIssue, shownAction } = this.state
    const invoiceLink = get(data, 'orderQuery.invoiceLink', '')
    const status = get(data, 'orderQuery.status', '')
    if (status === INVOICE_SENT && !!invoiceLink && showPaymentIssue) {
      this.setState({ showPaymentIssue: false })
      warning({
        title: <ModalTitle>{formatMessage(messages.paymentIssueTitle)}</ModalTitle>,
        width: 564,
        okText: formatMessage(messages.gotIt),
        icon: <WarningIcon theme="filled" type="exclamation-circle" />,
        okButtonProps: {
          style: buttonStyle
        },
        content:
          <InfoBody dangerouslySetInnerHTML={{
            __html: formatMessage(messages.paymentIssueInfo, { link: invoiceLink })
          }} />
      })
    }
    if (!shownAction && data && !data.loading && (showEdit || showDelete)) {
      this.setState({ shownAction: true })
      if (showEdit) {
        this.handleOnEditOrder()
      } else if (showDelete) {
        this.handleOnDeleteOrder()
      }
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
      this.html2pdf.setFont('Helvetica')
      this.html2pdf.setFontType('bold')
      this.html2pdf.setFontSize(13)
      this.html2pdf.setTextColor('#525252')
      this.html2pdf.text('Invoice', 18.4, 1.2, { align: 'right' })
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
  handleOnReturn = () => {
    const { onReturn } = this.props
    this.setState({ showPaymentIssue: true, shownAction: false })
    onReturn('')
  }
  openStatusModal = () => {
    setTimeout(() => {
      if (window.navigator && window.navigator.vibrate) {
        navigator.vibrate([70, 50, 20])
      }
      this.setState({ openStatusInfo: true })
    // tslint:disable-next-line: align
    }, 250)
  }
  closeStatusModal = () => {
    if (window.navigator && window.navigator.vibrate) {
      navigator.vibrate([70, 50, 20])
    }
    this.setState({ openStatusInfo: false })
  }
  render() {
    const {
      data,
      orderId,
      from,
      formatMessage,
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
      savingPdf,
      showPaymentIssue,
      showArrive,
      showReturn,
      openStatusInfo
    } = this.state

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
      userId,
      resellerComission = 0,
      resellerInline = 0,
      resellerMargin = 0,
      invoiceLink,
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
      cart: cartOriginal,
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
      coupon,
      couponType,
      fixedPriceStore,
      freeShipping
    } = data.orderQuery

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
    let statusColor = GRAY
    let subtotal = 0
    let upgrades = 0
    let variables = 0
    let totalWithoutDiscount = 0
    let cart = cartOriginal
    const orderStatus = netsuiteStatus || (status === INVOICE_SENT ? PAYMENT_ISSUE : status)
    switch (orderStatus) {
      case 'Pre-Order':
        statusColor = BLUE
        break
      default:
        break
    }
    if (fixedPriceStore) {
      cart = cartOriginal.map((item) => ({...item, fixedPrice: true }))
    }
    const cartItems = cart || []
    const showDiscount = cartItems.some(({ isReseller }) => !isReseller)
    const renderItemList = cart
      ? cart.map((cartItem, index) => {
        const {
          designId,
          designImage,
          proCertified,
          proDesign: proDesignItem,
          designName,
          designOwner,
          product: { images, name, shortDescription, priceRange: productRange },
          productTotal,
          unitPrice,
          teamStoreItem,
          itemDetails,
          teamPrice
        } = cartItem
        let priceRange = productRange
        const isReseller = resellerComission > 0 || resellerInline > 0
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
        if (teamPrice && teamPrice.length > 0) {
          cartItem.fixedPrices = teamPrice || []
        }
        const quantitySum = itemDetails.reduce((a, b) => a + b.quantity, 0)
        const currencyPrices = filter(priceRange, {
          abbreviation: currency && currency.shortName ? currency.shortName.toLowerCase() : 'usd'
        })
        totalWithoutDiscount += quantitySum * (currencyPrices && currencyPrices[0] ? currencyPrices[0].price : 0)
        // This function is used to SUM all the upgrades prices applied to a product and have it on the subtotal
        // Upgrades prices * quantities
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
        }// tslint:disable-next-line: align
        , 0)
        variables += subVariables || 0
        upgrades += subUpgrade || 0
        subtotal += productTotal || 0
        cartItem.isFixed = onDemand === false
        cartItem.teamStoreItem = teamStoreItem

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
              proCertified,
              cartItem,
              currentCurrency
            }}
            proDesign={proDesignItem}
            currencySymbol={currency.shortName}
            key={index}
            image={itemImage}
            title={itemTitle}
            description={itemDescription}
            price={{
              quantity: '0',
              price: 0,
              shortName: ''
            }}
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
        <ViewContainer onClick={this.handleOnReturn}>
          <Icon type="left" />
          <span>{formatMessage(getBackMessage)}</span>
        </ViewContainer>
        <Div secondary={status === PREORDER}>
          <ScreenTitle>
            <FormattedMessage {...messages.title} />
          </ScreenTitle>
          {status !== PREORDER &&
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
        <DataDiv ref={content => (this.copyInput = content)} {...{ savingPdf }}>
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
                  <StatusLabel {...{ savingPdf, statusColor }}>
                    {orderStatus}
                  </StatusLabel>
                  <Info {...{ savingPdf }}>
                    {lastDrop ? moment(lastDrop).format('DD/MM/YYYY HH:mm') : '-'}
                  </Info>
                </DeliveryData>
              </DeliveryInfo>
            </OrderDelivery>
            <OrderSummaryContainer {...{ savingPdf }}>
              {status === PREORDER && !savingPdf && !fixedPriceStore &&
                <AboutCollab onMouseOver={this.openStatusModal}>
                  <CollabIcon twoToneColor="#2673CA" type="info-circle" theme="twoTone" />
                  {formatMessage(messages.aboutDynamicPricing)}
                </AboutCollab>
              }
              {(teamStoreId && owner) && !savingPdf &&
                (status === PREORDER || canUpdatePayment) && status !== CANCELLED &&
                  <OrderActions>
                    <ButtonEdit onClick={this.handleOnEditOrder}>
                      {formatMessage(
                        status === PAYMENT_ISSUE
                          ? messages.updatePayment
                          : messages.edit
                      )}
                    </ButtonEdit>
                    <DeleteButton type="delete" onClick={this.handleOnDeleteOrder} />
                  </OrderActions>
              }
              <OrderSummary
                onlyRead={true}
                totalSum={total}
                shippingTotal={shippingAmount}
                totalWithoutDiscount={totalWithoutDiscount}
                youSaved={totalWithoutDiscount - subtotal}
                currencySymbol={currency.shortName}
                proDesignReview={proDesign && PRO_DESIGN_FEE}
                couponName={coupon}
                isFixedStore={fixedPriceStore}
                couponCode={{ type: couponType, freeShipping }}
                invoiceLink={!showPaymentIssue ? invoiceLink : ''}
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
                  fixedPrice={fixedPriceStore}
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
                simple={savingPdf}
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
                simple={true}
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
            fixedPrice={fixedPriceStore}
            fixedCart={status === PAYMENT_ISSUE}
            replaceOrder={shortId}
          />
        }
        {!!teamStoreId && !savingPdf &&
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
        <Modal
          visible={openStatusInfo}
          footer={null}
          closable={false}
          width={isMobileModal ? '100%' : '564px'}
          wrapClassName={isMobileModal ? 'transparentMask' : ''}
          maskStyle={isMobileModal ? { background: 'rgb(0 0 0 / 80%)', backdropFilter: 'blur(7px)' } : {}}
        >
          <StatusIcon twoToneColor="#2673CA" type="info-circle" theme="twoTone" />
          <StatusTitle>
            {formatMessage(messages.dynamicPrice)}
          </StatusTitle>
          <StatusDescription>
            {formatMessage(messages.dynamicPriceDesc)}
          </StatusDescription>
          <BottomSectionStatus>
            <CloseButtonStatus onClick={this.closeStatusModal}>
              {formatMessage(messages.close)}
            </CloseButtonStatus>
          </BottomSectionStatus>
        </Modal>
      </Container>
    )
  }

  handleOnEditOrder = () => {
    const { formatMessage, history } = this.props
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
          history.push('/shopping-cart')
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
