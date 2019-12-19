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

export const validIcons = ['image/jpeg', 'image/png']
export const validModels = ['.svg', '.jpg', '.jpeg', '.png', '.obj', '.mtl']

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
    key: 'bumpmap'
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
