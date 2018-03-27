/**
 * FitWidget Screen - Created by gustavomedina on 23/03/18.
 */
import * as React from 'react'
import { compose } from 'react-apollo'
import { connect } from 'react-redux'
import { Layout, Menu } from 'antd'
import { ReducersObject } from '../../store/rootReducer'
import * as fitWidgetActions from './actions'
import { messageAdded } from './data'
import { StyledLoginButton } from './styledComponents'
// import { QueryProps } from '../../types/common'
// import messages from '../../components/FacebookGmailLogin/messages'

const { SubMenu } = Menu
const { Content, Sider } = Layout

// interface MessageResult {
//   id: number
//   text: string
// }

// interface Data extends QueryProps {
//   regionsResult: MessageResult
// }
interface Props {
  subscriptionMessage: (variables: {}) => void
}

export class FitWidget extends React.Component<Props, {}> {
  render() {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Layout>
          <Content style={{ margin: '16px 16px', height: '100%' }}>
            <div style={{ padding: 24, background: '#fff', height: '100%' }}>
              Canobbio is a cat.
            </div>
            <StyledLoginButton />
          </Content>
        </Layout>
        <Sider width={300} style={{ background: '#fff', minHeight: '100vh' }}>
          <div
            style={{
              height: '75px',
              width: '221px',
              color: '#5F6062',
              fontFamily: 'Avenir Next',
              margin: '8px',
              fontSize: '18px',
              fontWeight: 600,
              lineHeight: '25px'
            }}
          >
            Your fit for TOUR Short Sleeve Jersey PELOTON Shorts
          </div>
          <Menu mode="inline" style={{ position: 'absolute', bottom: 0 }}>
            <SubMenu
              key="sub1"
              title={
                <span
                  style={{
                    height: '25px',
                    width: '169px',
                    color: '#5F6062',
                    fontFamily: 'Avenir Next',
                    fontSize: '18px',
                    fontWeight: 600,
                    lineHeight: '25px'
                  }}
                >
                  Your Measurements
                </span>
              }
            >
              <Menu.Item key="3">Gender:</Menu.Item>
              <Menu.Item key="4">Height:</Menu.Item>
              <Menu.Item key="5">Weight:</Menu.Item>
              <Menu.Item key="1">Chest:</Menu.Item>
              <Menu.Item key="2">Waist</Menu.Item>
              <Menu.Item key="6">Hip:</Menu.Item>
              <Menu.Item key="7">Inseam:</Menu.Item>
              <Menu.Item key="8">Fit preference</Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
      </Layout>
    )
  }
}

const mapStateToProps = ({ fitWidget }: ReducersObject) => fitWidget.toJS()

const FitWidgetEnhance = compose(
  connect(mapStateToProps, { ...fitWidgetActions }),
  messageAdded
)(FitWidget)

export default FitWidgetEnhance
