/**
 * Home queries
 */

import gql from 'graphql-tag'

export const QuickViewQuery = gql`
  query GetProductById($id: Int!) {
    product(id: $id) {
      id
      code
      yotpoId: yotpo_id
      name
      description
      shortDescription: short_description
      collections
      details
      weight
      genders {
        id
        name: gender
      }
      fitStyles {
        id
        info
        name: description
      }
      materials: materials_info
      temperature: temperature_range
      priceRange {
        quantity
        price
        abbreviation
        shortName: short_name
      }
      yotpoAverageScore {
        total: total_reviews
        averageScore: average_score
      }
      images: original_pictures {
        front: front_image
        back: back_image
        left: left_image
        right: right_image
        genderId: gender_id
      }
      retailMen: men_retail
      retailWomen: women_retail
    }
  }
`
