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
  ButtonWrapper,
  AddressesList,
  PaginationRow,
  DeleteConfirmMessage
} from './styledComponents'
import MyAddress from '../MyAddress'
import ModalFooter from '../ModalFooter'
import ModalTitle from '../ModalTitle'
import EmptyContainer from '../EmptyContainer'

import { QueryProps, AddressType } from '../../types/common'

interface Data extends QueryProps {
  userAddresses: {
    fullCount: number
    addresses: AddressType[]
  }
}

interface Props {
  data: Data
  items: AddressType[]
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
  billingAddress?: boolean
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
  componentWillMount() {
    const { data, listForMyAccount, showAddressFormAction } = this.props
    const addresses: AddressType[] = get(data, 'userAddresses.addresses', [])

    if (!addresses.length && !listForMyAccount) {
      showAddressFormAction(true)
    }
  }

  render() {
    const {
      showForm,
      formatMessage,
      listForMyAccount = false,
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
      billingAddress,
      data
    } = this.props

    if (!data || get(data, 'loading', false)) {
      return null
    }

    const addresses: AddressType[] = get(data, 'userAddresses.addresses', [])
    const fullCount = get(data, 'userAddresses.fullCount', 0)
    let atLeastOneIsSelected = false

    const adressesList = addresses.map((address, key) => {
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

    const addressesList = (
      <AddressesList {...{ listForMyAccount }}>{adressesList}</AddressesList>
    )

    const deleteAddressModal = (
      <Modal
        visible={showDeleteAddressConfirm}
        title={<ModalTitle title={formatMessage(messages.titleDeleteModal)} />}
        destroyOnClose={true}
        closable={false}
        afterClose={this.handleOnHideDeleteAddressConfirm}
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

    let renderView
    if (!!addresses.length) {
      renderView = addressesList
    } else if (listForMyAccount) {
      renderView = (
        <EmptyContainer message={formatMessage(messages.emptyMessage)} />
      )
    }

    return (
      <Container {...{ listForMyAccount }}>
        <Content>
          {!listForMyAccount &&
            !billingAddress && (
              <Title marginBottom={'30px'}>
                {formatMessage(messages.title)}
              </Title>
            )}
          {/* TODO: Render this button from MyAddresses */}
          {!renderForModal && !listForMyAccount ? (
            <ButtonWrapper {...{ listForMyAccount }}>
              <AddAddressBtn onClick={this.showAddressForm}>
                {formatMessage(messages.addAddressLabel)}
              </AddAddressBtn>
            </ButtonWrapper>
          ) : null}
        </Content>
        {!renderForModal &&
          (!listForMyAccount && !!addresses.length) &&
          !billingAddress && (
            <Title marginBottom={'20px'}>
              {formatMessage(messages.shippingTitle)}
            </Title>
          )}
        {renderView}
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
    )
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
  listForMyAccount?: boolean
}

const MyadressesListEnhanced = compose(
  graphql(GetAddressListQuery, {
    options: ({ itemsNumber, skip }: OwnProps) => {
      return {
        fetchPolicy: 'network-only',
        variables: {
          limit: itemsNumber,
          offset: skip
        }
      }
    }
  }),
  withLoading,
  withError,
  deleteAddressMutation
)(MyAddressesList)

export default MyadressesListEnhanced
