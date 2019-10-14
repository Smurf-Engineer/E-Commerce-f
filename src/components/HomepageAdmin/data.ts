import gql from 'graphql-tag'
import { graphql } from 'react-apollo'

export const getHomepageInfo = gql`
  query getHomepageContent($route: String) {
    getHomepageContent(sportRoute: $route) {
      id
      mainHeaderImages {
        id
        desktopImage: image
        mobileImage: image_mobile
        url: link
        assetType: type
      }
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
        featuredId: featured_id
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
    mutation setMainHeader($homepageImages: [HomePageImageInput]) {
      setMainHeader(homepageImages: $homepageImages) {
        id
        image
        image_mobile
        link
        type
      }
    }
  `,
  { name: 'setMainHeader' }
)

export const setSecondaryHeaderMutation = graphql(
  gql`
    mutation setSecondaryHeader($homepageImages: [HomePageImageInput]) {
      setSecondaryHeader(homepageImages: $homepageImages) {
        id
        image
        image_mobile
        link
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
    mutation setFeaturedProducts($products: [Int], $sportId: Int) {
      setFeaturedProducts(products: $products, sportId: $sportId) {
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
        id
        title
        contentTile: content_tile
        image
      }
    }
  `,
  { name: 'updateProductTiles' }
)
