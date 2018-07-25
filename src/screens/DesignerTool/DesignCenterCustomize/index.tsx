/**
 * DesignCenterCustomize Component - Created by david on 26/02/18.
 */
import * as React from 'react'
import { graphql, compose } from 'react-apollo'
import Tabs from './Tabs'
import { getProductFromCode } from './data'
import Render3D from './Render3D'
import { Container } from './styledComponents'
import {
  ModelConfig,
  DesignConfig,
  UploadFile,
  QueryProps,
  Product
} from '../../../types/common'

export interface Data extends QueryProps {
  product: Product
}

interface Props {
  data?: Data
  designConfig: DesignConfig
  colorBlock: number
  colorBlockHovered: number
  colors: string[]
  areas: string[]
  files: ModelConfig
  loadingModel: boolean
  uploadingFiles: boolean
  themeImage?: UploadFile[]
  selectedTheme: number
  selectedStyle: number
  productCode: string
  themeName: string
  styleName: string
  uploadingThumbnail: number
  onSelectTheme: (id: number) => void
  onSelectStyle: (id: number) => void
  onDeleteTheme: (id: number) => void
  onDeleteStyle: (id: number) => void
  onSelectImage?: (file: UploadFile) => void
  onDeleteImage?: () => void
  onSelectColorBlock: (index: number) => void
  onSelectColor: (color: string) => void
  onLoadModel: (loading: boolean) => void
  onHoverColorBlock: (index: number) => void
  onUploadFiles: (files: any, areas: any) => void
  onUploadDesign: (files: any) => void
  onSelectConfig: (config: DesignConfig) => void
  onSelectInspirationColor: (index: number) => void
  onSaveDesign: () => void
  onUpdateProductCode: (code: string) => void
  onUpdateThemeName: (name: string) => void
  onUpdateStyleName: (name: string) => void
  onSelectComplexity: (complexity: number) => void
  onSaveThumbnail: (desing: number, image: string) => void
  onUploadingThumbnail: (item: number) => void
}

class DesignCenterCustomize extends React.PureComponent<Props> {
  render3D: any
  render() {
    const {
      onSelectColorBlock,
      colorBlock,
      colorBlockHovered,
      onSelectColor,
      colors,
      loadingModel,
      onLoadModel,
      onHoverColorBlock,
      files,
      uploadingFiles,
      onUploadFiles,
      onUploadDesign,
      onSelectConfig,
      areas,
      designConfig,
      onSelectInspirationColor,
      onSaveDesign,
      themeImage,
      selectedTheme,
      selectedStyle,
      onSelectTheme,
      onSelectStyle,
      onDeleteTheme,
      onDeleteStyle,
      onSelectImage,
      onDeleteImage,
      onUpdateProductCode,
      productCode,
      data,
      themeName,
      styleName,
      uploadingThumbnail,
      onUpdateThemeName,
      onUpdateStyleName,
      onSelectComplexity,
      onSaveThumbnail,
      onUploadingThumbnail
    } = this.props

    console.log('---------------------------')
    console.log(data)
    console.log('---------------------------')

    return (
      <Container>
        <Tabs
          {...{
            designConfig,
            colorBlock,
            colorBlockHovered,
            onSelectColorBlock,
            onHoverColorBlock,
            onSelectColor,
            colors,
            onUploadFiles,
            onUploadDesign,
            uploadingFiles,
            onSelectConfig,
            onSelectInspirationColor,
            themeImage,
            selectedTheme,
            selectedStyle,
            onSaveDesign,
            onSelectTheme,
            onSelectStyle,
            onDeleteTheme,
            onDeleteStyle,
            onSelectImage,
            onDeleteImage,
            onUpdateProductCode,
            productCode,
            themeName,
            styleName,
            onUpdateThemeName,
            onUpdateStyleName,
            onSelectComplexity,
            uploadingThumbnail
          }}
          onSaveThumbnail={this.handleOnSaveThumbnail}
          productData={data}
          uploadNewModel={!!files}
        />
        <Render3D
          {...{
            files,
            areas,
            colors,
            onSaveDesign,
            onLoadModel,
            designConfig,
            loadingModel,
            colorBlockHovered,
            onSaveThumbnail,
            onUploadingThumbnail
          }}
          ref={render3D => (this.render3D = render3D)}
        />
      </Container>
    )
  }

  handleOnSaveThumbnail = (index: number, colors: string[]) => {
    if (this.render3D) {
      this.render3D.saveThumbnail(index, colors)
    }
  }
}

type OwnProps = {
  productCode?: string
}

const EnhanceDesignCenterCustomize = compose(
  graphql<Data>(getProductFromCode, {
    options: ({ productCode }: OwnProps) => ({
      skip: !productCode,
      fetchPolicy: 'network-only',
      variables: { code: productCode },
      notifyOnNetworkStatusChange: true
    })
  })
)(DesignCenterCustomize)

export default EnhanceDesignCenterCustomize
