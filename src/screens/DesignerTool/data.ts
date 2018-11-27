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

export const createThemeMutation = gql`
  mutation CreateTheme($theme: ThemeInput!) {
    theme: createTheme(themeData: $theme) {
      id
      name
      image
    }
  }
`

export const deleteThemeMutation = gql`
  mutation deleteTheme($id: Int!) {
    deleteTheme(themeId: $id) {
      message
    }
  }
`

export const deleteStyleMutation = gql`
  mutation deleteStyle($id: Int!) {
    deleteStyle(styleId: $id) {
      message
    }
  }
`

export const deleteInspirationMutation = gql`
  mutation deleteInspiration($id: Int!) {
    deleteInspiration(id: $id) {
      message
    }
  }
`
