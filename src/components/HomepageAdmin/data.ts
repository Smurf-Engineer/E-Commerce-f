import gql from 'graphql-tag'
import { graphql } from 'react-apollo'

export const getHomepageInfo = gql`
  query getHomepageContent {
    getHomepageContent {
      headerImageMobile: header_image_mobile
      headerImage: header_image
      headerImageLink: header_image_link
      homepageImages {
        id
        desktopImage: image
        mobileImage: image_mobile
        url: link
      }
    }
  }
`

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

export const setSecondaryHeaderMutation = graphql(
  gql`
    mutation setSecondaryHeader($homepageImages: [HomePageImageInput]) {
      setSecondaryHeader(homepageImages: $homepageImages) {
        message
      }
    }
  `,
  { name: 'setSecondaryHeader' }
)
