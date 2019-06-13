/**
 * Home queries
 */

import gql from 'graphql-tag'

export const getHomepageInfo = gql`
  query getHomepageContent {
    getHomepageContent {
      headerImageMobile: header_image_mobile
      headerImage: header_image
      headerImageLink: header_image_link
    }
  }
`
