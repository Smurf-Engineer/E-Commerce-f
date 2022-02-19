/**
 * StitchingColor Component - Created by miguelcanobbio on 17/08/18.
 */
import * as React from 'react'
import get from 'lodash/get'
import {
  Container,
  Name,
  Row,
  ColorContainer,
  Color,
  ColorName
} from './styledComponents'
import { StitchingColor } from '../../../types/common'

interface Props {
  name: string
  stitchingColor: StitchingColor
}

const StitchingColor = ({
  name,
  stitchingColor,
}: Props) => {
  const stitchingName = get(stitchingColor, 'name', '')
  const stitchingValue = get(stitchingColor, 'value', '')
  return (
    <Container>
      <Row>
        <Name>{name}</Name>
        <ColorContainer>
          <Color color={stitchingValue} />
          <ColorName>
            {stitchingName}
          </ColorName>
        </ColorContainer>
      </Row>
    </Container>
  )
}

export default StitchingColor
