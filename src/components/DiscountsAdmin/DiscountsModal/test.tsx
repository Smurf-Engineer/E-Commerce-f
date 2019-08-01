/**
 * DiscountsModals Test - Created by eduardoquintero on 27/05/19.
 */
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import DiscountsModals from './index'

describe('<DiscountsModals />', () => {
  test('renders without exploding', () => {
    const div = document.createElement('div')
    const discountTypes = ['']
    const couponCode = ''
    const discountItemId = ''
    const discountType = ''
    const rate = 0
    const discountActive = false
    const expiry = ''
    const loading = false
    const open = false
    ReactDOM.render(
      <DiscountsModals
        {...{
          open,
          loading,
          expiry,
          discountActive,
          rate,
          discountType,
          discountItemId,
          couponCode,
          discountTypes
        }}
        formatMessage={() => ''}
        handleOnInputChange={() => {}}
        onSelectDiscountType={() => {}}
        onChangeRate={() => {}}
        onActivateDiscount={() => {}}
        onSaveDiscount={() => {}}
        onSelectDate={() => {}}
      />,
      div
    )
  })
})
