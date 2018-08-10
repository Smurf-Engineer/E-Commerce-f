import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

export const saveDesignName = graphql(
  gql`
    mutation saveDesign($design: DesignInput!, $colors: [String]!) {
      saveDesign(design: $design, colors: $colors) {
        id
        name
        shortId: short_id
        image
        svg: output_svg
        product {
          id
          code
          yotpoId: yotpo_id
          name
          type: name
          description: short_description
          collections
          isTopProduct
          weight
          priceRange {
            quantity
            price
          }
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
          images: pictures {
            front: front_image
            back: back_image
            left: left_image
            right: right_image
          }
        }
      }
    }
  `,
  {
    name: 'saveDesignNameMutation'
  }
)

export const saveDesignChanges = graphql(
  gql`
    mutation saveDesignAs(
      $designId: String!
      $designObj: DesignInput!
      $colors: [String]!
    ) {
      saveDesignAs(
        designId: $designId
        designObj: $designObj
        colors: $colors
      ) {
        message
      }
    }
  `,
  {
    name: 'saveDesignChangesMutation'
  }
)
