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
      totalOrders: total_orders
      teamEnable: team_enable
      teamName: team_name
      predyedName: predyed_name
      teamOnDemand: team_on_demand_mode
      fixedPrice: team_fixed_price
      isReseller: is_reseller
      variables {
        variableOne: variable_one
        variableOneLength: variable_one_length
        variableOneCaps: variable_one_caps
        variableTwo: variable_two
        variableTwoLength: variable_two_length
        variableTwoCaps: variable_two_caps
      }
      resellerPrice: reseller_price {
        abbreviation
        shortName: short_name
        quantity
        price
      }
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
        chart
        modelSize: model_size
        type: short_description
        onlyProDesign: only_pro_design
        shortDescription: short_description
        genderId: gender_id
        customizable: design_center
        description
        details
        hideFitStyles: hide_fit_styles
        youthCombined: youth_combined
        relatedItemTag: related_item_tag
        materials: materials_info
        temperatures: temperature_range
        twoPieces: two_pieces
        upgradeOne: upgrade_one {
          id
          shortId: short_id
          enabled
          name
          url
          defaultOption: default_option
          modalImage: modal_image
          mobileImage: mobile_image
          options {
            aud
            id
            cad
            shortId: short_id
            gbp
            name
            usd
            eur
          }
        }
        upgradeTwo: upgrade_two {
          id
          shortId: short_id
          enabled
          name
          url
          defaultOption: default_option
          modalImage: modal_image
          mobileImage: mobile_image
          options {
            aud
            id
            cad
            shortId: short_id
            gbp
            name
            usd
            eur
          }
        }
        upgradeThree: upgrade_three {
          id
          shortId: short_id
          enabled
          name
          url
          defaultOption: default_option
          modalImage: modal_image
          mobileImage: mobile_image
          options {
            aud
            id
            cad
            shortId: short_id
            gbp
            name
            usd
            eur
          }
        }
        bannerMaterials: banner_materials {
          id
          url
        }
        mediaFiles: media_files {
          id
          url
          savedDesignPage: saved_design_page
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
          isYouth: is_youth
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
        infoFlag: info_flag
        infoMessage: info_message
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
      proCertified: pro_certified
      png: output_png
    }
  }
`

export const profileSettingsQuery = gql`
  query profile {
    profileData: getUserProfile {
      userProfile {
        firstName: first_name
        lastName: last_name
        email
        phone
      }
      reseller {
        status
        currency
        margin
        comission
        paypalAccount: paypal_account
      }
    }
  }
`

export const getDesignVariables = gql`
  query GetDesignVariables($id: String!) {
    designVariables: getDesignVariables(id: $id) {
      id
      variableOne: variable_one
      variableTwo: variable_two
      oneLength: variable_one_length
      twoLength: variable_two_length
      variableOneCaps: variable_one_caps
      variableTwoCaps: variable_two_caps
    }
  }
`