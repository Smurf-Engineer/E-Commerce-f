/**
 * Thunk Actions
 */
import { CartItems } from '../../types/common'

export const saveInLocalStorage = (item: CartItems, history: any) => {
  return async () => {
    if (typeof window !== 'undefined') {
      console.log('enters api')

      const cartList = JSON.parse(localStorage.getItem('cart') as any)

      if (cartList) {
        cartList.push(item)
        localStorage.setItem('cart', JSON.stringify(cartList))
      } else {
        const myItems = []
        myItems.push(item)
        localStorage.setItem('cart', JSON.stringify(myItems))
      }
      history.push('/shopping-cart')
    }
  }
}
