/**
 * Teamstores Screen - Created by cazarez on 10/04/18.
 */
import * as React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { injectIntl, InjectedIntl } from 'react-intl'
import { compose } from 'react-apollo'
import { connect } from 'react-redux'
import zenscroll from 'zenscroll'
import * as teamstoresActions from './actions'
import { SCREEN_TITLE, paymentIcons } from './constants'
import messages from './messages'
import {
  Container,
  Content,
  SearchBarContent,
  SearchBackground,
  TeamStoreText,
  ResultContainer,
  TitleContainer,
  Title,
  TeamTitle,
  PaySection,
  PayIcons,
  Icon,
  TitleText
} from './styledComponents'
import config from '../../config/index'
import Layout from '../../components/MainLayout'
import SearchBar from '../../components/SearchBar'
import TeamStoreList from '../../components/TeamStoreList'
import Share from '../../components/ShareDesignModal'
import teamstoreImage from '../../assets/teamStoreSearch.jpg'
import Helmet from 'react-helmet'

interface Props extends RouteComponentProps<any> {
  intl: InjectedIntl
  searchString: string
  openShare: boolean
  storeId: string
  currentPage: number
  limit: number
  skip: number
  setSkipValueAction: (skip: number, limit: number) => void
  openShareModalAction: (open: boolean, id?: string) => void
  setSearchParamAction: (param: string) => void
  clearReducerAction: () => void
}

export class SearchTeamstores extends React.Component<Props, {}> {
  private teamList: any
  componentDidMount() {
    window.scrollTo(0, 0)
  }
  componentWillUnmount() {
    const { clearReducerAction } = this.props
    clearReducerAction()
  }
  render() {
    const {
      history,
      intl,
      searchString,
      openShare,
      storeId,
      skip,
      currentPage,
      limit,
      setSkipValueAction
    } = this.props
    const { formatMessage } = intl
    const shareStoreUrl = `${config.baseUrl}store-front?storeId=${storeId}`
    {/* tslint:disable:max-line-length */}
    const metaData =
      <Helmet title={SCREEN_TITLE}>
        <meta name="description" content="Jakroo custom Team stores for cycling teams and clubs. Easy Ordering. Dynamic Price Drop. Flexible Safe and Secure Checkout. Individual shipping. Custom ordering periods" />
        <meta name="keywords" content="jakroo team store, custom team stores, personalized team stores" />
        <meta name="Content-Language" content="en" />
        <meta name="page-topic" content="Sport" />
        <meta name="page-type" content="Custom Stores" />
        <meta property="og:title" content="Custom Team Stores for Clubs and Teams - JAKROO" />
        <meta property="og:url" content="https://jakroo.com/search-teamstores" />
        <meta property="og:type" content="article" />
        <meta property="og:image" content="https://storage.googleapis.com/jakroo/homepage/JakrooCustom.jpg" />
        <meta property="og:description" content="Jakroo custom Team stores for cycling teams and clubs. Easy Ordering. Dynamic Price Drop. Flexible Safe and Secure Checkout. Individual shipping. Custom ordering periods" />
        <link rel="canonical" href="https://jakroo.com/search-teamstores" />
        <link rel="author" href="https://jakroo.com/search-teamstores" />
        <link rel="alternate" href="https://designlab.jakroo.com/search-teamstores"/>
        <link rel="alternate" hrefLang="x-default" href="https://jakroo.com/search-teamstores/us?lang=en&currency=usd" />
        <link rel="alternate" hrefLang="en-gb" href="https://jakroo.com/search-teamstores/gb?lang=en&currency=gbp" />
        <link rel="alternate" hrefLang="en-us" href="https://jakroo.com/search-teamstores/us?lang=en&currency=usd" />
        <link rel="alternate" hrefLang="en-ca" href="https://jakroo.com/search-teamstores/ca?lang=en&currency=cad" />
        <link rel="alternate" hrefLang="en-au" href="https://jakroo.com/search-teamstores/au?lang=en&currency=aud" />
        <link rel="alternate" hrefLang="en" href="https://jakroo.com/search-teamstores/us?lang=en&currency=usd" />
      </Helmet>
    {/* tslint:enable:max-line-length */}
    return (
      <Layout teamStoresHeader={true} {...{ intl, history }}>
        {metaData}
        <TeamTitle>
          <TitleText>{formatMessage(messages.teamTitle)}</TitleText>
        </TeamTitle>
        <Container>
          <Content>
            <SearchBackground src={teamstoreImage} />
            <SearchBarContent>
              <TeamStoreText>
                {formatMessage(messages.teamStoresLegend)}
              </TeamStoreText>
              <SearchBar
                manualMode={true}
                resetInput={false}
                search={this.onSearch}
                formatMessage={intl.formatMessage}
                searchWidth={'100%'}
                placeHolderLabel={formatMessage(messages.searchPlaceHolder)}
              />
            </SearchBarContent>
          </Content>
          <PaySection>
            <Title>{formatMessage(messages.payInfo)}</Title>
            <PayIcons>
              {paymentIcons.map((src: string, key: number) =>
                <Icon {...{ src, key }} />
              )}
            </PayIcons>
          </PaySection>
          <ResultContainer>
            {!searchString && (
              <TitleContainer>
                <Title>{formatMessage(messages.featuredTeamStoresLabel)}</Title>
              </TitleContainer>
            )}
            <div
              ref={list => {
                this.teamList = list
              }}
            />
            <TeamStoreList
              openShareModalAction={this.handleOpenShareModal}
              {...{
                formatMessage,
                searchString,
                history,
                setSkipValueAction,
                skip,
                currentPage,
                limit
              }}
            />
          </ResultContainer>
        </Container>
        <Share
          open={openShare}
          modalTitle={formatMessage(messages.shareModalTitle)}
          requestClose={this.handleOpenShareModal}
          url={shareStoreUrl}
          {...{ formatMessage }}
        />
      </Layout>
    )
  }

  onSearch = (value: string) => {
    const { setSearchParamAction } = this.props
    if (value) {
      zenscroll.to(this.teamList)
    }
    setSearchParamAction(value)
  }

  handleOpenShareModal = (id?: string) => {
    const { openShare, openShareModalAction } = this.props
    openShareModalAction(!openShare, id)
  }
}

const mapStateToProps = (state: any) => state.get('searchTeamstores').toJS()

const TeamstoresEnhance = compose(
  injectIntl,
  connect(
    mapStateToProps,
    { ...teamstoresActions }
  )
)(SearchTeamstores)

export default TeamstoresEnhance
