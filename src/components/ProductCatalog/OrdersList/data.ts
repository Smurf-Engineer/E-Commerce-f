/**
 * Products-ProductsList Queries
 */

import gql from 'graphql-tag'

export const getProductsQuery = gql`
  query getProducts($limit: Int, $offset: Int) {
    productsQuery: products(limit: $limit, offset: $offset) {
      fullCount
      products {
        id
        code
        name
        isCustom: design_center
        mpn
        retailMen: retail_version
        images: original_pictures {
          front: front_image
          back: back_image
          left: left_image
          right: right_image
          genderId: gender_id
          colorId: color_id
        }
      }
    }
  }
`
export const changeActiveProduct = gql`
  mutation SaveStyleImage($image: String!) {
    style: saveStyleImage(image: $image) {
      image
    }
  }
`
