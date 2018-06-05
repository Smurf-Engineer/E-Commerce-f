/**
 * ProfileSettings Reducer - Created by miguel canobbio on 05/31/18.
 */
import { fromJS } from 'immutable'
import {
  DEFAULT_ACTION,
  CHANGE_INPUT,
  SELECT_DROPDOWN,
  SHOW_PASSWORD_MODAL,
  SET_MODAL_LOADING,
  SET_SMS_CONFIRMATION_CHECKED,
  SET_SMS_UPDATES_CHECKED,
  SET_EMAIL_NEWSLETTER_CHECKED,
  RESET_REDUCER_DATA
} from './constants'
import { Reducer } from '../../types/common'

export const initialState = fromJS({
  someKey: 'This is a value in the reducer',
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  regionId: '',
  languageId: '',
  currencyId: '',
  msrmntMetricSelected: true,
  msrmntManSelected: true,
  weight: '',
  heightFirst: '',
  heightSecond: '',
  chestSize: '',
  waistSize: '',
  hipsSize: '',
  inseamSize: '',
  shouldersSize: '',
  neckSize: '',
  smsConfirmationChecked: false,
  smsUpdatesChecked: false,
  emailNewsletterChecked: false,
  currentPassword: '',
  newPassword: '',
  newPasswordConfirm: '',
  showPasswordModal: false,
  passwordModalLoading: false
})

const adressesReducer: Reducer<any> = (state = initialState, action) => {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state.set('someKey', action.someValue)
    case CHANGE_INPUT:
      return state.merge({ [action.id]: action.value })
    case SELECT_DROPDOWN:
      return state.merge({ [action.id]: action.key })
    case SHOW_PASSWORD_MODAL:
      return state.set('showPasswordModal', action.show)
    case SET_MODAL_LOADING:
      return state.set('modalLoading', action.loading)
    case SET_SMS_CONFIRMATION_CHECKED:
      return state.set('smsConfirmationChecked', action.checked)
    case SET_SMS_UPDATES_CHECKED:
      return state.set('smsUpdatesChecked', action.checked)
    case SET_EMAIL_NEWSLETTER_CHECKED:
      return state.set('emailNewsletterChecked', action.checked)
    case RESET_REDUCER_DATA:
      return initialState
    default:
      return state
  }
}

export default adressesReducer
