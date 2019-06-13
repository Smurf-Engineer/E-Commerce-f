import gql from 'graphql-tag'
import { graphql } from 'react-apollo'

export const getDesignLabAdmin = gql`
  query getDesignLabAdmin {
    getDesignLabAdmin {
      deliveryDays: delivery_days
      tutorialPlaylist: tutorial_playlist
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
