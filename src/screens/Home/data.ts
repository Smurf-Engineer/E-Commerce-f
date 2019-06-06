/**
 * Home queries
 */

import gql from 'graphql-tag'
import { graphql } from 'react-apollo'

export const getHomepageInfo = graphql(
  gql`
    mutation getHomepageContent {
      getHomepageContent {
        headerImageMobile: header_image_mobile
        headerImage: header_image
        headerImageLink: header_image_link
      }
    }
  `,
  { name: 'homepageInfo' }
)
