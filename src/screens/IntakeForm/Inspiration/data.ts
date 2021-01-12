import gql from 'graphql-tag'

export const GetInspirationQuery = gql`
  query getProDesignInspiration($offset: Int, $limit: Int, $tags: [String], $filters: [String]) {
    rows: getProDesignInspiration(offset: $offset, limit: $limit, tags: $tags, filters: $filters) {
      fullCount
      inspiration {
        id
        name
        image
        width
        height
        tags
      }
    }
  }
`

export const GetInspirationTags = gql`
  query GetTags {
    rows: getInspirationTags {
      value
    }
  }
`
