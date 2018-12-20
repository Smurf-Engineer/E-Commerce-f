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
          code
          name
          image
          shortId: short_id
          product {
            id
            code
            yotpoId: yotpo_id
            name
            type: name
            description: short_description
            shortDescription: short_description
            collections
            isTopProduct
            weight
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
              abbreviation
              shortName: short_name
            }
            sizeRange: size_range {
              id
              name
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

/* TODO: are needed these fields?
  priceRanges {
    id
    name: quantity_description
    abbreviation
    shortName: short_name
  }
*/
