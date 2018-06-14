import messages from './messages'

import fondoImage from '../../assets/comp_fondo.png'
import tourImage from '../../assets/comp_tour.png'
import novaImage from '../../assets/comp_nova.png'

const jerseysInfo = [
  {
    title: messages.fondoTitle,
    image: fondoImage,
    message: messages.fondoMessage,
    details: [
      messages.fondoDetail1,
      messages.fondoDetail2,
      messages.fondoDetail3,
      messages.fondoDetail4,
      messages.fondoDetail5,
      messages.fondoDetail6
    ],
    intendedUse: messages.fondoIntentedUse,
    weather: messages.fondoWeather,
    fits: [messages.fondoFit1, messages.fondoFit2],
    materials: [
      messages.fondoMaterial1,
      messages.fondoMaterial2,
      messages.fondoMaterial3
    ],
    prices: [
      messages.fondoPrice1,
      messages.fondoPrice2,
      messages.fondoPrice3,
      messages.fondoPrice4,
      messages.priceCallUs
    ]
  },
  {
    title: messages.tourTitle,
    image: tourImage,
    message: messages.tourMessage,
    details: [
      messages.tourDetail1,
      messages.tourDetail2,
      messages.tourDetail3,
      messages.tourDetail4,
      messages.tourDetail5,
      messages.tourDetail6
    ],
    intendedUse: messages.tourIntentedUse,
    weather: messages.fondoWeather,
    fits: [messages.tourFit1, messages.tourFit2, messages.tourFit3],
    materials: [
      messages.tourMaterial1,
      messages.tourMaterial2,
      messages.tourMaterial3,
      messages.tourMaterial4,
      messages.tourMaterial5
    ],
    prices: [
      messages.tourPrice1,
      messages.tourPrice2,
      messages.tourPrice3,
      messages.tourPrice4,
      messages.priceCallUs
    ]
  },
  {
    title: messages.novaTitle,
    image: novaImage,
    message: messages.novaMessage,
    details: [
      messages.novaDetail1,
      messages.novaDetail2,
      messages.novaDetail3,
      messages.novaDetail4,
      messages.novaDetail5,
      messages.novaDetail6,
      messages.novaDetail7
    ],
    intendedUse: messages.novaIntentedUse,
    weather: messages.fondoWeather,
    fits: [messages.novaFit1, messages.novaFit2],
    materials: [
      messages.novaMaterial1,
      messages.novaMaterial2,
      messages.novaMaterial3,
      messages.novaMaterial4
    ],
    prices: [
      messages.novaPrice1,
      messages.novaPrice2,
      messages.novaPrice3,
      messages.novaPrice4,
      messages.priceCallUs
    ]
  }
]

export default jerseysInfo
