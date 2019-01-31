/**
 * MobileMenu Component - Created by david on 03/04/18.
 */
import * as React from 'react'
import Popover from 'antd/lib/popover'
import { compose, graphql } from 'react-apollo'
import menu from '../../assets/Menu.svg'
import { Filter, QueryProps } from '../../types/common'
import Menu from './Menu'
import { categoriesQuery } from './data'
import { Icon, overStyle } from './styledComponents'

interface Data extends QueryProps {
  genders: Filter[]
  categories: Filter[]
  sports: Filter[]
}

interface Props {
  data?: Data
  history: any
  loginButton: React.ReactNode
  formatMessage: (messageDescriptor: any) => string
}

export class MobileMenu extends React.PureComponent<Props, {}> {
  state = {
    visible: false
  }

  hide = () => this.setState({ visible: false })

  handleVisibleChange = (visible: boolean) => this.setState({ visible })

  render() {
    const { data, history, loginButton, formatMessage } = this.props
    const { visible } = this.state
    return (
      <Popover
        overlayStyle={overStyle}
        content={
          <Menu
            {...{ data, history, loginButton, formatMessage }}
            menuOpen={visible}
            hideMenu={this.hide}
          />
        }
        trigger="click"
        placement="bottom"
        visible={visible}
        onVisibleChange={this.handleVisibleChange}
      >
        <Icon src={menu} />
      </Popover>
    )
  }
}

const MobileMenuEnhance = compose(graphql<Data>(categoriesQuery))(MobileMenu)

export default MobileMenuEnhance
