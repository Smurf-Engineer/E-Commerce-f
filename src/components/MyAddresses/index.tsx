/**
 * MyAddresses Component - Created by miguelcanobbio on 14/05/18.
 */
import * as React from 'react'
import { compose } from 'react-apollo'
import { connect } from 'react-redux'
import get from 'lodash/get'
import Modal from 'antd/lib/modal'
import * as MyAddressesActions from './actions'
import MyAddressesList from '../../components/MyAddressesList'
import ShippingAddressForm from '../../components/ShippingAddressForm'
import {
  Container,
  StyledEmptyButton,
  Title,
  StyledCheckbox
} from './styledComponents'
import { QueryProps, AddressType } from '../../types/common'
import messages from './messages'
import { addAddressMutation, updateAddressMutation } from './data'
import { GetAddressListQuery } from '../MyAddressesList/data'

interface Data extends QueryProps {
  addresses: AddressType[]
}

interface Props {
  client: any
  data: Data
  firstName: string
  lastName: string
  street: string
  apartment: string
  country: string
  stateProvince: string
  city: string
  zipCode: string
  phone: string
  defaultBilling: boolean
  defaultShipping: boolean
  hasError: boolean
  showAddressModal: boolean
  showDeleteAddressConfirm: boolean
  addressIdToMutate: number
  modalLoading: boolean
  deleteLoading: boolean
  currentPage: number
  limit: number
  skip: number
  formatMessage: (messageDescriptor: any) => string
  // reducer actions
  selectDropdownAction: (id: string, value: string) => void
  inputChangeAction: (id: string, value: string) => void
  validFormAction: (hasError: boolean) => void
  defaultShippingAction: (checked: boolean) => void
  defaultBillingAction: (checked: boolean) => void
  showAddressModalAction: (show: boolean, index?: string) => void
  showDeleteAddressConfirmAction: (addressId: number) => void
  hideDeleteAddressConfirmAction: () => void
  setModalLoadingAction: (loading: boolean) => void
  setDeleteLoadingAction: (loading: boolean) => void
  setAddressToUpdateAction: (address: AddressType) => void
  selectAddressAction?: (index: number) => void
  resetReducerDataAction: () => void
  addNewAddress: (variables: {}) => void
  updateAddress: (variables: {}) => void
  deleteAddress: (variables: {}) => void
  setSkipValueAction: (skip: number, limit: number) => void
}

class MyAddresses extends React.PureComponent<Props, {}> {
  render() {
    const {
      formatMessage,
      showAddressModal,
      showDeleteAddressConfirm,
      modalLoading,
      firstName,
      lastName,
      street,
      apartment,
      country,
      stateProvince,
      city,
      zipCode,
      phone,
      hasError,
      selectDropdownAction,
      inputChangeAction,
      defaultShipping,
      defaultBilling,
      selectAddressAction,
      resetReducerDataAction,
      addressIdToMutate,
      deleteAddress,
      hideDeleteAddressConfirmAction,
      showDeleteAddressConfirmAction,
      setAddressToUpdateAction,
      currentPage,
      skip,
      limit
    } = this.props

    const content = (
      <MyAddressesList
        {...{
          formatMessage,
          selectAddressAction,
          resetReducerDataAction,
          addressIdToMutate,
          deleteAddress,
          showDeleteAddressConfirm,
          hideDeleteAddressConfirmAction,
          showDeleteAddressConfirmAction,
          setAddressToUpdateAction,
          currentPage,
          skip
        }}
        itemsNumber={limit}
        withPagination={true}
        paginationAlignment={'start'}
        changePage={this.handlechangePage}
        listForMyAccount={true}
      />
    )

    return (
      <Container>
        <StyledEmptyButton type="danger" onClick={this.handleOnShowModal}>
          {formatMessage(messages.addAddress)}
        </StyledEmptyButton>
        {content}
        <Modal
          visible={showAddressModal}
          closable={false}
          maskClosable={false}
          okText={formatMessage(messages.saveAddress)}
          onOk={this.handleOnSaveAddress}
          confirmLoading={modalLoading}
          onCancel={this.handleOnResetData}
          destroyOnClose={true}
          width={'60%'}
        >
          <Title>{formatMessage(messages.modalTitle)}</Title>
          <ShippingAddressForm
            {...{
              firstName,
              lastName,
              street,
              apartment,
              country,
              stateProvince,
              city,
              zipCode,
              phone,
              hasError,
              selectDropdownAction,
              inputChangeAction,
              formatMessage
            }}
          />
          <div>
            <StyledCheckbox
              checked={defaultShipping}
              onChange={this.handleOnChangeDefaultShipping}
            >
              {formatMessage(messages.defaultShippingAddress)}
            </StyledCheckbox>
          </div>
          <div>
            <StyledCheckbox
              checked={defaultBilling}
              onChange={this.handleOnChangeDefaultBilling}
            >
              {formatMessage(messages.defaultBillingAddress)}
            </StyledCheckbox>
          </div>
        </Modal>
      </Container>
    )
  }

  handleOnChangeDefaultShipping = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { defaultShippingAction } = this.props
    const {
      target: { checked }
    } = event
    defaultShippingAction(checked)
  }

  handleOnChangeDefaultBilling = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { defaultBillingAction } = this.props
    const {
      target: { checked }
    } = event
    defaultBillingAction(checked)
  }

  handleOnShowModal = () => {
    const { showAddressModalAction } = this.props
    showAddressModalAction(true)
  }

  handleOnResetData = () => {
    const { resetReducerDataAction } = this.props
    resetReducerDataAction()
  }

  handlechangePage = (pageNumber: number) => {
    const { setSkipValueAction, limit } = this.props
    const skip = (pageNumber - 1) * limit

    setSkipValueAction(skip, pageNumber)
  }

  handleOnSaveAddress = () => {
    const {
      addressIdToMutate,
      firstName,
      lastName,
      street,
      apartment,
      country,
      stateProvince,
      city,
      zipCode,
      phone,
      defaultBilling,
      defaultShipping,
      setModalLoadingAction,
      resetReducerDataAction,
      validFormAction
    } = this.props
    const error =
      !firstName ||
      !lastName ||
      !street ||
      !country ||
      !stateProvince ||
      !city ||
      !zipCode ||
      !phone
    if (error) {
      validFormAction(error)
      return
    }
    const isUpdatingAddress = addressIdToMutate !== -1
    const address = {
      id: isUpdatingAddress ? addressIdToMutate : undefined,
      firstName,
      lastName,
      street,
      apartment,
      country,
      stateProvince,
      city,
      zipCode,
      phone,
      defaultBilling,
      defaultShipping
    }
    setModalLoadingAction(true)
    this.updateAddAddress(isUpdatingAddress, address)
    resetReducerDataAction()
  }

  updateAddAddress = async (
    isUpdatingAddress: boolean,
    address: AddressType
  ) => {
    const { updateAddress, addNewAddress } = this.props
    if (isUpdatingAddress) {
      await updateAddress({
        variables: { address },
        refetchQueries: [
          {
            query: GetAddressListQuery,
            variables: { limit: 10 },
            options: {
              fetchPolicy: 'network-only'
            }
          }
        ]
      })
    } else {
      await addNewAddress({
        variables: { address },
        update: (store: any, dataAddresses: AddressType) => {
          const data = store.readQuery({
            query: GetAddressListQuery,
            variables: { limit: 10, offset: 0 }
          })
          const addressesList = get(data, 'userAddresses.addresses')
          const newAddres = get(dataAddresses, 'data.userAddress')
          addressesList.push(newAddres)
          store.writeQuery({
            query: GetAddressListQuery,
            variables: { limit: 10, offset: 0 },
            data
          })
        }
      })
    }
  }
}

const mapStateToProps = (state: any) => state.get('addresses').toJS()

const MyAddressesEnhance = compose(
  addAddressMutation,
  updateAddressMutation,
  connect(
    mapStateToProps,
    { ...MyAddressesActions }
  )
)(MyAddresses)

export default MyAddressesEnhance
