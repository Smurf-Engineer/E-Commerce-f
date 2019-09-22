/**
 * ProDesign Screen - Created by eduardoquintero on 19/09/19.
 */
import * as React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { injectIntl, InjectedIntl } from 'react-intl'
import * as proDesignActions from './actions'
import colorIcon from '../../assets/color_white.svg'
import messages from './messages'
import AntdTabs from 'antd/lib/tabs'
import Tab from './Tab'
import { connect } from 'react-redux'
import { compose, withApollo } from 'react-apollo'
import {
  Container,
  Header,
  Logo,
  Title,
  BackIcon,
  BackButton,
  Back,
  TopMenu,
  Layout
} from './styledComponents'
import logo from '../../assets/jakroo_logo.svg'
import backIcon from '../../assets/rightarrow.svg'

const { TabPane } = AntdTabs

interface Props extends RouteComponentProps<any> {
  intl: InjectedIntl
}
export class ProDesign extends React.Component<Props, {}> {
  render() {
    const { intl } = this.props
    const { formatMessage } = intl

    return (
      <Container>
        <Header>
          <Logo src={logo} />
          <Title>{formatMessage(messages.title)}</Title>
        </Header>
        <TopMenu>
          <BackButton onClick={this.onPressBack}>
            <BackIcon src={backIcon} />
            <Back>{formatMessage(messages.back)}</Back>
          </BackButton>
        </TopMenu>
        <Layout>
          <AntdTabs activeKey={`${1}`} onTabClick={this.onTabClick}>
            <TabPane tab={<Tab label="color" icon={colorIcon} />} key="1">
              <p>Hola</p>
            </TabPane>
            <TabPane tab={<Tab label="color" icon={colorIcon} />} key="2">
              <p>Hola</p>
            </TabPane>
          </AntdTabs>
        </Layout>
      </Container>
    )
  }
}

const mapStateToProps = (state: any) => {
  const proDesign = state.get('proDesign').toJS()
  return {
    ...proDesign
  }
}

const ProDesignEnhance = compose(
  withApollo,
  injectIntl,
  connect(
    mapStateToProps,
    {
      ...proDesignActions
    }
  )
)(ProDesign)

export default ProDesignEnhance
