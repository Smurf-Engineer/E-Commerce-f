/**
 * MyAddresses Component - Created by miguelcanobbio on 14/05/18.
 */
import * as React from 'react'
import { graphql, compose } from 'react-apollo'
import withError from '../../components/WithError'
import withLoading from '../../components/WithLoading'
import MyAccountAddressesList from '../../components/MyAccountAddressesList'
import { Container, Message, StyledEmptyButton } from './styledComponents'
import { QueryProps, AddressType } from '../../types/common'
import messages from './messages'
import { addresesQuery } from './data'

interface Data extends QueryProps {
  addresses: AddressType[]
}

interface Props {
  data: Data
  formatMessage: (messageDescriptor: any) => string
}

class MyAddresses extends React.PureComponent<Props, {}> {
  render() {
    const {
      data: { addresses },
      formatMessage
    } = this.props
    console.log(addresses)
    const content = addresses.length ? (
      <MyAccountAddressesList {...{ formatMessage }} items={addresses} />
    ) : (
      <Message>{formatMessage(messages.emptyMessage)}</Message>
    )
    return (
      <Container>
        <StyledEmptyButton type="danger" onClick={() => {}}>
          {formatMessage(messages.addAddress)}
        </StyledEmptyButton>
        {content}
      </Container>
    )
  }
}

const MyAddressesM = compose(graphql(addresesQuery), withLoading, withError)(
  MyAddresses
)

export default MyAddressesM
