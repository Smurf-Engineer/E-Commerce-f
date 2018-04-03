/**
 * MenuBarMobile Component - Created by david on 02/04/18.
 */
import * as React from 'react'
import { FormattedMessage } from 'react-intl'
import messages from './messages'
import { Container, Text } from './styledComponents'

interface Props {}

const MenuBarMobile = (props: Props) => {
  return (
    <Container>
      <div>MENU</div>
      <div>LOGO</div>
      <div>CAR</div>
    </Container>
  )
}

export default MenuBarMobile
