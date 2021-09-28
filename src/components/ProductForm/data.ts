/**
 * Product-Form Queries
 */

import gql from 'graphql-tag'

export const getExtraData = gql`
  query extraData($id: Int) {
    extraData(id: $id) {
      bannerMaterials {
        id
        url
      }
      categories {
        id
        name
      }
      sports {
        id
        name
      }
      sizes {
        id
        name
      }
      relatedTags
      seasons
      colors {
        id
        image
        name
      }
      fitStyles {
        id
        info
        name: description
        image
      }
      materials
      genders {
        id
        gender
      }
    }
  }
`
export const getProductQuery = gql`
  query GetProductByID($id: Int!) {
    product(id: $id, onlyActive: false) {
      id
      code
      yotpoId: yotpo_id
      name
      contentTile: content_tile
      productMaterials: banner_materials {
        id
        url
      }
      mtl
      mediaFiles: media_files {
        id
        url
        urlMobile: url_mobile
      }
      obj
      bumpMap: bump_map
      flatlock
      relatedItemTag: related_item_tag
      binding {
        white
        black
      }
      zipper {
        white
        black
      }
      branding
      predyedlabel
      bibBrace {
        white
        black
      }
      shortDescription: short_description
      category_id
      categoryName: category_name
      hideFitStyles: hide_fit_styles
      youthCombined: youth_combined
      tags
      modelSize: model_size
      season
      pictures {
        front_image
        back_image
        left_image
        right_image
        gender_id
        thumbnail
        color_id
      }
      active
      designCenter: design_center
      customLink: custom_link
      sport_id
      mpn
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
      description
      details
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
      twoPieces: two_pieces
    }
  }
`
export const upsertProduct = gql`
  mutation upsertProduct(
    $body: ProductUpsert!
    $bannerMaterials: [MediaFileInput]
  ) {
    productResult: upsertProduct(
      body: $body
      bannerMaterials: $bannerMaterials
    ) {
      id
    }
  }
`
