import gql from 'graphql-tag'

export const getProDesignProject = gql`
  query getProDesignProject(
      $projectId: Int
    ) {
    project: getProDesignProject(projectId: $projectId) {
      id
      createdAt: created_at
      name
      status
      phone
      notes
      inspiration {
        image
      }
      palette {
        id
        primary: primary_color
        accent1: accent_1
        accent2: accent_2
        accent3: accent_3
      }
      files {
        fileUrl: file_url
      }
      user {
        name: first_name
        lastName: last_name
        email
        accountManager {
          firstName: first_name
          lastName: last_name
        }
      }
      products {
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
        customizable: design_center
        retailMen: men_retail
        retailWomen: women_retail
        genders {
          id
          name: gender
        }
        fitStyles {
          id
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
        }
        colors {
          name
          image
        }
      }
    }
  }
`
