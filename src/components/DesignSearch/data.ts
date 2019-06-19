/**
 * DesignSearch Queries
 */
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'

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
      pdfUrl: output_pdf
      stitchingValue: flatlock
      stitchingName: flatlock_code
      zipperColor: zipper_color
      bindingColor: binding_color
      bibColor: bib_brace_color
    }
  }
`

export const uploadThumbnailMutation = gql`
  mutation saveStyleImage($image: String!) {
    style: saveStyleImage(image: $image) {
      image
    }
  }
`

export const updateDesignMutation = gql`
  mutation updateDesign(
    $code: String!
    $accessories: DesignAccessories
    $svg: String!
    $thumbnail: String!
  ) {
    updateDesign(
      code: $code
      accessories: $accessories
      svg: $svg
      thumbnail: $thumbnail
    ) {
      message
    }
  }
`

export const getFonts = graphql(
  gql`
    query GetFonts {
      fonts: getFonts {
        id
        family
        active
      }
    }
  `,
  { name: 'fontsData' }
)

export const getDesignSearchCode = gql`
  query GetDesignSearchCodeQuery($pattern: String!) {
    getDesignSearchCode(pattern: $pattern) {
      id
      code
    }
  }
`
