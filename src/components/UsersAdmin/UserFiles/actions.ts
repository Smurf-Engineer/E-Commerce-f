/**
 * UsersFiles  Actions - Created by eduardoquintero on 21/01/20.
 */

import { SET_UPLOADING } from './constants'

import { AnyAction } from '../../../types/common'

export const setUploadingAction = (uploading: boolean): AnyAction => ({
  type: SET_UPLOADING,
  uploading
})
