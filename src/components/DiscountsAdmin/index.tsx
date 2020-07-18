/**
 * DiscountsAdmin Component - Created by eduardoquintero on 24/05/19.
 */
import * as React from 'react'
import { compose, QueryProps, graphql } from 'react-apollo'
import { connect } from 'react-redux'
import { FormattedMessage } from 'react-intl'
import * as DiscountsActions from './actions'
import SwipeableViews from 'react-swipeable-views'
import message from 'antd/lib/message'
import { DISCOUNTS_LIMIT, EDIT } from './constants'
import {
  Container,
  ScreenTitle,
  SearchInput,
  AddDiscountButton
} from './styledComponents'
import List from './DiscountsList'
import get from 'lodash/get'
import {
  upsertDiscountMutation,
  activateDiscountMutation,
  getUsers,
  getDesignSearchCode
} from './data'
import { getDiscountsQuery } from './DiscountsList/data'
import messages from './messages'
import {
  sorts,
  Discount,
  UserSearchResult,
  SelectedDesignObjectType,
  UserDiscount,
  UserPermissions,
  HiddenSymbols,
  DesignSearchCode
} from '../../types/common'
import DiscountsData from './DiscountsData'
import { isNumber } from '../../utils/utilsFiles'
import { Moment } from 'moment'
import { DISCOUNTS, ADMIN_ROUTE } from '../AdminLayout/constants'

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
  expiry: string
  loading: boolean
  restrictionType: HiddenSymbols
  permissions: UserPermissions
  selectedItems: SelectedDesignObjectType
  users: Data
  designs: DesignsData
  user: string
  discountPage: number
  selectedUsers: []
  usageNumber: number
  unlimitedUsage: boolean
  selectedProducts: string[]
  design: string
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
  resetDiscountDataAction: () => void
  setLoadingAction: (loading: boolean) => void
  upsertDiscount: (variables: {}) => void
  activateDiscount: (variables: {}) => void
  onSelectDateAction: (date: string) => void
  setDiscountToUpdateAction: (discount: Discount) => void
  selectRestrictionAction: (restriction: HiddenSymbols) => void
  onChangeInputAction: (key: string, value: string) => void
  onAddDesignAction: (design: DesignSearchCode) => void
  deleteItemSelectedAction: (index: number, section: string) => void
  onAddUserAction: (user: UserDiscount) => void
  setDiscountPageAction: (page: number) => void
  onChangeUsageAction: (value: number) => void
  onCheckUsageAction: (checked: boolean) => void
}

interface Data extends QueryProps {
  userSearch: UserSearchResult[]
}

interface DesignsData extends QueryProps {
  getDesignSearchCode: DesignSearchCode[]
}

class DiscountsAdmin extends React.Component<Props, {}> {
  componentWillUnmount() {
    const { resetDataAction } = this.props
    resetDataAction()
  }

  getUsersSearchResults = () => {
    const { users = { loading: true } } = this.props
    let usersResults
    if (!users.loading) {
      usersResults = users.userSearch.map((item: UserSearchResult) => {
        const text = `${item.id} - ${item.name} - ${item.email}`
        const value = item.shortId

        return {
          text,
          value,
          email: item.email,
          netsuiteId: item.id,
          name: item.name
        }
      })
    }
    return usersResults
  }

  getProductsSearchResults = () => {
    const { designs } = this.props
    let designsResults

    if (designs && !designs.loading) {
      designsResults = designs.getDesignSearchCode.map(
        (item: DesignSearchCode) => {
          return {
            key: item.id,
            shortId: item.shortId,
            value: item.code,
            text: item.code,
            name: item.name,
            image: item.image
          }
        }
      )
    }
    return designsResults
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
      expiry,
      loading,
      permissions,
      history,
      restrictionType,
      onChangeInputAction,
      onAddDesignAction,
      deleteItemSelectedAction,
      user,
      discountPage,
      selectedUsers = [],
      onAddUserAction,
      onChangeUsageAction,
      usageNumber,
      onCheckUsageAction,
      unlimitedUsage,
      selectedProducts,
      design
    } = this.props
    const access = permissions[DISCOUNTS] || {}
    if (!access.view) {
      history.replace(ADMIN_ROUTE)
    }

    const searchResults = restrictionType.users
      ? this.getUsersSearchResults()
      : []
    const searchResultsProducts = restrictionType.design
      ? this.getProductsSearchResults()
      : []
    return (
      <SwipeableViews
        onChangeIndex={this.handleOnChangeIndex}
        index={discountPage}
      >
        <Container>
          <ScreenTitle>
            <FormattedMessage {...messages.title} />
          </ScreenTitle>
          {access.edit && (
            <AddDiscountButton onClick={this.handleOnAddNewDiscount}>
              {formatMessage(messages.addDiscountLabel)}
            </AddDiscountButton>
          )}
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
            canEdit={access.edit}
            onChangeActive={this.handleOnChangeActive}
          />
        </Container>
        <DiscountsData
          goBack={this.goToDiscountsList}
          handleOnInputChange={this.handleOnInputChange}
          onSelectDiscountType={onSelectDiscountTypeAction}
          onChangeRate={onChangeRateAction}
          onActivateDiscount={onActivateDiscountAction}
          onSaveDiscount={this.handleOnSaveDiscount}
          onSelectDate={this.onSelectDate}
          onSelectRestriction={this.handleOnSelectRestriction}
          handleOnChange={onChangeInputAction}
          onAddDesign={onAddDesignAction}
          onDeleteItem={deleteItemSelectedAction}
          onAddUser={onAddUserAction}
          onChangeUsage={onChangeUsageAction}
          onCheckUsage={onCheckUsageAction}
          {...{
            formatMessage,
            discountTypes,
            couponCode,
            discountItemId,
            discountType,
            rate,
            discountActive,
            expiry,
            loading,
            restrictionType,
            searchResultsProducts,
            searchResults,
            user,
            selectedUsers,
            usageNumber,
            unlimitedUsage,
            selectedProducts,
            design
          }}
        />
      </SwipeableViews>
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
  goToDiscountsList = () => {
    this.handleOnChangeIndex(0)
  }
  handleOnChangeIndex = (index: number) => {
    const { resetDiscountDataAction } = this.props
    if (index === 0) {
      resetDiscountDataAction()
    }
  }
  handleOnSelectRestriction = (restriction: string) => () => {
    const { selectRestrictionAction, restrictionType } = this.props
    restrictionType[restriction] = !restrictionType[restriction]
    selectRestrictionAction(restrictionType)
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
      formatMessage,
      restrictionType,
      selectedProducts,
      selectedUsers,
      usageNumber,
      unlimitedUsage
    } = this.props

    const usersIds = selectedUsers.map((user) => user.value)
    const restrictArray = Object.keys(restrictionType).filter(
      (type: string) => restrictionType[type]
    )

    const items = selectedProducts.map((item) => item.shortId)
    const restrictions = restrictArray.join(',')
    const isUpdatingDiscount = discountId !== -1
    const discount = {
      id: isUpdatingDiscount ? discountId : undefined,
      code: couponCode,
      discountItemId,
      type: discountType,
      rate,
      expiry,
      active: discountActive,
      restrictionType: restrictions,
      selectedUsers: usersIds,
      items,
      usageNumber: !unlimitedUsage ? usageNumber : 0
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
      upsertDiscount,
      orderBy,
      sort,
      searchText,
      currentPage,
      formatMessage,
      resetDiscountDataAction,
      setLoadingAction
    } = this.props
    let responseId: number
    if (isUpdatingAddress) {
      const offset = currentPage ? (currentPage - 1) * DISCOUNTS_LIMIT : 0
      await upsertDiscount({
        variables: { discount },
        update: (store: any, dataDiscount: Discount) => {
          const newDiscount = get(dataDiscount, 'data.discount')
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
      await upsertDiscount({
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
  }
  handleOnAddNewDiscount = () => {
    const { resetDiscountDataAction, setDiscountPageAction } = this.props
    resetDiscountDataAction()
    setDiscountPageAction(EDIT)
  }

  handleOnInputChange = (event: any) => {
    const acceptNumbersOnly = event.target.getAttribute('data-is-number')
    const { value, id } = event.target
    const { setDiscountTextAction } = this.props
    if (acceptNumbersOnly && !isNumber(value) && value !== '') {
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

type OwnProps = {
  user?: string
  design?: string
}

const DiscountsAdminEnhance = compose(
  upsertDiscountMutation,
  activateDiscountMutation,
  connect(
    mapStateToProps,
    { ...DiscountsActions }
  ),
  graphql<Data>(getUsers, {
    options: (ownprops: OwnProps) => {
      const { user } = ownprops
      return {
        variables: {
          pattern: user
        },
        skip: !user,
        fetchPolicy: 'network-only'
      }
    },
    name: 'users'
  }),
  graphql<Data>(getDesignSearchCode, {
    options: (ownprops: OwnProps) => {
      const { design = '' } = ownprops
      const pattern = design.trim()
      return {
        variables: {
          pattern
        },
        skip: !design || design.length < 5,
        fetchPolicy: 'network-only'
      }
    },
    name: 'designs'
  })
)(DiscountsAdmin)

export default DiscountsAdminEnhance
