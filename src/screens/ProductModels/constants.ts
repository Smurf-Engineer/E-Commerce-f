/**
 * ProductModels Types - Created by Jesús Apodaca on 16/12/19.
 */
const namespace = 'src/ProductModels'

export const ON_TAB_CLICK = `${namespace}/ON_TAB_CLICK`
export const OPEN_MODAL = `${namespace}/OPEN_MODAL`

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
