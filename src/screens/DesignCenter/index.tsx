/**
 * DesignCenter Screen - Created by david on 23/02/18.
 */
import * as React from 'react'
import { FormattedMessage, injectIntl, InjectedIntl } from 'react-intl'
import { compose } from 'react-apollo'
import { connect } from 'react-redux'
import { RouteComponentProps } from 'react-router-dom'
import { ReducersObject } from '../../store/rootReducer'
import Layout from '../../components/MainLayout'
import { openQuickViewAction } from '../../components/MainLayout/actions'
import * as designCenterActions from './actions'
import Header from '../../components/DesignCenterHeader'
import Tabs from '../../components/DesignCenterTabs'
import Info from '../../components/DesignCenterInfo'
import { Container, Text } from './styledComponents'
import messages from './messages'

interface Props extends RouteComponentProps<any> {
  intl: InjectedIntl
  currentTab: number
  setCurrentTabAction: (index: number) => void
  openQuickViewAction: (index: number) => void
}

export class DesignCenter extends React.Component<Props, {}> {
  handleOpenQuickView = () => {
    const { openQuickViewAction: openQuickView } = this.props
    // TODO: This id it's the same of the product
    openQuickView(1)
  }

  handleOnPressBack = () => {
    const { history } = this.props
    history.replace('/')
  }

  handleOnSelectTab = (index: number) => {
    const { setCurrentTabAction } = this.props
    setCurrentTabAction(index)
  }

  render() {
    const { intl, history, currentTab } = this.props
    return (
      <Layout {...{ history, intl }}>
        <Container>
          <Header onPressBack={this.handleOnPressBack} />
          <Tabs {...{ currentTab }} onSelectTab={this.handleOnSelectTab} />
          <Info
            label="theme"
            model="NOVA"
            onPressQuickView={this.handleOpenQuickView}
          />
        </Container>
      </Layout>
    )
  }
}

const mapStateToProps = ({ designCenter }: ReducersObject) =>
  designCenter.toJS()

const DesignCenterEnhance = compose(
  injectIntl,
  connect(mapStateToProps, { ...designCenterActions, openQuickViewAction })
)(DesignCenter)

export default DesignCenterEnhance
