import gql from 'graphql-tag'
import { graphql } from 'react-apollo'

export const getDesignLabInfo = gql`
  query getDesignLabInfo {
    designLabInfo: getDesignLabInfo {
      deliveryDays: delivery_days
      tutorialPlaylist: tutorial_playlist
      cutOffDays: cutoff_settings
    }
    exchangeRate: getChangeRate {
      id
      shortName: short_name
      rate
      currencyBase: currency_base
    }
  }
`

export const setRatesMutation = graphql(
  gql`
    mutation setRates($currency: String!, $rates: [CurrencyRateInput]) {
      setRates(currency: $currency, rates: $rates) {
        message
      }
    }
  `,
  { name: 'setRates' }
)

export const setDeliveryDaysMutation = graphql(
  gql`
    mutation setDeliveryDays($deliveryDays: Int!) {
      setDeliveryDays(deliveryDays: $deliveryDays) {
        message
      }
    }
  `,
  { name: 'setDeliveryDays' }
)

export const setPlaylistMutation = graphql(
  gql`
    mutation setPlaylist($playlist: String) {
      setPlaylist(playlist: $playlist) {
        message
      }
    }
  `,
  { name: 'setPlaylist' }
)

export const setCutOffDaysMutation = graphql(
  gql`
    mutation setCutOffDays($cutOffDays: Int!) {
      setCutOffDays(cutOffDays: $cutOffDays) {
        message
      }
    }
  `,
  { name: 'setCutOffDays' }
)

export const getCurrencies = gql`
  query getCurrencies {
    currencies: getCurrencies {
      id
      shortName: short_name
    }
  }
`
