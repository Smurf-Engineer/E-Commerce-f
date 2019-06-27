/**
 * ProductForm Reducer - Created by Apodaca on 16/05/19.
 */

import { fromJS, List, Map } from 'immutable'
import {
  SET_PRODUCT_DATA,
  CHANGE_VALUE,
  RESET_DATA,
  SET_LOADING,
  SET_BANNER,
  SET_CHECK,
  SET_GENDERS,
  SET_CURRENCIES,
  REMOVE_MATERIAL,
  SET_FILE_FIELD,
  SET_COLORS,
  ADD_MATERIAL,
  ADD_BANNER,
  SET_BANNERS_LOADING,
  SET_DESIGN_CENTER,
  SAVED_PRODUCT,
  REMOVE_BANNER
} from './constants'
import { getFileExtension, getFileName } from '../../utils/utilsFiles'
import { Reducer, ProductPicture } from '../../types/common'
import { currencies, quantities } from './Steps/ThirdStep/constants'
import omitDeep from 'omit-deep'

export const initialState = fromJS({
  product: {},
  loading: true,
  loadingMessage: '',
  bannerMaterials: [],
  bannersLoading: false,
  dataExtra: {}
})

const productFormReducer: Reducer<any> = (state = initialState, action) => {
  switch (action.type) {
    case RESET_DATA:
      return initialState
    case SET_PRODUCT_DATA: {
      // TODO: Refactor all of the incoming data logic
      const { product, extraData } = action
      const {
        mediaFiles,
        priceRange,
        sizeRange,
        fitStyles,
        sports,
        genders,
        colors,
        productMaterials,
        pictures
      } = product
      const { bannerMaterials } = extraData
      const gendersSelected = genders
        ? genders.reduce((obj, { id, name }) => {
            const blockImage = pictures.find(
              (block: ProductPicture) => block.gender_id === id
            )
            obj[id] = {
              ...blockImage,
              name,
              selected: true
            }
            return obj
            // tslint:disable-next-line: align
          }, {})
        : {}
      const colorsSelected = colors
        ? colors.reduce((obj, { id, name }) => {
            const blockImage = pictures.find(
              (block: ProductPicture) => block.color_id === id
            )
            obj[id] = {
              ...blockImage,
              name,
              selected: true
            }
            return obj
            // tslint:disable-next-line: align
          }, {})
        : {}
      const mediaFilesDetailed = mediaFiles
        ? mediaFiles.map((file: any, index: number) => ({
            url: file.url,
            id: index,
            extension: getFileExtension(file.url),
            name: getFileName(file.url)
          }))
        : []
      const detailedBanners = bannerMaterials.map((banner: any) => ({
        ...banner,
        active: true
      }))
      let currenciesProduct = priceRange
      if (!priceRange || !priceRange.length) {
        currenciesProduct = []
        currencies.forEach(shortName => {
          quantities.forEach(quantity => {
            currenciesProduct.push({
              price: 0,
              quantity,
              shortName
            })
          })
        })
      }
      const sportsProduct =
        sports && sports.length
          ? sports.reduce((obj, item) => {
              obj[item.id] = true
              return obj
              // tslint:disable-next-line: align
            }, {})
          : {}
      const productMaterialsDet =
        productMaterials && productMaterials.length
          ? productMaterials.reduce((obj, item) => {
              obj[item.id] = true
              return obj
              // tslint:disable-next-line: align
            }, {})
          : {}
      const sizeRangeDet =
        sizeRange && sizeRange.length
          ? sizeRange.reduce((obj, item) => {
              obj[item.id] = true
              return obj
              // tslint:disable-next-line: align
            }, {})
          : {}
      const fitStylesDet =
        fitStyles && fitStyles.length
          ? fitStyles.reduce((obj, item) => {
              obj[item.id] = true
              return obj
              // tslint:disable-next-line: align
            }, {})
          : {}
      const detailedProduct = {
        ...product,
        sports: sportsProduct,
        sizeRange: sizeRangeDet,
        fitStyles: fitStylesDet,
        genders: gendersSelected,
        colors: colorsSelected,
        productMaterials: productMaterialsDet,
        mediaFiles: mediaFilesDetailed,
        priceRange: currenciesProduct
      }
      omitDeep(detailedProduct, '__typename')
      omitDeep(extraData, '__typename')
      omitDeep(detailedBanners, '__typename')
      return state.merge({
        product: fromJS(detailedProduct),
        dataExtra: extraData,
        bannerMaterials: detailedBanners,
        loading: false
      })
    }
    case SET_CURRENCIES:
      return state.setIn(['product', 'priceRange'], action.currencies)
    case SET_LOADING:
      return state.merge({
        loading: action.loading,
        loadingMessage: action.loadingMessage
      })
    case SET_CHECK:
      return state.setIn(
        ['product', action.selected, action.id],
        action.checked
      )
    case REMOVE_MATERIAL: {
      const { index, array } = action
      const oldList = state.getIn(['product', array])
      return state.setIn(['product', array], oldList.remove(index))
    }
    case ADD_MATERIAL: {
      const { item, array } = action
      const oldList = state.getIn(['product', array])
      return state.withMutations((map: any) => {
        map.setIn(['product', array], oldList.push(item))
        map.set('bannersLoading', false)
        return map
      })
    }
    case SET_FILE_FIELD: {
      const { selected, id, name, value } = action
      return state.setIn(['product', selected, id, name], value)
    }
    case ADD_BANNER: {
      const { item } = action
      const oldList = state.get('bannerMaterials')
      return state.set('bannerMaterials', oldList.push(fromJS(item)))
    }
    case SET_BANNER: {
      const { index, field, value } = action
      return state.setIn(['bannerMaterials', index, field], value)
    }
    case SET_BANNERS_LOADING:
      return state.set('bannersLoading', action.value)
    case REMOVE_BANNER: {
      const { index } = action
      const oldList = state.get('bannerMaterials')
      return state.set('bannerMaterials', oldList.remove(index))
    }
    case SAVED_PRODUCT: {
      const {
        bannerMaterials,
        mediaFiles,
        productImages,
        loadingMessage
      } = action
      return state.withMutations((map: any) => {
        map.setIn(['product', 'mediaFiles'], mediaFiles)
        map.setIn(['product', 'pictures'], productImages)
        map.merge({ bannerMaterials, loadingMessage })
        return map
      })
    }
    case SET_DESIGN_CENTER:
      return state.update('product', product => {
        return product.merge({
          designCenter: action.value,
          genders: Map(),
          productMaterials: Map(),
          mediaFiles: List(),
          colors: Map()
        })
      })
    case SET_GENDERS:
      return state.setIn(
        ['product', 'genders', action.id, 'selected'],
        action.value
      )
    case SET_COLORS: {
      return state.setIn(
        ['product', 'colors', action.id, 'selected'],
        action.value
      )
    }
    case CHANGE_VALUE:
      return state.setIn(['product', action.field], fromJS(action.value))
    default:
      return state
  }
}

export default productFormReducer
