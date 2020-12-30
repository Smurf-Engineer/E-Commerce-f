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
        output_svg 
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
        output_png
        colors {
          id
          color
        }
        user {
          firstName: first_name
          lastName: last_name
        }
      }
      messages {
        id
        createdAt: created_at
        type
        message
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