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
  listForMyAccount?: boolean
  showForm?: boolean
  indexAddressSelected?: number
  formatMessage: (messageDescriptor: any) => string
  showAddressFormAction: (show: boolean, index?: number) => void
  showConfirmDeleteAction?: (index: number) => void
  selectAddressAction?: (index: number) => void
}

export class MyAddressesList extends React.Component<Props, {}> {
  render() {
    const {
      showForm,
      formatMessage,
      items,
      listForMyAccount,
      showAddressFormAction,
      showConfirmDeleteAction,
      selectAddressAction = () => {},
      indexAddressSelected
    } = this.props

    const showList = items && items.length
    let atLeastOneIsSelected = false
    const adressesList = items
      ? items.map((address, key) => {
          const {
            firstName,
            lastName,
            street,
            city,
            stateProvince,
            zipCode,
            country,
            apartment,
            defaultBilling,
            defaultShipping
          } = address
          const isSelected =
            !showForm &&
            ((defaultShipping && indexAddressSelected === -1) ||
              indexAddressSelected === key)
          if (!showForm && isSelected) {
            selectAddressAction(key)
            atLeastOneIsSelected = true
          }
          if (
            key === items.length - 1 &&
            !atLeastOneIsSelected &&
            items &&
            !showForm
          ) {
            selectAddressAction(0)
          }
          return (
            <MyAddress
              {...{
                key,
                formatMessage,
                showAddressFormAction,
                showConfirmDeleteAction,
                defaultBilling,
                defaultShipping,
                selectAddressAction,
                isSelected
              }}
              addressIndex={key}
              name={`${firstName} ${lastName}`}
              street={street}
              city={`${city} ${stateProvince}`}
              zipCode={zipCode}
              country={country}
              apartment={listForMyAccount ? apartment : undefined}
              showSecondaryButtons={listForMyAccount}
            />
          )
        })
      : null

    return (
      <Container>
        {showList ? (
          <Content>
            {!listForMyAccount ? (
              <Title>{formatMessage(messages.title)}</Title>
            ) : null}
            {!listForMyAccount ? (
              <AddAddressBtn onClick={this.showAddressForm}>
                {formatMessage(messages.addAddressLabel)}
              </AddAddressBtn>
            ) : null}
            <AddressesList {...{ listForMyAccount }}>
              {adressesList}
            </AddressesList>
          </Content>
        ) : null}
      </Container>
    )
  }

  showAddressForm = () => {
    const { showAddressFormAction, showForm } = this.props
    showAddressFormAction(!showForm)
  }
}

export default MyAddressesList
