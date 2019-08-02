/**
 * TeamStoreDetails Component - Created by eduardoquintero on 25/07/18.
 */
import * as React from 'react'
import { withRouter } from 'react-router-dom'
import { compose } from 'react-apollo'
import get from 'lodash/get'
import messages from './messages'
import Item from './Item'
import { TeamStoreAdminType, Currency, Message } from '../../../types/common'
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
  ScreenHeader,
  Header,
  Text,
  StyledSwitch,
  Table
} from './styledComponents'

interface Props {
  history: any
  from: string
  currentCurrency: string
  match: any
  teamStore: TeamStoreAdminType
  currencies: Currency[]
  loading: boolean
  id: number
  formatMessage: (messageDescriptor: Message) => string
  onReturn: (id: number) => void
  handleOnSetPrice: (value: number, currency: string, itemIndex: number) => void
  getTeamStoreData: (teamStoreId: number) => void
  handleOnSave: (event: React.MouseEvent<HTMLElement>) => void
  onSetFeatured: (id: number) => void
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
  componentDidMount() {
    const { getTeamStoreData, match } = this.props
    const teamStoreId = get(match, 'params.id', '')
    getTeamStoreData(teamStoreId)
  }
  handleOnSetFeatured = () => {
    const {
      teamStore: { id },
      onSetFeatured
    } = this.props

    onSetFeatured(id)
  }
  render() {
    const {
      formatMessage,
      handleOnSetPrice,
      teamStore,
      currencies = [],
      loading,
      handleOnSave
    } = this.props
    if (loading) {
      return (
        <LoadingContainer>
          <Spin />
        </LoadingContainer>
      )
    }

    if (!loading && !teamStore) {
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

    const headers = currencies.map(({ id, shortName }) => (
      <Header key={id}>{shortName}</Header>
    ))

    const teamStoresInformation = teamStoreHeaderInformation.map(
      (header: string, index: number) => (
        <InformationContainer key={index}>
          <ScreenHeader>{formatMessage(messages[header])}</ScreenHeader>
          {typeof teamStore[header] === 'boolean' ? (
            <StyledSwitch
              defaultChecked={teamStore.featured}
              onChange={this.handleOnSetFeatured}
            />
          ) : (
            <Text>{teamStore[header] || '-'}</Text>
          )}
        </InformationContainer>
      )
    )
    const teamStoreItems = teamStore.items.map(
      (
        {
          design: {
            image: thumbnail,
            name: designName,
            product: { name: productName, description: productType }
          },
          priceRange,
          pricesByCurrency
        },
        index: number
      ) => (
        <Item
          key={index}
          {...{
            thumbnail,
            designName,
            productName,
            productType,
            currencies,
            handleOnSetPrice,
            index,
            priceRange,
            pricesByCurrency,
            handleOnSave,
            formatMessage
          }}
        />
      )
    )

    return (
      <Container>
        <ViewContainer onClick={this.handleOnReturn}>
          <Icon type="left" />
          <span>{formatMessage(messages.backToTeamStores)}</span>
        </ViewContainer>
        <ScreenContent>
          <ScreenTitle>
            {`${name} ${formatMessage(messages.title)}`}
          </ScreenTitle>
          <TeamStoreInformation>{teamStoresInformation}</TeamStoreInformation>
          <Table>
            <thead>
              <tr>
                <Header>{formatMessage(messages.name)}</Header>
                {headers}
                <Header>{''}</Header>
              </tr>
            </thead>
            <tbody>{teamStoreItems}</tbody>
          </Table>
        </ScreenContent>
      </Container>
    )
  }

  handleOnReturn = () => {
    const { history } = this.props
    history.push(`/admin/team-stores`)
  }
}

const TeamStoreDetailsEnhance = compose(withRouter)(TeamStoreDetails)

export default TeamStoreDetailsEnhance
