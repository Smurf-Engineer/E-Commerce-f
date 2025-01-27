import gql from 'graphql-tag'

export const GetDesignQuery = gql`
  query GetDesign($searchParam: String!) {
    design: sharedDesignShortId(designId: $searchParam) {
      id
      name
      image
      svg: output_svg
      shortId: short_id
      colors {
        id
        color
      }
      product {
        id
        code
        yotpoId: yotpo_id
        name
        type: name
        shortDescription: short_description
        category_id
        retail_version
        customizable: design_center
        description
        details
        materials: materials_info
        temperatures: temperature_range
        collections
        isTopProduct
        weight
        intendedUse: intended_use
        images: pictures {
          front: front_image
          back: back_image
          left: left_image
          right: right_image
        }
        sport_id
        sports {
          id
          name
        }
        genders {
          id
          name: gender
        }
        hideFitStyles: hide_fit_styles
        youthCombined: youth_combined
        sizeRange: size_range {
          id
          name
          isYouth: is_youth
        }
        fitStyles {
          id
          info
          name: description
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
      }
    }
  }
`

export const GetProductsByIdQuery = gql`
  query GetProductByID($id: Int!) {
    product(id: $id) {
      id
      code
      yotpoId: yotpo_id
      name
      type: short_description
      shortDescription: short_description
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
      sizeRange: size_range {
        id
        name
      }
      fitStyles {
        id
        info
        name: description
      }
      collections
      isTopProduct
      weight
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
        abbreviation
        shortName: short_name
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
      code
      name
      shortId: short_id
      product {
        id
        code
        yotpoId: yotpo_id
        name
        type: name
        description: short_description
        collections
        fitStyles {
          id
          info
          name: description
        }
        isTopProduct
        weight
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
  }
`

export const GetTeamStoreItems = gql`
  query GetTeamStore($storeId: String!) {
    relatedItems: getTeamStore(teamStoreId: $storeId) {
      id
      shortId: short_id
      name
      featured
      items {
        expectedQty: expected_quantity
        design {
          id
          code
          shortId: short_id
          image
          name
          product {
            id
            code
            name
            type: short_description
            yotpoId: yotpo_id
          }
        }
      }
    }
  }
`
