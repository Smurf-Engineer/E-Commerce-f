import gql from 'graphql-tag'

export const GetProductsQuery = gql`
  query featuredProducts {
    featuredProducts {
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
      youthCombined: youth_combined
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
        isYouth: is_youth
      }
      colors {
        name
        image
      }
    }
  }
`
