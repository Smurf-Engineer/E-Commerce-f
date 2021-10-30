/**
 * Shippping Component - Created by cazarez on 07/05/18.
 */

// TODO: REMOVE COMENTED CODE AFTER TEST
import * as React from 'react'
import zenscroll from 'zenscroll'
import AnimateHeight from 'react-animate-height'
// import Modal from 'antd/lib/modal'

import messages from './messages'
// TODO uncomment ViewAllAddresses when flow for addresses modal gets defined
import { Container, Title /* ViewAllAddresses */ } from './styledComponents'

import MyAddresses from '../MyAddressesList'
import ShippingAddressForm from '../ShippingAddressForm'

import { AddressType, ClickParam } from '../../types/common'
import ReactDOM from 'react-dom'

interface Props {
  shippingAddress: AddressType
  hasError: boolean
  showForm: boolean
  indexAddressSelected: number
  showContent: boolean
  skip: number
  limit: number
  currentPage: number
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
  private listRef: any

  showAddressForm = (show: boolean) => {
    const { showAddressFormAction } = this.props
    showAddressFormAction(show)
    setTimeout(() => this.scrollBotom(), 700)
  }

  scrollBotom = () => {
    if (window) {
      const node = ReactDOM.findDOMNode(this.listRef) as HTMLElement
      zenscroll.center(node, 250)
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
      selectDropdownAction,
      inputChangeAction,
      setSelectedAddress,
      indexAddressSelected,
      buttonToRender,
      // openAddressesModal,
      skip,
      currentPage
    } = this.props

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
          formatMessage={formatMessage}
          itemsNumber={adressesToShow}
          selectAddressAction={setSelectedAddress}
          renderForModal={renderInModal}
          changePage={this.handlechangePage}
          listForMyAccount={false}
          showAddressFormAction={this.showAddressForm}
          shipping={true}
          {...{
            withPagination,
            showForm,
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
        <AnimateHeight
          ref={(listObject: any) => {
            this.listRef = listObject
          }}
          duration={500}
          height={showForm ? 'auto' : 0}
        >
          <Title>
            {formatMessage(messages.title)}
          </Title>
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
              hasError,
              selectDropdownAction,
              inputChangeAction,
              formatMessage
            }}
          />
        </AnimateHeight>
        {/* TODO: uncomment if needed {shippingMethod} */}
        {buttonToRender}
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
