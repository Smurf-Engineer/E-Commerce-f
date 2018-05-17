import { setItemsAction } from './actions'
import { Product, CartItemDetail } from '../../types/common'

interface CartItems {
  product: Product
  itemDetails: CartItemDetail[]
  store_design_id?: string
}

export const setInitialData = () => {
  return async (dispatch: any) => {
    try {
      if (typeof window !== 'undefined') {
        const cartList = JSON.parse(localStorage.getItem('cart') as any)
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
    } catch (error) {}
  }
}
