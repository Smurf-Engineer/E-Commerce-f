/**
 * Desgins Queries
 */
// import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

export const getSingleTeamStore = gql`
  query getTeamStore($teamStoreId: String!, $passCode: String) {
    getTeamStore(teamStoreId: $teamStoreId, passCode: $passCode) {
      id
      name
      banner
      private
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
      }
    }
  }
`

// export const getTeamStore = graphql(
//   gql`
//   query getTeamStore($teamStoreId: String!, $passCode: String){
//     getTeamStore(teamStoreId: $teamStoreId, passCode:$passCode){
//       id
//       private
//       cutoff_date{
//         day
//         dayOrdinal
//         month
//       }
//       delivery_date{
//         day
//         dayOrdinal
//         month
//       }
//       items{
//         design{
//           id
// name
// image
// product {
//   id
//   yotpoId: yotpo_id
//   name
//   type: name
//   description: short_description
//   collections
//   isTopProduct
//   priceRange {
//     quantity
//     price
//   }
//   images: pictures {
//     front: front_image
//     back: back_image
//     left: left_image
//     right: right_image
//   }
// }
//         }
//         expected_quantity
//       }
//     }
//   `,
//   {
//     name: 'teamStoreQuery'
//   }
// )
