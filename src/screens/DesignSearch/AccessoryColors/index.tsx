/**
 * AccessoryColors Component - Created by miguelcanobbio on 17/08/18.
 */
import * as React from 'react'
import { Container } from './styledComponents'
import { AccesoryColor } from '../../../types/common'
import AccessoryColor from '../AccessoryColor'

interface Props {
  stitchingName?: string
  stitchingValue?: string
  bibColor?: AccesoryColor
  zipperColor?: AccesoryColor
  bindingColor?: AccesoryColor
}

const AccessoryColors = ({
  stitchingName,
  stitchingValue,
  bibColor,
  zipperColor,
  bindingColor
}: Props) => {
  return (
    <Container>
      {bibColor && <AccessoryColor name="Bib Brace Color" color={bibColor} />}
      {zipperColor && (
        <AccessoryColor name="Zipper Color" color={zipperColor} />
      )}
      {bindingColor && (
        <AccessoryColor name="Binding Color" color={bindingColor} />
      )}
      {stitchingName &&
        stitchingValue && (
          <AccessoryColor
            name="Stitching"
            stitchingColor={{ name: stitchingName, value: stitchingValue }}
          />
        )}
    </Container>
  )
}

export default AccessoryColors
