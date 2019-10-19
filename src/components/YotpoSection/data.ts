import gql from 'graphql-tag'

export const getRelatedProducts = gql`
  query getRelatedProducts($productId: Int, $relatedItemTag: String) {
    products: getRelatedProducts(id: $productId, relatedTag: $relatedItemTag) {
      id
      type: name
      description: short_description
      images: pictures {
        front: front_image
        thumbnail
        genderId: gender_id
      }
      isTopProduct
      customizable: design_center
      genderId: gender_id
      yotpoId: yotpo_id
      priceRange {
        price
        quantity
        abbreviation
        shortName: short_name
      }
      colors {
        id
        name
        image
      }
    }
  }
`
