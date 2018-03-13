/**
 * Home - Created by david on 08/10/17.
 */

import * as React from 'react'
import { connect } from 'react-redux'
import { injectIntl, InjectedIntl, FormattedMessage } from 'react-intl'
import { RouteComponentProps } from 'react-router-dom'
import zenscroll from 'zenscroll'
import { compose } from 'react-apollo'
import { ReducersObject } from '../../store/rootReducer'
import * as homeActions from './actions'
import Layout from '../../components/MainLayout'
import {
  Container,
  SearchBackground,
  HelpContainer,
  NeedHelp,
  GetStartedButton,
  SearchContainer,
  SearchBarContent
} from './styledComponents'
import SearchResults from '../../components/SearchResults'
import SearchBar from '../../components/SearchBar'
import ImagesGrid from '../../components/ImagesGrid'
import BackgroundImg from '../../assets/FE1I5781.jpg'
import messages from './messages'
import { openQuickViewAction } from '../../components/MainLayout/actions'

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
}

export class Home extends React.Component<Props, {}> {
  state = {
    openQuickView: false,
    openResults: true
  }
  private stepInput: any

  handleOnQuickView = (id: number) => {
    const { dispatch } = this.props
    dispatch(openQuickViewAction(id))
  }

  onCloseModal = () => openQuickViewAction(0)

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

  render() {
    const { history, showSearchResults, searchString, intl } = this.props
    const searchResults = searchString ? (
      <SearchResults
        searchParam={searchString}
        showResults={showSearchResults}
        closeResults={this.closeResults}
        openResults={this.openResults}
        quickViewAction={this.handleOnQuickView}
        {...{ history }}
      />
    ) : null
    return (
      <Layout {...{ history, intl }}>
        <Container>
          <SearchContainer>
            <SearchBackground src={BackgroundImg} />
            <SearchBarContent>
              <SearchBar
                search={this.onSearch}
                formatMessage={intl.formatMessage}
              />
              <HelpContainer>
                <NeedHelp>
                  <FormattedMessage {...messages.helpFind} />
                </NeedHelp>
                <GetStartedButton size="large">
                  <FormattedMessage {...messages.startButton} />
                </GetStartedButton>
              </HelpContainer>
            </SearchBarContent>
          </SearchContainer>
          <div
            ref={input => {
              this.stepInput = input
            }}
          >
            {searchResults}
          </div>
          <ImagesGrid />
        </Container>
      </Layout>
    )
  }
}

const mapStateToProps = ({ home }: ReducersObject) => home.toJS()

const mapDispatchToProps = (dispatch: any) => ({ dispatch })

const HomeEnhance = compose(
  injectIntl,
  connect(mapStateToProps, mapDispatchToProps)
)(Home)

export default HomeEnhance
