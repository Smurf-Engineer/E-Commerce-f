import gql from 'graphql-tag'

export const GetInspirationQuery = gql`
  query getProDesignInspiration($offset: Int, $limit: Int) {
    rows: getProDesignInspiration(offset: $offset, limit: $limit) {
      fullCount
      inspiration {
        id
        name
        image
        width
        height
      }
    }
  }
`
