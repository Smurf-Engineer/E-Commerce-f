/**
 * Filters queries
 */
import gql from 'graphql-tag'

export const categoriesQuery = gql`
  query GetCategories($id: Int!) {
    product(id: $id) {
      bodyChartId: body_chart_id
      genders {
        id
        name: gender
      }
      fitStyles {
        id
        name: description
        info
        image
      }
    }
  }
`
