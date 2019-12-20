/**
 * ProductModels Reducer - Created by Jesús Apodaca on 16/12/19.
 */
import { fromJS } from 'immutable'
import {
  OPEN_MODAL,
  EDIT_MODEL,
  CHANGE_NAME,
  UPLOADING_IMAGE,
  SET_ICON,
  UPLOADING_FILE,
  SET_FILE,
  SAVE_INFO,
  REMOVE_MODEL,
  SET_LOADING,
  SET_VARIANTS,
  CHANGE_DEFAULT,
  CHANGE_MODEL_RENDER,
  UPLOAD_COMPLETE
} from './constants'
import { Reducer } from '../../types/common'

export const initialState = fromJS({
  openModal: false,
  tempModel: {},
  selected: '',
  modelRender: '',
  loading: true,
  defaultModelIndex: '',
  variants: {}
})

const productModelsReducer: Reducer<any> = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_MODAL: {
      const variants = state.get('variants')
      return state.merge({
        openModal: action.open,
        selected: `MOD${variants.size}`,
        tempModel: {}
      })
    }
    case EDIT_MODEL: {
      const tempModel = state.getIn(['variants', action.id])
      return state.merge({
        tempModel,
        openModal: true,
        selected: action.id
      })
    }
    case SAVE_INFO: {
      const selected = state.get('selected')
      const tempModel = state.get('tempModel')
      const isChecked = tempModel.get('default')
      const defaultIndex = state.get('defaultModelIndex')
      let newIndex = defaultIndex
      if (isChecked) {
        newIndex = selected
      }
      return state.withMutations((map: any) => {
        if (isChecked && defaultIndex) {
          map.setIn(['variants', defaultIndex, 'default'], false)
        }
        map.set('defaultModelIndex', newIndex)
        map.set('openModal', false)
        map.setIn(['variants', selected], tempModel)
      })
    }
    case SET_VARIANTS:
      return state.merge({
        loading: false,
        variants: action.variants,
        defaultModelIndex: action.defaultIndex
      })
    case UPLOAD_COMPLETE:
      return state.merge({
        loading: false,
        openSuccess: true,
        selected: '',
        modelRender: ''
      })
    case CHANGE_MODEL_RENDER:
      return state.set('modelRender', action.id)
    case SET_LOADING:
      return state.set('loading', action.loading)
    case REMOVE_MODEL:
      return state.deleteIn(['variants', action.key])
    case SET_FILE:
      return state.setIn(['tempModel', action.key], action.url)
    case UPLOADING_FILE:
      return state.setIn(['tempModel', action.key], 'loading')
    case SET_ICON:
      return state.setIn(['tempModel', 'icon'], action.icon)
    case UPLOADING_IMAGE:
      return state.setIn(['tempModel', 'icon'], 'loading')
    case CHANGE_NAME:
      return state.setIn(['tempModel', 'name'], action.name)
    case CHANGE_DEFAULT:
      return state.setIn(['tempModel', 'default'], action.checked)
    default:
      return state
  }
}

export default productModelsReducer
