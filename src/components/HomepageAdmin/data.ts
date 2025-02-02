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
        assetType: type
      }
      featuredBanners {
        id
        url
        urlMobile: url_mobile
        sportId: sport_id,
        isVideo: is_video
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
      carouselSettings {
        slideTransition: slide_transition
        slideDuration: slide_duration
        secondarySlideTransition: secondary_slide_transition
        secondarySlideDuration: secondary_slide_duration
      }
    }
  }
`

export const setMainHeaderMutation = graphql(
  gql`
    mutation setMainHeader(
      $homepageImages: [HomePageImageInput]
      $duration: Int
      $transition: String
      $mainHeader: Boolean
    ) {
      setMainHeader(
        homepageImages: $homepageImages
        duration: $duration
        transition: $transition
        mainHeader: $mainHeader
      ) {
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

export const saveBannersMutation = graphql(
  gql`
    mutation saveBanners($featuredBanners: [InputFeaturedBanner], $sportId: Int) {
      saveBanners(featuredBanners: $featuredBanners, sportId: $sportId) {
        message
      }
    }
  `,
  { name: 'saveBanners' }
)
