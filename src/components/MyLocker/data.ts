/**
 * Desgins Queries
 */
import gql from 'graphql-tag'

export const desginsQuery = gql`
  query GetDesigns($limit: Int, $offset: Int, $userId: String) {
    designsResults: myDesigns(limit: $limit, offset: $offset, userId: $userId) {
      fullCount
      userName
      designs {
        id
        code
        name
        image
        shared
        proDesign: pro_design
        shortId: short_id
        createdAt: created_at
        outputSvg: output_svg
        outputPng: output_png
        product {
          id
          code
          yotpoId: yotpo_id
          name
          active
          type: name
          onlyProDesign: only_pro_design
          description: short_description
          shortDescription: short_description
          collections
          isTopProduct
          weight
          twoPieces: two_pieces
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
  }
`

export const designAsPrivateMutation = gql`
  mutation designAsPrivateMutation($designId: String!, $shared: Boolean!) {
    shareDesign(designId: $designId, shared: $shared) {
      message
    }
  }
`

export const deleteDesignMutation = gql`
  mutation deleteDesign($designId: String!) {
    deleteDesign(designId: $designId) {
      message
    }
  }
`

export const duplicateDesignMutation = gql`
  mutation duplicateDesign($designId: String!) {
    duplicateDesign(designId: $designId) {
      message
      design {
        id
        code
        name
        image
        shared
        proDesign: pro_design
        shortId: short_id
        createdAt: created_at
        outputSvg: output_svg
        outputPng: output_png
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
  }
`

export const changeNameMutation = gql`
  mutation changeDesignName($designId: String!, $name: String!) {
    changeDesignName(designId: $designId, name: $name) {
      message
    }
  }
`
