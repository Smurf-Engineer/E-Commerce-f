/**
 * Thunk Actions
 */
import { CartItems } from '../../types/common'
import { saveCartCloud } from '../MainLayout/api'

export const saveInLocalStorage = async (item: CartItems, history: any) => {
  if (typeof window !== 'undefined') {
    const cartList = JSON.parse(localStorage.getItem('cart') as any)

    if (cartList) {
      cartList.push(item)
      const cart = JSON.stringify(cartList)
      localStorage.setItem('cart', cart)
      saveCartCloud(cart)
    } else {
      const myItems = []
      myItems.push(item)
      const cart = JSON.stringify(myItems)
      localStorage.setItem('cart', cart)
      saveCartCloud(cart)
    }
    history.push('/shopping-cart')
  }
}
