import * as React from 'react'
import gql from 'graphql-tag'
import { graphql, compose, QueryProps } from 'react-apollo'
import logo from './react.svg'
import { Container, HomeHeader } from './styledComponents'

type User = {
  id: string
  email: string
}

interface Data extends QueryProps {
  users: [User]
}

interface Props {
  data: Data
}

class Home extends React.Component<Props, {}> {
  render() {
    return (
      <Container>
        <HomeHeader>
          <h2>JR-WEB</h2>
        </HomeHeader>
      </Container>
    )
  }
}

const usersQuery = gql`
  query GetUsers {
    users {
      id
      email
    }
  }
`
const HomeEnhance = compose(
  // someOther HOC like connect
  graphql<Data>(usersQuery)
)(Home)

export default HomeEnhance
