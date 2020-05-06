import { setItemsAction, resetReducerData } from './actions'
import { Product, CartItemDetail } from '../../types/common'
import findIndex from 'lodash/findIndex'
import has from 'lodash/has'
import first from 'lodash/first'
import { getTeamDesignTotal } from './data'
import get from 'lodash/get'

interface CartItems {
  product: Product
  itemDetails: CartItemDetail[]
  storeDesignId?: string
  teamStoreItem?: string
  totalOrder?: number
  isFixed?: boolean
  designId?: string
  designCode?: string
}

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

export const saveToStorage = (cart: CartItems[]) => {
  return async (dispatch: any) => {
    try {
      localStorage.setItem('cart', JSON.stringify(cart))
      dispatch(resetReducerData())
    } catch (error) {
      console.error(error)
    }
  }
}

const setItemDetails = async (cartItem: CartItems, query: any) => {
  const {
    itemDetails,
    teamStoreItem,
    isFixed,
    product: { genders, fitStyles, sizeRange }
  } = cartItem
  if (!has(itemDetails[0], 'gender') && genders.length === 1 && genders[0].id) {
    itemDetails[0].gender = first(genders)
  }
  if (
    !has(itemDetails[0], 'fit') &&
    fitStyles.length === 1 &&
    fitStyles[0].id
  ) {
    itemDetails[0].fit = first(fitStyles)
  }
  if (
    !has(itemDetails[0], 'size') &&
    sizeRange.length === 1 &&
    sizeRange[0].id
  ) {
    itemDetails[0].size = first(sizeRange)
  }
  if (teamStoreItem && isFixed) {
    const response = await query({
      query: getTeamDesignTotal,
      variables: { teamStoreItemId: teamStoreItem },
      fetchPolicy: 'no-cache'
    })
    const totalOrder = get(response, 'data.getTeamDesignTotal.total', 0)
    cartItem.totalOrder = totalOrder
  }
  return cartItem
}
