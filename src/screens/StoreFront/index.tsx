/**
 * StoreFront Screen - Created by gustavomedina on 11/04/18.
 */
import * as React from 'react'
import { injectIntl, InjectedIntl, FormattedMessage } from 'react-intl'
import { RouteComponentProps } from 'react-router-dom'
import { graphql, compose } from 'react-apollo'
import { connect } from 'react-redux'
import queryString from 'query-string'
import get from 'lodash/get'
// import { ReducersObject } from '../../store/rootReducer'
import * as storeFrontActions from './actions'
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
  ListContainer
} from './styledComponents'
import config from '../../config/index'
import ProductInfo from '../../components/ProductInfo'
import ProductList from '../../components/DesignsCatalogueThumbnailList'
import Share from '../../components/ShareDesignModal'
import TeamsLayout from '../../components/MainLayout'
import { openQuickViewAction } from '../../components/MainLayout/actions'
import TeamPassCode from '../../components/TeamPassCode'

const PASSCODE_ERROR = 'Pass code needed.'

interface Params extends QueryProps {
  teamStoreId: String
  passCode: String
}

interface Data extends QueryProps {
  teamStores: TeamStoreResultType
  getTeamStore: TeamStoreType
}

interface Props extends RouteComponentProps<any> {
  intl: InjectedIntl
  data: Data
  openShare: boolean
  history: any
  openPassCode: boolean
  passCode: string
  teamStoreQuery: (variables: {}) => void
  openShareModalAction: (open: boolean, id?: string) => void
  openQuickViewAction: (id: number, yotpoId: string | null) => void
  openPassCodeDialogAction: (open: boolean) => void
  setPassCodeAction: (passCode: string) => void
}

// TODO: Implement when info provided
// interface StateProps {
//   showDetails: boolean
//   showSpecs: boolean
// }

export class StoreFront extends React.Component<Props, {}> {
  state = {
    showDetails: true,
    showSpecs: true
  }

  getData = async (params: Params) => {
    const { teamStoreQuery } = this.props
    const response = await teamStoreQuery({
      variables: { teamStoreId: params.teamStoreId, passCode: params.passCode }
    })
    const data = get(response, 'data.getTeamStore', false)

    if (data) {
      return data
    }

    return {}
  }

  toggleProductInfo = (id: string) => {
    const stateValue = this.state[`show${id}`]
    this.setState({ [`show${id}`]: !stateValue } as any)
  }

  closePassCodeModal = () => {
    const { openPassCodeDialogAction } = this.props
    openPassCodeDialogAction(false)
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

  handleOpenShareModal = (id?: string) => {
    const { openShare, openShareModalAction } = this.props
    openShareModalAction(!openShare, id)
  }

  handlShareClick = () => {
    const {
      data: { getTeamStore }
    } = this.props

    const teamStoreShortId = get(getTeamStore, 'short_id', '')

    this.handleOpenShareModal(teamStoreShortId)
  }

  handleIngressPassCode = async () => {
    const {
      location: { search },
      passCode,
      data
    } = this.props
    const queryParams = queryString.parse(search)

    // TODO: remove if not needed
    // const response = await teamStoreQuery({
    //   variables: { teamStoreId: queryParams.teamStoreId, passCode: passCode }
    // })
    // const data = get(response, 'data.getTeamStore', false)

    try {
      await data.refetch({
        variables: { teamStoreId: queryParams.storeId, passCode }
      })
    } catch (e) {
      console.error(e)
    }
  }

  handleOpenPassCode = () => {
    const { openPassCodeDialogAction } = this.props
    openPassCodeDialogAction(true)
  }

  render() {
    const {
      intl,
      data: { error, getTeamStore },
      openShare,
      history,
      openPassCode,
      setPassCodeAction,
      passCode
    } = this.props
    const { formatMessage } = intl

    if (error) {
      const msgError = error.graphQLErrors[0]
      if (msgError.message === PASSCODE_ERROR) {
        this.handleOpenPassCode()
      }
    }

    const errorMessage = error ? error.graphQLErrors[0].message || null : null

    const teamStoreShortId = get(getTeamStore, 'short_id', '')
    const teamStoreBanner = get(getTeamStore, 'banner', null)
    const teamStoreName = get(getTeamStore, 'name', '')
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
    // TODO: remove when component changed
    const marks = {
      1: '1',
      5: '2-5',
      24: '6-24',
      49: '25-49',
      99: '50-99'
    }

    return (
      <TeamsLayout teamStoresHeader={true} {...{ intl, history }}>
        <Container>
          {!teamStoreBanner ? <div /> : <ImageBanner src={teamStoreBanner} />}
          <HeadersContainer>
            <Content>
              <HeadersContainer>
                <Title>{errorMessage || teamStoreName}</Title>
                <ButtonWrapper>
                  <Button type="primary" onClick={this.handlShareClick}>
                    <FormattedMessage {...messages.share} />
                  </Button>
                </ButtonWrapper>
                {/* {TODO: add when design finished} */}
                {/* <ButtonWrapper>
                <Button type="primary">
                  <FormattedMessage {...messages.edit} />
                </Button>
              </ButtonWrapper> */}
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
          <TierContainer>
            <TierTitle>
              <FormattedMessage {...messages.tierTitle} />
            </TierTitle>
            <TierDescription>
              <FormattedMessage {...messages.tierDescription} />
            </TierDescription>
            <StyledSlider marks={marks} disabled={true} defaultValue={37} />
          </TierContainer>
          <ListContainer>
            {errorMessage ? (
              <AboutTitle>{errorMessage}</AboutTitle>
            ) : (
              <ProductList
                {...{ formatMessage }}
                withoutPadding={true}
                onPressPrivate={this.handleOnPressPrivate}
                onPressDelete={this.handleOnPressDelete}
                openQuickView={this.handleOnOpenQuickView}
                designs={designs}
                teamStoreShortId={teamStoreShortId}
                storeFront={true}
              />
            )}
          </ListContainer>
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
          <TeamPassCode
            open={openPassCode}
            requestClose={this.closePassCodeModal}
            formatMessage={intl.formatMessage}
            setPassCode={setPassCodeAction}
            passCode={passCode}
            handleIngressPassCode={this.handleIngressPassCode}
          />
        </Container>
      </TeamsLayout>
    )
  }
}

const mapStateToProps = (state: any) => state.get('storeFront').toJS()

type OwnProps = {
  productId?: number
  location?: any
}

const StoreFrontEnhance = compose(
  injectIntl,
  graphql<Data>(getSingleTeamStore, {
    options: (ownprops: OwnProps) => {
      const {
        location: { search }
      } = ownprops
      const queryParams = queryString.parse(search)
      return {
        variables: {
          teamStoreId: queryParams.storeId || '0',
          passCode: null
        }
      }
    }
  }),
  connect(mapStateToProps, { ...storeFrontActions, openQuickViewAction })
)(StoreFront)

export default StoreFrontEnhance
