/**
 * DesignerTool queries
 */

import gql from 'graphql-tag'

export const saveDesignMutation = gql`
  mutation SaveStyle($style: StyleCreation!) {
    newProductStyles(styleCreationData: $style) {
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
