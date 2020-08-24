import get from 'lodash/get'
import message from 'antd/lib/message'
import { setLoadingAction, setVariantsAction } from './actions'
import { getVariantsFromProduct } from './data'
import { ModelVariant } from '../../types/common'

export const getVariants = (query: any, id: number) => {
  return async (dispatch: any) => {
    if (id) {
      try {
        const response = await query({
          query: getVariantsFromProduct,
          variables: { id },
          fetchPolicy: 'no-cache'
        })
        const array: ModelVariant[] = get(response, 'data.getVariants', {})
        let defaultIndex = ''
        const variants = array.reduce((obj, model: ModelVariant) => {
          if (model.default) {
            defaultIndex = model.id
          }
          obj[model.id] = model
          return obj
          // tslint:disable-next-line: align
        }, {})
        // const responsePredyed = await query({
        //   query: getPredyedColors,
        //   variables: { id },
        //   fetchPolicy: 'no-cache'
        // })
        // const arrayColors: PredyedColor[] = get(responsePredyed, 'data.getPredyedColors', {})
        // const predyedColors = arrayColors.reduce((obj, color: PredyedColor) => {
        //   obj[color.id] = color
        //   return obj
        //   // tslint:disable-next-line: align
        // }, {})
        dispatch(setVariantsAction(variants, defaultIndex, {}))
      } catch (e) {
        message.error(e)
        dispatch(setLoadingAction(false))
      }
    } else {
      dispatch(setLoadingAction(false))
    }
  }
}
