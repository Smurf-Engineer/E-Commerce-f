import * as React from 'react'
import gql from 'graphql-tag'
import { graphql, compose, QueryProps } from 'react-apollo'
import logo from './react.svg'
import './Home.css'

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
      <div className="Home">
        <div className="Home-header">
          <img src={logo} className="Home-logo" alt="logo" />
          <h2>JR-WEB</h2>
        </div>
      </div>
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
