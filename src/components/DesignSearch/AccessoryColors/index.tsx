/**
 * AccessoryColors Component - Created by miguelcanobbio on 17/08/18.
 */
import * as React from 'react'
import { AccesoryColor, PredyedColor, StitchingColor } from '../../../types/common'
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
  allowZipperSelection: boolean
  predyedValue?: string
  predyedCode?: string
  hasPredyed?: boolean
  predyedColors?: PredyedColor[]
  onSelectPredyed: (predyedValue: string) => void,
  onSelectStitchingColor: (stitchingColor: StitchingColor) => void
  onSelectColor: (color: string, id: string) => void
}

const AccessoryColors = ({
  stitchingName,
  stitchingValue,
  bibColor,
  zipperColor,
  hasPredyed,
  predyedColors,
  predyedCode,
  predyedValue,
  bindingColor,
  onSelectPredyed,
  onSelectStitchingColor,
  onSelectColor,
  allowZipperSelection
}: Props) => {
  return (
    <div>
      {bibColor && (
        <AccessoryColor
          id={AccessoryColorsConstants.Bib}
          name="Bib Brace Color"
          color={bibColor}
          allowSelection={true}
          {...{ onSelectColor }}
        />
      )}
      {zipperColor && (
        <AccessoryColor
          id={AccessoryColorsConstants.Zipper}
          name="Zipper Color"
          color={zipperColor}
          allowSelection={allowZipperSelection}
          {...{ onSelectColor }}
        />
      )}
      {bindingColor && (
        <AccessoryColor
          id={AccessoryColorsConstants.Binding}
          name="Binding Color"
          color={bindingColor}
          allowSelection={true}
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
      {hasPredyed && (
        <PredyedColorComponent
          {...{ onSelectPredyed, predyedValue, predyedColors, predyedCode }}
          name="Predyed"
        />
      )}
    </div>
  )
}

export default AccessoryColors
