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
import ProductInfo from '../../components/ProductInfo'
import ProductList from '../../components/DesignsCatalogueThumbnailList'

const PASSCODE_ERROR = 'Pass code needed.'
// const NOT_FOUND_ERROR = 'Team store does not exist.'

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
  teamStoreQuery: (variables: {}) => void
}

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

  handleOnPressPrivate = (id: number, isPrivate: boolean) => {
    // TODO: Handle private
  }

  handleOnPressDelete = (id: number) => {
    // TODO: Handle delete
  }

  handleOnOpenQuickView = (id: number, yotpoId: string) => {
    // const { openQuickView } = this.props
    // openQuickView(id, yotpoId)
  }

  render() {
    const { intl, data: { error, getTeamStore } } = this.props
    const { formatMessage } = intl

    if (error) {
      console.log('---------error---------')
      console.log(error)
      const errorMessage = error.graphQLErrors[0]
      console.log('---------errorMessage---------')
      console.log(errorMessage)
      if (errorMessage.message === PASSCODE_ERROR) {
        // TODO: open passcode dialog
      }
    }

    const teamStoreBanner = get(getTeamStore, 'banner', '')
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

    const designs = items.map(x => {
      return x.design
    })

    const marks = {
      1: '1',
      5: '2-5',
      24: '6-24',
      49: '25-49',
      99: '50-99'
    }

    console.log('------------teamStoreBanner-----------')
    console.log(teamStoreBanner)

    return (
      <Container>
        <ImageBanner src={teamStoreBanner} />
        <HeadersContainer>
          <Content>
            <HeadersContainer>
              <Title>{teamStoreName}</Title>
              <ButtonWrapper>
                <Button type="primary">
                  <FormattedMessage {...messages.share} />
                </Button>
              </ButtonWrapper>
              <ButtonWrapper>
                <Button type="primary">
                  <FormattedMessage {...messages.edit} />
                </Button>
              </ButtonWrapper>
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
          <ProductList
            {...{ formatMessage }}
            withoutPadding={true}
            onPressPrivate={this.handleOnPressPrivate}
            onPressDelete={this.handleOnPressDelete}
            openQuickView={this.handleOnOpenQuickView}
            designs={designs}
          />
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
      </Container>
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
      const { location: { search } } = ownprops
      const queryParams = queryString.parse(search)
      return {
        variables: {
          teamStoreId: queryParams.storeId || '0'
        }
      }
    }
  }),
  connect(mapStateToProps, { ...storeFrontActions })
)(StoreFront)

export default StoreFrontEnhance
