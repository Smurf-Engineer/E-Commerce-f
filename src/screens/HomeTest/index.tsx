/**
 * Home - Created by david on 08/10/17.
 */

import * as React from 'react'
import { connect } from 'react-redux'
import { compose, withApollo } from 'react-apollo'
import { injectIntl, InjectedIntl } from 'react-intl'
import { RouteComponentProps } from 'react-router-dom'
import LoginTest from '../../components/LoginTest'
import { MAIN_TITLE } from '../../constants'
import { Helmet } from 'react-helmet'

interface Props extends RouteComponentProps<any> {
  client: any
  openQuickViewAction: (id: number | null) => void
  defaultAction: (someKey: string) => void
  setSearchParam: (param: string) => void
  showSearchResultsHome: (show: boolean) => void
  dispatch: any
  intl: InjectedIntl
  title: string
}

export class Home extends React.Component<Props, {}> {
  login = () => {}
  render() {
    const { history, intl, title = MAIN_TITLE } = this.props
    const { formatMessage } = intl

    return (
      <div {...{ history, intl }}>
        <Helmet {...{ title }} />
        <LoginTest
          open={true}
          login={this.login}
          {...{ formatMessage, initialCountryCode: 'US' }}
        />
      </div>
    )
  }
}

const mapStateToProps = (state: any) => {
  const home = state.get('home').toJS()
  const responsive = state.get('responsive').toJS()
  const langProps = state.get('languageProvider').toJS()
  const app = state.get('app').toJS()
  return { ...home, ...responsive, ...langProps, ...app }
}

const mapDispatchToProps = (dispatch: any) => ({ dispatch })

const HomeEnhance = compose(
  injectIntl,
  withApollo,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(Home)

export default HomeEnhance
