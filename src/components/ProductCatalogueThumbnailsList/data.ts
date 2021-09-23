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
    $searchText: String
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
      text: $searchText
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
        season
        category_id
        categoryName: category_name
        fitStyles {
          id
          name: description
          info
        }
        sports {
          id
          name
        }
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
      reseller {
        status
        currency
        comission
        inline
        paypalAccount: paypal_account
      }
    }
  }
`
