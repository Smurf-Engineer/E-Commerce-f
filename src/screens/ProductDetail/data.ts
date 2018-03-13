import gql from 'graphql-tag'

export const GetProductsByIdQuery = gql`
  query GetProductByID($id: Int!) {
    product(id: $id) {
      id
      name
      type: short_description
      category_id
      sport_id
      sports {
        id
        name
      }
      gender_id
      retail_version
      design_center
      description
      details
      materials_info
      temperature_range
      genders {
        gender
      }
      size_range
      fitStyles {
        id
        description
      }
      collections
      isTopProduct
      intended_use
      pictures {
        front: front_image
        back: back_image
        left: left_image
        right: right_image
      }
      priceRange {
        price
        quantity
      }
    }
  }
`
