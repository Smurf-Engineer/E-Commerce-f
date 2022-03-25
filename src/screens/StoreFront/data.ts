/**
 * Desgins Queries
 */
import { graphql } from 'react-apollo'
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
      bulletin
      private
      owner
      fixedPrice: fixed_price
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
            collections
            isTopProduct
            weight
            twoPieces: two_pieces
            priceRange {
              quantity
              price
            }
            genders {
              id
              name: gender
            }
            fitStyles {
              id
              info
              name: description
            }
            hideFitStyles: hide_fit_styles
            youthCombined: youth_combined
            sizeRange: size_range {
              id
              name
              isYouth: is_youth
            }
            images: pictures {
              front: front_image
              back: back_image
              left: left_image
              right: right_image
            }
          }
        }
      }
    }
  }
`

export const getTeamStoreMutation = graphql(
  gql`
    query getTeamStore($teamStoreId: String!, $passCode: String) {
      getTeamStore(teamStoreId: $teamStoreId, passCode: $passCode) {
        id
        short_id
        name
        banner
        private
        owner
        fixedPrice: fixed_price
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
            code
            name
            image
            product {
              id
              code
              yotpoId: yotpo_id
              name
              type: name
              description: short_description
              collections
              isTopProduct
              weight
              twoPieces: two_pieces
              priceRange {
                quantity
                price
              }
              genders {
                id
                name: gender
              }
              fitStyles {
                id
                info
                name: description
              }
              hideFitStyles: hide_fit_styles
              youthCombined: youth_combined
              sizeRange: size_range {
                id
                name
                isYouth: is_youth
              }
              images: pictures {
                front: front_image
                back: back_image
                left: left_image
                right: right_image
              }
            }
          }
        }
      }
    }
  `,
  {
    name: 'teamStoreQuery'
  }
)
