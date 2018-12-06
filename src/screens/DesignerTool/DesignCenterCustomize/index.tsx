/**
 * DesignCenterCustomize Component - Created by david on 26/02/18.
 */
import * as React from 'react'
import { graphql, compose } from 'react-apollo'
import get from 'lodash/get'
import cloneDeep from 'lodash/cloneDeep'
import orderBy from 'lodash/orderBy'
import map from 'lodash/map'
import Tabs from './Tabs'
import message from 'antd/lib/message'
import { getProductFromCode, updateThemesOrderMutation } from './data'
import Render3D from './Render3D'
import { Container } from './styledComponents'
import {
  ModelConfig,
  DesignConfig,
  UploadFile,
  QueryProps,
  Product,
  DesignObject,
  ModelDesign,
  Theme
} from '../../../types/common'

export interface Data extends QueryProps {
  product: Product
}

interface Props {
  data?: Data
  designConfig: DesignConfig[]
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
  design: ModelDesign
  uploadingThumbnail: boolean
  extraFiles: string[]
  bibBrace: boolean
  zipper: boolean
  binding: boolean
  colorIdeaItem: number
  colorIdeas: DesignObject[]
  onSelectTheme: (id: number) => void
  onSelectStyle: (id: number) => void
  onDeleteTheme: (id: number) => void
  onDeleteStyle: (id: number) => void
  onDeleteInspiration: (id: number, index: number) => void
  onSelectImage?: (file: UploadFile) => void
  onDeleteImage?: () => void
  onSelectColorBlock: (index: number) => void
  onSelectColor: (color: string) => void
  onLoadModel: (loading: boolean) => void
  onHoverColorBlock: (index: number) => void
  onUploadFiles: (files: any, areas: any, extra: any) => void
  onUploadDesign: (areas: any, config: any) => void
  onSelectConfig: (config: DesignConfig) => void
  onSelectInspirationColor: (index: number) => void
  onSaveDesign: () => void
  onUpdateProductCode: (code: string) => void
  onUpdateThemeName: (name: string) => void
  onUpdateDesignName: (name: string) => void
  onSelectComplexity: (design: number, complexity: number) => void
  onSaveThumbnail: (item: number, image: string) => void
  onUploadingThumbnail: (uploading: boolean) => void
  onUpdateColorIdeaName: (
    name: string,
    updateColors: boolean,
    item?: number
  ) => void
  formatMessage: (messageDescriptor: any) => string
  onLoadDesign: (
    config: ModelConfig,
    colorIdeas: DesignObject[],
    design: ModelDesign
  ) => void
  onAddExtraFile: (file: string) => void
  onRemoveExtraFile: (index: number) => void
  onToggleColor: (color: string) => void
  onEditColorIdea: (item: number) => void
  onAddColorIdea: () => void
  onEditTheme: (theme: Theme | null) => void
  updateThemesOrder: (variables: {}) => Promise<any>
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
      onDeleteInspiration,
      onSelectImage,
      onDeleteImage,
      onUpdateProductCode,
      productCode,
      data,
      themeName,
      design,
      uploadingThumbnail,
      onUpdateThemeName,
      onUpdateDesignName,
      onSelectComplexity,
      onSaveThumbnail,
      onUploadingThumbnail,
      onLoadDesign,
      onAddExtraFile,
      onRemoveExtraFile,
      extraFiles,
      formatMessage,
      onToggleColor,
      bibBrace,
      zipper,
      binding,
      colorIdeaItem,
      onEditColorIdea,
      colorIdeas,
      onUpdateColorIdeaName,
      onAddColorIdea,
      onEditTheme
    } = this.props
    const uploadNewModel =
      !!files && !!files.obj && !!files.mtl && !!files.label && !!files.bumpMap

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
            onDeleteInspiration,
            onDeleteTheme,
            onDeleteStyle,
            onSelectImage,
            onDeleteImage,
            onUpdateProductCode,
            productCode,
            themeName,
            design,
            onUpdateThemeName,
            onUpdateDesignName,
            onSelectComplexity,
            uploadingThumbnail,
            onLoadDesign,
            onAddExtraFile,
            onRemoveExtraFile,
            extraFiles,
            formatMessage,
            onToggleColor,
            bibBrace,
            zipper,
            binding,
            colorIdeaItem,
            onEditColorIdea,
            colorIdeas,
            onUpdateColorIdeaName,
            onAddColorIdea,
            onEditTheme,
            changeThemesPosition: this.changeThemesPosition,
            changeDesignsPosition: this.changeDesignsPosition
          }}
          productData={data}
          uploadNewModel={uploadNewModel}
          onSaveThumbnail={this.handleOnSaveThumbnail}
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
            onUploadingThumbnail,
            uploadingThumbnail,
            bibBrace,
            zipper,
            binding,
            design
          }}
          ref={render3D => (this.render3D = render3D)}
        />
      </Container>
    )
  }

  handleOnSaveThumbnail = (item: number, colors: string[]) => {
    if (this.render3D) {
      this.render3D.saveThumbnail(item, colors)
    }
  }
  changeThemesPosition = async (dragIndex: number, dropIndex: number) => {
    try {
      const { updateThemesOrder, data } = this.props
      const themes = orderBy(
        get(cloneDeep(data), 'product.themes', []),
        'item_order',
        'ASC'
      )
      const temporalTheme = cloneDeep(themes[dragIndex])
      themes[dragIndex].item_order = themes[dropIndex].item_order
      themes[dropIndex].item_order = temporalTheme.item_order
      const themesToSend = map(themes, ({ id, item_order }) => ({
        id,
        item_order
      }))
      await updateThemesOrder({
        variables: { themes: themesToSend },
        update: (store: any) => {
          const storeData = store.readQuery({
            query: getProductFromCode
          })
          storeData.product.themes = themes
          store.writeQuery({
            query: getProductFromCode,
            data: storeData
          })
        }
      })
    } catch (e) {
      message.error(e.message)
    }
  }
  changeDesignsPosition = (dragIndex: number, dropIndex: number) => {}
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
  }),
  updateThemesOrderMutation
)(DesignCenterCustomize)

export default EnhanceDesignCenterCustomize
