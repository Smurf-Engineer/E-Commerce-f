import gql from 'graphql-tag'

export const GetProductsByIdQuery = gql`
  query GetProductByID($id: Int!) {
    product(id: $id) {
      id
      yotpoId: yotpo_id
      name
      type: short_description
      category_id
      sport_id
      sports {
        id
        name
      }
      retail_version
      customizable: design_center
      description
      details
      materials: materials_info
      temperatures: temperature_range
      genders {
        id
        name: gender
      }
      size_range
      fitStyles {
        id
        name: description
      }
      collections
      isTopProduct
      intendedUse: intended_use
      images: pictures {
        front: front_image
        back: back_image
        left: left_image
        right: right_image
      }
      priceRange {
        price
        quantity
      }
      yotpoAverageScore {
        total: total_reviews
        averageScore: average_score
      }
      retailMen: men_retail
      retailWomen: women_retail
    }
  }
`
export const getTeamStoresRelated = gql`
  query GetDesigns {
    designs: myDesigns {
      id
      name
      product {
        id
        yotpoId: yotpo_id
        name
        type: name
        description: short_description
        collections
        fitStyles {
          id
          name: description
        }
        isTopProduct
        priceRange {
          quantity
          price
        }
        images: pictures {
          front: front_image
          back: back_image
          left: left_image
          right: right_image
        }
      }
    }
  }
`

export const GetTeamStoreItems = gql`
  query GetTeamStore($storeId: String!) {
    relatedItems: getTeamStore(teamStoreId: $storeId) {
      shortId: short_id
      name
      items {
        expectedQty: expected_quantity
        design {
          image
          name
          product {
            name
            type: short_description
          }
        }
      }
    }
  }
`
