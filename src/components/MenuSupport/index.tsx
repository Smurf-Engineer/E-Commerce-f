/**
 * MenuSupport Component - Created by david on 07/02/18.
 */
import * as React from 'react'
import Dropdown from 'antd/lib/dropdown'
import { FormattedMessage } from 'react-intl'
import Menu from 'antd/lib/menu'
import messages from './messages'
import { Text, menuStyle, TextOption } from './styledComponents'
import links from './links'
import { LINK_TYPE_URL } from '../../constants'

interface Props {
  history?: any
  designHasChanges: boolean
  darkMode?: boolean
  openWithoutSaveModalAction: (open: boolean, route?: string) => void
}

export class MenuSupport extends React.PureComponent<Props, {}> {
  handleGoTo = (link: string, type: string) => () => {
    const { history } = this.props

    if (type === LINK_TYPE_URL) {
      window.open(link, '_blank')
    } else {
      history.push(link)
    }
  }

  render() {
    const { darkMode = false } = this.props
    const items = links.map(({ label, url, type }, index) => {
      return (
        <Menu.Item key={index}>
          <TextOption onClick={this.handleGoTo(url, type)}>
            <FormattedMessage {...messages[label]} />
          </TextOption>
        </Menu.Item>
      )
    })

    const menu = <Menu style={menuStyle}>{items}</Menu>

    return (
      <Dropdown overlay={menu}>
        <Text {...{ darkMode}} >
          <FormattedMessage {...messages.title} />
        </Text>
      </Dropdown>
    )
  }
}

export default MenuSupport
