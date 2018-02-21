/**
 * Menu Component - Created by david on 20/02/18.
 */
import * as React from 'react'
import MenuAntd from 'antd/lib/menu'
import upperFirst from 'lodash/upperFirst'
import Dropdown from 'antd/lib/dropdown'
import caFlag from '../../../assets/CA.svg'
import euFlag from '../../../assets/EU.svg'
import usFlag from '../../../assets/US.svg'
import downArrow from '../../../assets/downarrow.svg'
import Options from '../Options'
import { Region } from '../../../types/common'
import {
  Container,
  Text,
  Row,
  Line,
  LineVertical,
  Label,
  Option,
  MenuOption,
  menuStyle
} from './styledComponents'

const regions: Region[] = [
  {
    icon: usFlag,
    label: 'global',
    languages: ['en', 'jpn'],
    currencies: ['$usd', '$aud', '¥jpy']
  },
  {
    icon: caFlag,
    label: 'canada',
    languages: ['en', 'fr'],
    currencies: ['$cad']
  },
  {
    icon: euFlag,
    label: 'europe',
    languages: ['en', 'de'],
    currencies: ['$eur', '₣CHF']
  }
]

interface Props {
  currentRegion: number
  onSelectRegion: (menu: any) => void
}

const Menu = ({ currentRegion, onSelectRegion }: Props) => {
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
      <Options title="Language" options={regions[currentRegion].languages} />
      <Line />
      <Options title="Currency" options={regions[currentRegion].currencies} />
      <Line />
      <Text>CONFIRM</Text>
    </Container>
  )
}

export default Menu
