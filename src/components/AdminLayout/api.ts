/*
 * AdminLayout ThunkActions
 */
import { SET_USER_ACTION } from '../../store/constants'

export const restoreUserSession = () => {
  return async (dispatch: any) => {
    try {
      const jsonUser = localStorage.getItem('user')
      if (!!jsonUser) {
        const user = JSON.parse(jsonUser)
        dispatch({ type: SET_USER_ACTION, user })
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

export const saveUserSession = (user: object) => {
  return async (dispatch: any) => {
    try {
      if (typeof window !== 'undefined') {
        localStorage.setItem('user', JSON.stringify(user))
      }
      dispatch({ type: SET_USER_ACTION, user })
    } catch (e) {
      console.error(e)
    }
  }
}
