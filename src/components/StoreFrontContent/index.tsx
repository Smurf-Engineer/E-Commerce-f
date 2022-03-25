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
import momentTz from 'moment-timezone'
import messages from './messages'
import { getSingleTeamStore, profileSettingsQuery } from './data'
import {
  QueryProps,
  TeamStoreResultType,
  TeamStoreType,
  UserType,
  ContactInformation,
  Message,
  IProfileSettings,
} from '../../types/common'
import {
  Container,
  SideBar,
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
  MainContainer,
  AssistanceDiv,
  SectionLink,
  CutOffDiv,
  CutOffTime,
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
import { APPROVED } from '../../constants'
import { FIT_FORM } from './constants'
const STORE_PRIVATE_CODE = -1
const PASS_CODE_INVALID = -2
const STORE_CLOSED_CODE = -3
interface Data extends QueryProps {
  teamStores: TeamStoreResultType
  getTeamStore: TeamStoreType
}

interface ProfileData extends QueryProps {
  profileData: IProfileSettings
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
  profileData: ProfileData
  openEmailContact: boolean
  emailContact: string
  emailMessage: string
  sendMessageLoading: boolean
  currentCurrency: string
  user: UserType
  contactInfo: ContactInformation
  skip: number
  pageNumber: number
  setEmailContactAction: (email: string) => void
  setEmailMessageAction: (message: string) => void
  sendMessageLoadingAction: (loading: boolean) => void
  setPassCodeAction: (passCode: string) => void
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  setPage: (skip: number, pageNumber: number) => void
}

const invalidDateExp = /\bInvalid date\b/
const LIMIT = 12

const ON_DEMAND_ORDERING = 'ON-DEMAND ORDERING'
const BATCH_ORDERING = 'BATCH ORDER STORES'

export class StoreFrontContent extends React.Component<Props, StateProps> {
  state = {
    showMuch: false,
    showCani: false,
    showLong: false,
    showChange: false,
    showWhen: false,
    showReturn: false,
    pricingModalOpen: false,
  }

  toggleProductInfo = (id: string) => {
    const stateValue = this.state[`show${id}`]
    this.setState({ [`show${id}`]: !stateValue } as any)
  }

  handleOnPressEdit = () => {
    const { history } = this.props
    const {
      data: { getTeamStore },
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
      data: { getTeamStore },
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

  handleChangePage = () => {
    const {
      setPage,
      pageNumber,
      data: { loading },
    } = this.props
    if (!loading) {
      const newPage = pageNumber + 1
      const skip = newPage * LIMIT
      setPage(skip, newPage)
    }
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
      profileData,
      emailMessage,
      setEmailContactAction,
      setEmailMessageAction,
      sendMessageLoading,
      sendMessageLoadingAction,
      currentCurrency,
      user,
      handleInputChange,
      contactInfo,
      skip,
      pageNumber,
    } = this.props
    const {
      showMuch,
      showCani,
      showLong,
      showChange,
      showWhen,
      showReturn,
      pricingModalOpen,
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
    const { status, comission: resellerComission } = get(
      profileData,
      'profileData.reseller',
      {}
    )
    const teamStoreShortId = get(getTeamStore, 'short_id', '')
    const teamStoreBanner = get(getTeamStore, 'banner', null)
    const teamStoreName = get(getTeamStore, 'name', '')
    const teamStoreOwner = get(getTeamStore, 'owner', false)
    const fixedPrice = get(getTeamStore, 'fixedPrice', false)
    const cutOffDay = get(getTeamStore, 'cutoff_date.day', '0')
    const deliveryDay = get(getTeamStore, 'delivery_date.day', '0')
    const onDemandMode = get(getTeamStore, 'onDemandMode', false)
    const isResellerStore = get(getTeamStore, 'isResellerStore', false)
    const isResellerOwner =
      status === APPROVED && teamStoreOwner && isResellerStore
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
    // tslint:disable-next-line: max-line-length
    const shareStoreUrl = `${
      config.baseUrl
    }store-front?storeId=${teamStoreShortId}&titleProp=${encodeURIComponent(
      teamStoreName
    )}&bannerProp=${teamStoreBanner}`

    const totalDesigns = get(getTeamStore, 'totalDesigns', 0)
    const targetRange: any = find(priceRanges, { id: teamSizeId }) || 1
    // TODO: uncomment if return to old method
    // const maxValueOfY = items.length
    //   ? Math.max(...items.map(o => o.totalOrders))
    //   : 0
    // tslint:disable-next-line: max-line-length
    const cutOffMoment =
      cutOffDay && cutOffMonth
        ? momentTz
            .tz(
              `${cutOffDay} ${cutOffMonth} 23:59`,
              'DD MMMM HH:mm',
              'America/Los_Angeles'
            )
            .local()
            .format('dddd, MMMM Do, h:mm a')
        : ''
    const dayOrdinal = deliveryDay ? moment(deliveryDay, 'D').format('Do') : ''
    return (
      <Container>
        {(loading && !teamStoreShortId) || openModal ? (
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
                  <ButtonsContainer>
                    <ButtonWrapper>
                      <Button type="primary" onClick={this.handlShareClick}>
                        <FormattedMessage {...messages.share} />
                      </Button>
                    </ButtonWrapper>
                    {teamStoreOwner && !closed && !fixedPrice && (
                      <ButtonWrapper>
                        <Button type="primary" onClick={this.handleOnPressEdit}>
                          <FormattedMessage {...messages.edit} />
                        </Button>
                      </ButtonWrapper>
                    )}
                    {!teamStoreOwner && (
                      <DefaultButton onClick={this.handlContactClick}>
                        <FormattedMessage {...messages.contactManager} />
                      </DefaultButton>
                    )}
                  </ButtonsContainer>
                  <AssistanceDiv>
                    <b>
                      <FormattedMessage {...messages.needAssistance} />
                    </b>
                    <SectionLink target="_blank" href={FIT_FORM}>
                      <FormattedMessage {...messages.tryFreeService} />
                    </SectionLink>
                  </AssistanceDiv>
                </FlexContainer>
                <TopContainer>
                  <FlexColumnContainer>
                    {!onDemandMode && !fixedPrice && (
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
                      {!onDemandMode && !closed && isThereCutoffDate && (
                        <OrderTitle>
                          {`${formatMessage(
                            messages.orderTitle
                          )} ${cutOffMonth} ${cutOffDayOrdinal} ${formatMessage(
                            messages.orderTitle2
                          )} ${deliveryMonth} ${deliveryDayOrdinal}`}
                        </OrderTitle>
                      )}
                      {!closed && (
                        <Dates>
                          {!onDemandMode && isThereCutoffDate && (
                            <CalendarContainer>
                              <DatesTitle {...{ onDemandMode }}>
                                <FormattedMessage {...messages.cutOff} />
                              </DatesTitle>
                              <CalendarView>
                                <CalendarTitle>{cutOffMonth}</CalendarTitle>
                                <CalendarDay>{cutOffDay}</CalendarDay>
                              </CalendarView>
                              <CutOffDiv>
                                <FormattedMessage {...messages.cutOffTime} />
                              </CutOffDiv>
                            </CalendarContainer>
                          )}
                          {display && (
                            <CalendarContainer>
                              <DatesTitle {...{ onDemandMode }}>
                                {formatMessage(
                                  messages[
                                    onDemandMode
                                      ? 'orderNow'
                                      : 'estimatedArrival'
                                  ],
                                  { dayOrdinal, deliveryMonth }
                                )}
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
                      )}
                      {!closed &&
                        cutOffMoment &&
                        isThereCutoffDate &&
                        !onDemandMode && (
                          <CutOffTime>
                            Store closes
                            <strong> {cutOffMoment}</strong>, your local time
                          </CutOffTime>
                        )}
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
                {!onDemandMode && !fixedPrice && (
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
                          isResellerOwner,
                          resellerComission,
                          isResellerStore,
                          onDemandMode,
                          currentCurrency,
                          display,
                          teamStoreName,
                          closed,
                          fixedPrice,
                          totalDesigns,
                        }}
                        withoutPadding={false}
                        openQuickView={this.handleOnOpenQuickView}
                        designs={items}
                        teamStoreShortId={teamStoreShortId}
                        targentPrice={targetRange.name}
                        currentRange={priceRanges[1]}
                        limit={LIMIT}
                        offset={skip}
                        handleChangePage={this.handleChangePage}
                        currentPage={pageNumber}
                      />
                    </ListContainer>
                  </div>
                )}

                <AboutContainer>
                  <AboutTitle>
                    <FormattedMessage
                      {...messages[
                        isResellerStore ? 'aboutDirectship' : 'aboutOrdering'
                      ]}
                      values={{
                        teamType: onDemandMode
                          ? ON_DEMAND_ORDERING
                          : BATCH_ORDERING,
                      }}
                    />
                  </AboutTitle>
                  {!isResellerStore && !fixedPrice && (
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
                          ),
                        }}
                      />
                    </ProductInfo>
                  )}

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
                        ),
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
                          __html: formatMessage(messages.changeOrderDesc),
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
                        ),
                      }}
                    />
                  </ProductInfo>
                  {!isResellerStore && (
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
                          ),
                        }}
                      />
                    </ProductInfo>
                  )}
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
                  picture={teamStoreBanner}
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
                    contactInfo,
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
  skip?: number
  user?: UserType
}

const StoreFrontContentEnhance = compose(
  graphql(profileSettingsQuery, {
    options: ({ user }: OwnProps) => {
      return {
        fetchPolicy: 'network-only',
        skip: !user,
      }
    },
    name: 'profileData',
  }),
  graphql<Data>(getSingleTeamStore, {
    options: ({ teamStoreId, passCode, skip }: OwnProps) => {
      return {
        variables: {
          teamStoreId,
          passCode,
          date: {
            day: moment().date(),
            month: moment().month(),
            year: moment().year(),
          },
          offset: skip || LIMIT,
        },
        fetchPolicy: 'network-only',
      }
    },
  })
)(StoreFrontContent)

export default StoreFrontContentEnhance
