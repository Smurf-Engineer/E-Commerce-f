/**
 * DesignSearch Queries
 */
import gql from 'graphql-tag'

export const orderSearchQuery = gql`
  query getOrderFiles($code: String!) {
    order: getDesignByCode(code: $code) {
      code
      status: order_status
      image
      assets: media {
        files {
          fileUrl: file_url
          original: original_file
        }
        svgs {
          fileUrl: url
        }
      }
      shortId: short_id
      svgUrl: output_svg
      stitchingValue: flatlock
      stitchingName: flatlock_code
      zipperColor: zipper_color
      bindingColor: binding_color
      bibColor: bib_brace_color
    }
  }
`

export const uploadThumbnailMutation = gql`
  mutation SaveAndUpdateStyleImage($image: String!, $designId: String) {
    style: saveAndUpdateStyleImage(image: $image, designId: $designId) {
      image
    }
  }
`
