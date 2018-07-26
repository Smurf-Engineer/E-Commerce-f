/**
 * DesignerTool queries
 */

import gql from 'graphql-tag'

export const saveDesignMutation = gql`
  mutation SaveStyle($design: StyleCreation!) {
    design: newProductStyles(styleCreationData: $design) {
      message
    }
  }
`

export const uploadThumbnailMutation = gql`
  mutation SaveStyleImage($image: String!) {
    style: saveStyleImage(image: $image) {
      image
    }
  }
`
