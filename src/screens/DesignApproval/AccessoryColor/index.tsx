/**
 * AccessoryColor Component - Created by miguelcanobbio on 17/08/18.
 */
import * as React from 'react'
import { Container, Name, Oval, Row } from './styledComponents'
import { AccesoryColor } from '../../../types/common'
import { BLACK } from '../../../screens/DesignCenter/constants'
import * as Colors from '../../../theme/colors'

interface Props {
  name: string
  color: AccesoryColor
}

const AccessoryColor = ({
  name,
  color
}: Props) => {
  const accessColor = color === BLACK ? Colors.BLACK : Colors.WHITE
  const colorSelector = (
    <Row>
      <Name>{name}</Name>
      <Oval color={accessColor} />
    </Row>
  )
  return (
    <Container>
      {colorSelector}
    </Container>
  )
}

export default AccessoryColor
