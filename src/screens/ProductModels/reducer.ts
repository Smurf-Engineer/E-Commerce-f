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
  REMOVE_MODEL
} from './constants'
import { Reducer } from '../../types/common'

export const initialState = fromJS({
  openModal: false,
  tempModel: {},
  selected: 0,
  defaultModelIndex: 'test',
  variants: {
    test: {
      name: 'This is a test',
      default: true,
      flatlock: 'flatlock.svg',
      icon: ''
    },
    test2: {
      name: 'This is normal model',
      obj: 'OBJFile.obj',
      icon: ''
    }
  }
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
      return state.withMutations((map: any) => {
        map.set('openModal', false)
        map.setIn(['variants', selected], tempModel)
      })
    }
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

    default:
      return state
  }
}

export default productModelsReducer
