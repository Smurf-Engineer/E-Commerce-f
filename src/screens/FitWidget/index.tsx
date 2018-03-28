/**
 * FitWidget Screen - Created by gustavomedina on 27/03/18.
 */
import * as React from 'react'
import { injectIntl, InjectedIntl } from 'react-intl'
import { compose } from 'react-apollo'
import { connect } from 'react-redux'
import { Layout, Menu } from 'antd'
import { ReducersObject } from '../../store/rootReducer'
import * as fitWidgetActions from './actions'
import messages from './messages'
import {
  Container,
  Text,
  UserText,
  StyledSubMenuInner,
  StyledContent,
  StyledContentInner,
  StyledSider,
  StyledSiderInner
} from './styledComponents'
import MainLayout from '../../components/MainLayout'

const { SubMenu } = Menu

interface Props {
  intl: InjectedIntl
  history: any
}

const mensages = [
  {
    id: 1,
    message:
      'Hi there! I am going to help you find the perfect fit for your purchase.',
    type: 'server'
  },
  {
    id: 1,
    message: 'First off, are you fitting for yourself or someone else?',
    type: 'server'
  },
  {
    id: 1,
    message: 'Others',
    type: 'client'
  },
  {
    id: 1,
    message: 'Myself',
    type: 'client'
  }
]

export class FitWidget extends React.Component<Props, {}> {
  render() {
    const { history, intl } = this.props
    const { formatMessage } = intl
    return (
      <MainLayout {...{ history, intl }}>
        <Container>
          <Layout style={{ minHeight: '100vh' }}>
            <Layout>
              <StyledContent>
                <StyledContentInner>
                  <ul style={{ background: '#fff', padding: '24px' }}>
                    {mensages.map(
                      (message, index) =>
                        message.type === 'server' ? (
                          <Text key={message.id}>{message.message}</Text>
                        ) : (
                          <UserText key={message.id}>
                            {message.message}
                          </UserText>
                        )
                    )}
                  </ul>
                </StyledContentInner>
              </StyledContent>
            </Layout>
            <StyledSider width={300}>
              <StyledSiderInner>
                {formatMessage(messages.yourFitFor)}
              </StyledSiderInner>
              <Menu mode="inline" style={{ position: 'absolute', bottom: 0 }}>
                <SubMenu
                  key="sub1"
                  title={
                    <StyledSubMenuInner>
                      {formatMessage(messages.yourMeasurements)}
                    </StyledSubMenuInner>
                  }
                >
                  <Menu.Item key="1">
                    {formatMessage(messages.gender)}
                  </Menu.Item>
                  <Menu.Item key="2">
                    {formatMessage(messages.height)}
                  </Menu.Item>
                  <Menu.Item key="3">
                    {formatMessage(messages.weight)}
                  </Menu.Item>
                  <Menu.Item key="4">{formatMessage(messages.chest)}</Menu.Item>
                  <Menu.Item key="5">{formatMessage(messages.waist)}</Menu.Item>
                  <Menu.Item key="6">{formatMessage(messages.hip)}</Menu.Item>
                  <Menu.Item key="7">
                    {formatMessage(messages.inseam)}
                  </Menu.Item>
                  <Menu.Item key="8">
                    {formatMessage(messages.fitPreference)}
                  </Menu.Item>
                </SubMenu>
              </Menu>
            </StyledSider>
          </Layout>
        </Container>
      </MainLayout>
    )
  }
}

const mapStateToProps = ({ fitWidget }: ReducersObject) => fitWidget.toJS()

const FitWidgetEnhance = compose(
  injectIntl,
  connect(mapStateToProps, { ...fitWidgetActions })
)(FitWidget)

export default FitWidgetEnhance
