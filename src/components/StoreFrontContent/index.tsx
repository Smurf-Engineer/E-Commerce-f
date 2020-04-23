/**
 * StoreFrontContent Component - Created by gustavomedina on 18/04/18.
 */
import * as React from 'react'
import { FormattedMessage, FormattedHTMLMessage } from 'react-intl'
import { graphql, compose } from 'react-apollo'
import get from 'lodash/get'
import find from 'lodash/find'
import Spin from 'antd/lib/spin'
import message from 'antd/lib/message'
import moment from 'moment'
import messages from './messages'
import { getSingleTeamStore } from './data'
import {
  QueryProps,
  TeamStoreResultType,
  TeamStoreType,
  UserType,
  ContactInformation,
  Message
} from '../../types/common'
import {
  Container,
  SideBar,
  Title,
  OrderTitle,
  PriceDescription,
  PriceTitle,
  AboutContainer,
  AboutTitle,
  ButtonWrapper,
  Button,
  ImageBanner,
  CalendarView,
  DatesContainer,
  CalendarTitle,
  CalendarDay,
  CalendarFinalView,
  CalendarFinalTitle,
  DatesTitle,
  CalendarContainer,
  ListContainer,
  DefaultButton,
  ErrorTitle,
  FlexContainer,
  StoreBox,
  Loading,
  ButtonsContainer,
  TopContainer,
  Bulletin,
  Corner,
  PinDiv,
  Pin,
  BulletinLabel,
  Dates,
  FlexColumnContainer,
  DynamicDropLogo,
  PricesButton,
  MainContainer
} from './styledComponents'
import PinSVG from '../../assets/pin.svg'
import config from '../../config/index'
import ProductInfo from '../../components/ProductInfo'
import ProductList from '../../components/DesignsCatalogueThumbnailList'
import Share from '../../components/ShareDesignModal'
import dropLogo from '../../assets/dynamic_drop.png'
import EmailContact from '../../components/EmailContact'
import TeamPassCode from '../../components/TeamPassCode'
import DropPricingModal from '../../components/DropPricingModal'
const STORE_PRIVATE_CODE = -1
const PASS_CODE_INVALID = -2
const STORE_CLOSED_CODE = -3
interface Data extends QueryProps {
  teamStores: TeamStoreResultType
  getTeamStore: TeamStoreType
}

interface StateProps {
  showMuch: boolean
  showLong: boolean
  showCani: boolean
  showWhen: boolean
  showReturn: boolean
}

interface Props {
  history: any
  formatMessage: (messageDescriptor: Message, params?: any) => string
  openQuickViewAction: (id: number, yotpoId: string | null) => void
  openEmailContactDialogAction: (open: boolean) => void
  openShareModalAction: (open: boolean, id?: string) => void
  setOpenPassCodeDialog: (open: boolean) => void
  data: Data
  openShare: boolean
  teamStoreId: string
  passCode?: string
  openEmailContact: boolean
  emailContact: string
  emailMessage: string
  sendMessageLoading: boolean
  currentCurrency: string
  user: UserType
  contactInfo: ContactInformation
  setEmailContactAction: (email: string) => void
  setEmailMessageAction: (message: string) => void
  sendMessageLoadingAction: (loading: boolean) => void
  setPassCodeAction: (passCode: string) => void
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const invalidDateExp = /\bInvalid date\b/

export class StoreFrontContent extends React.Component<Props, StateProps> {
  state = {
    showMuch: false,
    showCani: false,
    showLong: false,
    showChange: false,
    showWhen: false,
    showReturn: false,
    pricingModalOpen: false
  }

  toggleProductInfo = (id: string) => {
    const stateValue = this.state[`show${id}`]
    this.setState({ [`show${id}`]: !stateValue } as any)
  }

  handleOnPressEdit = () => {
    const { history } = this.props
    const {
      data: { getTeamStore }
    } = this.props

    const storeShortId = get(getTeamStore, 'short_id', '')
    history.push(`/create-store/form?storeId=${storeShortId}`)
  }

  handleOnOpenQuickView = (id: number, yotpoId: string) => {
    const { openQuickViewAction: openQuickView } = this.props
    openQuickView(id, yotpoId)
  }

  handlContactClick = () => {
    const { openEmailContactDialogAction } = this.props
    openEmailContactDialogAction(true)
  }

  handlShareClick = () => {
    const {
      data: { getTeamStore }
    } = this.props

    const teamStoreShortId = get(getTeamStore, 'short_id', '')

    this.handleOpenShareModal(teamStoreShortId)
  }

  handleOpenShareModal = (id?: string) => {
    const { openShare, openShareModalAction } = this.props
    openShareModalAction(!openShare, id)
  }

  handleOpenPassCode = () => {
    const { setOpenPassCodeDialog } = this.props
    setOpenPassCodeDialog(true)
  }

  handleSetPassCode = (passCode: string) => {
    const { setPassCodeAction } = this.props
    setPassCodeAction(passCode)
    this.handleAddCode(passCode)
  }

  handleAddCode = (passCode: string) => {
    try {
      const { teamStoreId } = this.props
      const savedStores = sessionStorage.getItem('savedStores')
      const storeCodes = savedStores ? JSON.parse(savedStores) : {}
      storeCodes[teamStoreId] = passCode
      sessionStorage.setItem('savedStores', JSON.stringify(storeCodes))
    } catch (error) {
      message.error(error.message)
    }
  }

  closeEmailContactModal = () => {
    const { openEmailContactDialogAction } = this.props
    openEmailContactDialogAction(false)
  }

  closePassCodeModal = () => {
    const { setOpenPassCodeDialog } = this.props
    setOpenPassCodeDialog(false)
  }

  closestValue = (array: number[], val: number) => {
    return Math.max.apply(
      null,
      array.filter((v: number) => {
        return v >= val
      })
    )
  }

  onTogglePriceModal = () => {
    this.setState({ pricingModalOpen: !this.state.pricingModalOpen } as any)
  }

  render() {
    const {
      data: { error, getTeamStore, loading },
      teamStoreId,
      formatMessage,
      openShare,
      openEmailContact,
      emailContact,
      emailMessage,
      setEmailContactAction,
      setEmailMessageAction,
      sendMessageLoading,
      sendMessageLoadingAction,
      currentCurrency,
      user,
      handleInputChange,
      contactInfo
    } = this.props
    const {
      showMuch,
      showCani,
      showLong,
      showChange,
      showWhen,
      showReturn,
      pricingModalOpen
    } = this.state

    const errorMessage = error
      ? (error.graphQLErrors.length && error.graphQLErrors[0].message) ||
        error.message ||
        null
      : null
    const openModal =
      getTeamStore &&
      (getTeamStore.id === STORE_PRIVATE_CODE ||
        getTeamStore.id === PASS_CODE_INVALID) &&
      !errorMessage &&
      (getTeamStore.id === -1 || getTeamStore.id === -2)

    const teamStoreShortId = get(getTeamStore, 'short_id', '')
    const teamStoreBanner = get(getTeamStore, 'banner', null)
    const teamStoreName = get(getTeamStore, 'name', '')
    const teamStoreOwner = get(getTeamStore, 'owner', false)
    const cutOffDay = get(getTeamStore, 'cutoff_date.day', '0')
    const deliveryDay = get(getTeamStore, 'delivery_date.day', '0')
    const onDemandMode = get(getTeamStore, 'onDemandMode', false)
    const display = get(getTeamStore, 'display', false)
    const cutOffDayOrdinal = get(getTeamStore, 'cutoff_date.dayOrdinal', '0')
    const closed = get(getTeamStore, 'closed', false)

    const isThereCutoffDate = !invalidDateExp.test(cutOffDay)

    const deliveryDayOrdinal = get(
      getTeamStore,
      'delivery_date.dayOrdinal',
      '0'
    )
    const ownerName = get(getTeamStore, 'owner_name', null)
    const cutOffMonth = get(getTeamStore, 'cutoff_date.month', 'month')
    const deliveryMonth = get(getTeamStore, 'delivery_date.month', 'month')
    const items = getTeamStore ? getTeamStore.items || [] : []
    // const totalItems = get(getTeamStore, 'totalItems', 0)
    const teamSizeId = get(getTeamStore, 'team_size_id', 0)
    const priceRanges = getTeamStore ? getTeamStore.priceRanges || [] : []
    const bulletin = get(getTeamStore, 'bulletin', '')
    const shareStoreUrl = `${
      config.baseUrl
    }store-front?storeId=${teamStoreShortId}`

    const targetRange: any = find(priceRanges, { id: teamSizeId }) || 1
    // TODO: uncomment if return to old method
    // const maxValueOfY = items.length
    //   ? Math.max(...items.map(o => o.totalOrders))
    //   : 0

    return (
      <Container>
        {loading || openModal ? (
          <Loading>
            <Spin />
          </Loading>
        ) : (
          <React.Fragment>
            {getTeamStore && getTeamStore.id === STORE_CLOSED_CODE ? (
              <ErrorTitle>{formatMessage(messages.storeClosed)}</ErrorTitle>
            ) : (
              <MainContainer>
                {!teamStoreBanner ? (
                  <div />
                ) : (
                  <ImageBanner src={teamStoreBanner} />
                )}
                <FlexContainer>
                  <Title>
                    {formatMessage(messages.welcome, { teamStoreName })}
                  </Title>
                  <ButtonsContainer>
                    <ButtonWrapper>
                      <Button type="primary" onClick={this.handlShareClick}>
                        <FormattedMessage {...messages.share} />
                      </Button>
                    </ButtonWrapper>
                    {teamStoreOwner && !closed ? (
                      <ButtonWrapper>
                        <Button type="primary" onClick={this.handleOnPressEdit}>
                          <FormattedMessage {...messages.edit} />
                        </Button>
                      </ButtonWrapper>
                    ) : (
                      !closed && (
                        <DefaultButton onClick={this.handlContactClick}>
                          <FormattedMessage {...messages.contactManager} />
                        </DefaultButton>
                      )
                    )}
                  </ButtonsContainer>
                </FlexContainer>
                <TopContainer>
                  <FlexColumnContainer>
                    {!onDemandMode && (
                      <React.Fragment>
                        <DynamicDropLogo src={dropLogo} />
                        <PriceDescription>
                          <FormattedHTMLMessage
                            {...messages.priceDropMessage}
                          />
                        </PriceDescription>
                      </React.Fragment>
                    )}
                  </FlexColumnContainer>
                  <SideBar>
                    <DatesContainer {...{ onDemandMode }}>
                      <StoreBox open={display && !closed}>
                        {formatMessage(
                          display && !closed
                            ? messages.storeOpen
                            : messages.storeClosed
                        )}
                      </StoreBox>
                      {!onDemandMode && (
                        <OrderTitle>
                          {`${formatMessage(
                            messages.orderTitle
                          )} ${cutOffMonth} ${cutOffDayOrdinal} ${formatMessage(
                            messages.orderTitle2
                          )} ${deliveryMonth} ${deliveryDayOrdinal}`}
                        </OrderTitle>
                      )}
                      <Dates>
                        {!onDemandMode && isThereCutoffDate && (
                          <CalendarContainer>
                            <DatesTitle>
                              <FormattedMessage {...messages.cutOff} />
                            </DatesTitle>
                            <CalendarView>
                              <CalendarTitle>{cutOffMonth}</CalendarTitle>
                              <CalendarDay>{cutOffDay}</CalendarDay>
                            </CalendarView>
                          </CalendarContainer>
                        )}
                        {display && (
                          <CalendarContainer>
                            <DatesTitle>
                              <FormattedMessage
                                {...messages.estimatedArrival}
                              />
                            </DatesTitle>
                            <CalendarFinalView>
                              <CalendarFinalTitle>
                                {deliveryMonth}
                              </CalendarFinalTitle>
                              <CalendarDay>{deliveryDay}</CalendarDay>
                            </CalendarFinalView>
                          </CalendarContainer>
                        )}
                      </Dates>
                    </DatesContainer>
                  </SideBar>
                </TopContainer>
                <PriceTitle center={true}>
                  {formatMessage(messages.welcome, { teamStoreName })}
                </PriceTitle>
                {bulletin && (
                  <Bulletin>
                    <PinDiv>
                      <Pin src={PinSVG} left={true} />
                      <Pin src={PinSVG} />
                    </PinDiv>
                    <BulletinLabel>{bulletin}</BulletinLabel>
                    <Corner />
                  </Bulletin>
                )}
                {!onDemandMode && (
                  <PricesButton onClick={this.onTogglePriceModal}>
                    {formatMessage(messages.quantityPrice)}
                  </PricesButton>
                )}
                {errorMessage ? (
                  <ErrorTitle>{errorMessage}</ErrorTitle>
                ) : (
                  <div>
                    <ListContainer>
                      <ProductList
                        {...{
                          targetRange,
                          formatMessage,
                          onDemandMode,
                          currentCurrency,
                          display,
                          teamStoreName,
                          closed
                        }}
                        withoutPadding={false}
                        openQuickView={this.handleOnOpenQuickView}
                        designs={items}
                        teamStoreShortId={teamStoreShortId}
                        targentPrice={targetRange.name}
                        currentRange={priceRanges[1]}
                      />
                    </ListContainer>
                  </div>
                )}

                <AboutContainer>
                  <AboutTitle>
                    <FormattedMessage {...messages.aboutOrdering} />
                  </AboutTitle>
                  <ProductInfo
                    id="Much"
                    title={formatMessage(messages.howMuchTitle)}
                    showContent={showMuch}
                    toggleView={this.toggleProductInfo}
                  >
                    <div
                      dangerouslySetInnerHTML={{
                        __html: formatMessage(
                          onDemandMode
                            ? messages.howMuchDesc
                            : messages.howMuchDescBatch
                        )
                      }}
                    />
                  </ProductInfo>

                  <ProductInfo
                    id="When"
                    title={formatMessage(messages.whenTitle)}
                    showContent={showWhen}
                    toggleView={this.toggleProductInfo}
                  >
                    <div
                      dangerouslySetInnerHTML={{
                        __html: formatMessage(
                          onDemandMode
                            ? messages.whenDesc
                            : messages.whenDescBatch
                        )
                      }}
                    />
                  </ProductInfo>
                  {!onDemandMode && (
                    <ProductInfo
                      id="Change"
                      title={formatMessage(messages.changeOrderTitle)}
                      showContent={showChange}
                      toggleView={this.toggleProductInfo}
                    >
                      <div
                        dangerouslySetInnerHTML={{
                          __html: formatMessage(messages.changeOrderDesc)
                        }}
                      />
                    </ProductInfo>
                  )}

                  <ProductInfo
                    id="Long"
                    title={formatMessage(messages.howLongTitle)}
                    showContent={showLong}
                    toggleView={this.toggleProductInfo}
                  >
                    <div
                      dangerouslySetInnerHTML={{
                        __html: formatMessage(
                          onDemandMode
                            ? messages.howLongDesc
                            : messages.howLongDescBatch
                        )
                      }}
                    />
                  </ProductInfo>
                  <ProductInfo
                    id="Cani"
                    title={formatMessage(messages.canIORder)}
                    showContent={showCani}
                    toggleView={this.toggleProductInfo}
                  >
                    <div
                      dangerouslySetInnerHTML={{
                        __html: formatMessage(
                          onDemandMode
                            ? messages.canIORderDesc
                            : messages.canIORderDescBatch
                        )
                      }}
                    />
                  </ProductInfo>
                  <ProductInfo
                    id="Return"
                    title={formatMessage(messages.returnMessage)}
                    showContent={showReturn}
                    toggleView={this.toggleProductInfo}
                  >
                    <p>{formatMessage(messages.returnMessageDesc)}</p>
                  </ProductInfo>
                </AboutContainer>

                <Share
                  open={openShare}
                  modalTitle={formatMessage(messages.shareModalTitle)}
                  requestClose={this.handleOpenShareModal}
                  url={shareStoreUrl}
                  {...{ formatMessage }}
                />

                <EmailContact
                  {...{
                    formatMessage,
                    user,
                    handleInputChange,
                    contactInfo
                  }}
                  open={openEmailContact}
                  requestClose={this.closeEmailContactModal}
                  onSetEmail={setEmailContactAction}
                  onSetMesage={setEmailMessageAction}
                  teamStoreId={teamStoreShortId}
                  emailContact={emailContact}
                  emailMessage={emailMessage}
                  sendMessageLoading={sendMessageLoading}
                  setSendMessageLoading={sendMessageLoadingAction}
                  ownerName={ownerName}
                />
              </MainContainer>
            )}
          </React.Fragment>
        )}
        <TeamPassCode
          open={openModal}
          requestClose={this.closePassCodeModal}
          formatMessage={formatMessage}
          setPassCode={this.handleSetPassCode}
          teamStoreId={teamStoreId}
        />
        <DropPricingModal
          toggleModal={this.onTogglePriceModal}
          {...{ formatMessage, pricingModalOpen }}
        />
      </Container>
    )
  }
}

type OwnProps = {
  teamStoreId?: string
  passCode?: string
}

const StoreFrontContentEnhance = compose(
  graphql<Data>(getSingleTeamStore, {
    options: ({ teamStoreId, passCode }: OwnProps) => {
      return {
        variables: {
          teamStoreId,
          passCode,
          date: {
            day: moment().date(),
            month: moment().month(),
            year: moment().year()
          }
        }
      }
    }
  })
)(StoreFrontContent)

export default StoreFrontContentEnhance
