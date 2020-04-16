/**
 * TeamStoreList Component - Created by cazarez on 11/04/18.
 */
import * as React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { compose, graphql } from 'react-apollo'
import get from 'lodash/get'
import Spin from 'antd/lib/spin'
import Pagination from 'antd/lib/pagination'
import messages from './messages'
import { GetTeamStoresQuery, SearchStoresQuery } from './data'
import {
  Container,
  Notfound,
  LoadingContainer,
  PaginationRow,
  ListContainer,
  TeamStoreContainer
} from './styledComponents'

import { TeamstoreResult } from '../../types/common'
import TeamStoreItem from '../../components/TeamStoreItem'

interface Props extends RouteComponentProps<any> {
  featuredStores?: TeamstoreResult
  foundStores?: TeamstoreResult
  searchString?: string
  currentPage: number
  limit: number
  skip?: number
  setSkipValueAction: (skip: number, limit: number) => void
  formatMessage: (messageDescriptor: any) => string
  openShareModalAction?: () => string
}

export class TeamStoreList extends React.PureComponent<Props, {}> {
  render() {
    const {
      formatMessage,
      featuredStores,
      foundStores,
      searchString,
      currentPage,
      openShareModalAction
    } = this.props
    const featuredStoresArray = get(
      featuredStores,
      'teamStoresList.teamStores',
      []
    )
    const foundTeamStoresArray = get(
      foundStores,
      'searchTeamStores.teamStores',
      []
    )
    const fullCountFeatured = get(featuredStores, 'teamStoresList.fullCount', 0)
    const fullCountSearch = get(foundStores, 'searchTeamStores.fullCount', 0)
    const fullCount = searchString ? fullCountSearch : fullCountFeatured
    const loadingFound = get(foundStores, 'loading', false)
    const loadingFeatured = get(featuredStores, 'loading', false)
    const arrayList = searchString ? foundTeamStoresArray : featuredStoresArray
    return (
      <Container>
        {loadingFound || loadingFeatured ? (
          <LoadingContainer>
            <Spin size="large" />
          </LoadingContainer>
        ) : (
            <React.Fragment>
              <ListContainer>
                {arrayList.length ? (
                  arrayList.map((store: any, index: number) => (
                    <TeamStoreContainer key={index}>
                      <TeamStoreItem
                        small={true}
                        showNameStore={true}
                        image={store.banner}
                        name={store.name}
                        withShareButton={true}
                        onItemClick={this.gotoStore(store.shortId)}
                        idStore={store.shortId}
                        {...{ formatMessage, openShareModalAction }}
                      />
                    </TeamStoreContainer>
                  ))
                ) : (
                    <Notfound>{formatMessage(messages.notFoundMessage)}</Notfound>
                  )}
              </ListContainer>
              {fullCount > 0 && (
                <PaginationRow>
                  <Pagination
                    current={currentPage}
                    total={fullCount}
                    onChange={this.handleChangePage}
                  />
                </PaginationRow>
              )}
            </React.Fragment>
          )}
      </Container>
    )
  }
  handleChangePage = (pageNumber: number) => {
    const { setSkipValueAction, limit } = this.props
    const skip = (pageNumber - 1) * limit
    setSkipValueAction(skip, pageNumber)
  }
  gotoStore = (storeId: string) => () => {
    const { history } = this.props

    history.push(`/store-front?storeId=${storeId}`)
  }
}
interface OwnProps {
  searchString?: string
  limit?: number
  skip?: number
}

const TeamStoreListEnhance = compose(
  graphql(GetTeamStoresQuery, {
    name: 'featuredStores',
    options: ({ searchString, limit, skip }: OwnProps) => ({
      skip: searchString !== '',
      variables: { limit, offset: skip }
    })
  }),
  graphql(SearchStoresQuery, {
    name: 'foundStores',
    options: ({ searchString, limit, skip }: OwnProps) => ({
      skip: searchString === '',
      variables: { searchString, limit, offset: skip }
    })
  })
)(TeamStoreList)

export default TeamStoreListEnhance
