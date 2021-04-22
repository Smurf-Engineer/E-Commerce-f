/**
 * AccessoryColors Component - Created by miguelcanobbio on 17/08/18.
 */
import * as React from 'react'
import { AccesoryColor } from '../../../types/common'
import AccessoryColor from '../AccessoryColor'
import StitchingColorComponent from '../StitchingColor'
import PredyedColorComponent from '../PredyedColor'

import { AccessoryColors as AccessoryColorsConstants } from '../../../screens/DesignCenter/constants'

interface Props {
  stitchingName?: string
  stitchingValue?: string
  bibColor?: AccesoryColor
  zipperColor?: AccesoryColor
  bindingColor?: AccesoryColor
  predyedValue?: string
  predyedlabel?: string
  predyedCode?: string
  hasPredyed?: boolean
}

const AccessoryColors = ({
  stitchingName,
  stitchingValue,
  bibColor,
  zipperColor,
  hasPredyed,
  predyedlabel,
  predyedValue,
  predyedCode,
  bindingColor
}: Props) => {
  return (
    <div>
      {bibColor && (
        <AccessoryColor
          id={AccessoryColorsConstants.Bib}
          name="Bib Brace Color"
          color={bibColor}
        />
      )}
      {zipperColor && (
        <AccessoryColor
          id={AccessoryColorsConstants.Zipper}
          name="Zipper Color"
          color={zipperColor}
        />
      )}
      {bindingColor && (
        <AccessoryColor
          id={AccessoryColorsConstants.Binding}
          name="Binding Color"
          color={bindingColor}
        />
      )}
      {stitchingName && stitchingValue && (
        <StitchingColorComponent
          name="Stitching Color"
          stitchingColor={{ name: stitchingName, value: stitchingValue }}
        />
      )}
      {hasPredyed && (
        <PredyedColorComponent
          {...{ predyedValue, predyedCode }}
          name={predyedlabel || 'Predyed'}
        />
      )}
    </div>
  )
}

export default AccessoryColors
