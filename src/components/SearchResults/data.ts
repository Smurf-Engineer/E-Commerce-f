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
      isTopProduct
      customizable: design_center
      retailMen: men_retail
      retailWomen: women_retail
      genders {
        id
        name: gender
      }
      priceRange {
        quantity
        price
        abbreviation
        shortName: short_name
      }
      images: pictures {
        front: front_image
        thumbnail
      }
      colors {
        id
        name
        image
      }
    }
  }
`

export const profileSettingsQuery = gql`
  query profile {
    profileData: getUserProfile {
      reseller {
        status
        comission
        inline
      }
    }
  }
`
