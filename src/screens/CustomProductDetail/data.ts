import gql from 'graphql-tag'

export const GetDesignByIdQuery = gql`
  query GetDesignByID($designId: String!) {
    design: sharedDesignShortId(designId: $designId) {
      id
      name
      shortId: short_id
      product {
        id
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
          abbreviation
          shortName: short_name
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
    }
  }
`
export const desginsQuery = gql`
  query GetDesigns($limit: Int, $offset: Int) {
    myDesigns: myDesigns(limit: $limit, offset: $offset) {
      designs {
        id
        shortId: short_id
      }
    }
  }
`
