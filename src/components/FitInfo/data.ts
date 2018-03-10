/**
 * Filters queries
 */

import gql from 'graphql-tag'

export const categoriesQuery = gql`
  query GetCategories($id: Int!) {
    genders {
      id
      name: gender
    }
    fitStyles {
      id
      name: description
    }
    product(id: $id) {
      genders {
        id
        name: gender
      }
      fitStyles {
        id
        name: description
      }
    }
    bodyChart(bodyChartId: 1, genderId: 1) {
      size
      waist
      chest
      inseam
    }
  }
`
