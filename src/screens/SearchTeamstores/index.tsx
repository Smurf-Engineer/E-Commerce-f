/**
 * Teamstores Screen - Created by cazarez on 10/04/18.
 */
import * as React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { injectIntl, InjectedIntl } from 'react-intl'
import { compose } from 'react-apollo'
import { connect } from 'react-redux'
import * as teamstoresActions from './actions'
import messages from './messages'
import {
  Container,
  Content,
  SearchBarContent,
  SearchBackground,
  TeamStoreText,
  ButtonRow,
  StyledButton,
  ResultContainer,
  TitleContainer,
  Title,
  GetSponsored
} from './styledComponents'
import Layout from '../../components/MainLayout'
import SearchBar from '../../components/SearchBar'
import TeamStoreList from '../../components/TeamStoreList'
import Share from '../../components/ShareDesignModal'
import teamstoreImage from '../../assets/uhc_ladies.jpg'

interface Props extends RouteComponentProps<any> {
  intl: InjectedIntl
  searchString: string
  openShare: boolean
  storeId: string
  openShareModalAction: (open: boolean, id?: string) => void
  setSearchParamAction: (param: string) => void
}

export class SearchTeamstores extends React.Component<Props, {}> {
  render() {
    const { history, intl, searchString, openShare, storeId } = this.props
    const { formatMessage } = intl
    const shareStoreUrl = `https://dev.jakroo.tailrecursive.co/store-front?storeId=${storeId}`
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
                resetInput={false}
                search={this.onSearch}
                formatMessage={intl.formatMessage}
                searchWidth={'100%'}
              />
              <ButtonRow>
                <StyledButton>
                  {formatMessage(messages.myTeamsButtonLabel)}
                </StyledButton>
              </ButtonRow>
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
            <TeamStoreList
              openShareModalAction={this.handleOpenShareModal}
              {...{ formatMessage, searchString, history }}
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
  connect(mapStateToProps, { ...teamstoresActions })
)(SearchTeamstores)

export default TeamstoresEnhance
