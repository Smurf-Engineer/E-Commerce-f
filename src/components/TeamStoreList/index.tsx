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
  TeamStoresList,
  FoundStoreItem,
  FeaturedStoreItem,
  Notfound,
  LoadingContainer
} from './styledComponents'

import { TeamstoreResult } from '../../types/common'
import TeamStoreItem from '../../components/TeamStoreItem'
import TeamLogo from '../../assets/jakroologoteam.svg'

interface Props extends RouteComponentProps<any> {
  featuredStores?: TeamstoreResult
  foundStores?: TeamstoreResult
  searchString?: string
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
      openShareModalAction
    } = this.props

    const featuredStoresArray = get(
      featuredStores,
      'teamStoresList.teamStores',
      []
    )

    const featuredStoresList = featuredStores
      ? featuredStoresArray.map((store: any, index: number) => (
          <FeaturedStoreItem
            key={index}
            onClick={this.gotoStore(store.shortId)}
          >
            <TeamStoreItem
              showNameStore={true}
              image={store.banner || TeamLogo}
              name={store.name}
              {...{ formatMessage }}
            />
          </FeaturedStoreItem>
        ))
      : null

    const foundTeamStoresArray = get(
      foundStores,
      'searchTeamStores.teamStores',
      []
    )
    const loadingFound = get(foundStores, 'loading', false)
    const loadingFeatured = get(featuredStores, 'loading', false)
    const foundStoresList = foundTeamStoresArray.length ? (
      foundTeamStoresArray.map((store: any, index: number) => (
        <FoundStoreItem key={index}>
          <TeamStoreItem
            showNameStore={true}
            image={store.banner || ''}
            name={store.name}
            idStore={store.shortId}
            onItemClick={this.gotoStore(store.shortId)}
            withShareButton={true}
            {...{ formatMessage, openShareModalAction }}
          />
        </FoundStoreItem>
      ))
    ) : (
      <Notfound>{formatMessage(messages.notFoundMessage)}</Notfound>
    )

    const renderStores = !searchString ? (
      featuredStoresList
    ) : (
      <TeamStoresList>{foundStoresList}</TeamStoresList>
    )

    return (
      <Container>
        {loadingFound || loadingFeatured ? (
          <LoadingContainer>
            <Spin size="large" />
          </LoadingContainer>
        ) : (
          renderStores
        )}
      </Container>
    )
  }

  gotoStore = (storeId: string) => () => {
    const { history } = this.props

    history.push(`/store-front?storeId=${storeId}`)
  }
}
interface OwnProps {
  searchString?: string
}

const TeamStoreListEnhance = compose(
  graphql(GetTeamStoresQuery, {
    name: 'featuredStores',
    options: ({ searchString }: OwnProps) => ({
      skip: searchString !== ''
    })
  }),
  graphql(SearchStoresQuery, {
    name: 'foundStores',
    options: ({ searchString }: OwnProps) => ({
      skip: searchString === '',
      variables: { searchString }
    })
  })
)(TeamStoreList)

export default TeamStoreListEnhance
