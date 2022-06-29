/**
 * Shippping Component - Created by cazarez on 07/05/18.
 */

// TODO: REMOVE COMENTED CODE AFTER TEST
import * as React from 'react'
// import Modal from 'antd/lib/modal'

import messages from './messages'
// TODO uncomment ViewAllAddresses when flow for addresses modal gets defined
import { Container, modalStyle, Title /* ViewAllAddresses */ } from './styledComponents'

import MyAddresses from '../MyAddressesList'
import ShippingAddressForm from '../ShippingAddressForm'

import { AddressType, ClickParam } from '../../types/common'
import Modal from 'antd/lib/modal'
import message from 'antd/lib/message'
import { isApoCity, isNumberValue, isPoBox, isValidCity, isValidZip } from '../../utils/utilsAddressValidation'
import { PHONE_MINIMUM, PHONE_MINIMUM_NOR } from '../../constants'

interface Props {
  shippingAddress: AddressType
  hasError: boolean
  showForm: boolean
  indexAddressSelected: number
  showContent: boolean
  skip: number
  limit: number
  currentPage: number
  multiButtons?: boolean
  nextStep: () => void
  updateAddress: (variables: {}) => void
  setAddressEdit: (address: AddressType | {}) => void
  formatMessage: (messageDescriptor: any) => string
  selectDropdownAction: (id: string, value: string) => void
  inputChangeAction: (id: string, value: string) => void
  smsCheckAction: (checked: boolean) => void
  emailCheckAction: (checked: boolean) => void
  showAddressFormAction: (show: boolean) => void
  setSelectedAddress: (address: AddressType, indexAddress: number) => void
  openAddressesModalAction: (open: boolean) => void
  setSkipValueAction: (skip: number, currentPage: number) => void
  buttonToRender: React.ReactNode
  openAddressesModal: boolean
}

export class Shipping extends React.PureComponent<Props, {}> {
  state = {
    addressIdToMutate: -1,
    showDeleteAddressConfirm: false,
    showAddressModal: false,
    modalLoading: false,
    hasError: false
  }
  private addressListRef: any
  showAddressForm = (show: boolean) => {
    const { showAddressFormAction } = this.props
    showAddressFormAction(show)
  }

  setAddressToUpdateAction = (address: AddressType) => {
    const { setAddressEdit } = this.props
    const { id } = address || {}
    this.setState({ addressIdToMutate: id, showAddressModal: true })
    setAddressEdit(address)
  }

  saveNewAddress = () => {
    const { nextStep } = this.props
    this.setState({ showAddressModal: false, modalLoading: false, addressIdToMutate: -1 })
    nextStep()
  }

  handleOnResetData = () => {
    const { setAddressEdit, showAddressFormAction } = this.props
    setAddressEdit({})
    this.setState({
      showAddressModal: false,
      modalLoading: false,
      addressIdToMutate: -1,
      showDeleteAddressConfirm: false
    })
    showAddressFormAction(false)
  }

  showDeleteAddressConfirmAction = (index: number) => {
    this.setState({ showDeleteAddressConfirm: true, addressIdToMutate: index })
  }

  hideDeleteAddressConfirmAction = () => {
    this.setState({ showDeleteAddressConfirm: false, addressIdToMutate: -1 })
  }

  handleOnSaveAddress = async () => {
    const {
      shippingAddress: {
        firstName,
        lastName,
        street,
        apartment,
        country,
        stateProvince,
        stateProvinceCode,
        city,
        zipCode,
        phone,
        defaultBilling,
        defaultShipping,
      },
      formatMessage
    } = this.props
    const { addressIdToMutate } = this.state
    if (addressIdToMutate !== -1) {
      const error =
      !firstName ||
      !lastName ||
      !street ||
      !country ||
      !stateProvince ||
      !stateProvinceCode ||
      !city ||
      !zipCode ||
      !phone ||
      (isPoBox(street) && defaultShipping) ||
      isApoCity(city)

      if (!isValidCity(city) || isNumberValue(city)) {
        message.error(formatMessage(messages.invalidCity))
        return
      }

      if (!isValidZip(zipCode)) {
        message.error(formatMessage(messages.invalidZip))
        return
      }

      if (
        !phone || (phone && 
          (phone.length < PHONE_MINIMUM) ||
          (phone.startsWith('47') && phone.length < PHONE_MINIMUM_NOR)
        )
      ) {
        message.error(
          formatMessage(messages.invalidPhone, {
            phone_length:
              phone && phone.startsWith('47') ? PHONE_MINIMUM_NOR : PHONE_MINIMUM,
          })
        )
        return
      }

      if (error) {
        this.setState({ hasError: error })
        return
      }

      const address = {
        id: addressIdToMutate,
        firstName,
        lastName,
        street,
        apartment,
        country,
        stateProvince,
        stateProvinceCode,
        city,
        zipCode: zipCode.trim(),
        phone,
        defaultBilling,
        defaultShipping
      }
      this.setState({ modalLoading: true })
      await this.updateAddAddress(address)
      this.handleOnResetData()
    }
  }

  updateAddAddress = async (address: AddressType) => {
    const { updateAddress } = this.props
    await updateAddress({ variables: { address } })
    if (this.addressListRef && this.addressListRef.getWrappedInstance) {
      const wrapper = this.addressListRef.getWrappedInstance()
      const editButton = wrapper.getWrappedInstance()
      await editButton.reloadAddress()
    }
  }

  render() {
    const {
      showContent,
      shippingAddress: {
        firstName,
        lastName,
        street,
        apartment,
        country,
        stateProvince,
        stateProvinceCode,
        city,
        zipCode,
        phone
      },
      hasError,
      formatMessage,
      showForm,
      multiButtons,
      selectDropdownAction,
      inputChangeAction,
      setSelectedAddress,
      indexAddressSelected,
      buttonToRender,
      // openAddressesModal,
      skip,
      currentPage
    } = this.props

    const {
      showDeleteAddressConfirm,
      hasError: hasErrorState,
      addressIdToMutate,
      showAddressModal,
      modalLoading
    } = this.state

    if (!showContent) {
      return <div />
    }

    // TODO: uncomment when needed
    // const shippingMethod = (
    //   <ShippingMethodContainer>
    //     <Title>{'Shipping Method'}</Title>
    //     <ShippinPriorityText>
    //       {
    //         '$27.94 - FedEx International Priority® *All orders are shipped within 2 weeks'
    //       }
    //     </ShippinPriorityText>
    //     <div>
    //       <StyledCheckbox onChange={this.handleEmailCheck}>
    //         {'Send me Shipment updates via email'}
    //       </StyledCheckbox>
    //     </div>
    //     <div>
    //       <StyledCheckbox onChange={this.handleSmsCheck}>
    //         {'Send me Shipment updates via SMS'}
    //       </StyledCheckbox>
    //     </div>
    //   </ShippingMethodContainer>
    // )

    // TODO: UNCOMENT WHEN FLOW FOR ADDRESSES GETS PROPERLY DEFINED
    // let addressesToShow = undefined
    // if (typeof window !== 'undefined') {
    //   addressesToShow = window.matchMedia('(max-width: 768px)').matches ? 2 : 4
    // }

    const renderAddresses = (
      adressesToShow?: number | null,
      renderInModal?: boolean,
      withPagination = false
    ) => {
      return (
        <MyAddresses
          ref={(addressListRef: any) => {
            this.addressListRef = addressListRef
          }}
          formatMessage={formatMessage}
          itemsNumber={adressesToShow}
          selectAddressAction={setSelectedAddress}
          renderForModal={renderInModal}
          changePage={this.handlechangePage}
          listForMyAccount={false}
          hideDeleteAddressConfirmAction={this.hideDeleteAddressConfirmAction}
          showDeleteAddressConfirmAction={this.showDeleteAddressConfirmAction}
          resetReducerDataAction={this.handleOnResetData}
          setAddressToUpdateAction={this.setAddressToUpdateAction}
          showAddressFormAction={this.showAddressForm}
          shipping={true}
          {...{
            withPagination,
            showForm,
            showDeleteAddressConfirm,
            showAddressModal,
            addressIdToMutate,
            multiButtons,
            indexAddressSelected,
            currentPage,
            skip
          }}
        />
      )
    }

    return (
      <Container>
        {/* TODO: uncomment when verify if needed 
        <Modal
          visible={openAddressesModal}
          closable={false}
          onCancel={this.handleOpenModalAddresses}
          width={1000}
        >
          {renderAddresses(10, true, true)}
        </Modal> */}
        {/* TODO: UNCOMMENT UNTIL FLOW GETS PROPERLY DEFINED
        <ViewAllAddresses onClick={this.handleOpenModalAddresses}>
          {formatMessage(messages.seeAllAddressesLabel)}
          <Icon type="right" />
        </ViewAllAddresses> */}
        {renderAddresses(4, false, false)}
        {/* TODO: uncomment if needed {shippingMethod} */}
        {buttonToRender}
        <Modal
          visible={showAddressModal || showForm}
          closable={false}
          maskClosable={false}
          okText={formatMessage(messages.saveAddress)}
          onOk={showForm && !showAddressModal ? this.saveNewAddress : this.handleOnSaveAddress}
          confirmLoading={modalLoading}
          style={modalStyle}
          onCancel={this.handleOnResetData}
          destroyOnClose={true}
          width="864px"
        >
          <Title>{formatMessage(messages.title)}</Title>
          <ShippingAddressForm
            {...{
              firstName,
              lastName,
              street,
              apartment,
              country,
              stateProvince,
              stateProvinceCode,
              city,
              zipCode,
              phone,
              selectDropdownAction,
              inputChangeAction,
              formatMessage
            }}
            hasError={hasError || hasErrorState}
          />
        </Modal>
      </Container>
    )
  }

  selectedDropDown = (param: ClickParam) => {
    const { selectDropdownAction } = this.props
    const {
      key,
      item: {
        props: { id }
      }
    } = param

    selectDropdownAction(id, key)
  }

  handleSmsCheck = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { smsCheckAction } = this.props
    const {
      target: { checked }
    } = evt

    smsCheckAction(checked)
  }

  handleEmailCheck = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { emailCheckAction } = this.props
    const {
      target: { checked }
    } = evt

    emailCheckAction(checked)
  }

  handleOpenModalAddresses = () => {
    const { openAddressesModalAction, openAddressesModal } = this.props

    openAddressesModalAction(!openAddressesModal)
  }

  handlechangePage = (pageNumber: number) => {
    const { setSkipValueAction, limit } = this.props
    const skip = (pageNumber - 1) * limit
    setSkipValueAction(skip, pageNumber)
  }
}
export default Shipping
