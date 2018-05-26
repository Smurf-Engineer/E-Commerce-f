/**
 * AddToTeamStore Component - Created by cazarez on 25/05/18.
 */
import * as React from 'react'
import { compose, graphql } from 'react-apollo'
import { FormattedMessage } from 'react-intl'
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
  AddButtonRow
} from './styledComponents'
import { QueryProps, TeamstoreResult } from '../../types/common'

interface Data extends QueryProps {
  myTeamstores: TeamstoreResult
}
interface Props {
  data: Data
  history: any
  openAddToTeamStoreModalAction: (open: boolean) => void
}

export class AddToTeamStore extends React.PureComponent<Props, {}> {
  render() {
    const {
      data: { loading, myTeamstores }
    } = this.props

    console.log('DATA ', myTeamstores)
    if (loading) {
      return null
    }

    const { teamStores } = myTeamstores
    const teamstores = teamStores.map((store, key) => {
      const { name, shortId } = store
      return (
        <ListItem id={shortId} {...{ key }}>
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
          <AddDesignButton onClick={this.handleAddItem}>
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

  handleAddItem = () => {
    const { openAddToTeamStoreModalAction } = this.props
    openAddToTeamStoreModalAction(false)
  }
}

const AddToTeamStoreEmhance = compose(graphql(GetTeamMyStoresQuery))(
  AddToTeamStore
)

export default AddToTeamStoreEmhance
