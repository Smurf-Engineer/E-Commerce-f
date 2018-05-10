/**
 * MyAddressesList Component - Created by cazarez on 10/05/18.
 */
import * as React from 'react'
import { FormattedMessage } from 'react-intl'
import messages from './messages'
import { Container, Content, Title, AddAddressBtn } from './styledComponents'
import MyAddress from '../MyAddress'

interface Props {
  formatMessage: (messageDescriptor: any) => string
}

class MyAddressesList extends React.Component<Props, {}> {
  render() {
    const { formatMessage } = this.props
    return (
      <Container>
        <Title>{formatMessage(messages.title)}</Title>
        <Content>
          <AddAddressBtn>
            {formatMessage(messages.addAddressLabel)}
          </AddAddressBtn>
          <MyAddress
            name={'Joe Smith'}
            street={'1234 Street st'}
            city={'San Francisco CA'}
            zipCode={'12345'}
            country={'USA'}
            {...{ formatMessage }}
          />
        </Content>
      </Container>
    )
  }
}

export default MyAddressesList
