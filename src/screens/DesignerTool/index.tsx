/**
 * DesignerTool Screen - Created by david on 08/05/18.
 */
import * as React from 'react'
import { compose, graphql } from 'react-apollo'
import message from 'antd/lib/message'
import get from 'lodash/get'
import every from 'lodash/every'
import { connect } from 'react-redux'
import { injectIntl, InjectedIntl } from 'react-intl'
import CustomizeTab from './DesignCenterCustomize'
import { saveDesignMutation, uploadThumbnailMutation } from './data'
import * as designerToolActions from './actions'
import * as designerToolApi from './api'
import { ModelConfig, UploadFile, DesignConfig } from '../../types/common'

const NONE = -2

type Thumbnail = {
  style: {
    image: string
  }
}

type Design = {
  design: {
    message: string
  }
}

interface Props {
  intl: InjectedIntl
  designConfig: DesignConfig
  colors: string[]
  styleColors: string[]
  areas: string[]
  colorBlock: number
  colorBlockHovered: number
  loadingModel: boolean
  uploadingFiles: boolean
  modelConfig: ModelConfig
  currentTab: number
  swipingView: boolean
  selectedTheme: number
  selectedStyle: number
  productCode: string
  themeName: string
  styleName: string
  uploadingThumbnail: number
  // Redux Actions
  setLoadingAction: (loading: boolean) => void
  setColorAction: (color: string) => void
  setColorBlockAction: (index: number) => void
  setHoverColorBlockAction: (index: number) => void
  uploadFilesAction: (files: any, areas: any) => void
  uploadDesignAction: (files: any) => void
  setUploadingAction: (loading: boolean) => void
  setCurrentTabAction: (index: number) => void
  setSwipingTabAction: (swiping: boolean) => void
  setSelectedThemeAction: (id: number) => void
  setSelectedStyleAction: (id: number) => void
  setDesignConfigAction: (config: DesignConfig) => void
  setInspirationColorAction: (index: number) => void
  setProductCodeAction: (code: string) => void
  setThemeNameAction: (name: string) => void
  setStyleNameAction: (name: string) => void
  setComplexityAction: (complexity: number) => void
  setThumbnailAction: (item: number, thumbnail: string) => void
  setUploadingThumbnailAction: (item: number) => void
  // Apollo Mutations
  uploadThumbnail: (variables: {}) => Promise<Thumbnail>
  saveDesign: (variables: {}) => Promise<Design>
}

export class DesignerTool extends React.Component<Props, {}> {
  state = {
    themeImage: []
  }
  render() {
    const {
      intl: { formatMessage },
      colors,
      colorBlock,
      colorBlockHovered,
      setLoadingAction,
      loadingModel,
      setColorAction,
      setColorBlockAction,
      setHoverColorBlockAction,
      uploadFilesAction,
      uploadDesignAction,
      uploadingFiles,
      uploadingThumbnail,
      modelConfig,
      areas,
      setSelectedThemeAction,
      setSelectedStyleAction,
      setDesignConfigAction,
      setInspirationColorAction,
      designConfig,
      selectedTheme,
      selectedStyle,
      setProductCodeAction,
      productCode,
      themeName,
      styleName,
      setThemeNameAction,
      setStyleNameAction,
      setComplexityAction,
      setUploadingThumbnailAction
    } = this.props
    const { themeImage } = this.state
    return (
      <CustomizeTab
        {...{
          colors,
          colorBlock,
          colorBlockHovered,
          loadingModel,
          uploadingFiles,
          areas,
          designConfig,
          themeImage,
          selectedTheme,
          selectedStyle,
          productCode,
          themeName,
          styleName,
          uploadingThumbnail,
          formatMessage
        }}
        files={modelConfig}
        onSaveDesign={this.handleSaveDesign}
        onSelectTheme={setSelectedThemeAction}
        onSelectStyle={setSelectedStyleAction}
        onDeleteTheme={this.handleOnDeleteTheme}
        onDeleteStyle={this.handleOnDeleteStyle}
        onSelectImage={this.handleOnSelectThemeImage}
        onDeleteImage={this.handleOnDeleteThemeImage}
        onLoadModel={setLoadingAction}
        onSelectColorBlock={setColorBlockAction}
        onHoverColorBlock={setHoverColorBlockAction}
        onSelectColor={setColorAction}
        onUploadFiles={uploadFilesAction}
        onUploadDesign={uploadDesignAction}
        onSelectConfig={setDesignConfigAction}
        onSelectInspirationColor={setInspirationColorAction}
        onUpdateProductCode={setProductCodeAction}
        onUpdateThemeName={setThemeNameAction}
        onUpdateStyleName={setStyleNameAction}
        onSelectComplexity={setComplexityAction}
        onSaveThumbnail={this.handleUploadThumbnail}
        onUploadingThumbnail={setUploadingThumbnailAction}
      />
    )
  }

  handleOnTransitionEnd = () => {
    const { setSwipingTabAction } = this.props
    setSwipingTabAction(false)
  }

  handleOnSelectTab = (index: number) => {
    const { setCurrentTabAction } = this.props
    setCurrentTabAction(index)
  }

  handleOnDeleteTheme = (id: number) => {}

  handleOnDeleteStyle = (id: number) => {}

  handleOnSelectThemeImage = (file: UploadFile) => {
    this.setState({ themeImage: [file] })
  }

  handleOnDeleteThemeImage = () => {
    this.setState({ themeImage: [] })
  }

  handleUploadThumbnail = async (design: number, image: string) => {
    const {
      uploadThumbnail,
      setThumbnailAction,
      setUploadingThumbnailAction
    } = this.props
    try {
      const response = await uploadThumbnail({ variables: { image } })
      const thumbnailUrl = get(response, 'data.style.image', '')
      setThumbnailAction(design, thumbnailUrl)
      setUploadingThumbnailAction(NONE)
    } catch (e) {
      setUploadingThumbnailAction(NONE)
      console.error(e)
    }
  }

  handleSaveDesign = async () => {
    try {
      const {
        productCode,
        modelConfig,
        selectedTheme,
        designConfig,
        saveDesign
      } = this.props

      if (!modelConfig || !designConfig) {
        message.error('Upload model files first')
        return
      }

      const {
        obj,
        mtl,
        label,
        bumpMap,
        flatlock,
        brandingPng,
        brandingSvg,
        areasSvg,
        areasPng
      } = modelConfig
      const { name, complexity, thumbnail, colors, inspiration } = designConfig

      if (!thumbnail) {
        message.error('To proceed, save design thumbnail first')
        return
      }

      const hasAllInspirationThumbnail = every(inspiration, 'thumbnail')

      if (!hasAllInspirationThumbnail) {
        message.error('Unable to find one or more Inspiration Thumbnails')
        return
      }

      if (!productCode) {
        message.error('Please enter a product code')
        return
      }

      if (!selectedTheme) {
        // TODO: Validate if exist data for create a new theme, if not show error
      }

      const inspirationItems = inspiration.map(item => ({
        name: item.name,
        colors: item.colors,
        image: item.thumbnail
      }))
      const design = {
        productCode,
        label,
        bumpMap,
        flatLock: flatlock,
        obj,
        mtl,
        theme_id: selectedTheme,
        styles: [
          {
            name,
            image: thumbnail,
            complexity,
            branding: brandingSvg,
            brandingPng,
            svgs: areasSvg,
            pngs: areasPng,
            colors,
            inspiration: inspirationItems
          }
        ]
      }
      await saveDesign({ variables: { design } })
      message.success('Your design is now saved')
    } catch (e) {
      console.error(e)
    }
  }
}

const mapStateToProps = (state: any) => state.get('designerTool').toJS()

const DesignerToolEnhance = compose(
  injectIntl,
  graphql(saveDesignMutation, { name: 'saveDesign' }),
  graphql(uploadThumbnailMutation, { name: 'uploadThumbnail' }),
  connect(
    mapStateToProps,
    { ...designerToolActions, ...designerToolApi }
  )
)(DesignerTool)

export default DesignerToolEnhance
