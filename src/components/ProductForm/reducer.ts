/**
 * ProductForm Reducer - Created by Apodaca on 16/05/19.
 */

import { fromJS } from 'immutable'
import {
  SET_PRODUCT_DATA,
  CHANGE_VALUE,
  RESET_DATA,
  SET_LOADING,
  SET_BANNERS,
  SET_CHECK,
  SET_GENDERS,
  SET_CURRENCIES
} from './constants'
import { getFileExtension, getFileName } from '../../utils/utilsFiles'
import { Reducer } from '../../types/common'
import { currencies, quantities } from './Steps/ThirdStep/constants'
import omitDeep from 'omit-deep'

export const initialState = fromJS({
  product: {},
  loading: false,
  loadingMessage: 'Uploading...',
  bannerMaterials: [],
  fixed: false,
  dataExtra: {}
})

const productFormReducer: Reducer<any> = (state = initialState, action) => {
  switch (action.type) {
    case RESET_DATA:
      return initialState
    case SET_PRODUCT_DATA: {
      const { product, extraData } = action
      const {
        mediaFiles,
        priceRange,
        sizeRange,
        fitStyles,
        sports,
        colors,
        productMaterials
      } = product
      const { bannerMaterials } = extraData
      const mediaFilesDetailed = mediaFiles
        ? mediaFiles.map((file: any, index: number) => ({
            toUpload: false,
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
      const sportsProduct = sports
        ? sports.reduce((obj, item) => {
            obj[item.id] = true
            return obj
            // tslint:disable-next-line: align
          }, {})
        : {}
      const productMaterialsDet = productMaterials
        ? productMaterials.reduce((obj, item) => {
            obj[item.id] = true
            return obj
            // tslint:disable-next-line: align
          }, {})
        : {}
      const sizeRangeDet = sizeRange
        ? sizeRange.reduce((obj, item) => {
            obj[item.id] = true
            return obj
            // tslint:disable-next-line: align
          }, {})
        : {}
      const fitStylesDet = fitStyles
        ? fitStyles.reduce((obj, item) => {
            obj[item.id] = true
            return obj
            // tslint:disable-next-line: align
          }, {})
        : {}
      const colorsDet = colors
        ? colors.reduce((obj, item) => {
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
        colors: colorsDet,
        productMaterials: productMaterialsDet,
        mediaFiles: mediaFilesDetailed,
        priceRange: currenciesProduct
      }
      omitDeep(detailedProduct, '__typename')
      omitDeep(extraData, '__typename')
      omitDeep(detailedBanners, '__typename')
      return state.merge({
        product: detailedProduct,
        dataExtra: extraData,
        bannerMaterials: detailedBanners
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
    case SET_BANNERS:
      return state.merge({ bannerMaterials: action.banners, fixed: true })
    case SET_GENDERS: {
      const pictures = action.genders.map((gender: any) => ({
        front_image: '',
        back_image: '',
        left_image: '',
        right_image: '',
        gender_id: gender.id
      }))
      return state
        .setIn(['product', 'genders'], action.genders)
        .setIn(['product', 'pictures'], pictures)
    }
    case CHANGE_VALUE:
      return state.setIn(['product', action.field], fromJS(action.value))
    default:
      return state
  }
}

export default productFormReducer
