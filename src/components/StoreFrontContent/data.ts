/**
 * Desgins Queries
 */
import gql from 'graphql-tag'

export const getSingleTeamStore = gql`
  query getTeamStore(
    $teamStoreId: String!
    $passCode: String
    $date: HolyDate
    $limit: Int
    $offset: Int
  ) {
    getTeamStore(
      teamStoreId: $teamStoreId
      passCode: $passCode
      storeFront: true
      date: $date
      limit: $limit
      offset: $offset
    ) {
      id
      short_id
      name
      banner
      private
      bulletin
      isResellerStore
      owner
      featured
      owner_name
      display
      onDemandMode: on_demand_mode
      team_size_id
      closed
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
        short_id
        priceRange {
          price
          shortName: short_name
          quantity
          abbreviation
        }
        resellerRange {
          price
          shortName: short_name
          quantity
          abbreviation
        }
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
            active
            type: name
            onlyProDesign: only_pro_design
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
      totalDesigns
    }
  }
`

export const profileSettingsQuery = gql`
  query profile {
    profileData: getUserProfile {
      userProfile {
        firstName: first_name
        lastName: last_name
        email
        phone
      }
      reseller {
        status
        currency
        comission
        paypalAccount: paypal_account
      }
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
