/**
 * ShoppingCart Queries
 */
import gql from 'graphql-tag'

export const getTeamDesignTotal = gql`
  query getTeamDesignTotal($teamStoreItemId: String!) {
    getTeamDesignTotal(teamStoreItemId: $teamStoreItemId) {
      total
    }
  }
`

export const verifyTeamStoreQuery = gql`
  query verifyTeamStore($shortId: String!) {
    verifyTeamStore(shortId: $shortId) {
      cutoff_date
      on_demand_mode
      enabled
      closed
    }
  }
`

export const getProductQuery = gql`
  query GetProductByID($id: Int!) {
    product(id: $id, onlyActive: false) {
      id
      mpn
      upgradeOne: upgrade_one {
        id
        shortId: short_id
        enabled
        name
        url
        defaultOption: default_option
        modalImage: modal_image
        mobileImage: mobile_image
        options {
          aud
          id
          cad
          shortId: short_id
          gbp
          name
          usd
          eur
        }
      }
      upgradeTwo: upgrade_two {
        id
        shortId: short_id
        enabled
        name
        url
        defaultOption: default_option
        modalImage: modal_image
        mobileImage: mobile_image
        options {
          aud
          id
          cad
          shortId: short_id
          gbp
          name
          usd
          eur
        }
      }
    }
  }
`

export const getDesignVariables = gql`
  query GetDesignVariables($id: String!) {
    designVariables: getDesignVariables(id: $id) {
      id
      variableOne: variable_one
      variableTwo: variable_two
      oneLength: variable_one_length
      twoLength: variable_two_length
      variableOneCaps: variable_one_caps
      variableTwoCaps: variable_two_caps
    }
  }
`
