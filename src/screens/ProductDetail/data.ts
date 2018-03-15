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
      customizable: design_center
      description
      details
      materials: materials_info
      temperatures: temperature_range
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
      intendedUse: intended_use
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
