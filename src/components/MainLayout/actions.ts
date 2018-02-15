import { SHOW_HEADER_SEARCH_RESULTS } from './constants'
import { AnyAction } from '../../types/common'

export const showSearchResults = (show: boolean): AnyAction => {
  return {
    type: SHOW_HEADER_SEARCH_RESULTS,
    show
  }
}
