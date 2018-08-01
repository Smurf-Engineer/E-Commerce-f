/**
 * Designs queries
 */

import gql from 'graphql-tag'

export const styleQuery = gql`
  query getStyle($designId: String!) {
    design: sharedDesignShortId(designId: $designId) {
      id
      name
      product {
        name
        code
        id
      }
      svg: output_svg
    }
  }
`
