import gql from 'graphql-tag'

export const getProDesignProject = gql`
  query getProDesignProject(
      $projectId: Int
    ) {
    project: getProDesignProject(projectId: $projectId) {
      id
      shortId: short_id
      createdAt: created_at
      name
      status
      teamSize: team_size
      deliveryDate: delivery_date
      phone
      shared
      notes
      locker {
        id
        code
        name
        shared
        image
        shortId: short_id
        createdAt: created_at
        product {
          id
          code
          active
          yotpoId: yotpo_id
          type: name
          weight
          onlyProDesign: only_pro_design
          description: short_description
          priceRange {
            quantity
            price
            abbreviation
            shortName: short_name
          }
        }
      }
      inspiration {
        id
        image
        assetType: asset_type
      }
      palette {
        id
        name
        primary: primary_color
        accent1: accent_1
        accent2: accent_2
        accent3: accent_3
      }
      files {
        name
        fileUrl: file_url
        type
        blurScore: blur_score
      }
      user {
        name: first_name
        lastName: last_name
        email
        accountManager {
          firstName: first_name
          lastName: last_name
          email
        }
      }
      designs {
        id: short_id
        name
        code
        createdAt: created_at
        image
        status
        notifications
        product {
          id
          code
          yotpoId: yotpo_id
          name
          type: name
          description: short_description
          shortDescription: short_description
          collections
          isTopProduct
          weight
          hideFitStyles: hide_fit_styles
          youthCombined: youth_combined
          customizable: design_center
          retailMen: men_retail
          retailWomen: women_retail
          genders {
            id
            name: gender
          }
          fitStyles {
            id
            info
            name: description
          }
          priceRange {
            quantity
            price
            abbreviation
            shortName: short_name
          }
          images: pictures {
            front: front_image
            back: back_image
            left: left_image
            right: right_image
            genderId: gender_id
          }
          sizeRange: size_range {
            id
            name
            isYouth: is_youth
          }
          colors {
            name
            image
          }
        }
      }
    }
  }
`

export const GetColorsQuery = gql`
  query GetColors {
    colorsResult: getColors {
      colors
    }
  }
`

export const deleteProItemMutation = gql`
  mutation deleteProItem($itemId: String!) {
    deleteProItem(itemId: $itemId) {
      message
    }
  }
`
