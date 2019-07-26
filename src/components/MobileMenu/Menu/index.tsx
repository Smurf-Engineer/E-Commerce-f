/**
 * Menu Component - Created by david on 03/04/18.
 */
import * as React from 'react'
import { compose, withApollo } from 'react-apollo'
import queryString from 'query-string'
import MenuAntd from 'antd/lib/menu'
import Spin from 'antd/lib/spin'
import { Container, Bottom, menuStyle, SeeAll } from './styledComponents'
import messages from './messages'

const { SubMenu } = MenuAntd

interface Props {
  client: any
  data?: any
  history: any
  hideMenu: () => void
  loginButton: React.ReactNode
  menuOpen: boolean
  formatMessage: (messageDescriptor: any) => string
}

class Menu extends React.PureComponent<Props, {}> {
  state = {
    openKeys: [''],
    sportSelected: null
  }

  componentWillReceiveProps({ menuOpen }: Props) {
    if (menuOpen === false) {
      this.setState({ openKeys: [''] })
    }
  }

  handleOpenSport = (sport: string) => {
    this.setState({ sportSelected: sport })
  }

  handleClick = ({
    item: {
      props: { children }
    },
    key
  }: any) => {
    const {
      history: {
        push,
        replace,
        location: { search, pathname }
      },
      hideMenu
    } = this.props

    const { sportSelected } = this.state

    const { gender, category, sport } = queryString.parse(search)

    const toCategory = children.replace(' & ', ' ')
    const toSport = sportSelected && (sportSelected as string).toLowerCase()

    const route = `/product-catalogue?${key}`
    const atProductCatalogue = (pathname as String).includes(
      'product-catalogue'
    )

    let isChangingCategory = false
    let isChangingSport = false

    if (atProductCatalogue) {
      isChangingCategory = category && category !== toCategory
      isChangingSport = sport && sport !== toSport
    }
    const isMissingFilter = !gender || !category || !sport
    const isChangingFilter = isChangingCategory || isChangingSport

    if ((atProductCatalogue && isMissingFilter) || isChangingFilter) {
      hideMenu()
      replace(route, { forced: true })
      return
    }

    push(route)
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
      data: { loading, error, sports },
      loginButton,
      formatMessage
    } = this.props

    if (loading) {
      return (
        <div>
          <Spin />
        </div>
      )
    }

    if (error) {
      return <div>{formatMessage(messages.error)}</div>
    }

    const optionsSports = sports.map(({ name, categories }, index) => {
      // TODO: Check this out.
      // this.getCategories(id)
      return (
        <SubMenu
          key={`menu-${name}-${index}`}
          onClick={this.handleOpenSport(name)}
          title={<span>{name}</span>}
        >
          {categories.map(({ name: categoryName }: any) => (
            <MenuAntd.Item
              key={`sport=${name}&category=${categoryName.replace(' & ', ' ')}`}
            >
              {categoryName}
            </MenuAntd.Item>
          ))}
        </SubMenu>
      )
    })

    const options = [...optionsSports]

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
        <SeeAll onClick={this.handleOnSeeAll}>
          {formatMessage(messages.seeAll)}
        </SeeAll>
        <Bottom>{loginButton}</Bottom>
      </Container>
    )
  }
}

const MenuEnhance = compose(withApollo)(Menu)

export default MenuEnhance
