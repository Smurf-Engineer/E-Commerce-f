/**
 * Checkout Test - Created by cazarez on 05/05/18.
 */
import checkoutReducer, { initialState } from './reducer'
import {
  setSelectedAddressAction,
  showAddressFormAction,
  showBillingAddressFormAction
} from './actions'
import {
  SET_SELECTED_ADDRESS,
  SHOW_ADDRESS_FORM,
  SHOW_BILLING_ADDRESS_FORM
} from './constants'

describe(' Checkout Screen', () => {
  describe('Actions', () => {
    it('setSelectedAddressAction', () => {
      const type = SET_SELECTED_ADDRESS
      const address = {
        firstName: 'Test',
        lastName: 'Test',
        street: 'Test',
        apartment: 'Test',
        country: 'Test',
        city: 'Test',
        zipCode: 'Test',
        phone: 'Test',
        stateProvince: 'Test'
      }
      const index = 0
      const billing = true
      expect(setSelectedAddressAction(address, index, billing)).toEqual({
        type,
        address,
        index,
        billing
      })
    })
    it('showAddressFormAction', () => {
      const type = SHOW_ADDRESS_FORM
      const show = true
      expect(showAddressFormAction(show)).toEqual({
        type,
        show
      })
    })
    it('showAddressFormAction', () => {
      const type = SHOW_BILLING_ADDRESS_FORM
      const show = true
      expect(showBillingAddressFormAction(show)).toEqual({
        type,
        show
      })
    })
  })
  describe('Reducer', () => {
    describe('SET_SELECTED_ADDRESS', () => {
      it('Handles undefined value in selected address', () => {
        const customInitialValue = initialState.get('indexAddressSelected')
        expect(customInitialValue).not.toBeUndefined()

        const customShowForm = initialState.get('showForm')
        expect(customShowForm).not.toBeUndefined()

        const customBillingValue = initialState.get('billingFirstName')
        expect(customBillingValue).not.toBeUndefined()
      })
      it('Handles value type in selected address', () => {
        const customInitialValue = initialState.get('indexAddressSelected')
        expect(typeof customInitialValue).toBe('number')

        const customShowForm = initialState.get('showForm')
        expect(typeof customShowForm).toBe('boolean')
      })
      it('Handles custom value in selected address', () => {
        const address = {
          firstName: 'Test',
          lastName: 'Test',
          street: 'Test',
          apartment: 'Test',
          country: 'Test',
          city: 'Test',
          zipCode: 'Test',
          phone: 'Test',
          stateProvince: 'Test'
        }
        const index = 0
        const billing = true
        const checkoutState = checkoutReducer(
          initialState,
          setSelectedAddressAction(address, index, billing)
        )
        const customIndexAddressValue = checkoutState.get(
          'indexAddressSelected'
        )
        expect(customIndexAddressValue).toBe(index)

        const customShowFormValue = checkoutState.get('showForm')
        expect(customShowFormValue).toBeFalsy()

        const customBillingFirstName = checkoutState.get('billingFirstName')
        expect(customBillingFirstName).toBe(address.firstName)
      })
    })
  })
  describe('SHOW_ADDRESS_FORM', () => {
    it('Handles undefined value in showForm', () => {
      const customInitialValue = initialState.get('showForm')
      expect(customInitialValue).not.toBeUndefined()
    })
    it('Handles initial value in showForm', () => {
      const customInitialValue = initialState.get('showForm')
      expect(customInitialValue).toBeFalsy()
    })
    it('Handles custom value in showForm', () => {
      const open = true
      const checkoutState = checkoutReducer(
        initialState,
        showAddressFormAction(open)
      )
      const customShowFormValue = checkoutState.get('showForm')
      expect(customShowFormValue).toBe(open)

      const shippingSaveValue = checkoutState.get('shippingSave')
      expect(shippingSaveValue).toBeTruthy()
    })
  })
  describe('SHOW_BILLING_ADDRESS_FORM', () => {
    it('Handles undefined value in showBillingForm', () => {
      const customInitialValue = initialState.get('showBillingForm')
      expect(customInitialValue).not.toBeUndefined()
    })
    it('Handles initial value in showBillingForm', () => {
      const customInitialValue = initialState.get('showBillingForm')
      expect(customInitialValue).toBeFalsy()
    })
    it('Handles custom value in showBillingForm', () => {
      const open = true
      const checkoutState = checkoutReducer(
        initialState,
        showBillingAddressFormAction(open)
      )
      const customShowFormValue = checkoutState.get('showBillingForm')
      expect(customShowFormValue).toBe(open)

      const billingSaveValue = checkoutState.get('billingSave')
      expect(billingSaveValue).toBeTruthy()
    })
  })
})
