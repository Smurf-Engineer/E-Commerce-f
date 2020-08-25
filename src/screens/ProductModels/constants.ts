/**
 * ProductModels Types - Created by Jesús Apodaca on 16/12/19.
 */
const namespace = 'src/ProductModels'

export const OPEN_MODAL = `${namespace}/OPEN_MODAL`
export const EDIT_MODEL = `${namespace}/EDIT_MODEL`
export const CHANGE_NAME = `${namespace}/CHANGE_NAME`
export const UPLOADING_IMAGE = `${namespace}/UPLOADING_IMAGE`
export const SET_ICON = `${namespace}/SET_ICON`
export const UPLOADING_FILE = `${namespace}/UPLOADING_FILE`
export const SET_FILE = `${namespace}/SET_FILE`
export const SAVE_INFO = `${namespace}/SAVE_INFO`
export const REMOVE_MODEL = `${namespace}/REMOVE_MODEL`
export const SET_LOADING = `${namespace}/SET_LOADING`
export const SET_VARIANTS = `${namespace}/SET_VARIANTS`
export const CHANGE_DEFAULT = `${namespace}/CHANGE_DEFAULT`
export const CHANGE_MODEL_RENDER = `${namespace}/CHANGE_MODEL_RENDER`
export const UPLOAD_COMPLETE = `${namespace}/UPLOAD_COMPLETE`
export const RESET_REDUCER = `${namespace}/RESET_REDUCER`

export const validIcons = ['image/jpeg', 'image/png']

export const files = [
  {
    title: 'addObj',
    placeholder: 'objPlaceholder',
    extension: '.obj',
    key: 'obj'
  },
  {
    title: 'addMtl',
    placeholder: 'mtlPlaceholder',
    extension: '.mtl',
    key: 'mtl'
  },
  {
    title: 'addBump',
    placeholder: 'bumpPlaceholder',
    extension: '.jpg',
    key: 'bumpMap'
  }
]

export const extraFiles = [
  {
    title: 'brandingTitle',
    options: [
      {
        key: 'branding',
        extension: '.svg'
      }
    ]
  },
  {
    title: 'flatlockTitle',
    options: [
      {
        key: 'flatlock',
        extension: '.png'
      }
    ]
  },
  {
    title: 'labelTitle',
    options: [
      {
        key: 'label',
        extension: '.jpg'
      }
    ]
  },
  {
    title: 'bibrace',
    options: [
      {
        key: 'bibraceWhite',
        extension: '.jpg'
      },
      {
        key: 'bibraceBlack',
        extension: '.jpg'
      }
    ]
  },
  {
    title: 'binding',
    options: [
      {
        key: 'bindingWhite',
        extension: '.jpg'
      },
      {
        key: 'bindingBlack',
        extension: '.jpg'
      }
    ]
  },
  {
    title: 'zipper',
    options: [
      {
        key: 'zipperWhite',
        extension: '.jpg'
      },
      {
        key: 'zipperBlack',
        extension: '.jpg'
      }
    ]
  }
]
