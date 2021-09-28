import gql from 'graphql-tag'

export const GetProductsToCompareQuery = gql`
  query ProductsToCompare {
    product: getProductsToCompare {
      id
      code
      yotpoId: yotpo_id
      name
      mtl
      obj
      bumpMap: bump_map
      flatlock
      branding
      predyedlabel
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
      categoryName: category_name
      tags
      season
      pictures {
        front_image
        back_image
        left_image
        right_image
        gender_id
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
      customizable: design_center
      description
      details
      hideFitStyles: hide_fit_styles
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
    }
  }
`
