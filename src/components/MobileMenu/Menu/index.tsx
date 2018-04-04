/**
 * Menu Component - Created by david on 03/04/18.
 */
import * as React from 'react'
import MenuAntd from 'antd/lib/menu'
import { Container } from './styledComponents'

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
}

class Menu extends React.PureComponent<Props, {}> {
  handleClick = ({ item, key, selectedKeys }: any) => {
    const { history } = this.props
    history.push('/product-catalogue')
    console.log('SELECT', item, key, selectedKeys)
  }
  render() {
    const {
      data: { loading, error, categories, sports },
      loginButton
    } = this.props

    if (loading) {
      return <div>Loading</div>
    }

    if (error) {
      return <div>Something went wrong</div>
    }

    const optionsGender = menuOptionsGenders.map(({ label }, index) => (
      <SubMenu
        key={`${label}-${index}`}
        title={<span>{label.toUpperCase()}</span>}
      >
        {sports.map(({ id: sportId, name: sportName }: any) => (
          <SubMenu key={`${label}-${sportId}`} title={sportName}>
            {categories.map(({ id: categoryId, name: categoryName }: any) => (
              <MenuAntd.Item key={`${label}-${sportId}-${categoryId}`}>
                {categoryName}
              </MenuAntd.Item>
            ))}
          </SubMenu>
        ))}
      </SubMenu>
    ))

    const optionsSports = menuOptionsSports.map(({ label }, index) => (
      <SubMenu
        key={`${label}-${index}`}
        title={<span>{label.toUpperCase()}</span>}
      >
        {categories.map(({ id, name }: any) => (
          <MenuAntd.Item key={`${label}-${id}`}>{name}</MenuAntd.Item>
        ))}
      </SubMenu>
    ))

    const options = [...optionsGender, ...optionsSports]

    return (
      <Container>
        <div>SEARCH</div>
        <MenuAntd
          mode="inline"
          onSelect={this.handleClick}
          defaultSelectedKeys={['']}
          defaultOpenKeys={['']}
          style={{ width: '100%' }}
        >
          {options}
        </MenuAntd>
        {loginButton}
      </Container>
    )
  }
}

export default Menu
