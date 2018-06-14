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
  SET_PASSWORD_FORM_HAS_ERROR,
  SET_SMS_CONFIRMATION_CHECKED,
  SET_SMS_UPDATES_CHECKED,
  SET_EMAIL_NEWSLETTER_CHECKED,
  SET_MSRMNT_SYSTEM,
  SET_MSRMNT_GENDER,
  RESET_REDUCER_DATA,
  SET_SETTINGS_LOADING,
  CHANGE_PASSWORD_SUCCESS
} from './constants'
import { Reducer } from '../../types/common'

export const initialState = fromJS({
  someKey: 'This is a value in the reducer',
  firstName: null,
  lastName: null,
  email: null,
  phone: null,
  loadingProfile: false,
  region: null,
  language: null,
  currency: null,
  loadingRegion: false,
  msrmntSystemSelected: null,
  msrmntGenderSelected: null,
  weight: null,
  heightFirst: null,
  heightSecond: null,
  chestSize: null,
  waistSize: null,
  hipsSize: null,
  inseamSize: null,
  shouldersSize: null,
  neckSize: null,
  loadingMeasurements: false,
  smsConfirmationChecked: null,
  smsUpdatesChecked: null,
  loadingSms: false,
  emailNewsletterChecked: null,
  loadingEmail: false,
  currentPassword: '',
  newPassword: '',
  newPasswordConfirm: '',
  showPasswordModal: false,
  passwordModalLoading: false,
  modalPasswordHasError: false,
  dataFromApollo: false
})

const adressesReducer: Reducer<any> = (state = initialState, action) => {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state.set('someKey', action.someValue)
    case CHANGE_INPUT:
      return state.merge({ [action.id]: action.value })
    case SELECT_DROPDOWN:
      return state.merge({ [action.id]: action.key })
    case SHOW_PASSWORD_MODAL: {
      if (!action.show) {
        return state.merge({
          showPasswordModal: false,
          newPassword: '',
          currentPassword: '',
          newPasswordConfirm: ''
        })
      } else {
        return state.set('showPasswordModal', true)
      }
    }
    case SET_MODAL_LOADING:
      return state.set('modalLoading', action.loading)
    case SET_SMS_CONFIRMATION_CHECKED:
      return state.set('smsConfirmationChecked', action.checked)
    case SET_SMS_UPDATES_CHECKED:
      return state.set('smsUpdatesChecked', action.checked)
    case SET_EMAIL_NEWSLETTER_CHECKED:
      return state.set('emailNewsletterChecked', action.checked)
    case SET_MSRMNT_SYSTEM:
      return state.set('msrmntSystemSelected', action.system)
    case SET_MSRMNT_GENDER:
      return state.set('msrmntGenderSelected', action.gender)
    case SET_PASSWORD_FORM_HAS_ERROR:
      return state.set('modalPasswordHasError', action.hasError)
    case CHANGE_PASSWORD_SUCCESS:
      return state.merge({
        modalPasswordHasError: false,
        showPasswordModal: false,
        modalLoading: false
      })
    case SET_SETTINGS_LOADING:
      return state.set(action.key, action.loading)
    case RESET_REDUCER_DATA:
      return initialState
    default:
      return state
  }
}

export default adressesReducer
