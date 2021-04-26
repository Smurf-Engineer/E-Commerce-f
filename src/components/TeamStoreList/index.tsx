/**
 * TeamStoreList Component - Created by cazarez on 11/04/18.
 */
import * as React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { compose, graphql } from 'react-apollo'
import get from 'lodash/get'
import Spin from 'antd/lib/spin'
import messages from './messages'
import { GetTeamStoresQuery, SearchStoresQuery } from './data'
import {
  Container,
  Notfound,
  InitialLoadingContainer,
  LoadingContainer,
  ListContainer,
  TeamStoreContainer,
  StyledInfiniteScroll
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
  state = {
    featuredStoresArray: [],
    foundTeamStoresArray: []
  }
  async componentDidUpdate(oldProps: Props) {
    const { featuredStores: oldFeaturedStores, foundStores: oldFoundStores, currentPage: oldCurrentPage } = oldProps
    const { featuredStores, foundStores, currentPage, skip } = this.props

    if ((featuredStores !== oldFeaturedStores || foundStores !== oldFoundStores)
      && oldCurrentPage === currentPage
    ) {
      const newFeaturedStoresArray = get(
        featuredStores,
        'teamStoresList.teamStores',
        []
      )
      const newFoundTeamStoresArray = get(
        foundStores,
        'searchTeamStores.teamStores',
        []
      )

      if (skip === 0) {
        this.setState({
          featuredStoresArray: newFeaturedStoresArray,
          foundTeamStoresArray: newFoundTeamStoresArray
        })
      } else {
        const { featuredStoresArray, foundTeamStoresArray } = this.state
        const updatedFeaturedStoresArray = [...featuredStoresArray, ...newFeaturedStoresArray]
        const updatedFoundStoresArray = [...foundTeamStoresArray, ...newFoundTeamStoresArray]

        this.setState({
          featuredStoresArray: updatedFeaturedStoresArray,
          foundTeamStoresArray: updatedFoundStoresArray
        })
      }
    }
  }
  render() {
    const {
      formatMessage,
      featuredStores,
      foundStores,
      searchString,
      openShareModalAction,
      limit,
      currentPage
    } = this.props

    const {
      featuredStoresArray,
      foundTeamStoresArray
    } = this.state

    const fullCountFeatured = get(featuredStores, 'teamStoresList.fullCount', 0)
    const fullCountSearch = get(foundStores, 'searchTeamStores.fullCount', 0)
    const fullCount = searchString ? fullCountSearch : fullCountFeatured
    const loadingFound = get(foundStores, 'loading', false)
    const loadingFeatured = get(featuredStores, 'loading', false)
    const arrayList = searchString ? foundTeamStoresArray : featuredStoresArray
    const loader = <LoadingContainer><Spin /></LoadingContainer>
    return (
      <Container>
        {(loadingFound || loadingFeatured) && currentPage === 0 ? (
          <InitialLoadingContainer>
            <Spin size="large" />
          </InitialLoadingContainer>
        ) : (
            <ListContainer>
              <StyledInfiniteScroll
                pageStart={0}
                useWindow={false}
                threshold={limit}
                loadMore={this.handleLoadData}
                initialLoad={false}
                hasMore={fullCount > arrayList.length}
                {...{ loader }}
              >
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
              </StyledInfiniteScroll>
            </ListContainer>
          )}
      </Container>
    )
  }
  handleLoadData = (pageNumber: number) => {
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
