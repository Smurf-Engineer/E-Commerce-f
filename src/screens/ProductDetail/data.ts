import gql from 'graphql-tag'

export const GetProductsByIdQuery = gql`
  query GetProductByID($id: Int!) {
    product(id: $id) {
      id
      code
      yotpoId: yotpo_id
      name
      type: short_description
      shortDescription: short_description
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
      collections
      isTopProduct
      intendedUse: intended_use
      images: pictures {
        front: front_image
        back: back_image
        left: left_image
        right: right_image
        genderId: gender_id
      }
      priceRange {
        price
        quantity
        abbreviation
        shortName: short_name
      }
      yotpoAverageScore {
        total: total_reviews
        averageScore: average_score
      }
      retailMen: men_retail
      retailWomen: women_retail
    }
  }
`
