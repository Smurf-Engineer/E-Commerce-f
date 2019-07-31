/**
 * StoreFrontContent Component - Created by gustavomedina on 18/04/18.
 */
import * as React from 'react'
import { FormattedMessage } from 'react-intl'
import { graphql, compose } from 'react-apollo'
import get from 'lodash/get'
import find from 'lodash/find'
import Spin from 'antd/lib/spin'
import moment from 'moment'
import messages from './messages'
import { getSingleTeamStore } from './data'
import {
  QueryProps,
  TeamStoreResultType,
  TeamStoreType
} from '../../types/common'
import {
  Container,
  HeadersContainer,
  SideBar,
  Content,
  Title,
  OrderTitle,
  PriceDescription,
  PriceTitle,
  TierTitle,
  TierDescription,
  AboutContainer,
  AboutTitle,
  TierContainer,
  StyledSlider,
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
  SliderWrapper,
  sliderStyle,
  StyledSliderTitle,
  Description,
  StoreBox,
  Loading,
  ButtonsContainer
} from './styledComponents'
import config from '../../config/index'
import ProductInfo from '../../components/ProductInfo'
import ProductList from '../../components/DesignsCatalogueThumbnailList'
import Share from '../../components/ShareDesignModal'
import EmailContact from '../../components/EmailContact'
import TeamPassCode from '../../components/TeamPassCode'

interface Data extends QueryProps {
  teamStores: TeamStoreResultType
  getTeamStore: TeamStoreType
}

interface StateProps {
  showMuch: boolean
  showLong: boolean
  showCani: boolean
  showWhen: boolean
}

interface Props {
  history: any
  formatMessage: (messageDescriptor: any) => string
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
  setEmailContactAction: (email: string) => void
  setEmailMessageAction: (message: string) => void
  sendMessageLoadingAction: (loading: boolean) => void
  setPassCodeAction: (passCode: string) => void
}

export class StoreFrontContent extends React.Component<Props, StateProps> {
  state = {
    showMuch: false,
    showCani: false,
    showLong: false,
    showWhen: false
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
    history.push(`/create-store?storeId=${storeShortId}`)
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

  render() {
    const {
      data: { error, getTeamStore, loading },
      teamStoreId,
      passCode,
      formatMessage,
      openShare,
      openEmailContact,
      emailContact,
      emailMessage,
      setEmailContactAction,
      setEmailMessageAction,
      sendMessageLoading,
      sendMessageLoadingAction,
      setPassCodeAction
    } = this.props
    const { showMuch, showCani, showLong, showWhen } = this.state

    const errorMessage = error
      ? (error.graphQLErrors.length && error.graphQLErrors[0].message) ||
        error.message ||
        null
      : null

    const openModal =
      getTeamStore &&
      (getTeamStore.id === -1 || getTeamStore.id === -2) &&
      !errorMessage &&
      !passCode

    const teamStoreShortId = get(getTeamStore, 'short_id', '')
    const teamStoreBanner = get(getTeamStore, 'banner', null)
    const teamStoreName = get(getTeamStore, 'name', '')
    const teamStoreOwner = get(getTeamStore, 'owner', false)
    const cutOffDay = get(getTeamStore, 'cutoff_date.day', '0')
    const deliveryDay = get(getTeamStore, 'delivery_date.day', '0')
    const onDemandMode = get(getTeamStore, 'onDemandMode', false)
    const featured = get(getTeamStore, 'featured', false)
    const cutOffDayOrdinal = get(getTeamStore, 'cutoff_date.dayOrdinal', '0')
    const deliveryDayOrdinal = get(
      getTeamStore,
      'delivery_date.dayOrdinal',
      '0'
    )
    const ownerName = get(getTeamStore, 'owner_name', null)
    const cutOffMonth = get(getTeamStore, 'cutoff_date.month', 'month')
    const deliveryMonth = get(getTeamStore, 'delivery_date.month', 'month')
    const items = getTeamStore ? getTeamStore.items || [] : []
    const totalItems = get(getTeamStore, 'totalItems', 0)
    const teamSizeId = get(getTeamStore, 'team_size_id', 0)
    const priceRanges = getTeamStore ? getTeamStore.priceRanges || [] : []

    const shareStoreUrl = `${
      config.baseUrl
    }store-front?storeId=${teamStoreShortId}`

    const targetRange: any = find(priceRanges, { id: teamSizeId }) || 1

    // TODO: uncomment if return to old method
    // const maxValueOfY = items.length
    //   ? Math.max(...items.map(o => o.totalOrders))
    //   : 0

    let markslider = { name: '0-0' }
    for (const priceRangeItem of priceRanges) {
      if (!totalItems) {
        break
      }
      let val = 0
      if (priceRangeItem.name === 'Personal') {
        val = 1
      } else {
        val = parseInt(priceRangeItem.name.split('-')[1], 10)
      }

      if (val >= totalItems) {
        markslider = priceRangeItem
        break
      }
    }

    let marksArray: any = {}
    priceRanges.map((priceRange, index) => {
      if (index === 0) {
        marksArray[1] = {
          style: sliderStyle,
          label: <p>1</p>
        }
        return
      }

      marksArray[priceRange.name.split('-')[1]] = {
        style: sliderStyle,
        label: (
          <p>
            {priceRange.name}
            <br />
            10% OFF
            {priceRange.id === teamSizeId ? (
              <div>
                <StyledSliderTitle>
                  {formatMessage(messages.targetPrice)}
                </StyledSliderTitle>
              </div>
            ) : (
              <div />
            )}
          </p>
        )
      }
      return
    })

    const sliderValue =
      markslider.name === 'Personal'
        ? 1
        : parseInt(markslider.name.split('-')[1], 10)

    return (
      <Container>
        {!loading ? (
          <React.Fragment>
            {!teamStoreBanner ? <div /> : <ImageBanner src={teamStoreBanner} />}
            <HeadersContainer>
              <Content>
                <HeadersContainer>
                  <FlexContainer>
                    <Title>{teamStoreName}</Title>
                    <ButtonsContainer>
                      <ButtonWrapper>
                        <Button type="primary" onClick={this.handlShareClick}>
                          <FormattedMessage {...messages.share} />
                        </Button>
                      </ButtonWrapper>
                      {teamStoreOwner ? (
                        <ButtonWrapper>
                          <Button
                            type="primary"
                            onClick={this.handleOnPressEdit}
                          >
                            <FormattedMessage {...messages.edit} />
                          </Button>
                        </ButtonWrapper>
                      ) : (
                        <DefaultButton onClick={this.handlContactClick}>
                          <FormattedMessage {...messages.contactManager} />
                        </DefaultButton>
                      )}
                    </ButtonsContainer>
                  </FlexContainer>
                </HeadersContainer>
                {onDemandMode ? (
                  <Description>
                    <PriceTitle>
                      {`${formatMessage(
                        messages.welcome
                      )} ${teamStoreName} ${formatMessage(messages.store)}`}
                    </PriceTitle>
                    <PriceDescription>
                      <FormattedMessage {...messages.description} />
                    </PriceDescription>
                  </Description>
                ) : (
                  <React.Fragment>
                    <PriceTitle>
                      <FormattedMessage {...messages.priceDropTitle} />
                    </PriceTitle>
                    <PriceDescription>
                      <FormattedMessage {...messages.priceDropSubTitle} />
                    </PriceDescription>
                    <PriceDescription>
                      <FormattedMessage {...messages.priceDropDescription} />
                    </PriceDescription>
                    <PriceDescription>
                      <FormattedMessage {...messages.finalPricing} />
                    </PriceDescription>
                  </React.Fragment>
                )}
              </Content>
              <SideBar>
                {!onDemandMode && (
                  <OrderTitle>
                    {`${formatMessage(
                      messages.orderTitle
                    )} ${cutOffMonth} ${cutOffDayOrdinal} ${formatMessage(
                      messages.orderTitle2
                    )} ${deliveryMonth} ${deliveryDayOrdinal}`}
                  </OrderTitle>
                )}
                <DatesContainer {...{ onDemandMode }}>
                  {onDemandMode ? (
                    <StoreBox open={featured}>
                      {formatMessage(
                        featured ? messages.storeOpen : messages.storeClosed
                      )}
                    </StoreBox>
                  ) : (
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
                  <CalendarContainer>
                    <DatesTitle>
                      <FormattedMessage {...messages.estimatedArrival} />
                    </DatesTitle>
                    <CalendarFinalView>
                      <CalendarFinalTitle>{deliveryMonth}</CalendarFinalTitle>
                      <CalendarDay>{deliveryDay}</CalendarDay>
                    </CalendarFinalView>
                  </CalendarContainer>
                </DatesContainer>
              </SideBar>
            </HeadersContainer>

            {errorMessage ? (
              <ErrorTitle>{errorMessage}</ErrorTitle>
            ) : (
              <div>
                {!onDemandMode && (
                  <TierContainer>
                    <TierTitle>
                      {`${formatMessage(messages.tierTitle)} ${
                        targetRange ? targetRange.name : 'Not selected'
                      }`}
                    </TierTitle>
                    <TierDescription>
                      <FormattedMessage {...messages.tierDescription} />
                    </TierDescription>
                    <SliderWrapper>
                      <StyledSlider
                        marks={marksArray}
                        disabled={true}
                        value={sliderValue}
                        min={0}
                        max={249}
                      />
                    </SliderWrapper>
                  </TierContainer>
                )}
                <ListContainer>
                  <ProductList
                    {...{ targetRange, formatMessage, onDemandMode, featured }}
                    withoutPadding={false}
                    openQuickView={this.handleOnOpenQuickView}
                    designs={items}
                    teamStoreShortId={teamStoreShortId}
                    targentPrice={targetRange.name}
                    currentRange={markslider}
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
                <p>{formatMessage(messages.howMuchDesc)}</p>
              </ProductInfo>

              <ProductInfo
                id="When"
                title={formatMessage(messages.whenTitle)}
                showContent={showWhen}
                toggleView={this.toggleProductInfo}
              >
                <p>{formatMessage(messages.whenDesc)}</p>
              </ProductInfo>

              <ProductInfo
                id="Long"
                title={formatMessage(messages.howLongTitle)}
                showContent={showLong}
                toggleView={this.toggleProductInfo}
              >
                <p>{formatMessage(messages.howLongDesc)}</p>
              </ProductInfo>
              <ProductInfo
                id="Cani"
                title={formatMessage(messages.CanIORder)}
                showContent={showCani}
                toggleView={this.toggleProductInfo}
              >
                <p>{formatMessage(messages.CanIORderDesc)}</p>
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
              {...{ formatMessage }}
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

            <TeamPassCode
              open={openModal}
              requestClose={this.closePassCodeModal}
              formatMessage={formatMessage}
              setPassCode={setPassCodeAction}
              teamStoreId={teamStoreId}
            />
          </React.Fragment>
        ) : (
          <Loading>
            <Spin />
          </Loading>
        )}
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
        fetchPolicy: 'network-only',
        variables: {
          teamStoreId,
          passCode,
          date: {
            day: moment().date(),
            month: moment().month(),
            year: 2018
          }
        }
      }
    }
  })
)(StoreFrontContent)

export default StoreFrontContentEnhance
