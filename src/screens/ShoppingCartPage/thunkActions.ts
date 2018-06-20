import { setItemsAction, resetReducerData } from './actions'
import { Product, CartItemDetail } from '../../types/common'
import findIndex from 'lodash/findIndex'

interface CartItems {
  product: Product
  itemDetails: CartItemDetail[]
  storeDesignId?: string
}

export const setInitialData = () => {
  return async (dispatch: any) => {
    try {
      if (typeof window !== 'undefined') {
        const cartListFromLS = JSON.parse(localStorage.getItem('cart') as any)
        let cartList: any[] = []
        for (let i = 0; i < cartListFromLS.length; i++) {
          const item = cartListFromLS[i]
          if (i === 0) {
            cartList.push(item)
            continue
          }
          const indexOfSameProduct = findIndex(cartList, cartItem => {
            return cartItem.product.id === item.product.id
          })
          if (indexOfSameProduct !== -1) {
            const itemToUpdate = cartList[indexOfSameProduct]
            cartList[indexOfSameProduct].itemDetails = [
              ...itemToUpdate.itemDetails,
              ...item.itemDetails
            ]
          } else {
            cartList.push(item)
          }
        }
        if (cartList) {
          dispatch(setItemsAction(cartList))
        }
      }
    } catch (error) {}
  }
}

export const saveToStorage = (cart: CartItems[]) => {
  return async (dispatch: any) => {
    try {
      localStorage.setItem('cart', JSON.stringify(cart))
      dispatch(resetReducerData())
    } catch (error) {}
  }
}
