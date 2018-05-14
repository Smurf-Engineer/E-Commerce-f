/**
 * MyTeamStores Component - Created by cazarez on 14/05/18.
 */
import * as React from 'react'
import { compose, graphql } from 'react-apollo'
// import { FormattedMessage } from 'react-intl'
import messages from './messages'
import { GetTeamMyStoresQuery } from './data'
import { Container } from './styledComponents'
import { TeamstoreResult } from '../../types/common'

interface Data {
  myTeamStores: TeamstoreResult[]
}

interface Props {
  data: Data
  formatMessage: (messageDescriptor: any) => string
}

export class MyTeamStores extends React.PureComponent<Props, {}> {
  render() {
    const { data } = this.props
    console.log('====My TEAMSTORES ', data)
    const { formatMessage } = this.props
    return <Container>{formatMessage(messages.title)}</Container>
  }
}

const MyTeamStoresEnhanced = compose(graphql(GetTeamMyStoresQuery))(
  MyTeamStores
)

export default MyTeamStoresEnhanced
