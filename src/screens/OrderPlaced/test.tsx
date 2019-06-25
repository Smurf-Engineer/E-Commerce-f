/**
 * OrderPlaced Test - Created by cazarez on 22/05/18.
 */
import orderPlacedReducer, { initialState } from './reducer'
import {
  defaultAction,
  emailAlertCheckedAction,
  smsAlertCheckedAction
} from './actions'

describe(' OrderPlaced Screen', () => {
  // Test redux actions
  it('Return the default state for unknow action', () => {
    let state = orderPlacedReducer(initialState, { type: 'unknow' })
    expect(state).toEqual(initialState)
  })

  it('Update someKey correctly', () => {
    const testValue = 'Test value'
    const state = orderPlacedReducer(initialState, defaultAction(testValue))
    const someKey = state.get('someKey')
    expect(someKey).toEqual(testValue)

    const testValue2 = 'Test value 2'
    const state2 = orderPlacedReducer(initialState, defaultAction(testValue2))
    const someKey2 = state2.get('someKey')
    expect(someKey2).toEqual(testValue2)
  })

  it('Update sendEmailAlert correctly', () => {
    const sendEmailAlertTrue = true
    const state = orderPlacedReducer(
      initialState,
      emailAlertCheckedAction(sendEmailAlertTrue)
    )
    const sendEmailAlertValue = state.get('sendEmailAlert')
    expect(sendEmailAlertTrue).toEqual(sendEmailAlertValue)

    const sendEmailAlertFalse = false
    const state2 = orderPlacedReducer(
      initialState,
      emailAlertCheckedAction(sendEmailAlertFalse)
    )
    const sendEmailAlertValue2 = state2.get('sendEmailAlert')
    expect(sendEmailAlertFalse).toEqual(sendEmailAlertValue2)
  })

  it('Update sendSmsAlert correctly', () => {
    const sendSmsAlertTrue = true
    const state = orderPlacedReducer(
      initialState,
      smsAlertCheckedAction(sendSmsAlertTrue)
    )
    const sendSmsAlertValue = state.get('sendSmsAlert')
    expect(sendSmsAlertTrue).toEqual(sendSmsAlertValue)

    const sendSmsAlertFalse = false
    const state2 = orderPlacedReducer(
      initialState,
      smsAlertCheckedAction(sendSmsAlertFalse)
    )
    const sendSmsAlertValue2 = state2.get('sendSmsAlert')
    expect(sendSmsAlertFalse).toEqual(sendSmsAlertValue2)
  })
})
