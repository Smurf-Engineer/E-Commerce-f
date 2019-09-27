/**
 * Products query
 */

import gql from 'graphql-tag'

// TODO: delete alias
export const productsQuery = gql`
  query GetProducts(
    $gender: String
    $category: String
    $sport: String
    $sportGroup: String
  ) {
    products(
      gender: $gender
      category: $category
      sport: $sport
      sportGroup: $sportGroup
      limit: 6
      order: "id"
      onlyCustom: true
    ) {
      fullCount
      products {
        id
        code
        yotpoId: yotpo_id
        name
        type: name
        description: short_description
        shortDescription: short_description
        isTopProduct
        customizable: design_center
        retailMen: men_retail
        retailWomen: women_retail
        genders {
          id
          name: gender
        }
        priceRange {
          quantity
          price
          abbreviation
          shortName: short_name
        }
        images: pictures {
          front: front_image
          genderId: gender_id
          thumbnail
        }
        colors {
          name
          image
        }
      }
    }
  }
`
