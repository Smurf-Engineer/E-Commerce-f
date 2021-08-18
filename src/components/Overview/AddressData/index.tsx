/**
 * AddressData Component - Created by miguelcanobbio on 18/07/18.
 */
import * as React from 'react'
import get from 'lodash/get'
import { Container } from './styledComponents'
import { AddressType } from '../../../types/common'
import MyAddress from '../../MyAddress'

interface Props {
  address: AddressType
  formatMessage: (messageDescriptor: any) => string
}

const AddressData = ({ address, formatMessage }: Props) => {
  const addressFirstName = get(address, 'firstName', '')
  const addressLastName = get(address, 'lastName', '')
  const street = get(address, 'street', '')
  const apartment = get(address, 'apartment', '')
  const country = get(address, 'country', '')
  const stateProvince = get(address, 'stateProvince', '')
  const city = get(address, 'city', '')
  const zipCode = get(address, 'zipCode', '')
  const defaultBilling = get(address, 'defaultBilling', false)
  const defaultShipping = get(address, 'defaultShipping', false)
  return (
    <Container>
      <MyAddress
        hideBottomButtons={true}
        showSecondaryButtons={true}
        name={`${addressFirstName} ${addressLastName}`}
        street={street}
        city={`${city}, ${stateProvince}`}
        zipCode={zipCode}
        country={country}
        apartment={apartment}
        {...{ formatMessage, defaultBilling, defaultShipping }}
      />
    </Container>
  )
}

export default AddressData
