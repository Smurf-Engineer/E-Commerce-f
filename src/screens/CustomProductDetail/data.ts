import gql from 'graphql-tag'

export const GetDesignByIdQuery = gql`
  query GetDesignByID($designId: String!, $teamStoreItem: String) {
    design: sharedDesignShortId(
      designId: $designId
      teamStoreItem: $teamStoreItem
    ) {
      id
      shared
      name
      canEdit: can_edit
      shortId: short_id
      teamEnable: team_enable
      teamName: team_name
      teamOnDemand: team_on_demand_mode
      teamPrice: team_price {
        abbreviation
        shortName: short_name
        quantity
        price
      }
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
        bannerMaterials: banner_materials {
          id
          url
        }
        mediaFiles: media_files {
          id
          url
          urlMobile: url_mobile
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
      proDesign: pro_design
      png: output_png
    }
  }
`
