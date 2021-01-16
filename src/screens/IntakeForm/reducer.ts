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
  SET_SAVING_INTAKE,
  SET_SUCCESS_MODAL_OPEN,
  ON_EXPAND_INSPIRATION,
  ON_CLOSE_INSPIRATION,
  SET_FROM_SCRATCH,
  RESET_COLOR_SELECTION,
  SELECT_PRODUCT,
  ADD_TAG,
  REMOVE_TAG,
  RESET_INSPIRATION,
  REMOVE_FROM_LIST,
  ADD_TO_LIST,
  SET_DESCRIPTION,
  OPEN_RENAME_MODAL,
  ON_RENAME_FILE,
  ON_SET_RENAMING,
  CHANGE_LOCAL_NAME,
  SET_FILE_TERMS,
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
  selectedPaletteIndex: -2,
  selectedEditColors: [],
  selectedEditPrimaryColor: [],
  uploadingFile: false,
  selectedFiles: [],
  lockerSelectedFiles: [],
  userLockerModalOpen: false,
  selectedTeamSize: null,
  editorState: null,
  projectName: '',
  phone: '',
  estimatedDate: '',
  estimatedDateMoment: null,
  sendSms: false,
  sendEmail: false,
  savingIntake: false,
  successModal: false,
  expandedInspiration: null,
  expandedInspirationOpen: false,
  fromScratch: true,
  inspirationTags: [],
  inspirationFilters: [],
  projectDescription: null,
  projectCategories: [],
  renameFileOpen: false,
  fileIdToRename: null,
  newFileName: '',
  renamingFile: false,
  fileTermsAccepted: false
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
        .findIndex((productType: any) => {
          return  (listName === 'selectedItems' ? productType.get('id') : productType) === elementId
        })
      const selectedItems = state.get(listName)
      const updatedSelectedItems = selectedItems.delete(indexOfListingToDelete)
      return state.merge({ [listName]: updatedSelectedItems })
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
      return state.set('inspirationLoading', action.loading)
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
    case SET_SAVING_INTAKE:
      return state.set('savingIntake', action.saving)
    case SET_SUCCESS_MODAL_OPEN:
      return state.set('successModal', action.open)
    case ON_EXPAND_INSPIRATION: {
      const { inspirationId, image, name, isSelected, tags } = action
      return state.merge({
        expandedInspiration: {
          id: inspirationId, image, name, selected: isSelected, tags
        },
        expandedInspirationOpen: true
      })
    }
    case ON_CLOSE_INSPIRATION:
      return state.merge({
        expandedInspirationOpen: false
      })
    case SET_FROM_SCRATCH:
      return state.set('fromScratch', action.fromScratch)
    case RESET_COLOR_SELECTION:
      return state.merge({
        selectedPaletteIndex: -2
        })
    case SELECT_PRODUCT: {
        const { product } = action
        const selectedItems = state.get('selectedItems')
        const addItem = selectedItems.push(fromJS(product))
        return state.merge({ selectedItems: addItem })
      }
    case ADD_TAG: {
      const { value } = action
      const inspirationTags = state.get('inspirationTags')
      const addItem = inspirationTags.push(value)
      return state.merge({ inspirationTags: addItem })
    }
    case REMOVE_TAG: {
      const { value } = action
      const indexOfListingToDelete = state
        .get('inspirationTags')
        .findIndex((tag: string) => {
          return tag === value
        })
      const selectedItems = state.get('inspirationTags')
      const updatedSelectedItems = selectedItems.delete(indexOfListingToDelete)
      return state.set('inspirationTags', updatedSelectedItems)
    }
    case RESET_INSPIRATION:
      return state.merge({
        inspirationPage: -1,
        inspirationSkip: 0,
        inspirationTotal: 0,
        inspirationLoading: true,
        inspiration: []
      })
    case REMOVE_FROM_LIST: {
      const { listName, name } = action
      const indexOfListingToDelete = state
        .get(listName)
        .findIndex((filter: string) => {
          return filter === name
        })
      const filterItems = state.get(listName)
      const updatedFiltertems = filterItems.delete(indexOfListingToDelete)
      return state.set(listName, updatedFiltertems)
    }
    case ADD_TO_LIST: {
      const { listName, name } = action
      const listNameState = state.get(listName)
      const addItem = listNameState.push(name)
      return state.merge({ [listName]: addItem })
    }
    case SET_DESCRIPTION:
      return state.merge({ projectDescription: action.contentState })
    case OPEN_RENAME_MODAL:
      return state.merge({ renameFileOpen: action.open, fileIdToRename: action.id, newFileName: '' })
    case ON_RENAME_FILE:
      return state.merge({ newFileName: action.value })
    case ON_SET_RENAMING:
      return state.set('renamingFile', action.loading)
    case CHANGE_LOCAL_NAME: {
      const { id, value } = action
      const indexOfListingToUpdate = state
        .get('selectedFiles')
        .findIndex((object: any) => {
          return object.id === id
        })
      return state.updateIn(['selectedFiles', indexOfListingToUpdate], (file: any) => {
        return file.set('name', value)
      })
    }
    case SET_FILE_TERMS:
      return state.set('fileTermsAccepted', action.checked)
    default:
      return state
  }
}

export default intakeFormReducer
