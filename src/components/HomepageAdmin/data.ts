import gql from 'graphql-tag'
import { graphql } from 'react-apollo'

export const getHomepageInfo = gql`
  query getHomepageContent {
    getHomepageContent(sportRoute: "cycl") {
      headerImageMobile: header_image_mobile
      headerImage: header_image
      headerImageLink: header_image_link
      id
      homepageImages {
        id
        desktopImage: image
        mobileImage: image_mobile
        url: link
      }
      featuredProducts {
        id
        code
        name
        custom: design_center
        description: short_description
        shortDescription: short_description
        mpn
        images: pictures {
          front: front_image
        }
      }
      productTiles {
        id
        title
        contentTile: content_tile
        image
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
      $id: Int!
    ) {
      setMainHeader(
        headerImage: $headerImage
        headerImageMobile: $headerImageMobile
        headerImageLink: $headerImageLink
        id: $id
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
        name
        custom: design_center
        description: short_description
        shortDescription: short_description
        mpn
        images: pictures {
          front: front_image
        }
      }
    }
  }
`

export const setFeaturedProductsMutation = graphql(
  gql`
    mutation setFeaturedProducts($products: [Int]) {
      setFeaturedProducts(products: $products) {
        message
      }
    }
  `,
  { name: 'setFeaturedProducts' }
)

export const deleteFeaturedProductMutation = graphql(
  gql`
    mutation deleteFeaturedProduct($id: Int) {
      deleteFeaturedProduct(id: $id) {
        message
      }
    }
  `,
  { name: 'deleteFeaturedProduct' }
)

export const updateProductTilesMutation = graphql(
  gql`
    mutation updateProductTiles($products: [ProductTilesInput]) {
      updateProductTiles(products: $products) {
        message
      }
    }
  `,
  { name: 'updateProductTiles' }
)
