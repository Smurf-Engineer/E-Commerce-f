import gql from 'graphql-tag'

export const getRelatedProducts = gql`
  query getRelatedProducts($productId: Int, $relatedItemTag: String) {
    products: getRelatedProducts(id: $productId, relatedTag: $relatedItemTag) {
      id
      type: name
      code
      name
      mpn
      chart
      flatlock
      category_id
      title
      branding
      gender_id
      retail_version
      details
      active
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
      genders {
        id
        name: gender
      }
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
