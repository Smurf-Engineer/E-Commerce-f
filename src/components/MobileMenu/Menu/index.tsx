/**
 * Menu Component - Created by david on 03/04/18.
 */
import * as React from 'react'
import MenuAntd from 'antd/lib/menu'
import { Container, Bottom, menuStyle } from './styledComponents'
import { FormattedMessage } from 'react-intl'
import messages from './messages'

const { SubMenu } = MenuAntd

const menuOptionsGenders = [
  { label: 'men', visible: false },
  { label: 'women', visible: false }
]

const menuOptionsSports = [
  { label: 'cycling', visible: false },
  { label: 'triathlon', visible: false },
  { label: 'nordic', visible: false },
  { label: 'active', visible: false }
]

interface Props {
  data?: any
  history: any
  loginButton: React.ReactNode
  regionButton: React.ReactNode
  menuOpen: boolean
}

class Menu extends React.PureComponent<Props, {}> {
  state = {
    openKeys: ['']
  }

  componentWillReceiveProps({ menuOpen }: Props) {
    if (menuOpen === false) {
      this.setState({ openKeys: [''] })
    }
  }

  handleClick = ({ item, key, selectedKeys }: any) => {
    const { history } = this.props
    history.push(`/product-catalogue?${key}`)
  }

  onOpenChange = (openKeys: string[]) => {
    if (openKeys[openKeys.length - 1].substring(0, 4) === 'menu') {
      const newOpenKeys = ['']
      newOpenKeys.push(openKeys[openKeys.length - 1])
      this.setState({ openKeys: newOpenKeys })
    } else {
      this.setState({ openKeys })
    }
  }

  handleOnSeeAll = () => {
    const { history } = this.props
    history.push(`/product-catalogue`)
  }
  render() {
    const {
      data: { loading, error, categories, sports },
      loginButton,
      regionButton
    } = this.props

    if (loading) {
      return <div>Loading</div>
    }

    if (error) {
      return <div>Something went wrong</div>
    }

    const optionsGender = menuOptionsGenders.map(
      ({ label: genderName }, index) => (
        <SubMenu
          key={`menu-${genderName}-${index}`}
          title={
            <span>
              <FormattedMessage {...messages[genderName]} />
            </span>
          }
        >
          {sports.map(({ id: sportId, name: sportName }: any) => (
            <SubMenu
              key={`${genderName}-${sportId}-${index}`}
              title={sportName}
            >
              {categories.map(({ id: categoryId, name: categoryName }: any) => (
                <MenuAntd.Item
                  key={`genderFilter=${genderName}&sportFilters=${sportName}&categoryFilters=${categoryName}`}
                >
                  {categoryName}
                </MenuAntd.Item>
              ))}
            </SubMenu>
          ))}
        </SubMenu>
      )
    )

    const optionsSports = menuOptionsSports.map(({ label }, index) => (
      <SubMenu
        key={`menu-${label}-${index}`}
        title={
          <span>
            <FormattedMessage {...messages[label]} />
          </span>
        }
      >
        {categories.map(({ id, name }: any) => (
          <MenuAntd.Item key={`sportFilters=${label}&categoryFilters=${name}`}>
            {name}
          </MenuAntd.Item>
        ))}
      </SubMenu>
    ))

    const options = [...optionsGender, ...optionsSports]

    return (
      <Container>
        <MenuAntd
          mode="inline"
          onSelect={this.handleClick}
          defaultSelectedKeys={['']}
          defaultOpenKeys={['']}
          openKeys={this.state.openKeys}
          onOpenChange={this.onOpenChange}
          style={menuStyle}
        >
          {options}
        </MenuAntd>
        <span onClick={this.handleOnSeeAll}>SEE ALL</span>
        <Bottom>
          {loginButton}
          {regionButton}
        </Bottom>
      </Container>
    )
  }
}

export default Menu
