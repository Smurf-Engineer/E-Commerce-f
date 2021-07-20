/**
 * Designs queries
 */
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

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

export const getProdesignItemQuery = gql`
  query getProdesignItem($shortId: String!) {
    projectItem: getProdesignItem(shortId: $shortId) {
      id: short_id
      status
      showNotification
      limitRequests: limit_requests
      product {
        id
        productId: id
        yotpoId: yotpo_id
        name
        active
        modelSize: model_size
        type: short_description
        onlyProDesign: only_pro_design
        shortDescription: short_description
        genderId: gender_id
        customizable: design_center
        description
        details
        relatedItemTag: related_item_tag
        materials: materials_info
        temperatures: temperature_range
        twoPieces: two_pieces
        collections
        isTopProduct
        predyedlabel
        hasPredyed: has_predyed
        intendedUse: intended_use
        obj
        mtl
        label
        bumpMap: bump_map
        flatlock
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
      design {
        id 
        shortId: short_id 
        name 
        shared 
        image 
        code 
        canvas 
        style_id 
        outputSvg: output_svg 
        createdAt: created_at
        canvas_files
        pro_design
        preflight_check
        stitchingValue: flatlock
        predyedName: predyed_name
        stitchingName: flatlock_code
        zipperColor: zipper_color
        bindingColor: binding_color
        bibColor: bib_brace_color
        high_resolution
        outputPng: output_png
        colors {
          id
          color
        }
        user {
          firstName: first_name
          lastName: last_name
        }
      }
      colors {
        name
        value
      }
      messages {
        id
        createdAt: created_at
        type
        message
        file
        design
        code
        requireAnswer: require_answer
        parentMessageId: parent_message_id
        answer {
          message
        }
        userName: user_name
      }
      project {
        id
        name
        notes
        shortId: short_id
        teamSize: team_size
        status
        createdAt: created_at
        updatedAt: updated_at
        designs {
          id: short_id
          name
          code
          createdAt: created_at
          image
          status
          product {
            id
            code
            name
            shortDescription: short_description
            pictures {
              front: front_image
            }
          }
        }
        files {
          id
          fileUrl: file_url
          original: original_file
        }
        palette {
          id
          shortId: short_id
          name
          primaryColor: primary_color
          accent1: accent_1
          accent2: accent_2
          accent3: accent_3
        }
        inspiration {
          id
          name
          image
          tags
        }
      }
    }
  }
`

export const addProMessageMutation = gql`
  mutation sendNoteProdesign(
    $itemId: String!,
    $message: String!,
    $file: String,
    $parentMessageId: String
  ) {
    messageData: sendNoteProdesign(
      itemId: $itemId,
      message: $message,
      file: $file,
      parentMessageId: $parentMessageId
    ) {
      id
      createdAt: created_at
      type
      message
      code
      file
      design
      parentMessageId: parent_message_id
      requireAnswer: require_answer
      userName: user_name
      answer {
        message
      }
    }
  }
`

export const addProductProjectMutation = gql`
  mutation addProductProject(
    $project: String!,
    $product: Int!,
    $message: String!,
    $file: String
  ) {
    addProductProject(
      project: $project,
      product: $product,
      message: $message,
      file: $file
    ) {
      shortId: short_id
    }
  }
`

export const approveDesignMutation = gql`
  mutation setApproveDesign($itemId: String!) {
    messageData: setApproveDesign(itemId: $itemId) {
      id
      status
    }
  }
`

export const getPredyedColors = gql`
  query getPredyedColors {
    getPredyedColors {
      id: short_id
      name
      code
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

export const addTeamStoreItemMutation = gql`
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
`