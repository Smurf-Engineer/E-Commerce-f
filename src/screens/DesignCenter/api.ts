/**
 * Thunk Actions
 */
import message from 'antd/lib/message'
import config from '../../config/index'
import get from 'lodash/get'
import { uploadFileSuccessAction, setUploadingAction } from './actions'
import { DesignSaved, CartItemDetail } from '../../types/common'
import { mesaureImageQuality } from '../../utils/utilsImage/utilsImage'

export const uploadFileAction = (file: any) => {
  return async (dispatch: any) => {
    try {
      dispatch(setUploadingAction(true))

      const user = JSON.parse(localStorage.getItem('user') || '')
      const formData = new FormData()

      formData.append('file', file)
      try {
        const blurScore = await mesaureImageQuality(file)
        formData.append('blurScore', blurScore as string)
      } catch (e) {
        message.error(e)
      }

      const response = await fetch(`${config.graphqlUriBase}upload/file`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${user.token}`
        },
        body: formData
      })
      if (response.ok) {
        const data = await response.json()
        dispatch(uploadFileSuccessAction(data))
      } else {
        const error = await response.text()
        throw error
      }

    } catch (e) {
      dispatch(setUploadingAction(false))
      message.error(e)
    }
  }
}

export const saveToCartAction = (item: DesignSaved) => {
  return async () => {
    const productName = get(item, 'product.name')

    const details = [] as CartItemDetail[]
    const detail = {
      quantity: 1
    }
    details.push(detail)
    const itemToAdd = Object.assign(
      {},
      { product: item.product },
      {
        itemDetails: details
      },
      { designId: get(item, 'designId') },
      { designName: get(item, 'designName') },
      { designImage: get(item, 'designImage') },
      { designCode: get(item, 'designCode') }
    )
    if (typeof window !== 'undefined') {
      const cartList = JSON.parse(localStorage.getItem('cart') as any)
      if (cartList) {
        cartList.push(itemToAdd)
        localStorage.setItem('cart', JSON.stringify(cartList))
      } else {
        const myItems = []
        myItems.push(itemToAdd)
        localStorage.setItem('cart', JSON.stringify(myItems))
      }
      message.success(`${productName} added to cart`)
    }
  }
}
