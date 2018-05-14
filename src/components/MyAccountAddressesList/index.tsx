/**
 * MyAccountAddressesList Component - Created by miguelcanobbio on 14/05/18.
 */
import * as React from 'react'
import { Container, AddressesList } from './styledComponents'
import MyAddress from '../MyAddress'
import { AddressType } from '../../types/common'

interface Props {
  items: AddressType[]
  formatMessage: (messageDescriptor: any) => string
}

class MyAccountAddressesList extends React.Component<Props, {}> {
  render() {
    const { items, formatMessage } = this.props
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
              {...{ key, formatMessage }}
              name={`${firstName} ${lastName}`}
              street={street}
              city={`${city} ${stateProvince}`}
              zipCode={zipCode}
              country={country}
              showSecondaryButtons={true}
            />
          )
        })
      : null
    return (
      <Container>
        <AddressesList>{adressesList}</AddressesList>
      </Container>
    )
  }
}

export default MyAccountAddressesList
