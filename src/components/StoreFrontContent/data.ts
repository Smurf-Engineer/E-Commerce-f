/**
 * Desgins Queries
 */
import gql from 'graphql-tag'

export const getSingleTeamStore = gql`
  query getTeamStore($teamStoreId: String!, $passCode: String) {
    getTeamStore(teamStoreId: $teamStoreId, passCode: $passCode) {
      id
      short_id
      name
      banner
      private
      owner
      owner_name
      team_size_id
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
        design {
          id
          name
          image
          product {
            id
            yotpoId: yotpo_id
            name
            type: name
            description: short_description
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
