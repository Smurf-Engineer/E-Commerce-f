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
