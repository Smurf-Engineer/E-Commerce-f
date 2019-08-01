/**
 * TeamStoreDetails Component - Created by eduardoquintero on 25/07/18.
 */
import * as React from 'react'
import { withRouter } from 'react-router-dom'
import { graphql, compose } from 'react-apollo'
import get from 'lodash/get'
import messages from './messages'
import { QueryProps, TeamStoreAdminType } from '../../../types/common'
import { getTeamStoreQuery } from './data'
import Icon from 'antd/lib/icon'
import Spin from 'antd/lib/spin'
import {
  Container,
  ViewContainer,
  ScreenContent,
  ScreenTitle,
  LoadingContainer,
  TeamStoreInformation,
  InformationContainer,
  Header,
  Text,
  StyledSwitch
} from './styledComponents'

interface Data extends QueryProps {
  teamStoreQuery: TeamStoreAdminType
}

interface Props {
  history: any
  data?: Data
  from: string
  currentCurrency: string
  match: any
  formatMessage: (messageDescriptor: any) => string
  onReturn: (id: number) => void
}

const teamStoreHeaderInformation = [
  'managerName',
  'email',
  'teamstoreType',
  'cutoffDate',
  'deliveryDate',
  'featured'
]

export class TeamStoreDetails extends React.Component<Props, {}> {
  render() {
    const { data, formatMessage } = this.props
    if ((data && data.loading) || !data) {
      return (
        <LoadingContainer>
          <Spin />
        </LoadingContainer>
      )
    }

    if (data && data.error) {
      return (
        <Container>
          <ViewContainer onClick={this.handleOnReturn}>
            <Icon type="left" />
            <span>{formatMessage(messages.backToTeamStores)}</span>
          </ViewContainer>
          <LoadingContainer>
            {formatMessage(messages.notFound)}
          </LoadingContainer>
        </Container>
      )
    }

    const teamStoresInformation = teamStoreHeaderInformation.map(
      (header: string, index: number) => {
        return (
          <InformationContainer key={index}>
            <Header>{formatMessage(messages[header])}</Header>
            {typeof data.teamStoreQuery[header] === 'boolean' ? (
              <StyledSwitch />
            ) : (
              <Text>{data.teamStoreQuery[header] || '-'}</Text>
            )}
          </InformationContainer>
        )
      }
    )

    return (
      <Container>
        <ViewContainer onClick={this.handleOnReturn}>
          <Icon type="left" />
          <span>{formatMessage(messages.backToTeamStores)}</span>
        </ViewContainer>
        <ScreenContent>
          <ScreenTitle>
            {`${data.teamStoreQuery.name} ${formatMessage(messages.title)}`}
          </ScreenTitle>
          <TeamStoreInformation>{teamStoresInformation}</TeamStoreInformation>
        </ScreenContent>
      </Container>
    )
  }

  handleOnReturn = () => {
    const { history } = this.props
    history.push(`/admin/team-stores`)
  }
}

interface OwnProps {
  match?: any
}

const TeamStoreDetailsEnhance = compose(
  withRouter,
  graphql(getTeamStoreQuery, {
    options: ({ match }: OwnProps) => {
      const teamStoreId = get(match, 'params.id', '')
      return {
        skip: !teamStoreId,
        variables: { teamStoreId },
        notifyOnNetworkStatusChange: true
      }
    }
  })
)(TeamStoreDetails)

export default TeamStoreDetailsEnhance
