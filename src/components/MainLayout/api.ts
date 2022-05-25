/*
 * MainLayout ThunkActions
 */
import { SET_USER_ACTION } from '../../store/constants'
import { setRegionAction } from '../../screens/LanguageProvider/actions'
import { getPermissionsQuery } from './data'
import get from 'lodash/get'
import shortId from 'shortid'
import { message } from 'antd'
import { CartItems, RolePermission, UserPermissions, UserType } from '../../types/common'
import { initSlaask } from '../../slaask'
import config from '../../config/index'
import { setItemDetails } from '../../screens/ShoppingCartPage/thunkActions'
import findIndex from 'lodash/findIndex'
import { setItemsAction } from '../../screens/ShoppingCartPage/actions'

export const restoreUserSession = () => {
  return async (dispatch: any) => {
    try {
      const jsonUser = localStorage.getItem('user')
      const currentRegion = localStorage.getItem('currentRegion')
      if (!!jsonUser) {
        const userObject = JSON.parse(jsonUser)
        dispatch({ type: SET_USER_ACTION, user: userObject })
      }
      if (!!currentRegion) {
        const regionObject = JSON.parse(currentRegion)
        const { region, localeIndex, locale, currency } = regionObject
        dispatch(
          setRegionAction({
            region,
            localeIndex,
            locale,
            currency
          })
        )
      }
    } catch (e) {
      console.error(e)
    }
  }
}

export const deleteUserSession = () => {
  return async (dispatch: any) => {
    try {
      localStorage.removeItem('user')
      dispatch({ type: SET_USER_ACTION, user: null })
    } catch (e) {
      console.error(e)
    }
  }
}

export const setItemsCart = async (client: any, cart: string) => {
  const { query } = client || {}
  const cartListFromLS =
  (JSON.parse(cart || '{}') as CartItems[]) ||
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
  return cartList
}

export const saveUserSession = (userObject: object, client: any, cart?: string) => {
  return async (dispatch: any) => {
    try {
      if (typeof window !== 'undefined') {
        localStorage.setItem('user', JSON.stringify(userObject))
        let cartList: CartItems[] = []
        if (cart && cart.length > 0 && cart !== '[]') {
          localStorage.setItem('cart', cart)
          cartList = await setItemsCart(client, cart || '')
        } else {
          localStorage.removeItem('cart')
        }
        dispatch(setItemsAction(cartList))
      }
      const permissions = await getPermissions(client)
      const user = { ...userObject, permissions }
      dispatch({ type: SET_USER_ACTION, user })
    } catch (e) {
      console.error(e)
    }
  }
}

export const getPermissions = async (client: any) => {
  try {
    const { query } = client
    const response = await query({
      query: getPermissionsQuery,
      fetchPolicy: 'network-only'
    })
    const resultArray = get(response, 'data.permissions', [])
    const permissions = resultArray.reduce(
      (obj: UserPermissions, permission: RolePermission) => {
        obj[permission.page] = permission
        return obj
      },
      {}
    )
    return permissions
  } catch (e) {
    message.error('Error retrieving permissions')
  }
}

export const openSupport = (user: UserType) => {
  try {
    let id = sessionStorage.getItem('slaaskSupportId')
    if (!id) {
      const slaaskId = shortId.generate()
      sessionStorage.setItem('slaaskSupportId', slaaskId)
      id = slaaskId
    }
    const { email, name, lastName, id: userId, managerName, userCode } = user || {}
    const info = {
      id,
      email,
      userId,
      name,
      lastName,
      managerName,
      userCode
    }
    initSlaask(info, true)
  } catch (error) {
    message.error(error)
  }
}

export const saveCartCloud = async (cart: string) => {
  try {
    const user = JSON.parse(localStorage.getItem('user') || '{}')
    if (user) {
      await fetch(
        `${config.graphqlUriBase}save-cart`,
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${user.token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ cart })
        }
      )
    }
    return
  } catch (e) {
    return Promise.reject(e)
  }
}