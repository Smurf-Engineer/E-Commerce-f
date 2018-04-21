/**
 * StoreFrontContent Component - Created by gustavomedina on 18/04/18.
 */
import * as React from 'react'
import { FormattedMessage } from 'react-intl'
import { graphql, compose } from 'react-apollo'
import get from 'lodash/get'
// import message from 'antd/lib/message'
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
  sliderStyle
} from './styledComponents'
import config from '../../config/index'
import ProductInfo from '../../components/ProductInfo'
import ProductList from '../../components/DesignsCatalogueThumbnailList'
import Share from '../../components/ShareDesignModal'
import EmailContact from '../../components/EmailContact'
import TeamPassCode from '../../components/TeamPassCode'

// const PASSCODE_ERROR = 'Pass code needed.'
// const WRONG_PASSCODE_ERROR = 'Wrong pass code.'

interface Data extends QueryProps {
  teamStores: TeamStoreResultType
  getTeamStore: TeamStoreType
}

interface Props {
  formatMessage: (messageDescriptor: any) => string
  openQuickViewAction: (id: number, yotpoId: string | null) => void
  openEmailContactDialogAction: (open: boolean) => void
  openShareModalAction: (open: boolean, id?: string) => void
  setOpenPassCodeDialog: (open: boolean) => void
  data: Data
  openShare: boolean
  teamStoreId: string
  openEmailContact: boolean
  // passCode: string
  emailContact: string
  emailMessage: string
  sendMessageLoading: boolean
  setEmailContactAction: (email: string) => void
  setEmailMessageAction: (message: string) => void
  sendMessageLoadingAction: (loading: boolean) => void
  setPassCodeAction: (passCode: string) => void
}

export class StoreFrontContent extends React.Component<Props, {}> {
  toggleProductInfo = (id: string) => {
    const stateValue = this.state[`show${id}`]
    this.setState({ [`show${id}`]: !stateValue } as any)
  }

  handleOnPressPrivate = (id: number, isPrivate: boolean) => {
    // TODO: Handle private
  }

  handleOnPressDelete = (id: number) => {
    // TODO: Handle delete
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

  render() {
    const {
      data: { error, getTeamStore },
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

    const openModal =
      getTeamStore && (getTeamStore.id === -1 || getTeamStore.id === -2)

    // if (getTeamStore && getTeamStore.id === -2) {
    //   message.error(formatMessage(messages.invalidPass))
    // }

    const errorMessage = error
      ? (error.graphQLErrors.length && error.graphQLErrors[0].message) ||
        error.message ||
        null
      : null

    const teamStoreShortId = get(getTeamStore, 'short_id', '')
    const teamStoreBanner = get(getTeamStore, 'banner', null)
    const teamStoreName = get(getTeamStore, 'name', '')
    const teamStoreOwner = get(getTeamStore, 'owner', false)
    const cutOffDay = get(getTeamStore, 'cutoff_date.day', '0')
    const deliveryDay = get(getTeamStore, 'delivery_date.day', '0')
    const cutOffDayOrdinal = get(getTeamStore, 'cutoff_date.dayOrdinal', '0')
    const deliveryDayOrdinal = get(
      getTeamStore,
      'delivery_date.dayOrdinal',
      '0'
    )
    const cutOffMonth = get(getTeamStore, 'cutoff_date.month', 'month')
    const deliveryMonth = get(getTeamStore, 'delivery_date.month', 'month')
    const items = getTeamStore ? getTeamStore.items || [] : []

    const shareStoreUrl = `${
      config.baseUrl
    }store-front?storeId=${teamStoreShortId}`

    const designs = items.map(x => {
      return x.design
    })

    // TODO: dynamic
    const marks = {
      1: {
        style: sliderStyle,
        label: <p>1</p>
      },
      5: {
        style: sliderStyle,
        label: (
          <p>
            2-5<br />10% OFF
          </p>
        )
      },
      24: {
        style: sliderStyle,
        label: (
          <p>
            6-24<br />10% OFF
          </p>
        )
      },
      49: {
        style: sliderStyle,
        label: (
          <p>
            25-49<br />10% OFF
          </p>
        )
      },
      99: {
        style: sliderStyle,
        label: (
          <p>
            50-99<br />10% OFF
          </p>
        )
      }
    }

    return (
      <Container>
        {teamStoreBanner ? <div /> : <ImageBanner src={teamStoreBanner} />}
        <HeadersContainer>
          <Content>
            <HeadersContainer>
              <FlexContainer>
                <Title>{teamStoreName}</Title>
                <FlexContainer>
                  <ButtonWrapper>
                    <Button type="primary" onClick={this.handlShareClick}>
                      <FormattedMessage {...messages.share} />
                    </Button>
                  </ButtonWrapper>
                  {teamStoreOwner ? (
                    <ButtonWrapper>
                      <Button type="primary">
                        <FormattedMessage {...messages.edit} />
                      </Button>
                    </ButtonWrapper>
                  ) : (
                    <DefaultButton onClick={this.handlContactClick}>
                      <FormattedMessage {...messages.contactManager} />
                    </DefaultButton>
                  )}
                </FlexContainer>
              </FlexContainer>
            </HeadersContainer>
            <PriceTitle>
              <FormattedMessage {...messages.priceDropTitle} />
            </PriceTitle>
            <PriceDescription>
              <FormattedMessage {...messages.priceDropSubTitle} />
            </PriceDescription>
            <PriceDescription>
              <FormattedMessage {...messages.priceDropDescription} />
            </PriceDescription>
          </Content>
          <SideBar>
            <OrderTitle>
              {`${formatMessage(
                messages.orderTitle
              )} ${cutOffMonth} ${cutOffDayOrdinal} ${formatMessage(
                messages.orderTitle2
              )} ${deliveryMonth} ${deliveryDayOrdinal}`}
            </OrderTitle>
            <DatesContainer>
              <CalendarContainer>
                <DatesTitle>
                  <FormattedMessage {...messages.cutOff} />
                </DatesTitle>
                <CalendarView>
                  <CalendarTitle>{cutOffMonth}</CalendarTitle>
                  <CalendarDay>{cutOffDay}</CalendarDay>
                </CalendarView>
              </CalendarContainer>
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
            <TierContainer>
              <TierTitle>
                <FormattedMessage {...messages.tierTitle} />
              </TierTitle>
              <TierDescription>
                <FormattedMessage {...messages.tierDescription} />
              </TierDescription>
              <SliderWrapper>
                <StyledSlider marks={marks} disabled={true} defaultValue={37} />
              </SliderWrapper>
            </TierContainer>
            <ListContainer>
              <ProductList
                {...{ formatMessage }}
                withoutPadding={true}
                onPressPrivate={this.handleOnPressPrivate}
                onPressDelete={this.handleOnPressDelete}
                openQuickView={this.handleOnOpenQuickView}
                designs={designs}
              />
            </ListContainer>
          </div>
        )}

        <AboutContainer>
          <AboutTitle>
            <FormattedMessage {...messages.aboutOrdering} />
          </AboutTitle>
          <ProductInfo
            id="much"
            title={formatMessage(messages.howMuchTitle)}
            showContent={false}
            toggleView={this.toggleProductInfo}
          >
            <div />
          </ProductInfo>
          <ProductInfo
            id="long"
            title={formatMessage(messages.howLongTitle)}
            showContent={false}
            toggleView={this.toggleProductInfo}
          >
            <div />
          </ProductInfo>
          <ProductInfo
            id="cani"
            title={formatMessage(messages.CanIORder)}
            showContent={false}
            toggleView={this.toggleProductInfo}
          >
            <div />
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
        />

        <TeamPassCode
          open={openModal}
          requestClose={this.closePassCodeModal}
          formatMessage={formatMessage}
          setPassCode={setPassCodeAction}
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
      console.log('---------OwnProps-----------')
      console.log(teamStoreId)
      console.log(passCode)
      return {
        fetchPolicy: 'always',
        variables: {
          teamStoreId,
          passCode
        }
      }
    }
  })
  // graphql<Data>(getSingleTeamStore, {
  //   options: ({ teamStoreId, passCode }: OwnProps) => ({
  //     fetchPolicy: 'network-only',
  //     variables: { teamStoreId, passCode }
  //   })
  // })
)(StoreFrontContent)

export default StoreFrontContentEnhance
