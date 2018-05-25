/**
 * DesignCenterCustomize Component - Created by david on 26/02/18.
 */
import * as React from 'react'
import Tabs from './Tabs'
import Render3D from './Render3D'
import { Container } from './styledComponents'
import { ModelConfig } from '../../../types/common'

interface Props {
  colorBlock: number
  colorBlockHovered: number
  colors: string[]
  styleColors: string[]
  areas: string[]
  files: ModelConfig
  loadingModel: boolean
  uploadingFiles: boolean
  onSelectColorBlock: (index: number) => void
  onSelectColor: (color: string) => void
  onLoadModel: (loading: boolean) => void
  onHoverColorBlock: (index: number) => void
  onUploadFiles: (files: any) => void
  onUploadDesign: (files: any) => void
}

const DesignCenterCustomize = ({
  onSelectColorBlock,
  colorBlock,
  colorBlockHovered,
  onSelectColor,
  colors,
  styleColors,
  loadingModel,
  onLoadModel,
  onHoverColorBlock,
  files,
  uploadingFiles,
  onUploadFiles,
  onUploadDesign,
  areas
}: Props) => {
  return (
    <Container>
      <Tabs
        {...{
          colorBlock,
          colorBlockHovered,
          onSelectColorBlock,
          onHoverColorBlock,
          onSelectColor,
          colors,
          styleColors,
          onUploadFiles,
          onUploadDesign,
          uploadingFiles
        }}
        uploadNewModel={!!files}
      />
      <Render3D
        {...{
          colors,
          colorBlockHovered,
          styleColors,
          onLoadModel,
          loadingModel,
          files,
          areas
        }}
      />
    </Container>
  )
}

export default DesignCenterCustomize
