/**
 * MyAddressesList Component - Created by cazarez on 10/05/18.
 */
import * as React from 'react'

import messages from './messages'

import {
  Container,
  Content,
  Title,
  AddAddressBtn,
  AddressesList
} from './styledComponents'
import MyAddress from '../MyAddress'
import { AddressType } from '../../types/common'

interface Props {
  items: AddressType[]
  formatMessage: (messageDescriptor: any) => string
  showAddressFormAction: (show: boolean) => void
}

export class MyAddressesList extends React.Component<Props, {}> {
  render() {
    const { formatMessage, items } = this.props

    const showList = items && items.length > 0
    const adressesList = items
      ? items.map((address, key) => {
          const {
            firstName,
            lastName,
            street,
            city,
            stateProvince,
            zipCode,
            country
          } = address
          return (
            <MyAddress
              {...{ key }}
              name={`${firstName} ${lastName}`}
              street={street}
              city={`${city} ${stateProvince}`}
              zipCode={zipCode}
              country={country}
              {...{ formatMessage }}
            />
          )
        })
      : null

    return (
      <Container>
        {showList && <Title>{formatMessage(messages.title)}</Title>}
        {showList && (
          <Content>
            <AddAddressBtn onClick={this.showAddressForm}>
              {formatMessage(messages.addAddressLabel)}
            </AddAddressBtn>
            <AddressesList>{adressesList}</AddressesList>
          </Content>
        )}
      </Container>
    )
  }

  showAddressForm = () => {
    const { showAddressFormAction } = this.props
    showAddressFormAction(true)
  }
}

export default MyAddressesList
