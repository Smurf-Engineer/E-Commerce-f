import gql from 'graphql-tag'

export const GetFeaturedContent = gql`
  query homepageimages {
    featuredContent: getHomePageImages {
      image
      link
    }
  }
`
