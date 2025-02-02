/**
 * CreateStore queries
 */
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

export const createStoreMutation = graphql(
  gql`
    mutation createTeamStore($teamStore: TeamStoreInput!) {
      store: createTeamStore(teamStore: $teamStore) {
        shortId: short_id
        items {
          id
          visible
          totalOrders
          resellerRange {
            price
            shortName: short_name
            quantity
            abbreviation
          }
          design {
            id
            code
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
                abbreviation
                shortName: short_name
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
      bulletin
      startDate: cutOffDateString
      endDate: deliveryDateString
      privateStore: private
      created_at
      items {
        id
        visible
        design_id
        totalOrders
        resellerRange {
          price
          shortName: short_name
          quantity
          abbreviation
        }
        priceRange {
          price
          shortName: short_name
          quantity
          abbreviation
        }
        design {
          id
          code
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
              abbreviation
              shortName: short_name
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
      datesEdited: dates_edited
    }
  }
`

export const cutoffDateSettingsQuery = gql`
  query getCutoffConfig {
    cutoffDays: getCutoffConfig
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
        comission: margin
        currency
        paypalAccount: paypal_account
      }
    }
  }
`