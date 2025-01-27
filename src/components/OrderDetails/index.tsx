/**
 * OrderDetails Component - Created by jorge on 23/07/18.
 */
import * as React from 'react'
import { FormattedMessage } from 'react-intl'
import { graphql, compose } from 'react-apollo'
import { FormattedHTMLMessage } from 'react-intl'
import message from 'antd/lib/message'
import domtoimage from 'dom-to-image'
import momentTz from 'moment-timezone'
import get from 'lodash/get'
import cloneDeep from 'lodash/cloneDeep'
import messages from './messages'
import { OrderDetailsInfo, QueryProps, FulfillmentNetsuite, CartItems, MessagePayload } from '../../types/common'
import Modal from 'antd/lib/modal'
import { getOrderQuery, deleteOrderMutation, saveDeliveryMutation } from './data'
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
  BottomSectionStatus,
  CloseButtonStatus,
  StatusDescription,
  StatusTitle,
  ButtonEdit,
  StatusLabel,
  IconStatus,
  StatusImage,
  EditIcon,
  EditContent,
  StatusTop,
  TitleEdit,
  StyledPopOver,
  PopoverText,
  InfoIcon,
  InfoSecondary,
  DeliveryLabelSecondary,
  PaymentLink,
  StripeIcon,
  PayNow,
  PastDueLabel,
  ResellerTagImg
} from './styledComponents'
import OrderSummary from '../OrderSummary'
import CartListItem from '../CartListItem'
import MyAddress from '../MyAddress'
import AddToCartButton from '../AddToCartButton'
import resellerTag from '../../assets/resellertag.svg'
import iconPaypal from '../../assets/Paypal.svg'
import iconFedex from '../../assets/fedexicon.svg'
import stripeLogo from '../../assets/stripelogo.png'
import shippedIcon from '../../assets/shippedicon.png'
import inProductionIcon from '../../assets/in_production.svg'
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
  CANCELLED,
  PAID,
  PENDING_APPROVAL,
  IN_PRODUCTION,
  SHIPPED,
  PAID_STATUS,
  INVOICED,
  ERROR_STATUS,
  PURGED
} from '../../constants'
import ProductInfo from '../ProductInfo'
import { getSizeInCentimeters } from '../../utils/utilsFiles'
import ReactDOM from 'react-dom'
import filter from 'lodash/filter'
import { GRAY } from '../../theme/colors'
import TrackingInfo from '../TrackingInfo'
import set from 'lodash/set'

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
  onBehalf?: boolean
  adminUser?: string
  user?: any
  saveDeliverDate: (variables: {}) => Promise<MessagePayload>
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
    shownAction: false,
    actualDeliver: '',
    isDeliver: false
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
    const { data, formatMessage, showEdit, showDelete, onBehalf } = this.props
    const { showPaymentIssue, shownAction } = this.state
    const invoiceLink = get(data, 'orderQuery.invoiceLink', '')
    const status = get(data, 'orderQuery.status', '')
    const paymentMethod = get(data, 'orderQuery.paymentMethod', '')
    const inProductionTimestamp = get(data, 'orderQuery.inProductionTimestamp', '')
    const netsuite = get(data, 'orderQuery.netsuite', {})
    const netsuiteObject = get(netsuite, 'orderStatus')
    const netsuiteStatus = netsuiteObject && netsuiteObject.orderStatus
    const orderStatus = netsuiteStatus || (status === INVOICE_SENT ? PAYMENT_ISSUE : status)
    const canUpdatePayment = get(data, 'orderQuery.canUpdatePayment', false)
    const productionHours = momentTz().tz('America/Los_Angeles')
      .diff(momentTz(inProductionTimestamp).tz('America/Los_Angeles'), 'hours')
    const productionValid = productionHours <= 24
    if (orderStatus === INVOICE_SENT && paymentMethod !== PaymentOptions.PAYMENT_LINK && 
      !!invoiceLink && showPaymentIssue) {
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
    if (!shownAction && data && !data.loading && (showEdit || showDelete) && 
        (
          (canUpdatePayment || orderStatus === PREORDER) || 
          (onBehalf && (
            orderStatus === PAID_STATUS || 
            orderStatus === INVOICED || 
            (orderStatus === IN_PRODUCTION && productionValid) || 
            orderStatus === PENDING_APPROVAL    
          ))
        ) 
        && !invoiceLink
      ) {
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
  saveDeliver = async (date: string, isDeliver: boolean) => {
    const { orderId, saveDeliverDate, data } = this.props
    await saveDeliverDate({
      variables: {
        date,
        isDeliver,
        orderId
      }
    })
    if (data) {
      set(data, 'orderQuery.deliveredDate', date)
      set(data, 'orderQuery.isDelivered', isDeliver)
    }
  }
  setDeliverDate = (date: string, isDeliver: boolean, dateRaw: string) => {
    const { data, orderId } = this.props
    this.setState({ actualDeliver: date, isDeliver })
    const deliveredDate = get(data, 'orderQuery.deliveredDate', '')
    const deliveredYet = get(data, 'orderQuery.isDelivered', false)
    if (dateRaw && (!deliveredDate || (isDeliver && !deliveredYet)) && orderId) {
      this.saveDeliver(dateRaw, isDeliver)
    }
  }
  render() {
    const {
      data,
      orderId,
      from,
      onBehalf,
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
      openStatusInfo,
      actualDeliver,
      isDeliver
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
      inProductionTimestamp,
      resellerComission = 0,
      resellerInline = 0,
      resellerMargin = 0,
      invoiceLink,
      referenceNumber,
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
      placedAuthor,
      teamStoreId,
      invoicePaymentStatus,
      pastDue,
      // lastDrop,
      canUpdatePayment,
      onDemand,
      coupon,
      couponType,
      fixedPriceStore,
      freeShipping
    } = data.orderQuery
    const productionHours = momentTz().tz('America/Los_Angeles')
      .diff(momentTz(inProductionTimestamp).tz('America/Los_Angeles'), 'hours')
    const productionValid = productionHours <= 24
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
    let statusIcon = 'audit'
    let subtotal = 0
    let upgrades = 0
    let variables = 0
    let totalWithoutDiscount = 0
    let cart = cartOriginal
    const orderStatus = netsuiteStatus || 
      (status === INVOICE_SENT && paymentMethod !== PaymentOptions.PAYMENT_LINK ?
       PAYMENT_ISSUE : status)
    switch (orderStatus) {
      case PREORDER:
        statusColor = '#cde4ff'
        statusIcon = 'carry-out'
        break
      case CANCELLED:
        statusColor = '#ffcaca'
        statusIcon = 'close-circle'
        break
      case PAID:
        statusColor = '#cff8d9'
        statusIcon = 'dollar'
        break
      case PENDING_APPROVAL:
        statusColor = '#fff1cd'
        statusIcon = 'clock-circle'
        break
      case IN_PRODUCTION:
        statusColor = '#ffe0af'
        statusIcon = 'skin'
        break
      case SHIPPED:
        statusColor = '#97d39b'
        break
      default:
        break
    }
    cart.forEach((item: CartItems) => {
      if (item.product) {
        item.product.variableOne = item.variableOne
        item.product.oneLength = item.oneLength
        item.product.variableOnecaps = item.variableOneCaps
        item.product.variableTwo = item.variableTwo
        item.product.twoLength = item.twoLength
        item.product.variableTwoCaps = item.variableTwoCaps
      }
      if (fixedPriceStore) {
        item.fixedPrice = true
      }
    })
    const cartItems = cart || []
    const isResellerUser = resellerComission > 0 || resellerInline > 0
    let cartToEdit = cartItems || []
    if (isResellerUser && onBehalf) {
      cartToEdit = cloneDeep(cartItems)
      cartToEdit.forEach((item: CartItems) => {
        if ((userId === item.designOwner) || (!item.designId)) {
          let comissionToApply = item.designId ? resellerComission : resellerInline
          if (item.teamStoreId && item.designId) {
            comissionToApply = resellerMargin
          }
          item.product.priceRange = item.product.priceRange.map((priceItem) => {
            const price = (priceItem.price * (1 - (comissionToApply / 100))).toFixed(2)
            return { ...priceItem, price }
          })
        }
      })
    }
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
        const isReseller = resellerComission > 0 || resellerInline > 0
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
            <InvoiceTitle><InvoiceIcon type="file-text" />{formatMessage(messages.invoiceLabel)}</InvoiceTitle>
            <InvoiceSubtitle>{formatMessage(messages.paymentTerms)} {invoiceTerms}</InvoiceSubtitle>
          </InvoiceDiv> : 
          paymentMethod === PaymentOptions.PAYMENT_LINK ?
          <PaymentLink>
            <StripeIcon crossOrigin="anonymous" src={stripeLogo} />
            {formatMessage(messages.paymentLink)}
          </PaymentLink> : (
          <StyledImage crossOrigin="anonymous" src={iconPaypal} />
        )

    return (
      <Container>
        {savingPdf && <SavingContainer><Spin size="large" /></SavingContainer>}
        {orderStatus === PAYMENT_ISSUE && (
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
        <Div secondary={orderStatus === PREORDER}>
          <ScreenTitle>
            <FormattedMessage {...messages.title} />
          </ScreenTitle>
          {orderStatus !== PREORDER && !onBehalf &&
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
                  {referenceNumber &&
                    <DeliveryLabel>
                      {formatMessage(messages.referenceNumber)}
                    </DeliveryLabel>
                  }
                  <DeliveryLabel>
                    {formatMessage(messages.orderDate)}
                  </DeliveryLabel>
                  <DeliveryLabel>{formatMessage(messages.status)}</DeliveryLabel>
                  {teamStoreId && cutoffDate &&
                    <DeliveryLabel>
                      {formatMessage(messages.cutoffDate)}
                    </DeliveryLabel>
                  }
                  {paymentMethod === PaymentOptions.INVOICE && invoiceTerms && <>
                    <DeliveryLabel>
                      {formatMessage(messages.paymentTerms)}
                    </DeliveryLabel>
                    <DeliveryLabel>
                      {formatMessage(messages.paymentStatus)}
                    </DeliveryLabel>
                    </>
                  }
                  <DeliveryLabel>
                    {formatMessage(messages.deliveryDate)}
                    <StyledPopOver
                      overlayClassName="innerClassTooltip"
                      title={
                        <PopoverText
                          dangerouslySetInnerHTML={{
                            __html: formatMessage(messages.deliveryInfo)
                          }}
                        />
                      }
                    >
                      <InfoIcon type="question-circle" />
                    </StyledPopOver>
                  </DeliveryLabel>
                  {paymentMethod === PaymentOptions.PAYMENT_LINK && invoiceLink &&
                    <DeliveryLabel>
                      {formatMessage(messages.paymentStatus)}
                    </DeliveryLabel>
                  }
                  {placedAuthor && placedAuthor.firstName &&
                    <DeliveryLabel>
                      {formatMessage(messages.placedBy)}
                    </DeliveryLabel>
                  }
                  {actualDeliver &&
                    <DeliveryLabelSecondary>
                      <FedexIcon src={iconFedex} />
                      {formatMessage(messages[isDeliver ? 'actualDelivery' : 'scheduledDelivery'])}
                      <StyledPopOver
                        overlayClassName="innerClassTooltip"
                        title={
                          <PopoverText
                            dangerouslySetInnerHTML={{
                              __html: formatMessage(messages.deliveryInfoFedex)
                            }}
                          />
                        }
                      >
                        <InfoIcon type="question-circle" />
                      </StyledPopOver>
                    </DeliveryLabelSecondary>
                  }
                  <DeliveryLabel secondary={!!actualDeliver}>
                    {formatMessage(messages.trackingNumber)}
                  </DeliveryLabel>
                </DeliveryLabels>
                <DeliveryData>
                  <Info {...{ savingPdf }}>
                    {teamStoreId ? teamStoreName : formatMessage(messages.cart)}
                  </Info>
                  <Info {...{ savingPdf }}>{shortId}</Info>
                  {referenceNumber &&
                    <Info {...{ savingPdf }}>
                      {referenceNumber}
                    </Info>
                  }
                  <Info {...{ savingPdf }}>{orderDate}</Info>
                  <StatusLabel {...{ savingPdf, statusColor }}>
                    {orderStatus === SHIPPED || orderStatus === IN_PRODUCTION ?
                      <StatusImage src={orderStatus === SHIPPED ? shippedIcon : inProductionIcon} /> :
                      <IconStatus type={statusIcon} />
                    }
                    {orderStatus === INVOICED ? 'Invoice-Order' : 
                    (orderStatus === INVOICE_SENT ? 'Invoiced' : orderStatus)
                    }
                  </StatusLabel>
                  {teamStoreId && cutoffDate && <Info {...{ savingPdf }}>{cutoffDate}</Info>}
                  {paymentMethod === PaymentOptions.INVOICE && invoiceTerms && <>
                    <Info {...{ savingPdf }}>{invoiceTerms}</Info>
                    <Info {...{ savingPdf }}>
                      {invoicePaymentStatus}
                      {pastDue && 
                        <PastDueLabel>
                          {formatMessage(messages.pastDue)}
                        </PastDueLabel>
                      }
                    </Info>
                    </>
                  }
                  <Info {...{ savingPdf }}>{estimatedDate}</Info>
                  {paymentMethod === PaymentOptions.PAYMENT_LINK && invoiceLink && orderStatus !== CANCELLED &&
                    orderStatus !== ERROR_STATUS && orderStatus !== PURGED &&
                    <Info {...{ savingPdf }}>
                      <PayNow href={invoiceLink}>{formatMessage(messages.payNow)}</PayNow>
                    </Info>
                  }
                  {placedAuthor && placedAuthor.firstName &&
                    <Info {...{ savingPdf }}>
                      {placedAuthor.firstName} {placedAuthor.lastName}  (Jakroo)
                    </Info>
                  }
                  {actualDeliver &&
                    <InfoSecondary {...{ savingPdf }}>
                      {actualDeliver}
                    </InfoSecondary>
                  }
                  <Info {...{ savingPdf }}>
                    {trackingNumber ? 
                      <FedexLabel onClick={this.openFedexTracking(trackingNumber)}>
                        {trackingNumber}
                      </FedexLabel> : '-'
                    }
                  </Info>
                </DeliveryData>
              </DeliveryInfo>
              <TrackingInfo
                {...{ formatMessage, actualDeliver }}
                setDeliverDate={this.setDeliverDate}
                inProduction={orderStatus === IN_PRODUCTION}
                code={trackingNumber}
              />
            </OrderDelivery>
            <OrderSummaryContainer {...{ savingPdf }}>
              {orderStatus === PREORDER && !savingPdf && !fixedPriceStore &&
                <AboutCollab onClick={this.openStatusModal}>
                  <CollabIcon twoToneColor="#2673CA" type="info-circle" theme="twoTone" />
                  {formatMessage(messages.aboutDynamicPricing)}
                </AboutCollab>
              }
              {(
                (
                  (teamStoreId && owner) && !savingPdf &&
                  (orderStatus === PREORDER || canUpdatePayment) && orderStatus !== CANCELLED
                ) ||
                (onBehalf && 
                  (orderStatus === PAID_STATUS || 
                    orderStatus === INVOICED || 
                    (orderStatus === IN_PRODUCTION && productionValid) || 
                    orderStatus === PENDING_APPROVAL
                  ) 
                && owner)
              ) 
                && !invoiceLink &&
                  <OrderActions>
                    {orderStatus === PAYMENT_ISSUE ?
                      <ButtonEdit onClick={this.handleOnEditOrder}>
                        {formatMessage(messages.updatePayment)}
                      </ButtonEdit> :
                      <EditIcon type="edit" onClick={this.handleOnEditOrder}>
                        {formatMessage(messages.edit)}
                      </EditIcon>
                    }
                    <DeleteButton onClick={this.handleOnDeleteOrder}>
                      {formatMessage(messages.cancel)}
                    </DeleteButton>
                  </OrderActions>
              }
              {isResellerUser &&
                <ResellerTagImg
                  secondary={
                    ((
                      (
                        (teamStoreId && owner) && !savingPdf &&
                        (orderStatus === PREORDER || canUpdatePayment) && orderStatus !== CANCELLED
                      ) ||
                      (onBehalf && 
                        (orderStatus === PAID_STATUS || 
                          orderStatus === INVOICED || 
                          (orderStatus === IN_PRODUCTION && productionValid) || 
                          orderStatus === PENDING_APPROVAL
                        ) 
                      && owner)
                    ) 
                    && !invoiceLink) ||
                    (orderStatus === PREORDER && !savingPdf && !fixedPriceStore)
                  }
                  src={resellerTag}
                />
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
              {...messages[teamStoreId ? 
                'messageTeamstore' : 
                (orderStatus === SHIPPED ? 
                  'messageRetailShipped' : 
                  (orderStatus === INVOICE_SENT ?
                    'messageRetailPreparing'
                  : 'messageRetail'
                  )
                )]
              }
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
                  items={cartToEdit}
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
            items={cartToEdit}
            {...{ formatMessage }}
            withoutTop={true}
            myLockerList={false}
            itemProdPage={true}
            isFixed={teamStoreId && !onDemand}
            orderDetails={true}
            onClick={() => true}
            hide={true}
            fixedPrice={fixedPriceStore}
            fixedCart={orderStatus === PAYMENT_ISSUE}
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
        {orderStatus === PREORDER && !savingPdf && !fixedPriceStore &&
          <Modal
            visible={openStatusInfo}
            footer={null}
            closable={false}
            width={isMobileModal ? '100%' : '564px'}
            wrapClassName={isMobileModal ? 'transparentMask' : ''}
            maskStyle={isMobileModal ? { background: 'rgb(0 0 0 / 80%)', backdropFilter: 'blur(7px)' } : {}}
          >
            <StatusTop>{formatMessage(messages.statusLabel)}</StatusTop>
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

  handleOnEditOrder = () => {
    const { formatMessage, history, data, onBehalf } = this.props
    const paymentMethod = get(data, 'orderQuery.paymentMethod', '')
    confirm({
      icon: ' ',
      centered: true,
      className: 'centeredButtons',
      title: <TitleEdit>{formatMessage(messages.editOrderTitle)}</TitleEdit>,
      content: <EditContent
        dangerouslySetInnerHTML={{
          __html: formatMessage(messages[onBehalf ? paymentMethod : 'editOrderMessage'])
        }}
      />,
      width: '512px',
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
    const { formatMessage, onReturn, data, onBehalf } = this.props
    const paymentMethod = get(data, 'orderQuery.paymentMethod', '')
    confirm({
      title: formatMessage(messages.deleteTeamstoreTitle),
      content: <EditContent
        dangerouslySetInnerHTML={{
          __html: formatMessage(messages[onBehalf ? `${paymentMethod}Delete` : 'deleteTeamstoreMessage'])
        }}
      />,
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
    const { deleteOrder, data, adminUser } = this.props
    const { shortId } = data.orderQuery
    try {
      if (typeof window !== 'undefined') {
        const cartList = JSON.parse(localStorage.getItem('cart') as any)
        if (cartList) {
          localStorage.removeItem('cart')
        }
      }
      const response = await deleteOrder({
        variables: { orderId: shortId, adminUser }
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
  saveDeliveryMutation,
  graphql(getOrderQuery, {
    options: ({ orderId }: OwnProps) => ({
      skip: !orderId,
      variables: { orderId }
    })
  })
)(OrderDetails)

export default OrderDetailsEnhance
