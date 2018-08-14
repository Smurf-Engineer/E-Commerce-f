import gql from 'graphql-tag'

export const searchResultsQuery = gql`
  query SearchProduct($search: String!) {
    productSearch(text: $search) {
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
      sizeRange: size_range {
        id
        name
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
      }
    }
  }
`
