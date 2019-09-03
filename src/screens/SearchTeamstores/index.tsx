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
  GetSponsored
} from './styledComponents'
import config from '../../config/index'
import Layout from '../../components/MainLayout'
import SearchBar from '../../components/SearchBar'
import TeamStoreList from '../../components/TeamStoreList'
import Share from '../../components/ShareDesignModal'
import teamstoreImage from '../../assets/teamStoreSearch.jpg'

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

    return (
      <Layout teamStoresHeader={true} {...{ intl, history }}>
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
          <ResultContainer>
            {!searchString && (
              <TitleContainer>
                <Title>{formatMessage(messages.featuredTeamStoresLabel)}</Title>
                <GetSponsored>
                  {formatMessage(messages.getSponsoredLabel)}
                </GetSponsored>
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
