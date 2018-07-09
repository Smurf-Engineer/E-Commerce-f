/**
 * MyAddresses Component - Created by miguelcanobbio on 14/05/18.
 */
import * as React from 'react'
import { graphql, compose } from 'react-apollo'
import { connect } from 'react-redux'
import Modal from 'antd/lib/modal'
import * as MyAddressesActions from './actions'
import withError from '../../components/WithError'
import withLoading from '../../components/WithLoading'
import MyAddressesList from '../../components/MyAddressesList'
import ShippingAddressForm from '../../components/ShippingAddressForm'
import {
  Container,
  Message,
  StyledEmptyButton,
  Title,
  StyledCheckbox,
  DeleteConfirmMessage
} from './styledComponents'
import { QueryProps, AddressType } from '../../types/common'
import messages from './messages'
import {
  addresesQuery,
  addAddressMutation,
  updateAddressMutation,
  deleteAddressMutation
} from './data'
import ModalFooter from '../ModalFooter'
import ModalTitle from '../ModalTitle'

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
}

class MyAddresses extends React.PureComponent<Props, {}> {
  render() {
    const {
      data: { addresses },
      formatMessage,
      showAddressModal,
      showDeleteAddressConfirm,
      modalLoading,
      deleteLoading,
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
      selectAddressAction
    } = this.props
    const content = addresses.length ? (
      <MyAddressesList
        {...{ formatMessage, selectAddressAction }}
        items={addresses}
        showAddressFormAction={this.handleOnEditAddress}
        showConfirmDeleteAction={this.handleOnShowDeleteAddressConfirm}
        listForMyAccount={true}
      />
    ) : (
      <Message>{formatMessage(messages.emptyMessage)}</Message>
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
              inputChangeAction
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
        <Modal
          visible={showDeleteAddressConfirm}
          title={
            <ModalTitle title={formatMessage(messages.titleDeleteModal)} />
          }
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

  handleOnShowDeleteAddressConfirm = (index: number) => {
    const {
      showDeleteAddressConfirmAction,
      data: { addresses }
    } = this.props
    const addressId = addresses[index].id
    showDeleteAddressConfirmAction(addressId as number)
  }

  handleOnHideDeleteAddressConfirm = () => {
    const { hideDeleteAddressConfirmAction } = this.props
    hideDeleteAddressConfirmAction()
  }

  handleOnDeleteAddress = async () => {
    const {
      data: { refetch },
      addressIdToMutate,
      deleteAddress,
      setDeleteLoadingAction,
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
      data: { addresses },
      setAddressToUpdateAction
    } = this.props
    setAddressToUpdateAction(addresses[addressIndex])
  }

  handleOnSaveAddress = async () => {
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
      addNewAddress,
      updateAddress,
      data: { refetch },
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
    isUpdatingAddress
      ? await updateAddress({ variables: { address } })
      : await addNewAddress({ variables: { address } })
    resetReducerDataAction()
    refetch()
  }
}

const mapStateToProps = (state: any) => state.get('addresses').toJS()

const MyAddressesEnhance = compose(
  graphql(addresesQuery, {
    options: {
      fetchPolicy: 'network-only'
    }
  }),
  withLoading,
  withError,
  addAddressMutation,
  updateAddressMutation,
  deleteAddressMutation,
  connect(
    mapStateToProps,
    { ...MyAddressesActions }
  )
)(MyAddresses)

export default MyAddressesEnhance
