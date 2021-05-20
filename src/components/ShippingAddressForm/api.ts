/**
 * API REST Calls actions
 */
import message from 'antd/lib/message'

var googleAutocompleteService: any
var googlePlacesService: any

const getAddressPredictionsPromise = async address =>
  new Promise((resolve, reject) => {
    if (!address) {
      return reject('Need valid address input')
    }

    if (typeof window === 'undefined') {
      return reject('Need valid window object')
    }

    try {
      if (!googleAutocompleteService) {
        googleAutocompleteService = new window.google.maps.places.AutocompleteService()
      }
      googleAutocompleteService.getPlacePredictions(
        { input: address },
        resolve
      )
    } catch (e) {
      reject(e)
    }
  })

export const getAddressPredictions = async (
  address: string
) => {
  try {
    const response = await getAddressPredictionsPromise(address)
    return response

  } catch (e) {
    message.error(e.message)
  }
}

const getAddressDetailsPromise = async placeId =>
  new Promise((resolve, reject) => {
    if (!placeId) {
      return reject('Need valid place ID input')
    }

    if (typeof window === 'undefined') {
      return reject('Need valid window object')
    }

    try {
      if (!googlePlacesService) {
        googlePlacesService = new window.google.maps.places.PlacesService(document.createElement('div'))
      }
      googlePlacesService.getDetails(
        { placeId },
        resolve
      )
    } catch (e) {
      reject(e)
    }
  })

export const getAddressDetails = async (
  placeId: string
) => {

  try {
    const data = await getAddressDetailsPromise(placeId)
    return data.address_components

  } catch (e) {
    message.error(e.message)
  }
}