/**
 * Desgins Queries
 */
import gql from 'graphql-tag'

export const getSingleTeamStore = gql`
  query getTeamStore($teamStoreId: String!, $passCode: String) {
    getTeamStore(
      teamStoreId: $teamStoreId
      passCode: $passCode
      storeFront: true
    ) {
      id
      short_id
      name
      banner
      private
      owner
      owner_name
      team_size_id
      priceRanges {
        id
        name: quantity_description
      }
      cutoff_date {
        day
        dayOrdinal
        month
      }
      delivery_date {
        day
        dayOrdinal
        month
      }
      items {
        expected_quantity
        visible
        design {
          id
          name
          image
          shortId: short_id
          product {
            id
            yotpoId: yotpo_id
            name
            type: name
            description: short_description
            shortDescription: short_description
            collections
            isTopProduct
            genders {
              id
              name: gender
            }
            fitStyles {
              id
              name: description
            }
            priceRange {
              quantity
              price
            }
            images: pictures {
              front: front_image
              back: back_image
              left: left_image
              right: right_image
            }
          }
        }
        totalOrders
      }
      totalItems
    }
  }
`
