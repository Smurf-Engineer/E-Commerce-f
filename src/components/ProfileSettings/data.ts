// import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

export const regionsQuery = gql`
  query regions {
    regionsOptions: regions {
      id
      label: name
      icon
      code
      currencies {
        id
        name
        shortName: short_name
        abbreviation
      }
      languages {
        id
        name
        shortName: short_name
      }
    }
  }
`

// export const PlaceOrderMutation = graphql(
//   gql`
//     mutation charge($orderObj: OrderInput!) {
//       charge(order: $orderObj) {
//         id
//         short_id
//         created_at
//       }
//     }
//   `,
//   {
//     name: 'placeOrder'
//   }
// )
