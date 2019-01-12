/**
 * AccessoryColors Component - Created by miguelcanobbio on 17/08/18.
 */
import * as React from 'react'
import { AccesoryColor, StitchingColor } from '../../../types/common'
import AccessoryColor from '../AccessoryColor'

interface Props {
  stitchingName?: string
  stitchingValue?: string
  bibColor?: AccesoryColor
  zipperColor?: AccesoryColor
  bindingColor?: AccesoryColor
  onSelectStitchingColor: (stitchingColor: StitchingColor) => void
}

const AccessoryColors = ({
  stitchingName,
  stitchingValue,
  bibColor,
  zipperColor,
  bindingColor,
  onSelectStitchingColor
}: Props) => {
  return (
    <div>
      {bibColor && <AccessoryColor name="Bib Brace Color" color={bibColor} />}
      {zipperColor && (
        <AccessoryColor name="Zipper Color" color={zipperColor} />
      )}
      {bindingColor && (
        <AccessoryColor name="Binding Color" color={bindingColor} />
      )}
      {stitchingName && stitchingValue && (
        <AccessoryColor
          {...{ onSelectStitchingColor }}
          name="Stitching"
          stitchingColor={{ name: stitchingName, value: stitchingValue }}
        />
      )}
    </div>
  )
}

export default AccessoryColors
