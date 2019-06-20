/**
 * DiscountsAdmin Component - Created by eduardoquintero on 24/05/19.
 */
import * as React from 'react'
import { compose } from 'react-apollo'
import { connect } from 'react-redux'
import { FormattedMessage } from 'react-intl'
import * as DiscountsActions from './actions'
import message from 'antd/lib/message'
import { DISCOUNTS_LIMIT } from './constants'
import {
  Container,
  ScreenTitle,
  SearchInput,
  AddDiscountButton
} from './styledComponents'
import List from './DiscountsList'
import get from 'lodash/get'
import {
  updateDiscountMutation,
  addDiscountMutation,
  activateDiscountMutation
} from './data'
import { getDiscountsQuery } from './DiscountsList/data'
import messages from './messages'
import { sorts, Discount } from '../../types/common'
import DiscountsModal from './DiscountsModal'
import { isNumber } from '../../utils/utilsFiles'
import { Moment } from 'moment'

interface Props {
  history: any
  currentPage: number
  orderBy: string
  sort: sorts
  discountId: number
  searchText: string
  discountTypes: string[]
  couponCode: string
  discountItemId: string
  discountType: string
  rate: number
  discountActive: boolean
  discountModalOpen: boolean
  expiry: string
  loading: boolean
  formatMessage: (messageDescriptor: any) => string
  setOrderByAction: (orderBy: string, sort: sorts) => void
  setCurrentPageAction: (page: number) => void
  resetDataAction: () => void
  setDiscountIdAction: (discountId: string) => void
  setSearchTextAction: (searchText: string) => void
  setDiscountTextAction: (field: string, value: string) => void
  onSelectDiscountTypeAction: (value: string) => void
  onChangeRateAction: (value: number) => void
  onActivateDiscountAction: (checked: boolean) => void
  openDiscountModalAction: (open: boolean) => void
  resetDiscountDataAction: () => void
  setLoadingAction: (loading: boolean) => void
  updateDiscount: (variables: {}) => void
  addNewDiscount: (variables: {}) => void
  activateDiscount: (variables: {}) => void
  onSelectDateAction: (date: string) => void
  setDiscountToUpdateAction: (discount: Discount) => void
}

class DiscountsAdmin extends React.Component<Props, {}> {
  componentWillUnmount() {
    const { resetDataAction } = this.props
    resetDataAction()
  }

  render() {
    const {
      currentPage,
      orderBy,
      sort,
      formatMessage,
      searchText,
      discountTypes,
      couponCode,
      discountItemId,
      discountType,
      onSelectDiscountTypeAction,
      rate,
      onChangeRateAction,
      onActivateDiscountAction,
      discountActive,
      discountModalOpen,
      expiry,
      loading
    } = this.props

    return (
      <Container>
        <ScreenTitle>
          <FormattedMessage {...messages.title} />
        </ScreenTitle>
        <AddDiscountButton onClick={this.handleOnAddNewDiscount}>
          {formatMessage(messages.addDiscountLabel)}
        </AddDiscountButton>
        <SearchInput
          value={searchText}
          onChange={this.handleInputChange}
          placeholder={formatMessage(messages.search)}
        />
        <List
          {...{ formatMessage, currentPage, orderBy, sort, searchText }}
          onSortClick={this.handleOnSortClick}
          onDiscountClick={this.handleOnDiscountClick}
          onChangePage={this.handleOnChangePage}
          interactiveHeaders={true}
          onChangeActive={this.handleOnChangeActive}
        />
        <DiscountsModal
          open={discountModalOpen}
          requestClose={this.handleOnCloseDiscountModal}
          handleOnInputChange={this.handleOnInputChange}
          onSelectDiscountType={onSelectDiscountTypeAction}
          onChangeRate={onChangeRateAction}
          onActivateDiscount={onActivateDiscountAction}
          onSaveDiscount={this.handleOnSaveDiscount}
          onSelectDate={this.onSelectDate}
          {...{
            formatMessage,
            discountTypes,
            couponCode,
            discountItemId,
            discountType,
            rate,
            discountActive,
            expiry,
            loading
          }}
        />
      </Container>
    )
  }
  handleOnChangeActive = async (id: boolean) => {
    const {
      activateDiscount,
      orderBy,
      sort,
      searchText,
      formatMessage,
      currentPage
    } = this.props
    try {
      const offset = currentPage ? (currentPage - 1) * DISCOUNTS_LIMIT : 0
      await activateDiscount({
        variables: { id },
        refetchQueries: [
          {
            query: getDiscountsQuery,
            variables: {
              limit: DISCOUNTS_LIMIT,
              offset,
              order: orderBy,
              orderAs: sort,
              searchText
            },
            options: {
              fetchPolicy: 'network-only'
            }
          }
        ]
      })
    } catch {
      message.error(formatMessage(messages.unexpectedError))
    }
  }
  onSelectDate = (date: Moment) => {
    const { onSelectDateAction } = this.props
    onSelectDateAction(`${date.dates()}-${date.month() + 1}-${date.year()}`)
  }
  handleOnSaveDiscount = async () => {
    const {
      couponCode,
      discountItemId,
      discountType,
      rate,
      discountActive,
      setLoadingAction,
      discountId,
      expiry,
      formatMessage
    } = this.props

    const isUpdatingDiscount = discountId !== -1
    const discount = {
      id: isUpdatingDiscount ? discountId : undefined,
      code: couponCode,
      discountItemId,
      type: discountType,
      rate,
      expiry,
      active: discountActive
    }
    setLoadingAction(true)
    try {
      await this.updateAddDiscount(isUpdatingDiscount, discount)
    } catch (error) {
      message.error(formatMessage(messages.unexpectedError))
    }
  }
  updateAddDiscount = async (
    isUpdatingAddress: boolean,
    discount: Discount
  ) => {
    const {
      updateDiscount,
      addNewDiscount,
      orderBy,
      sort,
      searchText,
      currentPage,
      formatMessage,
      resetDiscountDataAction,
      openDiscountModalAction,
      setLoadingAction
    } = this.props
    let responseId: number
    if (isUpdatingAddress) {
      const offset = currentPage ? (currentPage - 1) * DISCOUNTS_LIMIT : 0
      await updateDiscount({
        variables: { discount },
        update: (store: any, dataDiscount: Discount) => {
          const newDiscount = get(dataDiscount, 'data.updateDiscount')
          responseId = newDiscount.id
          if (!responseId) {
            return
          }
          const storedData = store.readQuery({
            query: getDiscountsQuery,
            variables: {
              limit: DISCOUNTS_LIMIT,
              offset,
              order: orderBy,
              orderAs: sort,
              searchText
            }
          })
          store.writeQuery({
            query: getDiscountsQuery,
            variables: {
              limit: DISCOUNTS_LIMIT,
              offset,
              order: orderBy,
              orderAs: sort,
              searchText
            },
            data: storedData
          })
        }
      })
    } else {
      await addNewDiscount({
        variables: { discount },
        update: (store: any, dataDiscount: Discount) => {
          const newDiscount = get(dataDiscount, 'data.discount')
          responseId = newDiscount.id
          if (!responseId) {
            return
          }
          const data = store.readQuery({
            query: getDiscountsQuery,
            variables: {
              limit: DISCOUNTS_LIMIT,
              offset: 0,
              order: orderBy,
              orderAs: sort,
              searchText: ''
            }
          })
          const discountList = get(data, 'discountsQuery.discounts')
          discountList.unshift(newDiscount)
          store.writeQuery({
            query: getDiscountsQuery,
            variables: {
              limit: DISCOUNTS_LIMIT,
              offset: 0,
              order: orderBy,
              orderAs: sort,
              searchText: ''
            },
            data
          })
        }
      })
    }
    if (!responseId) {
      message.error(formatMessage(messages.alreadyExist))
      setLoadingAction(false)
      return
    }
    resetDiscountDataAction()
    openDiscountModalAction(false)
  }
  handleOnAddNewDiscount = () => {
    const { resetDiscountDataAction, openDiscountModalAction } = this.props
    resetDiscountDataAction()
    openDiscountModalAction(true)
  }
  handleOnCloseDiscountModal = () => {
    const { openDiscountModalAction } = this.props
    openDiscountModalAction(false)
  }
  handleOnInputChange = (event: any) => {
    const acceptNumbersOnly = event.target.getAttribute('data-is-number')
    const { value, id } = event.target
    const { setDiscountTextAction } = this.props
    if (acceptNumbersOnly && (!isNumber(value) && value !== '')) {
      return
    }
    setDiscountTextAction(id, value)
  }

  handleOnSortClick = (label: string, sort: sorts) => {
    const { setOrderByAction } = this.props
    setOrderByAction(label, sort)
  }

  handleOnDiscountClick = (discount: Discount) => {
    const { setDiscountToUpdateAction } = this.props
    setDiscountToUpdateAction(discount)
  }

  handleOnChangePage = (page: number) => {
    const { setCurrentPageAction } = this.props
    setCurrentPageAction(page)
  }
  handleInputChange = (evt: React.FormEvent<HTMLInputElement>) => {
    const { setSearchTextAction } = this.props
    const {
      currentTarget: { value }
    } = evt
    evt.persist()
    setSearchTextAction(value)
  }
}

const mapStateToProps = (state: any) => state.get('discountsAdmin').toJS()

const DiscountsAdminEnhance = compose(
  updateDiscountMutation,
  addDiscountMutation,
  activateDiscountMutation,
  connect(
    mapStateToProps,
    { ...DiscountsActions }
  )
)(DiscountsAdmin)

export default DiscountsAdminEnhance
