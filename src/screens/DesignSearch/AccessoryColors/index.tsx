/**
 * AccessoryColors Component - Created by miguelcanobbio on 17/08/18.
 */
import * as React from 'react'
import { AccesoryColor, StitchingColor } from '../../../types/common'
import AccessoryColor from '../AccessoryColor'
import StitchingColorComponent from '../StitchingColor'

import { AccessoryColors as AccessoryColorsConstants } from '../../../screens/DesignCenter/constants'

interface Props {
  stitchingName?: string
  stitchingValue?: string
  bibColor?: AccesoryColor
  zipperColor?: AccesoryColor
  bindingColor?: AccesoryColor
  onSelectStitchingColor: (stitchingColor: StitchingColor) => void
  onSelectColor: (color: string, id: string) => void
}

const AccessoryColors = ({
  stitchingName,
  stitchingValue,
  bibColor,
  zipperColor,
  bindingColor,
  onSelectStitchingColor,
  onSelectColor
}: Props) => {
  return (
    <div>
      {bibColor && (
        <AccessoryColor
          id={AccessoryColorsConstants.Bib}
          name="Bib Brace Color"
          color={bibColor}
          {...{ onSelectColor }}
        />
      )}
      {zipperColor && (
        <AccessoryColor
          id={AccessoryColorsConstants.Zipper}
          name="Zipper Color"
          color={zipperColor}
          {...{ onSelectColor }}
        />
      )}
      {bindingColor && (
        <AccessoryColor
          id={AccessoryColorsConstants.Binding}
          name="Binding Color"
          color={bindingColor}
          {...{ onSelectColor }}
        />
      )}
      {stitchingName && stitchingValue && (
        <StitchingColorComponent
          {...{ onSelectStitchingColor }}
          name="Stitching"
          stitchingColor={{ name: stitchingName, value: stitchingValue }}
        />
      )}
    </div>
  )
}

export default AccessoryColors
