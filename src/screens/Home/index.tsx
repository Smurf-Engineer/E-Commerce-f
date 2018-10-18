/**
 * Home - Created by david on 08/10/17.
 */

import * as React from 'react'
import { connect } from 'react-redux'
import queryString from 'query-string'
import isEmpty from 'lodash/isEmpty'
import { injectIntl, InjectedIntl, FormattedMessage } from 'react-intl'
import { RouteComponentProps } from 'react-router-dom'
import zenscroll from 'zenscroll'
import { compose } from 'react-apollo'
import * as homeActions from './actions'
import Layout from '../../components/MainLayout'
import {
  Container,
  SearchBackground,
  // TODO: Comented code to hide everything related with fitting widget, it'll be implemented in phase 2 of Jakroo
  //  HelpContainer,
  //  NeedHelp,
  //  GetStartedButton,
  SearchContainer,
  SearchBarContent,
  PropositionTilesContainer,
  PropositionTile,
  SubText
} from './styledComponents'
import SearchResults from '../../components/SearchResults'
import SearchBar from '../../components/SearchBar'
import ImagesGrid from '../../components/ImagesGrid'
import YotpoHome from '../../components/YotpoHome'
import FeaturedProducts from '../../components/FeaturedProducts'
import FeaturedContent from '../../components/FeaturedContent'
import messages from './messages'
import { setRegionAction } from '../LanguageProvider/actions'
import { openQuickViewAction } from '../../components/MainLayout/actions'
import config from '../../config/index'

const BackgroundImg =
  'https://storage.googleapis.com/jakroo/slider/unlimited_posibilities.jpg'
interface Props extends RouteComponentProps<any> {
  someKey?: string
  productId: number
  openQuickViewAction: (id: number | null) => void
  defaultAction: (someKey: string) => void
  setSearchParam: (param: string) => void
  showSearchResultsHome: (show: boolean) => void
  showSearchResults: boolean
  searchString: string
  dispatch: any
  intl: InjectedIntl
  fakeWidth: number
  currentCurrency: string
  clientInfo: any
}

export class Home extends React.Component<Props, {}> {
  state = {
    openQuickView: false,
    openResults: true
  }
  private stepInput: any

  componentDidMount() {
    const {
      dispatch,
      match: { params },
      location: { search }
    } = this.props
    const queryParams = queryString.parse(search)
    if (params && params.region && !isEmpty(queryParams)) {
      dispatch(
        setRegionAction({
          region: params.region,
          localeIndex: queryParams.lang,
          locale: queryParams.lang,
          currency: queryParams.currency
        })
      )
    }
  }

  handleOnQuickView = (id: number, yotpoId: string, gender: number) => {
    const { dispatch } = this.props
    dispatch(openQuickViewAction(id, yotpoId, gender))
  }

  onCloseModal = () => openQuickViewAction(0, '', 0)

  openResults = () => {
    const { dispatch } = this.props
    const { showSearchResultsHome } = homeActions
    dispatch(showSearchResultsHome(true))
  }
  closeResults = () => {
    const { dispatch } = this.props
    const { showSearchResultsHome } = homeActions
    dispatch(showSearchResultsHome(false))
  }
  onSearch = (value: string) => {
    const { dispatch } = this.props
    const { setSearchParam } = homeActions
    zenscroll.to(this.stepInput, 700)
    dispatch(setSearchParam(value))
  }

  handleOnGetStarted = () => {
    const { history } = this.props
    history.push('/fit-widget')
  }

  render() {
    const {
      history,
      showSearchResults,
      searchString,
      intl,
      fakeWidth,
      currentCurrency,
      clientInfo: {
        browser: { name: browserName }
      }
    } = this.props

    const { formatMessage } = intl

    const searchResults = searchString ? (
      <SearchResults
        searchParam={searchString}
        showResults={showSearchResults}
        closeResults={this.closeResults}
        openResults={this.openResults}
        quickViewAction={this.handleOnQuickView}
        currentCurrency={currentCurrency || config.defaultCurrency}
        {...{ history, SearchResults }}
      />
    ) : null
    return (
      <Layout {...{ history, intl }}>
        <Container>
          <SearchContainer>
            <SearchBackground src={BackgroundImg} />
            <SearchBarContent>
              <SearchBar search={this.onSearch} {...{ formatMessage }} />
              {/* TODO: Commented for phase 1, will be implemented in Jakroo phase 2
              <HelpContainer>
                <NeedHelp>
                  <FormattedMessage {...messages.helpFind} />
                </NeedHelp>
                <GetStartedButton
                  size="large"
                  onClick={this.handleOnGetStarted}
                >
                  <FormattedMessage {...messages.startButton} />
                </GetStartedButton>
              </HelpContainer>*/}
            </SearchBarContent>
          </SearchContainer>
          <div
            ref={input => {
              this.stepInput = input
            }}
          >
            {searchResults}
          </div>
          <FeaturedProducts
            formatMessage={intl.formatMessage}
            openQuickView={this.handleOnQuickView}
            currentCurrency={currentCurrency || config.defaultCurrency}
            {...{ history }}
          />
          <FeaturedContent {...{ history }} />
          <PropositionTilesContainer>
            <PropositionTile>
              <FormattedMessage {...messages.flexibleLabel} />
              <SubText>{formatMessage(messages.collectionOrCustom)}</SubText>
            </PropositionTile>
            <PropositionTile>
              <FormattedMessage {...messages.fastDeliveryLabel} />
              <SubText>{formatMessage(messages.twoWeeksOrLess)}</SubText>
            </PropositionTile>
            <PropositionTile>
              <FormattedMessage {...messages.easyLabel} />
              <SubText>{formatMessage(messages.priceDrop)}</SubText>
            </PropositionTile>
          </PropositionTilesContainer>
          <ImagesGrid {...{ fakeWidth, history, browserName }} />
          <YotpoHome />
        </Container>
      </Layout>
    )
  }
}

const mapStateToProps = (state: any) => {
  const home = state.get('home').toJS()
  const responsive = state.get('responsive').toJS()
  const langProps = state.get('languageProvider').toJS()
  const app = state.get('app').toJS()

  return { ...home, ...responsive, ...langProps, ...app }
}

const mapDispatchToProps = (dispatch: any) => ({ dispatch })

const HomeEnhance = compose(
  injectIntl,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(Home)

export default HomeEnhance
