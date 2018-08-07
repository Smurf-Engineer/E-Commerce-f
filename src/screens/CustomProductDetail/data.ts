import gql from 'graphql-tag'

export const GetDesignByIdQuery = gql`
  query GetDesignByID($designId: String!) {
    design: sharedDesignShortId(designId: $designId) {
      id
      name
      shortId: short_id
      product {
        productId: id
        yotpoId: yotpo_id
        name
        type: short_description
        shortDescription: short_description
        genderId: gender_id
        customizable: design_center
        description
        details
        materials: materials_info
        temperatures: temperature_range
        genders {
          id
          name: gender
        }
        sizeRange: size_range {
          id
          name
        }
        fitStyles {
          id
          name: description
        }
        sizeRange: size_range {
          id
          name
        }
        collections
        isTopProduct
        intendedUse: intended_use
        images: pictures {
          front: front_image
          back: back_image
          left: left_image
          right: right_image
          genderId: gender_id
        }
        priceRange {
          price
          quantity
        }
        yotpoAverageScore {
          total: total_reviews
          averageScore: average_score
        }
      }
      colors {
        id
        colordesc
        color
        image
      }
      image
      shared
      svg: output_svg
      code
      createdAt: created_at
      style {
        id
        name
        image
        colorblock1
        colorblock2
        colorblock3
        colorblock4
        colorblock5
        branding
        brandingPng: branding_png
        complexity
        size
      }
    }
  }
`
