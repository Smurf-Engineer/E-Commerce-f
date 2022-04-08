/*
 * MainLayout ThunkActions
 */
import { SET_USER_ACTION } from '../../store/constants'
import { setRegionAction } from '../../screens/LanguageProvider/actions'
import { getPermissionsQuery } from './data'
import get from 'lodash/get'
import shortId from 'shortid'
import { message } from 'antd'
import { RolePermission, UserPermissions, UserType } from '../../types/common'
import { initSlaask } from '../../slaask'

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