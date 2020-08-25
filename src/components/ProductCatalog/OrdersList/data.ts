/**
 * Products-ProductsList Queries
 */

import gql from 'graphql-tag'

export const getProductsQuery = gql`
  query getProducts($limit: Int, $offset: Int, $text: String) {
    productsQuery: products(
      limit: $limit
      offset: $offset
      onlyActive: false
      text: $text
    ) {
      fullCount
      products {
        id
        code
        name
        obj
        mtl
        active
        hasPredyed: has_predyed
        isCustom: design_center
        onlyProDesign: only_pro_design
        mpn
        images: original_pictures {
          front: front_image
          back: back_image
          left: left_image
          right: right_image
          genderId: gender_id
          colorId: color_id
          thumbnail
        }
      }
    }
  }
`
export const changeActiveProduct = gql`
  mutation toggleActive($id: Int!) {
    productResult: toggleActive(id: $id) {
      id
      active
    }
  }
`

export const togglePredyedProduct = gql`
  mutation togglePredyed($id: Int!) {
    productResult: togglePredyed(id: $id) {
      id
      hasPredyed: has_predyed
    }
  }
`
export const changeOnlyPro = gql`
  mutation changeOnlyPro($id: Int!) {
    productResult: changeOnlyPro(id: $id) {
      id
      onlyProDesign: only_pro_design
    }
  }
`
