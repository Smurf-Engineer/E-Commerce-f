import findIndex from 'lodash/findIndex'
import { CartItems } from '../../types/common'
import { setItemsAction } from '../../screens/ShoppingCartPage/actions'
import { setItemDetails } from '../../screens/ShoppingCartPage/thunkActions'

export const setInitialData = (query: any) => {
  return async (dispatch: any) => {
    try {
      if (typeof window !== 'undefined') {
        const cartListFromLS =
          (JSON.parse(localStorage.getItem('cart') as string) as CartItems[]) ||
          []
        let cartList: CartItems[] = []
        for (let i = 0; i < cartListFromLS.length; i++) {
          const item = await setItemDetails(cartListFromLS[i], query)

          if (i === 0) {
            cartList.push(item)
            continue
          }
          const indexOfSameProduct = findIndex(cartList, (cartItem) => {
            return (
              cartItem.product.id === item.product.id &&
              item.designId === cartItem.designId
            )
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
    } catch (error) {
      console.error(error)
    }
  }
}