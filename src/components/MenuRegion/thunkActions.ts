import { setRegionAction } from '../../screens/LanguageProvider/actions'
import { RegionConfig } from '../../types/common'

export const saveRegion = (regionObject: RegionConfig) => {
  return async (dispatch: any) => {
    try {
      if (typeof window !== 'undefined') {
        localStorage.setItem('currentRegion', JSON.stringify(regionObject))
      }
      const { region, localeIndex, locale, currency } = regionObject
      dispatch(
        setRegionAction({
          region,
          localeIndex,
          locale,
          currency
        })
      )
    } catch (e) {
      console.error(e)
    }
  }
}
