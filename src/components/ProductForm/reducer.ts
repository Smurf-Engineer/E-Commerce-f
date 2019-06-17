/**
 * ProductForm Reducer - Created by Apodaca on 16/05/19.
 */

import { fromJS, List, Map } from 'immutable'
import {
  SET_PRODUCT_DATA,
  CHANGE_VALUE,
  RESET_DATA,
  SET_LOADING,
  SET_BANNERS,
  SET_CHECK,
  SET_GENDERS,
  SET_CURRENCIES,
  REMOVE_MATERIAL,
  SET_FILE_FIELD,
  SET_COLORS,
  ADD_MATERIAL,
  ADD_BANNER,
  SET_BANNER,
  SET_DESIGN_CENTER,
  SAVED_PRODUCT,
  REMOVE_BANNER,
  ADD_PICTURE
} from './constants'
import { getFileExtension, getFileName } from '../../utils/utilsFiles'
import { Reducer } from '../../types/common'
import { currencies, quantities } from './Steps/ThirdStep/constants'
import omitDeep from 'omit-deep'

export const initialState = fromJS({
  product: {},
  loading: true,
  loadingMessage: '',
  bannerMaterials: [],
  fixed: false,
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
      const colorsDet =
        colors && colors.length
          ? colors.reduce((obj, item) => {
              obj[item.id] = item.name
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
      return state.setIn(['product', array], oldList.push(item))
    }
    case SET_FILE_FIELD: {
      const { array, index, field, value } = action
      return state.setIn(['product', array, index, field], value)
    }
    case ADD_PICTURE: {
      const { index, item } = action
      return state.setIn(['product', 'pictures', index], fromJS(item))
    }
    case ADD_BANNER: {
      const { item } = action
      const oldList = state.get('bannerMaterials')
      return state.set('bannerMaterials', oldList.push(item))
    }
    case SET_BANNER: {
      const { index, field, value } = action
      return state.setIn(['bannerMaterials', index, field], value)
    }
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
      return state.withMutations((map: any) => {
        map.setIn(['product', 'designCenter'], action.value)
        map.setIn(['product', 'genders'], List())
        map.setIn(['product', 'pictures'], List())
        map.setIn(['product', 'productMaterials'], Map())
        map.setIn(['product', 'mediaFiles'], List())
        map.setIn(['product', 'colors'], Map())
        return map
      })
    case SET_BANNERS:
      return state.merge({ bannerMaterials: action.banners, fixed: true })
    case SET_GENDERS: {
      const customizable = state.getIn(['product', 'designCenter'])
      return state.withMutations((map: any) => {
        map.setIn(['product', 'genders'], List.of(...action.genders))
        if (customizable) {
          const pictures = action.genders.map((gender: any) => ({
            front_image: '',
            back_image: '',
            left_image: '',
            right_image: '',
            gender_id: gender.id
          }))
          map.setIn(['product', 'pictures'], List.of(...pictures))
        }
        return map
      })
    }
    case SET_COLORS: {
      const colors = state.getIn(['product', 'colors']).toJS()
      const pictures = state.getIn(['product', 'pictures']).toJS()
      const gender = state.getIn(['product', 'genders', 0, 'id'])
      Object.keys(colors).forEach((id: string) => {
        const index = pictures.findIndex(
          (picture: any) => picture.color_id === parseInt(id, 10)
        )
        if (!colors[id] && index !== -1) {
          pictures.splice(index, 1)
        } else if (colors[id] && index === -1) {
          pictures.push({
            front_image: '',
            back_image: '',
            left_image: '',
            right_image: '',
            color_id: parseInt(id, 10),
            gender_id: gender || ''
          })
        }
      })
      return state.withMutations((map: any) => {
        map.setIn(['product', 'colors'], fromJS(colors))
        map.setIn(['product', 'pictures'], List.of(...pictures))
        return map
      })
    }
    case CHANGE_VALUE:
      return state.setIn(['product', action.field], fromJS(action.value))
    default:
      return state
  }
}

export default productFormReducer
