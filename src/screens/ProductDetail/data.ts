import gql from 'graphql-tag'

export const GetProductsByIdQuery = gql`
  query GetProductByID($id: Int!) {
    product(id: $id) {
      id
      code
      yotpoId: yotpo_id
      name
      type: short_description
      modelSize: model_size
      shortDescription: short_description
      category_id
      sport_id
      mpn
      flatlock
      chart
      templateZip: template_zip
      branding
      title
      bibBrace {
        white
        black
      }
      binding {
        white
        black
      }
      zipper {
        white
        black
      }
      colors {
        id
        name
        image
      }
      sports {
        id
        name
      }
      gender_id
      retail_version
      customizable: design_center
      customLink: custom_link
      description
      details
      mediaFiles: media_files {
        id
        url
        urlMobile: url_mobile
      }
      bannerMaterials: banner_materials {
        id
        url
      }
      obj
      mtl
      bumpMap: bump_map
      youthCombined: youth_combined
      materials: materials_info
      temperatures: temperature_range
      weight
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
        thumbnail
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
      retailMen: men_retail
      retailWomen: women_retail
      template
      relatedItemTag: related_item_tag
      active
      two_pieces
      infoFlag: info_flag
      infoMessage: info_message
    }
  }
`

export const profileSettingsQuery = gql`
  query profile {
    profileData: getUserProfile {
      reseller {
        status
        currency
        inline
        comission
      }
    }
  }
`
