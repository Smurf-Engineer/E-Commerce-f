/**
 * DiscountsAdmin Test - Created by eduardoquintero on 29/11/19.
 */
import discountsAdminReducer, { initialState } from './reducer'

import {
  setOrderByAction,
  setCurrentPageAction,
  setDiscountIdAction,
  setSearchTextAction,
  setDiscountTextAction,
  onSelectDiscountTypeAction,
  onChangeRateAction,
  onActivateDiscountAction,
  setLoadingAction,
  onSelectDateAction,
  setDiscountToUpdateAction,
  selectRestrictionAction,
  onChangeInputAction,
  onAddDesignAction,
  deleteItemSelectedAction,
  onAddUserAction,
  setDiscountPageAction,
  onChangeUsageAction,
  onCheckUsageAction
} from './actions'
import {
  SET_ORDER_BY,
  SET_CURRENT_PAGE,
  SET_DISCOUNT_ID,
  SET_SEARCH_TEXT,
  SET_LOADING,
  SET_DISCOUNT_TEXT,
  ON_SELECT_DISCOUNT_TYPE,
  ON_CHANGE_RATE,
  ON_ACTIVATE_DISCOUNT,
  ON_SELECT_DATE,
  SET_DISCOUNT_TO_UPDATE,
  SELECT_RESTRICTION,
  ON_CHANGE_INPUT,
  ON_ADD_PRODUCT,
  DELETE_ITEM_SELECTED_ACTION,
  ON_ADD_USER,
  SET_DISCOUNT_PAGE,
  ON_CHANGE_USAGE,
  ON_CHECK_USAGE
} from './constants'
import { Discount, UserDiscount } from '../../types/common'

describe(' DiscountsAdmin Screen', () => {
  describe('Actions', () => {
    it('setOrderByAction', () => {
      const type = SET_ORDER_BY
      const orderBy = 'id'
      const sort = 'asc'
      expect(setOrderByAction(orderBy, sort)).toEqual({
        type,
        orderBy,
        sort
      })
    })
    it('setCurrentPageAction', () => {
      const type = SET_CURRENT_PAGE
      const page = 2
      expect(setCurrentPageAction(page)).toEqual({
        type,
        page
      })
    })
    it('setDiscountIdAction', () => {
      const type = SET_DISCOUNT_ID
      const discountId = ''
      expect(setDiscountIdAction(discountId)).toEqual({
        type,
        discountId
      })
    })
    it('setSearchTextAction', () => {
      const type = SET_SEARCH_TEXT
      const searchText = 'SEARCH TEXT'
      expect(setSearchTextAction(searchText)).toEqual({
        type,
        searchText
      })
    })
    it('setLoadingAction', () => {
      const type = SET_LOADING
      const loading = true
      expect(setLoadingAction(loading)).toEqual({
        type,
        loading
      })
    })
    it('setDiscountTextAction', () => {
      const type = SET_DISCOUNT_TEXT
      const field = 'discount'
      const value = 'hello'
      expect(setDiscountTextAction(field, value)).toEqual({
        type,
        field,
        value
      })
    })
    it('onSelectDiscountTypeAction', () => {
      const type = ON_SELECT_DISCOUNT_TYPE
      const value = 'hello'
      expect(onSelectDiscountTypeAction(value)).toEqual({
        type,
        value
      })
    })
    it('onChangeRateAction', () => {
      const type = ON_CHANGE_RATE
      const value = 1
      expect(onChangeRateAction(value)).toEqual({
        type,
        value
      })
    })
    it('onActivateDiscountAction', () => {
      const type = ON_ACTIVATE_DISCOUNT
      const checked = true
      expect(onActivateDiscountAction(checked)).toEqual({
        type,
        checked
      })
    })
    it('onSelectDateAction', () => {
      const type = ON_SELECT_DATE
      const date = ''
      expect(onSelectDateAction(date)).toEqual({
        type,
        date
      })
    })
    it('setDiscountToUpdateAction', () => {
      const type = SET_DISCOUNT_TO_UPDATE
      const discount: Discount = {
        code: '',
        discountItemId: '',
        type: '',
        rate: 1,
        expiry: '',
        user: '',
        restrictionType: 'usage',
        selectedProducts: [],
        selectedUsers: [],
        usageNumber: 0
      }
      expect(setDiscountToUpdateAction(discount)).toEqual({
        type,
        discount
      })
    })
    it('selectRestrictionAction', () => {
      const type = SELECT_RESTRICTION
      const restriction = ''
      expect(selectRestrictionAction(restriction)).toEqual({
        type,
        restriction
      })
    })
    it('onChangeInputAction', () => {
      const type = ON_CHANGE_INPUT
      const key = ''
      const value = ''
      expect(onChangeInputAction(key, value)).toEqual({
        type,
        key,
        value
      })
    })
    it('onAddDesignAction', () => {
      const type = ON_ADD_PRODUCT
      const design = {
        code: '',
        image: '',
        name: ''
      }
      expect(onAddDesignAction(design)).toEqual({
        type,
        design
      })
    })
    it('deleteItemSelectedAction', () => {
      const type = DELETE_ITEM_SELECTED_ACTION
      const index = 1
      const section = ''
      expect(deleteItemSelectedAction(index, section)).toEqual({
        type,
        index,
        section
      })
    })
    it('onAddUserAction', () => {
      const type = ON_ADD_USER
      const user: UserDiscount = {
        text: '',
        value: '',
        email: '',
        netsuiteId: '',
        name: ''
      }
      expect(onAddUserAction(user)).toEqual({
        type,
        user
      })
    })
    it('setDiscountPageAction', () => {
      const type = SET_DISCOUNT_PAGE
      const page = 1
      expect(setDiscountPageAction(page)).toEqual({
        type,
        page
      })
    })
    it('onChangeUsageAction', () => {
      const type = ON_CHANGE_USAGE
      const value = 1
      expect(onChangeUsageAction(value)).toEqual({
        type,
        value
      })
    })
    it('onCheckUsageAction', () => {
      const type = ON_CHECK_USAGE
      const checked = true
      expect(onCheckUsageAction(checked)).toEqual({
        type,
        checked
      })
    })
  })
  describe('Reducer', () => {
    describe('INITIAL_STATE', () => {
      it('Should not have initial state undefined', () => {
        expect(initialState).toBeDefined()
      })
      it('Return the default state for unknow action', () => {
        let state = discountsAdminReducer(initialState, { type: 'unknow' })
        expect(state).toEqual(initialState)
      })
    })
    describe('SET_ORDER_BY', () => {
      describe('Order Table By', () => {
        it('Handles undefined value in orderBy', () => {
          const customInitialValue = initialState.get('orderBy')
          expect(customInitialValue).not.toBeUndefined()
        })
        it('Handles value type orderBy', () => {
          const customInitialValue = initialState.get('orderBy')
          expect(typeof customInitialValue).toBe('string')
        })
        it('Handles initial value in orderBy', () => {
          const customInitialValue = initialState.get('orderBy')
          expect(customInitialValue).toBe('id')
        })
        it('Handles values in orderBy and sort', () => {
          const orderByState = discountsAdminReducer(
            initialState,
            setOrderByAction('id', 'desc')
          )

          const customSortValue = orderByState.get('sort')
          expect(customSortValue).toBe('desc')

          const customOrderByValue = orderByState.get('orderBy')
          expect(customOrderByValue).toBe('id')
        })
      })
      describe('Sort property', () => {
        it('Handles undefined value in sort', () => {
          const customInitialValue = initialState.get('sort')
          expect(customInitialValue).not.toBeUndefined()
        })
        it('Handles value type in sort', () => {
          const customInitialValue = initialState.get('sort')
          expect(typeof customInitialValue).toBe('string')
        })
        it('Handles initial value in sort', () => {
          const customInitialValue = initialState.get('sort')
          expect(customInitialValue).toBe('desc')
        })
      })
    })
    describe('SET_CURRENT_PAGE', () => {
      describe('Current page', () => {
        it('Handles undefined value in currentPage', () => {
          const customInitialValue = initialState.get('currentPage')
          expect(customInitialValue).not.toBeUndefined()
        })
        it('Handles value type in currentPage', () => {
          const customInitialValue = initialState.get('currentPage')
          expect(typeof customInitialValue).toBe('number')
        })
        it('Handles initial value in currentPage', () => {
          const customInitialValue = initialState.get('currentPage')
          expect(customInitialValue).toBe(1)
        })
        it('Handles custom value in currentPage', () => {
          const currentPageState = discountsAdminReducer(
            initialState,
            setCurrentPageAction(2)
          )
          const customPageValue = currentPageState.get('currentPage')
          expect(customPageValue).toBe(2)
        })
      })
    })
    describe('SET_SEARCH_TEXT', () => {
      describe('Search text', () => {
        it('Handles undefined value in currentPage', () => {
          const customInitialValue = initialState.get('searchText')
          expect(customInitialValue).not.toBeUndefined()
        })
        it('Handles value type in searchText', () => {
          const customInitialValue = initialState.get('searchText')
          expect(typeof customInitialValue).toBe('string')
        })
        it('Handles initial value in searchText', () => {
          const customInitialValue = initialState.get('searchText')
          expect(customInitialValue).toBe('')
        })
        it('Handles custom value in searchText', () => {
          const searchTextState = discountsAdminReducer(
            initialState,
            setSearchTextAction('VALUE')
          )
          const customSearchValue = searchTextState.get('searchText')
          expect(customSearchValue).toBe('VALUE')
        })
      })
    })
    describe('SET_LOADING', () => {
      describe('Loading', () => {
        it('Handles undefined value in loading', () => {
          const customInitialValue = initialState.get('loading')
          expect(customInitialValue).not.toBeUndefined()
        })
        it('Handles value type in loading', () => {
          const customInitialValue = initialState.get('loading')
          expect(typeof customInitialValue).toBe('boolean')
        })
        it('Handles initial value in loading', () => {
          const customInitialValue = initialState.get('loading')
          expect(customInitialValue).toBeFalsy()
        })
        it('Handles custom value in loading', () => {
          const loadingState = discountsAdminReducer(
            initialState,
            setLoadingAction(true)
          )
          const customLoadingValue = loadingState.get('loading')
          expect(customLoadingValue).toBeTruthy()
        })
      })
    })
    describe('SET_DISCOUNT_TEXT', () => {
      describe('Update discount text', () => {
        it('Handles undefined value in discount text', () => {
          const customInitialValue = initialState.get('couponCode')
          expect(customInitialValue).not.toBeUndefined()
        })
        it('Handles value type in discount text', () => {
          const customInitialValue = initialState.get('couponCode')
          expect(typeof customInitialValue).toBe('string')
        })
        it('Handles initial value in discount text', () => {
          const customInitialValue = initialState.get('couponCode')
          expect(customInitialValue).toBe('')
        })
        it('Handles custom values in discount text', () => {
          const field = 'couponCode'
          const customValue = 'NAME'
          const nameState = discountsAdminReducer(
            initialState,
            setDiscountTextAction(field, customValue)
          )
          const customNameValue = nameState.get('couponCode')
          expect(customNameValue).toBe(customValue)
        })
      })
    })
    describe('ON_SELECT_DISCOUNT_TYPE', () => {
      describe('Update discountType', () => {
        it('Handles undefined value in discountType', () => {
          const customInitialValue = initialState.get('discountType')
          expect(customInitialValue).not.toBeUndefined()
        })
        it('Handles init value in discountType', () => {
          const customInitialValue = initialState.get('discountType')
          expect(customInitialValue).toBe('%')
        })
        it('Handles value type in discountType', () => {
          const customInitialValue = initialState.get('discountType')
          expect(typeof customInitialValue).toBe('string')
        })
        it('Handles custom values in discount text', () => {
          const customValue = 'flat'
          const customState = discountsAdminReducer(
            initialState,
            onSelectDiscountTypeAction(customValue)
          )
          const customNameValue = customState.get('discountType')
          expect(customNameValue).toBe(customValue)
        })
      })
    })
    describe('ON_CHANGE_RATE', () => {
      describe('Update rate', () => {
        it('Handles undefined value in rate', () => {
          const customInitialValue = initialState.get('rate')
          expect(customInitialValue).not.toBeUndefined()
        })
        it('Handles init value in rate', () => {
          const customInitialValue = initialState.get('rate')
          expect(customInitialValue).toBe(1)
        })
        it('Handles value type in rate', () => {
          const customInitialValue = initialState.get('rate')
          expect(typeof customInitialValue).toBe('number')
        })
        it('Handles custom values in rate', () => {
          const customValue = 5
          const customState = discountsAdminReducer(
            initialState,
            onChangeRateAction(customValue)
          )
          const customNameValue = customState.get('rate')
          expect(customNameValue).toBe(customValue)
        })
      })
    })
    describe('ON_ACTIVATE_DISCOUNT', () => {
      describe('Update discountActive', () => {
        it('Handles undefined value in discountActive', () => {
          const customInitialValue = initialState.get('discountActive')
          expect(customInitialValue).not.toBeUndefined()
        })
        it('Handles init value in discountActive', () => {
          const customInitialValue = initialState.get('discountActive')
          expect(customInitialValue).toBeFalsy()
        })
        it('Handles value type in discountActive', () => {
          const customInitialValue = initialState.get('discountActive')
          expect(typeof customInitialValue).toBe('boolean')
        })
        it('Handles custom values in discountActive', () => {
          const customValue = true
          const customState = discountsAdminReducer(
            initialState,
            onActivateDiscountAction(customValue)
          )
          const customNameValue = customState.get('discountActive')
          expect(customNameValue).toBeTruthy()
        })
      })
    })
    describe('ON_SELECT_DATE', () => {
      describe('Update expiry', () => {
        it('Handles undefined value in expiry', () => {
          const customInitialValue = initialState.get('expiry')
          expect(customInitialValue).not.toBeUndefined()
        })
        it('Handles init value in expiry', () => {
          const customInitialValue = initialState.get('expiry')
          expect(customInitialValue).toBe('')
        })
        it('Handles value type in expiry', () => {
          const customInitialValue = initialState.get('expiry')
          expect(typeof customInitialValue).toBe('string')
        })
        it('Handles custom values in expiry', () => {
          const customValue = '10-01-2019'
          const customState = discountsAdminReducer(
            initialState,
            onSelectDateAction(customValue)
          )
          const customNameValue = customState.get('expiry')
          expect(customNameValue).toBeTruthy()
        })
      })
    })
    describe('SET_DISCOUNT_TO_UPDATE', () => {
      describe('Update discount', () => {
        it('Handles undefined value in discountId', () => {
          const customInitialValue = initialState.get('discountId')
          expect(customInitialValue).not.toBeUndefined()
        })
        it('Handles init value in discountId', () => {
          const customInitialValue = initialState.get('discountId')
          expect(customInitialValue).toBeLessThan(0)
        })
        it('Handles value type in discountId', () => {
          const customInitialValue = initialState.get('discountId')
          expect(typeof customInitialValue).toBe('number')
        })
        it('Handles custom values in discount', () => {
          const discount: Discount = {
            code: '',
            discountItemId: '',
            type: '',
            rate: 1,
            expiry: '',
            user: '',
            restrictionType: 'usage',
            selectedProducts: [],
            selectedUsers: [],
            usageNumber: 0
          }
          const customState = discountsAdminReducer(
            initialState,
            setDiscountToUpdateAction(discount)
          )
          const customNameValue = customState.getIn([
            'restrictionType',
            'usage'
          ])
          expect(customNameValue).toBeTruthy()
        })
      })
    })
    describe('SELECT_RESTRICTION', () => {
      describe('Update restrictionType', () => {
        it('Handles undefined value in restrictionType', () => {
          const customInitialValue = initialState.get('restrictionType')
          expect(customInitialValue).not.toBeUndefined()
        })
        it('Handles value type in restrictionType', () => {
          const customInitialValue = initialState.get('restrictionType')
          expect(typeof customInitialValue).toBe('object')
        })
        it('Handles custom values in discount', () => {
          const customValue = {
            users: false,
            design: true,
            usage: false
          }
          const customState = discountsAdminReducer(
            initialState,
            selectRestrictionAction(customValue)
          )
          const customNameValue = customState.getIn([
            'restrictionType',
            'design'
          ])
          expect(customNameValue).toBe(customValue.design)
        })
      })
    })
    describe('ON_CHANGE_USER', () => {
      describe('Update user', () => {
        it('Handles undefined value in user', () => {
          const customInitialValue = initialState.get('user')
          expect(customInitialValue).not.toBeUndefined()
        })
        it('Handles init value in user', () => {
          const customInitialValue = initialState.get('user')
          expect(customInitialValue).toBe('')
        })
        it('Handles value type in user', () => {
          const customInitialValue = initialState.get('user')
          expect(typeof customInitialValue).toBe('string')
        })
        it('Handles custom values in user', () => {
          const customValue = 'john'
          const key = 'user'
          const customState = discountsAdminReducer(
            initialState,
            onChangeInputAction(key, customValue)
          )
          const customNameValue = customState.get('user')
          expect(customNameValue).toBe(customValue)
        })
      })
    })
    describe('ON_ADD_PRODUCT', () => {
      describe('Update selectedProducts', () => {
        it('Handles undefined value in selectedProducts', () => {
          const customInitialValue = initialState.get('selectedProducts')
          expect(customInitialValue).not.toBeUndefined()
        })
        it('Handles init size in selectedProducts', () => {
          const customInitialValue = initialState.get('selectedProducts')
          expect(customInitialValue.size).toBe(0)
        })
        it('Handles custom values in selectedProducts', () => {
          const customValue = { name: 'My design', image: '', code: 'JV2-123' }
          const customState = discountsAdminReducer(
            initialState,
            onAddDesignAction(customValue)
          )
          const customNameValue = customState.get('selectedProducts')
          expect(customNameValue.size).toBeGreaterThan(0)
        })
      })
    })
    describe('DELETE_ITEM_SELECTED_ACTION', () => {
      describe('Handles delete item on selectedProducts', () => {
        const index = 0
        const section = 'selectedProducts'
        const customState = discountsAdminReducer(
          initialState,
          deleteItemSelectedAction(index, section)
        )
        const customNameValue = customState.get('selectedProducts')
        expect(customNameValue.size).toBe(0)
      })
    })
    describe('ON_ADD_USER', () => {
      describe('Update selectedUsers', () => {
        it('Handles undefined value in selectedUsers', () => {
          const customInitialValue = initialState.get('selectedUsers')
          expect(customInitialValue).not.toBeUndefined()
        })
        it('Handles init size in selectedUsers', () => {
          const customInitialValue = initialState.get('selectedUsers')
          expect(customInitialValue.size).toBe(0)
        })
        it('Handles custom values in selectedUsers', () => {
          const customValue = 'john'
          const customState = discountsAdminReducer(
            initialState,
            onAddUserAction(customValue)
          )
          const customNameValue = customState.get('selectedUsers')
          expect(customNameValue.size).toBeGreaterThan(0)
        })
      })
    })
    describe('SET_DISCOUNT_PAGE', () => {
      describe('Update discountPage', () => {
        it('Handles undefined value in discountPage', () => {
          const customInitialValue = initialState.get('discountPage')
          expect(customInitialValue).not.toBeUndefined()
        })
        it('Handles init value in discountPage', () => {
          const customInitialValue = initialState.get('discountPage')
          expect(customInitialValue).toBe(0)
        })
        it('Handles value type in discountPage', () => {
          const customInitialValue = initialState.get('discountPage')
          expect(typeof customInitialValue).toBe('number')
        })
        it('Handles custom values in discountPage', () => {
          const customValue = 1
          const customState = discountsAdminReducer(
            initialState,
            setDiscountPageAction(customValue)
          )
          const customNameValue = customState.get('discountPage')
          expect(customNameValue).toBe(customValue)
        })
      })
    })
    describe('ON_CHANGE_USAGE', () => {
      describe('Update usageNumber', () => {
        it('Handles undefined value in usageNumber', () => {
          const customInitialValue = initialState.get('usageNumber')
          expect(customInitialValue).not.toBeUndefined()
        })
        it('Handles init value in usageNumber', () => {
          const customInitialValue = initialState.get('usageNumber')
          expect(customInitialValue).toBe(0)
        })
        it('Handles value type in usageNumber', () => {
          const customInitialValue = initialState.get('usageNumber')
          expect(typeof customInitialValue).toBe('number')
        })
        it('Handles custom values in usageNumber', () => {
          const customValue = 1
          const customState = discountsAdminReducer(
            initialState,
            onChangeUsageAction(customValue)
          )
          const customNameValue = customState.get('usageNumber')
          expect(customNameValue).toBe(customValue)
        })
      })
    })
    describe('ON_CHECK_USAGE', () => {
      describe('unlimitedUsage value', () => {
        it('Handles undefined value in unlimitedUsage', () => {
          const customInitialValue = initialState.get('unlimitedUsage')
          expect(customInitialValue).not.toBeUndefined()
        })
        it('Handles value type in unlimitedUsage', () => {
          const customInitialValue = initialState.get('unlimitedUsage')
          expect(typeof customInitialValue).toBe('boolean')
        })
        it('Handles initial value in loading', () => {
          const customInitialValue = initialState.get('unlimitedUsage')
          expect(customInitialValue).toBeFalsy()
        })
        it('Handles custom value in unlimitedUsage', () => {
          const loadingState = discountsAdminReducer(
            initialState,
            onCheckUsageAction(true)
          )
          const customLoadingValue = loadingState.get('unlimitedUsage')
          expect(customLoadingValue).toBeTruthy()
        })
      })
    })
  })
})
