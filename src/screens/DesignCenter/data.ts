/**
 * DesignCenter Product
 */
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

export const getProductQuery = gql`
  query GetProduct($id: Int!) {
    product(id: $id) {
      id
      name
      obj
      mtl
      label
      bumpMap: bump_map
      isCustom: design_center
      flatlock
      mpn
      binding {
        white
        black
      }
      zipper {
        white
        black
      }
      bibBrace {
        white
        black
      }
    }
  }
`

export const getVariantsFromProduct = gql`
  query getVariants($id: Int!) {
    getVariants(id: $id) {
      id: short_id
      name
      icon
      default: is_default
      bumpMap: bumpmap
      obj
      label
      mtl
      branding
      flatlock
      bibraceWhite: bibrace_white
      bibraceBlack: bibrace_black
      zipperWhite: zipper_white
      zipperBlack: zipper_black
      bindingWhite: binding_white
      bindingBlack: binding_black
    }
  }
`

export const addTeamStoreItemMutation = graphql(
  gql`
    mutation AddTeamStoreItem(
      $teamStoreItem: TeamStoreItem!
      $teamStoreId: String!
    ) {
      addTeamStoreItem(
        teamStoreItem: $teamStoreItem
        teamStoreId: $teamStoreId
      ) {
        message
      }
    }
  `,
  { name: 'addItemToStore' }
)

export const getDesignQuery = gql`
  query getDesign($designId: String!) {
    designData: sharedDesignShortId(designId: $designId) {
      id
      name
      shortId: short_id
      flatlockColor: flatlock
      flatlockCode: flatlock_code
      bindingColor: binding_color
      bibBraceColor: bib_brace_color
      zipperColor: zipper_color
      canEdit: can_edit
      proDesign: pro_design
      outputSvg: output_svg
      shared
      image
      createdAt: created_at
      code
      highResolution: high_resolution
      colors {
        id
        color
        image
      }
      product {
        id
        code
        name
        obj
        mtl
        label
        bumpMap: bump_map
        flatlock
        mpn
        binding {
          white
          black
        }
        zipper {
          white
          black
        }
        bibBrace {
          white
          black
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
        priceRange {
          quantity
          price
          abbreviation
          shortName: short_name
        }
      }
      styleId: style_id
      style {
        id
        name
        image
        width
        height
        brandingPng: branding_png
      }
      canvas
      flatlock
    }
  }
`

export const getColorsQuery = gql`
  query GetColors {
    colorsResult: getColors {
      colors
      stitchingColors: stitching_colors
    }
  }
`

export const requestColorChartMutation = gql`
  mutation RequestColorChart($userInfo: UserInfoInput) {
    requestColorChart(userInfo: $userInfo) {
      message
    }
  }
`

export const getDesignLabInfo = gql`
  query getDesignLabInfo {
    designInfo: getDesignLabInfo(onlyData: false) {
      deliveryDays: delivery_days
      tutorialPlaylist: tutorial_playlist
      workingHours {
        start
        end
        timezone
      }
    }
  }
`

export const getProAssist = gql`
  query proAssistData {
    proAssistData: getProAssist {
      proAssistId: short_id
    }
  }
`

export const getProTicket = graphql(
  gql`
    mutation newProAssist {
      newProAssist {
        ticket: short_id
      }
    }
  `,
  { name: 'getProTicketAction' }
)
