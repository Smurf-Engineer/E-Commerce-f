/**
 * Menu Component - Created by david on 20/02/18.
 */
import * as React from 'react'
import MenuAntd from 'antd/lib/menu'
import upperFirst from 'lodash/upperFirst'
import Dropdown from 'antd/lib/dropdown'
import downArrow from '../../../assets/downarrow.svg'
import Options from '../Options'
import { Region } from '../../../types/common'
import {
  Container,
  Text,
  Row,
  Line,
  Option,
  MenuOption,
  menuStyle
} from './styledComponents'

interface Props {
  currentRegion: number
  currentLanguage: number
  currentCurrency: number
  onSelectRegion: (menu: any) => void
  onSelectLanguage: (index: number) => void
  onSelectCurrency: (index: number) => void
  onClickConfirm: () => void
  regions: Region[]
}

const Menu = ({
  currentRegion,
  currentLanguage,
  currentCurrency,
  onSelectRegion,
  onSelectLanguage,
  onSelectCurrency,
  onClickConfirm,
  regions
}: Props) => {
  const items = regions.map(({ icon, label }, index) => (
    <MenuAntd.Item key={index}>
      <Option>
        <img src={icon} />
        <MenuOption>{upperFirst(label)}</MenuOption>
      </Option>
    </MenuAntd.Item>
  ))
  const menu = (
    <MenuAntd onClick={onSelectRegion} style={menuStyle}>
      {items}
    </MenuAntd>
  )
  const flag = regions[currentRegion].icon
  const regionName = regions[currentRegion].label
  const region = (
    <Row>
      <img src={flag} />
      <Text>{upperFirst(regionName)}</Text>
      <img src={downArrow} />
    </Row>
  )
  return (
    <Container>
      <Dropdown overlay={menu}>{region}</Dropdown>
      <Line />
      <Options
        title="Language"
        options={regions[currentRegion].languages}
        onPress={onSelectLanguage}
        currentSelected={currentLanguage}
      />
      <Line />
      <Options
        title="Currency"
        options={regions[currentRegion].currencies}
        onPress={onSelectCurrency}
        currentSelected={currentCurrency}
      />
      <Line />
      <Text onClick={onClickConfirm}>CONFIRM</Text>
    </Container>
  )
}

export default Menu
