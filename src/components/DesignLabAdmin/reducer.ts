/**´
 * DesignLabAdmin Reducer - Created by eduardoquintero on 12/06/19.
 */

import { fromJS } from 'immutable'
import { Reducer } from '../../types/common'

export const initialState = fromJS({
  loading: false
})

const designLabAdminReducer: Reducer<any> = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state
  }
}

export default designLabAdminReducer
