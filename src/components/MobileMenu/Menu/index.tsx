/**
 * Menu Component - Created by david on 03/04/18.
 */
import * as React from 'react'
import { compose, withApollo } from 'react-apollo'
import queryString from 'query-string'
import upperFirst from 'lodash/upperFirst'
import lowerCase from 'lodash/lowerCase'
import MenuAntd from 'antd/lib/menu'
import Spin from 'antd/lib/spin'
import { Container, Bottom, menuStyle, SeeAll } from './styledComponents'
import { FormattedMessage } from 'react-intl'
import messages from './messages'
import { Filter } from '../../../types/common'
import { categoriesQuery } from './data'

const { SubMenu } = MenuAntd

const menuOptionsSports = [
  { label: 'cycling', visible: false, categories: [] as Filter[] },
  { label: 'triathlon', visible: false, categories: [] as Filter[] },
  { label: 'active', visible: false, categories: [] as Filter[] }
]

const menuOptionsGenders = [
  { label: 'men', visible: false, sports: menuOptionsSports },
  { label: 'women', visible: false, sports: menuOptionsSports }
]

interface Props {
  client: any
  data?: any
  history: any
  loginButton: React.ReactNode
  regionButton: React.ReactNode
  menuOpen: boolean
  formatMessage: (messageDescriptor: any) => string
}

class Menu extends React.PureComponent<Props, {}> {
  state = {
    openKeys: [''],
    genderSelected: null,
    sportSelected: null
  }

  componentWillReceiveProps({ menuOpen }: Props) {
    if (menuOpen === false) {
      this.setState({ openKeys: [''] })
    }
  }

  handleOpenGender = (gender: number) => {
    this.setState({ genderSelected: gender })
  }

  handleOpenSport = (sport: string) => {
    this.setState({ sportSelected: sport })
  }

  handleClick = ({
    item: {
      props: { children }
    },
    key,
    selectedKeys
  }: any) => {
    const {
      history: {
        push,
        location: { search, pathname }
      }
    } = this.props

    const { genderSelected, sportSelected } = this.state

    const { gender, category, sport } = queryString.parse(search)

    const toGender = !!genderSelected ? 'men' : 'women'
    const toCategory = children.replace(' & ', ' ')
    const toSport = sportSelected && lowerCase(sportSelected)

    const route = `/product-catalogue?${key}`
    const atProductCatalogue = (pathname as String).includes(
      'product-catalogue'
    )

    const isMissingFilter = !gender || !category || !sport
    const isChangingGender = atProductCatalogue && gender && gender !== toGender
    const isChangingCategory =
      atProductCatalogue && category && category !== toCategory
    const isChangingSport = atProductCatalogue && sport && sport !== toSport
    const isChangingFilter =
      isChangingGender || isChangingCategory || isChangingSport

    if ((atProductCatalogue && isMissingFilter) || isChangingFilter) {
      window.location.replace(route)
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

  fetchCategories = async (
    sportId: number,
    genderId: number | undefined,
    sportName: string
  ) => {
    const {
      client: { query }
    } = this.props

    const {
      data: { categories }
    } = await query({
      query: categoriesQuery,
      variables: { sportId, genderId: genderId || 1 },
      fetchPolicy: 'network-only'
    })

    if (genderId === undefined) {
      let sport = menuOptionsSports.find(x => x.label === sportName)
      if (sport) {
        sport.categories = categories
      }
    } else {
      let gender = menuOptionsGenders[genderId - 1].sports.find(
        x => x.label === sportName
      )
      if (gender) {
        gender.categories = categories
      }
    }
  }

  getCategories = (sportName: string) => {
    const {
      data: { sports }
    } = this.props
    const { genderSelected } = this.state

    const sportId = sports.find(
      ({ name }: any) => name === upperFirst(sportName)
    ).id
    const genderId = genderSelected !== null ? genderSelected + 1 : undefined
    this.fetchCategories(sportId, genderId, sportName)
  }

  render() {
    const {
      data: { loading, error },
      loginButton,
      regionButton,
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

    const optionsGender = menuOptionsGenders.map(
      ({ label: genderName, sports }, index) => (
        <SubMenu
          key={`menu-${genderName}-${index}`}
          onClick={this.handleOpenGender(index)}
          title={
            <span>
              <FormattedMessage {...messages[genderName]} />
            </span>
          }
        >
          {sports.map(({ label, categories }: any, key: number) => {
            this.getCategories(label)
            return (
              !!categories.length && (
                <SubMenu
                  key={`${genderName}-${label}-${key}`}
                  onClick={this.handleOpenSport(label)}
                  title={upperFirst(label)}
                >
                  {categories.map(({ name }: Filter) => (
                    <MenuAntd.Item
                      key={`gender=${genderName}&sport=${label}&category=${lowerCase(
                        name
                      )}`}
                    >
                      {name}
                    </MenuAntd.Item>
                  ))}
                </SubMenu>
              )
            )
          })}
        </SubMenu>
      )
    )

    const optionsSports = menuOptionsSports.map(
      ({ label, categories }, index) => {
        this.getCategories(label)
        return (
          <SubMenu
            key={`menu-${label}-${index}`}
            onClick={this.handleOpenSport(label)}
            title={
              <span>
                <FormattedMessage {...messages[label]} />
              </span>
            }
          >
            {categories.map(({ name: categoryName }: any) => (
              <MenuAntd.Item
                key={`sport=${label}&category=${lowerCase(categoryName)}`}
              >
                {categoryName}
              </MenuAntd.Item>
            ))}
          </SubMenu>
        )
      }
    )

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
        <SeeAll onClick={this.handleOnSeeAll}>
          {formatMessage(messages.seeAll)}
        </SeeAll>
        <Bottom>
          {loginButton}
          {regionButton}
        </Bottom>
      </Container>
    )
  }
}

const MenuEnhance = compose(withApollo)(Menu)

export default MenuEnhance
