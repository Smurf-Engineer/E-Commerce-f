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
  showAddressModal?: boolean
  indexAddressSelected?: number
  renderForModal?: boolean
  withPagination?: boolean
  paginationAlignment?: string
  addressIdToMutate: number
  showDeleteAddressConfirm: boolean
  deleteLoading: boolean
  currentPage: number
  billingAddress?: boolean
  small?: boolean
  shipping?: boolean
  hideMap?: boolean
  highlightCards?: boolean
  selectedBilling?: boolean
  simple?: boolean
  multiButtons?: boolean
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

const notAvailable = ['HK', 'IL']

export class MyAddressesList extends React.Component<Props, {}> {
  componentWillMount() {
    const {
      data,
      listForMyAccount,
      showAddressFormAction
    } = this.props

    const addresses: AddressType[] = get(data, 'userAddresses.addresses', [])
    if (!addresses.length && !data.loading && !listForMyAccount) {
      showAddressFormAction(true)
    }
  }

  reloadAddress = async () => {
    const { data } = this.props
    await data.refetch()
  }

  render() {
    const {
      showForm,
      showAddressModal,
      shipping,
      highlightCards,
      selectedBilling,
      hideMap,
      multiButtons,
      formatMessage,
      listForMyAccount = false,
      showConfirmDeleteAction,
      indexAddressSelected,
      renderForModal,
      withPagination,
      showDeleteAddressConfirm,
      deleteLoading,
      paginationAlignment,
      currentPage,
      small,
      simple,
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
    const addressesFiltered = this.filterAddress(addresses)
    const adressesList = addressesFiltered.map((address, key) => {
      const {
        firstName,
        lastName,
        street,
        city,
        stateProvince,
        zipCode,
        country,
        apartment,
        phone,
        defaultBilling,
        defaultShipping
      } = address
      let isSelected = false
      if (billingAddress) {
        isSelected =
        (!showForm && !showAddressModal) &&
        ((defaultBilling && indexAddressSelected === -1) ||
          (indexAddressSelected === key && selectedBilling))
        if (defaultBilling && indexAddressSelected === -1 && !showForm && !showAddressModal) {
          this.handleOnSelectAddress(key)
          atLeastOneIsSelected = true
        }
      } else {
        isSelected =
        (!showForm && !showAddressModal) &&
        ((defaultShipping && indexAddressSelected === -1) ||
          indexAddressSelected === key)
        if ((!showForm && !showAddressModal) && isSelected) {
          this.handleOnSelectAddress(key)
          atLeastOneIsSelected = true
        }
      }
      if (
        key === addresses.length - 1 &&
        !atLeastOneIsSelected &&
        addresses && shipping &&
        (!showForm && !showAddressModal)
      ) {
        this.handleOnSelectAddress(0)
      }

      return (
        <MyAddress
          {...{
            key,
            formatMessage,
            showConfirmDeleteAction,
            isSelected,
            phone,
            small,
            highlightCards,
            hideMap,
            shipping,
            simple,
            multiButtons,
            defaultBilling,
            defaultShipping
          }}
          showAddressFormAction={this.handleOnEditAddress}
          showConfirmDeleteAction={this.handleOnShowDeleteAddressConfirm}
          selectAddressAction={this.handleOnSelectAddress}
          addressIndex={key}
          name={`${firstName} ${lastName}`}
          street={street}
          city={`${city}, ${stateProvince}`}
          zipCode={zipCode}
          country={country}
          apartment={apartment}
          showSecondaryButtons={listForMyAccount}
        />
      )
    })
    const highRes = window && window.matchMedia('(min-width: 1380px)').matches
    const addressesList = (
      <AddressesList
        grid={
          indexAddressSelected !== -1 && 
          highRes && !small && shipping && 
          addressesFiltered && addressesFiltered.length > 3
        }
        {...{ listForMyAccount, small, shipping, simple }}
      >
        {adressesList}
      </AddressesList>
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
      <Container {...{ listForMyAccount, billingAddress }}>
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
    showAddressFormAction(!showForm, false)
  }

  handleOnSelectAddress = (index: number) => {
    const {
      selectAddressAction = () => { },
      data: {
        userAddresses: { addresses }
      }
    } = this.props
    const filtered = this.filterAddress(addresses)
    const address = filtered[index]
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
    const filtered = this.filterAddress(addresses)
    setAddressToUpdateAction(filtered[addressIndex])
  }

  filterAddress = (addresses: AddressType[]) => {
    const { billingAddress } = this.props
    const filteredList = billingAddress ? addresses : 
      addresses.filter(({ country }) => !notAvailable.includes(country))
    return filteredList
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
    const filtered = this.filterAddress(addresses)
    const addressId = filtered[index].id
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
  deleteAddressMutation,
  graphql(GetAddressListQuery, {
    options: ({ itemsNumber, skip }: OwnProps) => {
      return {
        fetchPolicy: 'network-only',
        variables: {
          limit: itemsNumber,
          offset: skip
        }
      }
    },
    withRef: true
  })
)(MyAddressesList)

export default MyadressesListEnhanced
