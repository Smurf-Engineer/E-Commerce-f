/*
 * MainLayout ThunkActions
 */
import { SET_USER_ACTION } from '../../store/constants'
import { setRegionAction } from '../../screens/LanguageProvider/actions'
import { getPermissionsQuery } from './data'
import get from 'lodash/get'
import { message } from 'antd'
import { RolePermission, UserPermissions } from '../../types/common'

export const restoreUserSession = (client: any) => {
  return async (dispatch: any) => {
    try {
      const jsonUser = localStorage.getItem('user')
      const currentRegion = localStorage.getItem('currentRegion')
      if (!!jsonUser) {
        const userObject = JSON.parse(jsonUser)
        const permissions = await getPermissions(client)
        const user = { ...userObject, permissions }
        dispatch({ type: SET_USER_ACTION, user })
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

export const saveUserSession = (userObject: object, client: any) => {
  return async (dispatch: any) => {
    try {
      if (typeof window !== 'undefined') {
        localStorage.setItem('user', JSON.stringify(userObject))
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
