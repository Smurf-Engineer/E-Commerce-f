/**
 * MyAddressesList Component - Created by cazarez on 10/05/18.
 */
import * as React from 'react'
import get from 'lodash/get'
import messages from './messages'
import { compose, graphql } from 'react-apollo'
import Pagination from 'antd/lib/pagination'
import Modal from 'antd/lib/modal'
import { GetAddressListQuery, deleteAddressMutation } from './data'
import withError from '../../components/WithError'
import withLoading from '../../components/WithLoading'

import { setDeleteLoadingAction } from '../MyAddresses/actions'

import {
  Container,
  Content,
  Title,
  AddAddressBtn,
  AddressesList,
  PaginationRow,
  Message,
  DeleteConfirmMessage
} from './styledComponents'
import MyAddress from '../MyAddress'
import ModalFooter from '../ModalFooter'
import ModalTitle from '../ModalTitle'
import { QueryProps, AddressType } from '../../types/common'

interface Data extends QueryProps {
  userAddresses: {
    fullCount: number
    addresses: AddressType[]
  }
}

interface Props {
  data: Data
  listForMyAccount?: boolean
  showForm?: boolean
  indexAddressSelected?: number
  renderForModal?: boolean
  withPagination?: boolean
  paginationAlignment?: string
  addressIdToMutate: number
  showDeleteAddressConfirm: boolean
  deleteLoading: boolean
  currentPage: number
  changePage: (pageNumber: number) => void
  formatMessage: (messageDescriptor: any) => string
  showAddressFormAction: (show: boolean, index?: number) => void
  showConfirmDeleteAction?: (index: number) => void
  selectAddressAction: (address: AddressType, index: number) => void
  setDeleteLoadingAction: (loading: boolean) => void
  setAddressToUpdateAction: (address: AddressType) => void
  hideDeleteAddressConfirmAction: () => void
  showDeleteAddressConfirmAction: (addressId: number) => void
  deleteAddress: (variables: {}) => void
  resetReducerDataAction: () => void
}

export class MyAddressesList extends React.Component<Props, {}> {
  render() {
    const {
      showForm,
      formatMessage,
      listForMyAccount,
      showAddressFormAction,
      showConfirmDeleteAction,
      indexAddressSelected,
      renderForModal,
      withPagination,
      showDeleteAddressConfirm,
      deleteLoading,
      paginationAlignment,
      currentPage,
      changePage,
      data: { loading, userAddresses }
    } = this.props

    if (loading) {
      return null
    }

    const addresses = get(userAddresses, 'addresses', [])
    const fullCount = get(userAddresses, 'fullCount', 0)
    const showList = addresses && addresses.length
    let atLeastOneIsSelected = false

    const adressesList = addresses
      ? addresses.map((address, key) => {
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
            this.handleOnSelectAddress(key)
            atLeastOneIsSelected = true
          }
          if (
            key === addresses.length - 1 &&
            !atLeastOneIsSelected &&
            addresses &&
            !showForm
          ) {
            this.handleOnSelectAddress(0)
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
                isSelected
              }}
              showAddressFormAction={this.handleOnEditAddress}
              showConfirmDeleteAction={this.handleOnShowDeleteAddressConfirm}
              selectAddressAction={this.handleOnSelectAddress}
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

    const addressesList = (
      <AddressesList {...{ listForMyAccount }}>{adressesList}</AddressesList>
    )

    const deleteAddressModal = (
      <Modal
        visible={showDeleteAddressConfirm}
        title={<ModalTitle title={formatMessage(messages.titleDeleteModal)} />}
        footer={
          <ModalFooter
            okText={formatMessage(messages.deleteAddress)}
            onOk={this.handleOnDeleteAddress}
            onCancel={this.handleOnHideDeleteAddressConfirm}
            confirmLoading={deleteLoading}
            {...{ formatMessage }}
          />
        }
      >
        <DeleteConfirmMessage>
          {formatMessage(messages.messageDeleteModal)}
        </DeleteConfirmMessage>
      </Modal>
    )

    const renderView = !!addresses.length ? (
      <Container {...{ listForMyAccount }}>
        {showList ? (
          <Content>
            {!listForMyAccount ? (
              <Title>{formatMessage(messages.title)}</Title>
            ) : null}
            {!renderForModal && !listForMyAccount ? (
              <AddAddressBtn onClick={this.showAddressForm}>
                {formatMessage(messages.addAddressLabel)}
              </AddAddressBtn>
            ) : null}
            {addressesList}
          </Content>
        ) : null}
        {withPagination ? (
          <PaginationRow {...{ paginationAlignment }}>
            <Pagination
              current={currentPage}
              total={fullCount}
              onChange={changePage}
            />
          </PaginationRow>
        ) : null}
        {deleteAddressModal}
      </Container>
    ) : (
      <Container>
        <Message>{formatMessage(messages.emptyMessage)}</Message>
      </Container>
    )

    return renderView
  }

  showAddressForm = () => {
    const { showAddressFormAction, showForm } = this.props
    showAddressFormAction(!showForm)
  }

  handleOnSelectAddress = (index: number) => {
    const {
      selectAddressAction = () => {},
      data: {
        userAddresses: { addresses }
      }
    } = this.props
    const address = addresses[index]
    selectAddressAction(address, index)
  }

  handleOnDeleteAddress = async () => {
    const {
      data: { refetch },
      addressIdToMutate,
      deleteAddress,
      resetReducerDataAction
    } = this.props
    setDeleteLoadingAction(true)
    await deleteAddress({ variables: { addressId: addressIdToMutate } })
    await refetch()
    resetReducerDataAction()
  }

  handleOnEditAddress = (show: boolean, index?: number) => {
    const addressIndex = index as number
    const {
      data: {
        userAddresses: { addresses }
      },
      setAddressToUpdateAction
    } = this.props
    setAddressToUpdateAction(addresses[addressIndex])
  }

  handleOnHideDeleteAddressConfirm = () => {
    const { hideDeleteAddressConfirmAction } = this.props
    hideDeleteAddressConfirmAction()
  }

  handleOnShowDeleteAddressConfirm = (index: number) => {
    const {
      showDeleteAddressConfirmAction,
      data: {
        userAddresses: { addresses }
      }
    } = this.props
    const addressId = addresses[index].id
    showDeleteAddressConfirmAction(addressId as number)
  }
}

type OwnProps = {
  itemsNumber?: number
  renderForModal?: boolean
  withoutDataFetch?: boolean
  skip?: number
}

const MyadressesListEnhanced = compose(
  graphql(GetAddressListQuery, {
    options: ({ itemsNumber, skip }: OwnProps) => {
      return {
        fetchPolicy: 'network-only',
        variables: {
          limit: itemsNumber,
          skip: skip
        }
      }
    }
  }),
  withLoading,
  withError,
  deleteAddressMutation
)(MyAddressesList)

export default MyadressesListEnhanced
