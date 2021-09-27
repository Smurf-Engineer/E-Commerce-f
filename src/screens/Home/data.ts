/**
 * Home queries
 */

import gql from 'graphql-tag'
// TODO: Check if all the data requested in the featuredProducts field
// is required
export const getHomepageInfo = gql`
  query getHomepageContent($sportRoute: String) {
    getHomepageContent(sportRoute: $sportRoute) {
      mainHeaderImages {
        id
        desktopImage: image
        mobileImage: image_mobile
        url: link
        assetType: type
      }
      carouselSettings {
        slideTransition: slide_transition
        slideDuration: slide_duration
        secondarySlideTransition: secondary_slide_transition
        secondarySlideDuration: secondary_slide_duration
      }
      title
      homepageImages {
        id
        desktopImage: image
        mobileImage: image_mobile
        url: link
        assetType: type
      }
      featuredBanners {
        id
        url
        urlMobile: url_mobile
        sportId: sport_id
        isVideo: is_video
      }
      featuredImages {
        id
        desktopImage: image
        mobileImage: image_mobile
        assetType: type
        url: link
      }
      secondaryFeaturedImages {
        id
        desktopImage: image
        mobileImage: image_mobile
        assetType: type
        url: link
      }
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
          info
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
          thumbnail
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
      productTiles {
        id
        contentTile: content_tile
        title
        image
      }
    }
  }
`

export const getDesignLabInfo = gql`
  query getDesignLabInfo {
    deliveryDays: getDesignLabInfo {
      days: delivery_days
    }
    deliveryDate: getDesignLabInfo(onlyData: false) {
      date: delivery_days
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

export const getShortenURLQuery = gql`
  query getShortenURL($id: String) {
    shortenURL: getShortenURL(id: $id) {
      id
      url
    }
  }
`