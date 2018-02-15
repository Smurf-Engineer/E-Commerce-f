/**
 * Products query
 */
import gql from 'graphql-tag'

export const productsQuery = gql`
  query GetProducts($gender: Int, $category: Int, $sport: Int, $limit: Int) {
    products(
      gender: $gender
      category: $category
      sport: $sport
      limit: $limit
    ) {
      id
      category_id
      sport_id
      gender
      description
      collections
      isTopProduct
      details
      intended_use
      temperature_range
      materials_info
      images
    }
  }
`
