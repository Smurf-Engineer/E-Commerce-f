/**
 * DesignSearch Queries
 */
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'

export const orderSearchQuery = gql`
  query getOrderFiles($code: String!) {
    order: getDesignByCode(code: $code) {
      name
      product {
        name
        zipper {
          white
          black
        }
      }
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
      pngUrl: output_png
      stitchingValue: flatlock
      stitchingName: flatlock_code
      zipperColor: zipper_color
      bindingColor: binding_color
      bibColor: bib_brace_color
      salesRep {
        shortId: short_id
        firstName: first_name
        lastName: last_name
      }
      accountManager {
        shortId: short_id
        firstName: first_name
        lastName: last_name
      }
      notes {
        text
        user
        createdAt: created_at
      }
      preflightCheck: preflight_check
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

export const togglePreflight = gql`
  mutation togglePreflight($shortId: String!) {
    design: togglePreflight(designId: $shortId) {
      checked: preflight_check
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

export const generatePdfMutation = gql`
  mutation generatePdf($code: String!) {
    generatePdf(code: $code) {
      message
    }
  }
`

export const addNoteMutation = gql`
  mutation addDesignNote($designId: String!, $text: String!) {
    addDesignNote(designId: $designId, text: $text) {
      message
    }
  }
`

export const getRepUsers = gql`
  query getRepUsers($text: String) {
    repUsers: getRepUsers(searchText: $text) {
      users {
        id
        shortId: short_id
        firstName: first_name
        lastName: last_name
      }
    }
  }
`

export const getManagers = gql`
  query getManagers($searchText: String) {
    managersQuery: getManagers(searchText: $searchText) {
      id
      shortId: short_id
      firstName: first_name
      lastName: last_name
    }
  }
`

export const setRepDesignMutation = gql`
  mutation setRepDesign($designId: String!, $repUser: String) {
    setRepDesign(designId: $designId, repUser: $repUser) {
      message
    }
  }
`

export const assignManagerDesignMutation = gql`
  mutation assignManagerDesign($designId: String!, $managerId: String) {
    assignManagerDesign(designId: $designId, managerId: $managerId) {
      message
    }
  }
`
