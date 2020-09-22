import gql from 'graphql-tag'

export const GetProductsQuery = gql`
  query getProducts(
    $contentTile: String
    $collection: String
    $gender: String
    $category: String
    $sport: String
    $season: String
    $fitStyle: String
    $limit: Int
    $order: String
    $offset: Int
  ) {
    products(
      contentTile: $contentTile
      collection: $collection
      gender: $gender
      category: $category
      sport: $sport
      season: $season
      fitStyle: $fitStyle
      limit: $limit
      order: $order
      offset: $offset
    ) {
      fullCount
      products {
        id
        code
        yotpoId: yotpo_id
        name
        onlyProDesign: only_pro_design
        active
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
          genderId: gender_id
          thumbnail
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
        comission
        paypalAccount: paypal_account
      }
    }
  }
`
