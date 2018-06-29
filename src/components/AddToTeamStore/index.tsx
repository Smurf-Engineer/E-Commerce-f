/**
 * AddToTeamStore Component - Created by cazarez on 25/05/18.
 */
import * as React from 'react'
import { compose, graphql } from 'react-apollo'
import { FormattedMessage } from 'react-intl'
import Spin from 'antd/lib/spin'
import messages from './messages'
import { GetTeamMyStoresQuery } from './data'
import {
  Container,
  Title,
  TeamstoresListContainer,
  ListTitle,
  ListItem,
  AddTeamStoreButton,
  AddDesignButton,
  AddButtonRow,
  LoadingContainer
} from './styledComponents'
import { QueryProps, TeamstoreResult } from '../../types/common'

interface Data extends QueryProps {
  myTeamstores: TeamstoreResult
}
interface Props {
  data: Data
  history: any
  savedDesignId: string
  teamStoreId: string
  openAddToTeamStoreModalAction: (open: boolean) => void
  setItemToAddAction: (itemToAdd: {}, teamStoreId: string) => void
  addItemToStore: () => void
}

export class AddToTeamStore extends React.PureComponent<Props, {}> {
  render() {
    const {
      addItemToStore,
      teamStoreId,
      data: { loading, myTeamstores }
    } = this.props

    if (loading) {
      return (
        <LoadingContainer>
          <Spin />
        </LoadingContainer>
      )
    }

    const { teamStores } = myTeamstores
    const teamstores = teamStores.map((store, key) => {
      const { name, shortId: teamStoreShortId, id } = store

      return (
        <ListItem
          selected={teamStoreShortId === teamStoreId}
          onClick={this.onClickItem(id, teamStoreShortId, name)}
          {...{ key }}
        >
          {name}
        </ListItem>
      )
    })

    return (
      <Container>
        <Title>
          <FormattedMessage {...messages.title} />
        </Title>
        <AddTeamStoreButton onClick={this.addTeamStore}>
          <FormattedMessage {...messages.addTeamstoreLabel} />
        </AddTeamStoreButton>
        <ListTitle>
          <FormattedMessage {...messages.teamstoreListTitle} />
        </ListTitle>
        <TeamstoresListContainer>{teamstores}</TeamstoresListContainer>
        <AddButtonRow>
          <AddDesignButton onClick={addItemToStore}>
            <FormattedMessage {...messages.addDesignButtonLabel} />
          </AddDesignButton>
        </AddButtonRow>
      </Container>
    )
  }

  addTeamStore = () => {
    const { history } = this.props
    history.push('/create-store')
  }

  onClickItem = (storeId: number, shortId: string, name: string) => () => {
    const { savedDesignId, setItemToAddAction } = this.props
    const itemToAdd = {
      team_store_name: name,
      team_store_id: storeId,
      design_id: savedDesignId,
      visible: true
    }
    setItemToAddAction(itemToAdd, shortId)
  }
}

const AddToTeamStoreEmhance = compose(graphql(GetTeamMyStoresQuery))(
  AddToTeamStore
)

export default AddToTeamStoreEmhance
