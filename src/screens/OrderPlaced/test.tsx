/**
 * OrderPlaced Test - Created by cazarez on 22/05/18.
 */
import orderPlacedReducer, { initialState } from './reducer'
import { emailAlertCheckedAction, smsAlertCheckedAction } from './actions'
import { EMAIL_ALERT_CHECKED, SMS_ALERT_CHECKED } from './constants'

describe(' OrderPlaced Screen', () => {
  describe('Actions', () => {
    it('emailAlertCheckedAction', () => {
      const type = EMAIL_ALERT_CHECKED
      const checked = true

      expect(emailAlertCheckedAction(checked)).toEqual({
        type,
        checked
      })
    })

    it('smsAlertCheckedAction', () => {
      const type = SMS_ALERT_CHECKED
      const checked = true

      expect(smsAlertCheckedAction(checked)).toEqual({
        type,
        checked
      })
    })
  })

  describe('Reducer', () => {
    describe('INITIAL_STATE', () => {
      it('Sould not be undefined', () => {
        expect(initialState).toBeDefined()
      })

      it('Return the default state for unknow action', () => {
        let state = orderPlacedReducer(initialState, { type: 'unknow' })
        expect(state).toEqual(initialState)
      })
    })

    describe('EMAIL_ALERT_CHECKED', () => {
      it('Should update sendEmailAler to true correctly', () => {
        const sendEmailAlertTrue = true
        const state = orderPlacedReducer(
          initialState,
          emailAlertCheckedAction(sendEmailAlertTrue)
        )
        const sendEmailAlertValue = state.get('sendEmailAlert')
        expect(sendEmailAlertValue).toBeTruthy()
      })

      it('Should update sendEmailAler to false correctly', () => {
        const sendEmailAlertFalse = false
        const state2 = orderPlacedReducer(
          initialState,
          emailAlertCheckedAction(sendEmailAlertFalse)
        )
        const sendEmailAlertValue2 = state2.get('sendEmailAlert')
        expect(sendEmailAlertFalse).toEqual(sendEmailAlertValue2)
      })
    })

    describe('SMS_ALERT_CHECKED', () => {
      it('Should update sendSmsAlert to true correctly', () => {
        const sendSmsAlertTrue = true
        const state = orderPlacedReducer(
          initialState,
          smsAlertCheckedAction(sendSmsAlertTrue)
        )
        const sendSmsAlertValue = state.get('sendSmsAlert')
        expect(sendSmsAlertValue).toBeTruthy()
      })

      it('Should update sendSmsAlert to false correctly', () => {
        const sendSmsAlertFalse = false
        const state2 = orderPlacedReducer(
          initialState,
          smsAlertCheckedAction(sendSmsAlertFalse)
        )
        const sendSmsAlertValue2 = state2.get('sendSmsAlert')
        expect(sendSmsAlertValue2).toBeFalsy()
      })
    })
  })
})
