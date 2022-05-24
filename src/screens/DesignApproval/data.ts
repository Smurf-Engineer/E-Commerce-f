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
  query getProdesignItem($shortId: String!, $deviceInfo: DeviceObjectInput) {
    projectItem: getProdesignItem(shortId: $shortId, deviceInfo: $deviceInfo) {
      id: short_id
      status
      code: design_code
      showNotification
      commentsNotifications
      limitRequests: limit_requests
      paidRequests: paid_requests
      role
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
        branding
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
        proDesign: pro_design
        proCertified: pro_certified
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
        paid
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
        customer
        customerEmail: customer_email
        members {
          id
          shortId: short_id
          userId: user_id
          firstName: first_name
          lastName: last_name
          dateInvited: date_invited
          dateAdded: date_added
          role
          projectId: project_id
          email
        }
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
            pictures: original_pictures {
              front: front_image
              thumbnail
            }
          }
          lastTask: lastTaskCustomer {
            date
            type
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
      paid
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

export const sendInvitationsMutation = gql`
  mutation sendInvitations(
    $projectId: String!
    $emails: [String]!
    $projectItemId: String!
  ) {
    sendInvitations(
      projectId: $projectId
      emails: $emails
      projectItemId: $projectItemId
    ) {
      message
    }
  }
`

export const reSendInvitationsMutation = gql`
  mutation reSendInvitation(
    $projectId: String!
    $email: String!
    $projectItemId: String!
  ) {
    reSendInvitation(
      projectId: $projectId
      email: $email
      projectItemId: $projectItemId
    ) {
      message
    }
  }
`

export const changeMemberRoleMutation = gql`
  mutation changeMemberRole(
    $role: String!
    $memberId: String!
  ) {
    changeMemberRole(
      role: $role
      memberId: $memberId
    ) {
      message
    }
  }
`

export const deleteMemberMutation = gql`
  mutation deleteMember($memberId: String!) {
    deleteMember(memberId: $memberId) {
      message
    }
  }
`

export const getEditRequestPrices = gql`
  query getEditRequestPrices {
    editRequestPrices: getEditRequestPrices {
      usd
      aud
      cad
      eur
      chf
      gbp
    }
  }
`

export const getProdesignItemCommentsQuery = gql`
  query getProdesignItemComments($shortId: String!) {
    projectComments: getProdesignItemComments(shortId: $shortId) {
      id
      createdAt: created_at
      message
      file
      userName: user_name
      userSerialId: user_serial_id
      userId: user_id
      likes
      hearts
      owner
      parentMessageId: parent_message_id
      parent {
        id
        userSerialId: user_serial_id
        userName: user_name
        message
      }
    }
  }
`

export const sendCommentMutation = gql`
  mutation sendComment(
    $itemId: String!,
    $message: String!,
    $file: String,
    $parentMessageId: String
  ) {
    messageData: sendComment(
      itemId: $itemId,
      message: $message,
      file: $file,
      parentMessageId: $parentMessageId
    ) {
      id
      createdAt: created_at
      message
      file
      userName: user_name
      userId: user_id
      likes
      hearts
    }
  }
`

export const updateReactionMutation = gql`
  mutation updateReaction($messageId: Int!, $isHeart: Boolean) {
    updateReaction(messageId: $messageId, isHeart: $isHeart) {
      message
    }
  }
`

export const commentsSubscription = gql`
  subscription comments {
    messageAdded {
      id
      text
    }
  }
`