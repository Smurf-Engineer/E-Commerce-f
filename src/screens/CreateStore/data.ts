/**
 * CreateStore queries
 */
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

export const createStoreMutation = graphql(
  gql`
    mutation createTeamStore($teamStore: TeamStoreInput!, $file: Upload) {
      store: createTeamStore(teamStore: $teamStore, file: $file) {
        shortId: short_id
        items {
          id
          visible
          totalOrders
          design {
            id
            image
            name
            shortId: short_id
            product {
              id
              type: name
              description
              yotpoId: yotpo_id
              priceRange {
                quantity
                price
              }
            }
          }
        }
      }
    }
  `,
  { name: 'createStore' }
)

export const updateStoreMutation = graphql(
  gql`
    mutation updateTeamStore($teamStore: TeamStoreInput!, $file: Upload) {
      store: updateTeamStore(teamStore: $teamStore, file: $file) {
        message
      }
    }
  `,
  { name: 'updateStore' }
)

export const GetTeamStoreQuery = gql`
  query GetTeamStore($teamStoreId: String!) {
    teamStore: getTeamStore(teamStoreId: $teamStoreId) {
      id
      shortId: short_id
      name
      banner
      startDate: cutOffDateString
      endDate: deliveryDateString
      privateStore: private
      created_at
      items {
        id
        visible
        design_id
        totalOrders
        design {
          id
          image
          name
          shortId: short_id
          product {
            id
            type: name
            description
            shortDescription: short_description
            yotpoId: yotpo_id
            priceRange {
              quantity
              price
            }
          }
        }
      }
      onDemand: on_demand_mode
      teamSize {
        id
        size
      }
      owner
    }
  }
`
