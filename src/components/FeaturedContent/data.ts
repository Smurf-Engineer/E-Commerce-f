import gql from 'graphql-tag'

export const GetFeaturedContent = gql`
  query homepageimages {
    featuredContent: getHomePageImages {
      desktop: image
      mobile: image_mobile
      link
    }
  }
`
