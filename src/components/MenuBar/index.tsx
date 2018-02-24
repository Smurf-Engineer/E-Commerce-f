/**
 * MenuBar Component - Created by david on 07/02/18.
 */
import * as React from 'react'
import { FormattedMessage, InjectedIntl } from 'react-intl'
import DropdownList from '../DropdownList'
import MenuSupport from '../MenuSupport'
import MenuRegion from '../MenuRegion'
import {
  Container,
  TopText,
  Row,
  Divider,
  TopRow,
  BottomRow,
  LogoIcon,
  CartIcon,
  SearchIcon
} from './styledComponents'
import logo from '../../assets/jakroo_logo.svg'
import cart from '../../assets/cart.svg'
import search from '../../assets/search.svg'
import messages from './messages'
import SearchBar from '../SearchBar'
import { RegionConfig } from '../../types/common'

interface Props {
  history: any
  searchFunc: (param: string) => void
  onChangeLocation: (payload: RegionConfig) => void
  currentRegion: number
  currentLanguage: number
  currentCurrency: number
  intl: InjectedIntl
  hideBottom?: boolean
}

const MenuBar: React.SFC<Props> = ({
  history,
  searchFunc,
  onChangeLocation,
  currentRegion,
  currentLanguage,
  currentCurrency,
  hideBottom,
  intl
}) => {
  return (
    <Container>
      <Row>
        <MenuSupport />
        <TopRow>
          <MenuRegion
            {...{
              onChangeLocation,
              currentRegion,
              currentLanguage,
              currentCurrency
            }}
          />
          <CartIcon src={cart} />
          <TopText>
            <FormattedMessage {...messages.title} />
          </TopText>
        </TopRow>
      </Row>
      <Divider />
      {!hideBottom && (
        <BottomRow>
          <LogoIcon src={logo} />
          <DropdownList {...{ history }} />
          <SearchBar
            search={searchFunc}
            onHeader={true}
            formatMessage={intl.formatMessage}
          />
        </BottomRow>
      )}
    </Container>
  )
}

MenuBar.defaultProps = {
  hideBottom: false
}

export default MenuBar
