import gql from 'graphql-tag'

export const getRelatedProducts = gql`
  query getRelatedProducts($productId: Int, $relatedItemTag: String) {
    products: getRelatedProducts(id: $productId, relatedTag: $relatedItemTag) {
      id
      type: name
      code
      name
      mpn
      chart
      flatlock
      category_id
      title
      branding
      gender_id
      retail_version
      details
      active
      description: short_description
      images: pictures {
        front: front_image
        thumbnail
        genderId: gender_id
      }
      isTopProduct
      customizable: design_center
      genderId: gender_id
      yotpoId: yotpo_id
      genders {
        id
        name: gender
      }
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
`

export const getRelatedDesigns = gql`
  query getRelatedDesigns($designId: String!) {
    designs: getRelatedDesigns(designId: $designId) {
      shortId: short_id
      code
      image
      name
      product {
        id
        type: name
        code
        name
        mpn
        chart
        flatlock
        category_id
        title
        branding
        gender_id
        retail_version
        details
        active
        description: short_description
        images: pictures {
          front: front_image
          thumbnail
          genderId: gender_id
        }
        isTopProduct
        customizable: design_center
        genderId: gender_id
        yotpoId: yotpo_id
        genders {
          id
          name: gender
        }
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

export const getSingleTeamStore = gql`
  query getTeamStore(
    $teamStoreId: String!
    $passCode: String
    $date: HolyDate
    $limit: Int
    $offset: Int
    $skipCode: Boolean
  ) {
    getTeamStore(
      teamStoreId: $teamStoreId
      passCode: $passCode
      storeFront: true
      date: $date
      limit: $limit
      offset: $offset
      isInfinite: true
      skipCode: $skipCode
    ) {
      id
      short_id
      name
      banner
      private
      bulletin
      isResellerStore
      owner
      featured
      owner_name
      display
      fixedPrice: fixed_price
      onDemandMode: on_demand_mode
      team_size_id
      closed
      priceRanges {
        id
        name: quantity_description
      }
      cutoff_date {
        day
        dayOrdinal
        month
      }
      delivery_date {
        day
        dayOrdinal
        month
      }
      items {
        expected_quantity
        visible
        short_id
        priceRange {
          price
          shortName: short_name
          quantity
          abbreviation
        }
        resellerRange {
          price
          shortName: short_name
          quantity
          abbreviation
        }
        design {
          id
          code
          name
          image
          shortId: short_id
          proDesign: pro_design
          proCertified: pro_certified
          product {
            id
            code
            yotpoId: yotpo_id
            name
            active
            type: name
            onlyProDesign: only_pro_design
            description: short_description
            hideFitStyles: hide_fit_styles
            youthCombined: youth_combined
            shortDescription: short_description
            collections
            isTopProduct
            weight
            twoPieces: two_pieces
            genders {
              id
              name: gender
            }
            fitStyles {
              id
              info
              name: description
            }
            priceRange {
              quantity
              price
              abbreviation
              shortName: short_name
            }
            sizeRange: size_range {
              id
              name
              isYouth: is_youth
            }
            images: pictures {
              front: front_image
              back: back_image
              left: left_image
              right: right_image
            }
          }
        }
        totalOrders
      }
      totalItems
      totalDesigns
    }
  }
`