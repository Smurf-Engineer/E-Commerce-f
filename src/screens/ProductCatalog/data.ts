import gql from 'graphql-tag'

export const GetProductsQuery = gql`
  query getProducts {
    products(gender: 0, category: 0, sport: 0, limit: 0) {
      id
      name
      short_description
      category_id
      sport_id
      gender_id
      retail_version
      design_center
      description
      details
      materials_info
      temperature_range
      gender
      size_range
      fit_styles
      collections
      isTopProduct
      intended_use
      pictures {
        id
      }
    }
  }
`
