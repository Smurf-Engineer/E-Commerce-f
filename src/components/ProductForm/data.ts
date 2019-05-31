/**
 * Admin-OrderDetailsAdmin Queries
 */

import gql from 'graphql-tag'

export const getExtraData = gql`
  query extraData {
    extraData {
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
      product_materials: banner_materials {
        id
        url
      }
      mtl
      media_files {
        id
        url
      }
      obj
      bumpMap: bump_map
      flatlock
      related_item_tag
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
      type: short_description
      shortDescription: short_description
      category_id
      category_name
      tags
      season
      pictures {
        front_image
        back_image
        left_image
        right_image
        gender_id
      }
      active
      design_center
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
      customizable: design_center
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
      template
      relatedProducts: related {
        id
        type: name
        description: short_description
        shortDescription: short_description
        images: pictures {
          front: front_image
          back: back_image
          left: left_image
          right: right_image
          genderId: gender_id
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
        colors {
          id
          name
          image
        }
      }
    }
  }
`
