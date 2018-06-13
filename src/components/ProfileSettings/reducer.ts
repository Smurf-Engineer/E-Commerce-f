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
  SET_APOLLO_DATA,
  CHANGE_PASSWORD_SUCCESS
} from './constants'
import { Reducer } from '../../types/common'

export const initialState = fromJS({
  someKey: 'This is a value in the reducer',
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  loadingProfile: false,
  region: '',
  language: '',
  currency: '',
  loadingRegion: false,
  msrmntSystemSelected: '',
  msrmntGenderSelected: '',
  weight: '',
  heightFirst: '',
  heightSecond: '',
  chestSize: '',
  waistSize: '',
  hipsSize: '',
  inseamSize: '',
  shouldersSize: '',
  neckSize: '',
  loadingMeasurements: false,
  smsConfirmationChecked: false,
  smsUpdatesChecked: false,
  loadingSms: false,
  emailNewsletterChecked: false,
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
    case SET_APOLLO_DATA:
      return state.merge({
        dataFromApollo: true,
        firstName: action.profileSettings.firstName,
        lastName: action.profileSettings.lastName,
        email: action.profileSettings.email,
        phone: action.profileSettings.phone,
        region: action.profileSettings.region,
        language: action.profileSettings.language,
        currency: action.profileSettings.currency,
        weight: action.profileSettings.weight,
        heightFirst: action.profileSettings.heightFirst,
        heightSecond: action.profileSettings.heightSecond,
        chestSize: action.profileSettings.chestSize,
        waistSize: action.profileSettings.waistSize,
        hipsSize: action.profileSettings.hipsSize,
        inseamSize: action.profileSettings.inseamSize,
        shouldersSize: action.profileSettings.shouldersSize,
        neckSize: action.profileSettings.neckSize,
        msrmntSystemSelected: action.profileSettings.msrmntSystemSelected,
        msrmntGenderSelected: action.profileSettings.msrmntGenderSelected,
        smsConfirmationChecked: action.profileSettings.smsConfirmationChecked,
        smsUpdatesChecked: action.profileSettings.smsUpdatesChecked,
        emailNewsletterChecked: action.profileSettings.emailNewsletterChecked
      })
    case RESET_REDUCER_DATA:
      return initialState
    default:
      return state
  }
}

export default adressesReducer
