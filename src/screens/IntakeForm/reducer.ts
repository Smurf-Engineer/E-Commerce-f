/**
 * ShoppingCartPage Reducer - Created by gustavomedina on 02/05/18.
 */
import { fromJS } from 'immutable'
import { ImageFile, Reducer } from '../../types/common'
import {
  SELECT_ELEMENT,
  DESELECT_ELEMENT,
  GO_TO_NEXT_PAGE,
  SET_INSPIRATION_PAGE,
  SET_INSPIRATION_DATA,
  SET_INSPIRATION_LOADING,
  SET_PALETTE,
  SET_UPLOADING_FILE,
  SET_FILE,
  OPEN_LOCKER,
  ADD_LOCKER_ITEMS,
  DESELECT_LOCKER_FILE,
  SELECT_TEAM_SIZE,
  SET_INPUT,
  ON_SELECT_DATE,
  ON_CHECK_SMS,
  ON_CHECK_EMAIL,
  Sections
} from './constants'
export const initialState = fromJS({
  selectedItems: [],
  currentScreen: Sections.PRODUCTS,
  inspirationPage: -1,
  inspirationSkip: 0,
  inspirationTotal: 0,
  inspirationLoading: false,
  inspiration: [],
  inspirationSelectedItems: [],
  selectedColors: [],
  selectedPrimaryColor: [],
  selectedPaletteIndex: -1,
  selectedEditColors: [],
  selectedEditPrimaryColor: [],
  uploadingFile: false,
  selectedFiles: [],
  lockerSelectedFiles: [],
  userLockerModalOpen: false,
  selectedTeamSize: '1',
  proyectDescription: '',
  proyectName: '',
  phone: '',
  estimatedDate: '',
  estimatedDateMoment: null,
  sendSms: false,
  sendEmail: false
})

const intakeFormReducer: Reducer<any> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case SELECT_ELEMENT: {
      const { listName, elementId, index } = action
      const selectedItems = state.get(listName)
      const addItem = index >= 0  ? selectedItems.splice(index, 1, elementId) : selectedItems.push(elementId)
      return state.merge({ [listName]: addItem })
    }
    case DESELECT_ELEMENT: {
      const { listName, elementId } = action
      const indexOfListingToDelete = state
        .get(listName)
        .findIndex((productType: number) => {
          return productType === elementId
        })
      const selectedItems = state.get(listName)
      const updatedSelectedItems = selectedItems.delete(indexOfListingToDelete)
      return state.set(listName, updatedSelectedItems)
    }
    case GO_TO_NEXT_PAGE:
      return state.set('currentScreen', action.page)
    case SET_INSPIRATION_PAGE:
      const { skip, newPage } = action
      return state.merge({
        inspirationSkip:  skip,
        inspirationPage: newPage
      })
    case SET_INSPIRATION_DATA:
      const { data, fullCount } = action
      const items = state.get('inspiration')
      const itemToAdd = items.push(...data)
      const itemsMap = itemToAdd.map((item: any) => fromJS(item))
      return state.merge({
        inspiration: itemsMap,
        inspirationTotal: fullCount,
        inspirationLoading: false
      })
    case SET_INSPIRATION_LOADING:
      return state.setIn('inspirationLoading', action.loading)
    case SET_PALETTE: {
      const { accentColors, primaryColor, index } = action
      return state.merge({
        selectedEditColors: accentColors,
        selectedEditPrimaryColor: [primaryColor],
        selectedPaletteIndex: index
      })
    }
    case SET_UPLOADING_FILE: {
      return state.set('uploadingFile', action.uploading)
    }
    case SET_FILE: {
      const { file, listName } = action
      const selectedItems = state.get(listName)
      const addItem = selectedItems.push(fromJS(file))
      return state.merge({ [listName]: addItem })
    }
    case OPEN_LOCKER: {
      return state.merge({ userLockerModalOpen: action.open, lockerSelectedFiles: [] })
    }
    case ADD_LOCKER_ITEMS: {
      const selectedItems = state.get('lockerSelectedFiles')
      const existingItems = state.get('selectedFiles')
      return state.merge({
        selectedFiles: existingItems.concat(selectedItems),
        lockerSelectedFiles: [],
        userLockerModalOpen: false
      })
    }
    case DESELECT_LOCKER_FILE: {
      const { listName, elementId } = action
      const indexOfListingToDelete = state
        .get(listName)
        .findIndex((file: ImageFile) => {
          return file.get('id') === elementId
        })
      const selectedItems = state.get(listName)
      const updatedSelectedItems = selectedItems.delete(indexOfListingToDelete)
      return state.set(listName, updatedSelectedItems)
    }
    case SELECT_TEAM_SIZE:
      return state.set('selectedTeamSize', action.size)
    case SET_INPUT:
      return state.merge({ [action.key]: action.value})
    case ON_SELECT_DATE:
      return state.merge({
        estimatedDate: action.date,
        estimatedDateMoment: action.dateMoment
      })
    case ON_CHECK_SMS:
      return state.set('sendSms', action.checked)
    case ON_CHECK_EMAIL:
      return state.set('sendEmail', action.checked)
    default:
      return state
  }
}

export default intakeFormReducer
