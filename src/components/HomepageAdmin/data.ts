import gql from 'graphql-tag'
import { graphql } from 'react-apollo'

export const getHomepageInfo = graphql(
  gql`
    mutation getHomepageContent {
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

export const productsQuery = gql`
  query GetDesigns($limit: Int, $offset: Int) {
    products: products(limit: $limit, offset: $offset) {
      fullCount
      products {
        id
        code
        yotpoId: yotpo_id
        name
        type: name
        description: short_description
        shortDescription: short_description
        collections
        isTopProduct
        weight
        mpn
        genders {
          id
          name: gender
        }
        fitStyles {
          id
          name: description
        }
        sizeRange: size_range {
          id
          name
        }
        priceRange {
          quantity
          price
          abbreviation
          shortName: short_name
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
`

export const setFeaturedProductsMutation = graphql(
  gql`
    mutation setFeaturedProducts($products: [IdInput]) {
      setFeaturedProducts(products: $products) {
        message
      }
    }
  `,
  { name: 'setFeaturedProducts' }
)
