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
        relatedProducts: related {
          id
          type: name
          description: short_description
          images: pictures {
            front: front_image
            back: back_image
            left: left_image
            right: right_image
            genderId: gender_id
          }
          colors {
            image
            name
          }
          isTopProduct
          customizable: design_center
          genderId: gender_id
          collections
          yotpoId: yotpo_id
          priceRange {
            price
            quantity
            abbreviation
            shortName: short_name
          }
        }
        genders {
          id
          name: gender
        }
        fitStyles {
          id
          name: description
          info
        }
        sizeRange: size_range {
          id
          name
        }
        collections
        isTopProduct
        intendedUse: intended_use
        images: original_pictures {
          front: front_image
          back: back_image
          left: left_image
          right: right_image
          genderId: gender_id
          colorId: color_id
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
      colors {
        id
        colordesc
        color
        image
      }
      image
      flatlockColor: flatlock_code
      zipperColor: zipper_color
      bindingColor: binding_color
      bibBraceColor: bib_brace_color
      shared
      svg: output_svg
      canvas
      code
      createdAt: created_at
    }
  }
`
export const designsQuery = gql`
  query GetDesigns($limit: Int, $offset: Int) {
    myDesigns: myDesigns(limit: $limit, offset: $offset) {
      designs {
        id
        shortId: short_id
      }
    }
  }
`
