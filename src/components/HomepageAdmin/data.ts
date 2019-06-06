import gql from 'graphql-tag'
import { graphql } from 'react-apollo'

export const getHomepageInfo = graphql(
  gql`
    mutation getHomepageContent {
      getHomepageContent {
        headerImageMobile: header_image_mobile
        headerImage: header_image
        headerImageLink: header_image_link
        homepageImages: homepage_images
      }
    }
  `,
  { name: 'homepageInfo' }
)

export const setMainHeaderMutation = graphql(
  gql`
    mutation setMainHeader(
      $headerImage: String!
      $headerImageMobile: String!
      $headerImageLink: String!
    ) {
      setMainHeader(
        headerImage: $headerImage
        headerImageMobile: $headerImageMobile
        headerImageLink: $headerImageLink
      ) {
        message
      }
    }
  `,
  { name: 'setMainHeader' }
)
