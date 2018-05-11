import { setItemsAction } from './actions'

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
