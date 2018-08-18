import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

export const saveDesignName = graphql(
  gql`
    mutation saveDesign($design: DesignInput!, $colors: [String]!) {
      saveDesign(design: $design, colors: $colors) {
        designId: id
        designName: name
        designImage: image
        svg: output_svg
        designCode: code
        shared
        shortId: short_id
        createdAt: created_at
        product {
          id
          code
          yotpoId: yotpo_id
          name
          type: name
          description: short_description
          shortDescription: short_description
          collections
          isTopProduct
          weight
          priceRange {
            quantity
            price
            abbreviation
            shortName: short_name
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
    name: 'saveDesign'
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
    name: 'saveDesignAs'
  }
)
