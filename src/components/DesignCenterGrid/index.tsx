/**
 * DesignCenterGrid Component - Created by david on 26/02/18.
 */
import * as React from 'react'
import { FormattedMessage } from 'react-intl'
import messages from './messages'
import { Theme } from '../../types/common'
import ThemeItem from './Theme'
import { Container, Text, Row } from './styledComponents'

interface Props {
  themes: Theme[]
}

const DesignCenterGrid = ({ themes }: Props) => {
  const list = themes.map(({ picture, name }, index) => (
    <ThemeItem key={index} {...{ name, picture }} />
  ))
  return <Row>{list}</Row>
}

export default DesignCenterGrid
