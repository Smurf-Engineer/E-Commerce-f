/**
 * Account-TrackingInfo Queries
 */
import gql from 'graphql-tag'

export const getTrackingInfoQuery = gql`
  query GetTrackingInfo($code: String!) {
    trackingInfo: getTrackingInfo(code: $code)
  }
`