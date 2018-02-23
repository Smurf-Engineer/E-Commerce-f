/**
 * FacebookSignIn Component - Created by cazarez on 21/02/18.
 */
import * as React from 'react'
import querystring from 'querystring'
import { graphql, compose } from 'react-apollo'
import { QueryProps } from '../../types/common'
import gql from 'graphql-tag'
import { facebookLoginQuery } from './data'

interface Data extends QueryProps {
  mutate: any
}

interface Props {
  data: Data
  mutate: any
  onFacebookLogin: (evt: React.MouseEvent<HTMLInputElement>) => void
  appId: string
  redirectUrl: string
  code: any
}

class FacebookSignIn extends React.Component<Props, {}> {
  state = {
    loading: false
  }

  constructor(props: Props) {
    super(props)
    this.appId = props.appId
    this.redirectUrl = `${document.location.protocol}//${
      document.location.host
    }/${props.redirectUrl}`

    if (document.location.pathname === '/') {
      this.code = querystring.parse(document.location.search)['?code']
    }
    console.log(this.code)
  }
  private appId: string
  private redirectUrl: string
  private code: any

  componentDidMount() {
    const { code } = this.props
    if (!code) {
      return
    }

    this.setState({ loading: true })
    this.props
      .mutate({ variables: { code: code } })
      .then((response: any) => {
        this.setState({ loading: false })
        const { error, user, session } = response.data.facebookSignIn
        if (error) {
          console.log('sign in error: ', error)
        } else {
          console.log('sign in success, your token: ', session.token)
        }
      })
      .catch((e: any) => {
        console.error('backend error:', e.toString())
        this.setState({ loading: false })
      })
  }

  onFacebookLogin = (event: any) => {
    event.preventDefault()
    console.log(this.appId)
    window.location.href = `https://www.facebook.com/v2.9/dialog/oauth?client_id=${
      this.appId
    }&redirect_uri=${encodeURIComponent(this.redirectUrl)}`
    const code = querystring.parse(document.location.search)['?code']

    console.log(code)
  }

  render() {
    const { loading } = this.state
    const icon = 'fa ' + (loading ? 'fa-refresh fa-spin' : 'fa-facebook')

    return (
      <a href="/facebook-login" onClick={this.onFacebookLogin}>
        <i className={icon} /> Facebook{' '}
      </a>
    )
  }
}

export default compose(graphql<Data>(facebookLoginQuery))(FacebookSignIn)
