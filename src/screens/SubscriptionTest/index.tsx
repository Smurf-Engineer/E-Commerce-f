/**
 * SubscriptionTest Screen - Created by david on 05/04/18.
 */
import * as React from 'react'
import { compose, graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { connect } from 'react-redux'
import * as subscriptionTestActions from './actions'
import { Container } from './styledComponents'

const commentsQuery = gql`
  query GetCategories {
    categories {
      id
      name
    }
  }
`

const commentsSubscription = gql`
  subscription comments {
    messageAdded {
      id
      text
    }
  }
`

interface Props {
  data: any
}
// TODO: Delete this screen after tests with subscriptions
export class SubscriptionTest extends React.Component<Props, {}> {
  componentWillMount() {
    const isBrowser = typeof window !== 'undefined'
    const {
      data: { subscribeToMore }
    } = this.props
    if (isBrowser) {
      subscribeToMore({
        document: commentsSubscription,
        updateQuery: (prev: any, { subscriptionData }: any) => {
          // const { data } = subscriptionData
          return prev
        }
      })
    }
  }
  render() {
    const {
      data: { categories, loading, error }
    } = this.props

    if (loading) {
      return <div>Loading...</div>
    }

    if (error) {
      return <div>{error.message}</div>
    }

    const commentsList = categories.map(({ id, name }: any) => (
      <div key={id} style={{ paddingTop: 24 }}>
        <div style={{ color: '#221', fontWeight: 400 }}>{id}</div>
        <div style={{ fontSize: 16, fontWeight: 600 }}>{name}</div>
      </div>
    ))

    return (
      <Container>
        <div>{commentsList}</div>;
      </Container>
    )
  }
}

const mapStateToProps = (state: any) => state.get('subscriptionTest').toJS()

const SubscriptionTestEnhance = compose(
  graphql(commentsQuery),
  connect(mapStateToProps, { ...subscriptionTestActions })
)(SubscriptionTest)

export default SubscriptionTestEnhance
