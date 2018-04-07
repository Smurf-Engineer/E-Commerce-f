/**
 * Account Screen - Created by david on 05/04/18.
 */
import * as React from 'react'
import { injectIntl, InjectedIntl, FormattedMessage } from 'react-intl'
import { compose } from 'react-apollo'
import Menu from 'antd/lib/menu'
import { connect } from 'react-redux'
import { RouteComponentProps } from 'react-router-dom'
import * as accountActions from './actions'
import messages from './messages'
import { options, SCREEN_LOCKER } from './constants'
import Layout from '../../components/MainLayout'
import MyLocker from '../../components/MyLocker'
import {
  Container,
  SideBar,
  Content,
  Title,
  ScreenTitle,
  menuStyle,
  OptionMenu
} from './styledComponents'

const { SubMenu } = Menu

interface Props extends RouteComponentProps<any> {
  intl: InjectedIntl
  openKeys: string[]
  screen: string
  // Redux actions
  setOpenKeysAction: (keys: string[]) => void
  setCurrentScreenAction: (screen: string) => void
}

export class Account extends React.Component<Props, {}> {
  handleOnSelectedKeys = (keys: string[]) => {
    const { setOpenKeysAction } = this.props
    const openKeys = ['']
    if (keys.length > 1 && keys[2]) {
      openKeys.push(keys[2])
      setOpenKeysAction(openKeys)
    } else {
      setOpenKeysAction(keys)
    }
  }

  handleOnSelectItem = ({ key }: any) => {
    const { setCurrentScreenAction } = this.props
    setCurrentScreenAction(key)
  }

  getScreenComponent = (screen: string) => {
    const { intl } = this.props
    switch (screen) {
      case SCREEN_LOCKER:
        return <MyLocker formatMessage={intl.formatMessage} />
      default:
        return null
    }
  }

  render() {
    const { intl, history, openKeys, screen } = this.props

    const menuOptions = options.map(({ title, options: submenus }) => (
      <SubMenu
        key={title}
        title={<OptionMenu>{intl.formatMessage(messages[title])}</OptionMenu>}
      >
        {submenus.map((label, index) => (
          <Menu.Item key={label}>
            <FormattedMessage {...messages[label]} />
          </Menu.Item>
        ))}
      </SubMenu>
    ))

    const currentScreen = this.getScreenComponent(screen)

    return (
      <Layout {...{ history, intl }}>
        <Container>
          <SideBar>
            <Title>
              <FormattedMessage {...messages.title} />
            </Title>
            <Menu
              {...{ openKeys }}
              mode="inline"
              onSelect={this.handleOnSelectItem}
              onOpenChange={this.handleOnSelectedKeys}
              style={menuStyle}
            >
              {menuOptions}
            </Menu>
          </SideBar>
          <Content>
            <ScreenTitle>
              {!!messages[screen] && <FormattedMessage {...messages[screen]} />}
            </ScreenTitle>
            {currentScreen}
          </Content>
        </Container>
      </Layout>
    )
  }
}

const mapStateToProps = (state: any) => state.get('account').toJS()

const AccountEnhance = compose(
  injectIntl,
  connect(mapStateToProps, { ...accountActions })
)(Account)

export default AccountEnhance
