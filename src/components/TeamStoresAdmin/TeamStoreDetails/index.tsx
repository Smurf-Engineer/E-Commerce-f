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
import Modal from 'antd/lib/modal'
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
  NameLink,
  Table,
  EditButton,
  DeleteButton,
  PricesContainer
} from './styledComponents'
import { CHF_CURRENCY } from '../constants'
interface Props {
  history: any
  from: string
  currentCurrency: string
  match: any
  teamStore: TeamStoreAdminType
  currencies: Currency[]
  loading: boolean
  id: number
  canEdit: boolean
  handleDeleteStore: () => void
  resetDataAction: () => void
  formatMessage: (messageDescriptor: Message) => string
  onReturn: (id: number) => void
  handleOnSetPrice: (value: number, currency: string, itemIndex: number) => void
  getTeamStoreData: (teamStoreId: number) => void
  handleOnSave: (event: React.MouseEvent<HTMLElement>) => void
  onSetFeatured: (id: number) => void
}
const confirm = Modal.confirm
const teamStoreHeaderInformation = [
  'managerName',
  'email',
  'teamstoreType',
  'cutoffDate',
  'deliveryDate',
  'featured'
]

export class TeamStoreDetails extends React.Component<Props, {}> {
  componentWillUnmount() {
    const { resetDataAction } = this.props
    resetDataAction()
  }
  componentDidMount() {
    const { getTeamStoreData, match } = this.props
    const teamStoreId = get(match, 'params.id', '')
    getTeamStoreData(teamStoreId)
  }
  handleDeleteStore = () => {
    const { handleDeleteStore, formatMessage } = this.props
    confirm({
      title: formatMessage(messages.deleteQuestion),
      content: formatMessage(messages.deleteDescription),
      onOk: handleDeleteStore
    })
  }
  handleEditStore = () => {
    const {
      teamStore: { shortId },
      history
    } = this.props
    history.push(`/admin/team-stores/edit/${shortId}`)
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
      canEdit,
      handleOnSave
    } = this.props
    const accountManagerName = get(teamStore, 'accountManager.first_name')
    const accountManagerLastName = get(teamStore, 'accountManager.first_name')

    if (loading || !teamStore) {
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

    const headers = currencies.map(
      ({ id, shortName }) =>
        shortName !== CHF_CURRENCY && <Header key={id}>{shortName}</Header>
    )

    const teamStoresInformation = teamStoreHeaderInformation.map(
      (header: string, index: number) => (
        <InformationContainer key={index}>
          <ScreenHeader>{formatMessage(messages[header])}</ScreenHeader>
          {typeof teamStore[header] === 'boolean' ? (
            <StyledSwitch
              defaultChecked={teamStore.featured}
              disabled={!canEdit}
              onChange={this.handleOnSetFeatured}
            />
          ) : (
            <Text>{teamStore[header] || '-'}</Text>
          )}
        </InformationContainer>
      )
    )
    const teamStoreItems =
      teamStore.items &&
      teamStore.items.map(
        (
          {
            design: {
              image: thumbnail,
              name: designName,
              product: { name: productName, description: productType }
            },
            priceRange,
            pricesByCurrency,
            loading: loadingItem = false
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
              canEdit,
              pricesByCurrency,
              handleOnSave,
              formatMessage
            }}
            loading={loadingItem}
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
            <NameLink href={`/store-front?storeId=${teamStore.shortId}`}>
              {`${teamStore.name} ${formatMessage(messages.title)}`}
            </NameLink>
            {canEdit && (
              <>
                <EditButton onClick={this.handleEditStore}>
                  {formatMessage(messages.edit)}
                </EditButton>
                <DeleteButton onClick={this.handleDeleteStore}>
                  {formatMessage(messages.delete)}
                </DeleteButton>
              </>
            )}
          </ScreenTitle>
          <TeamStoreInformation>
            {teamStoresInformation}
            <InformationContainer>
              <ScreenHeader>
                {formatMessage(messages.accountManager)}
              </ScreenHeader>
              <Text>
                {accountManagerName
                  ? `${accountManagerName} ${accountManagerLastName}`
                  : '-'}
              </Text>
            </InformationContainer>
          </TeamStoreInformation>
          <Table>
            {teamStore.onDemand && (
              <PricesContainer>
                <thead>
                  <tr>{headers}</tr>
                </thead>
                <tbody>{teamStoreItems}</tbody>
              </PricesContainer>
            )}
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
