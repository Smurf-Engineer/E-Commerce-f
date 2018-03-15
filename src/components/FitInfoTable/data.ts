/**
 * Filters queries
 */
import gql from 'graphql-tag'

export const categoriesQuery = gql`
  query GetCategories($bodyChartId: Int!, $genderId: Int!, $metric: String!) {
    bodyChart(
      bodyChartId: $bodyChartId
      genderId: $genderId
      metrics: $metric
    ) {
      size
      waist
      hips
      chest
      inseam
    }
  }
`
