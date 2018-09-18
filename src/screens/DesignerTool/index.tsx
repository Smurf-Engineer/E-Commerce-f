/**
 * DesignerTool Screen - Created by david on 08/05/18.
 */
import * as React from 'react'
import { compose, graphql } from 'react-apollo'
import message from 'antd/lib/message'
import Modal from 'antd/lib/modal'
import get from 'lodash/get'
import set from 'lodash/set'
import remove from 'lodash/remove'
import findIndex from 'lodash/findIndex'
import every from 'lodash/every'
import { connect } from 'react-redux'
import { injectIntl, InjectedIntl } from 'react-intl'
import CustomizeTab from './DesignCenterCustomize'
import {
  saveDesignMutation,
  uploadThumbnailMutation,
  createThemeMutation,
  deleteThemeMutation,
  deleteStyleMutation
} from './data'
import { getProductFromCode } from './DesignCenterCustomize/data'
import * as designerToolActions from './actions'
import * as designerToolApi from './api'
import {
  ModelConfig,
  UploadFile,
  DesignConfig,
  MessagePayload
} from '../../types/common'

const { confirm } = Modal
const { uploadThemeImage } = designerToolApi

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

type Theme = {
  id: string
  name: string
  image: string
}

type DataTheme = {
  data: {
    theme: Theme
  }
}

interface Props {
  intl: InjectedIntl
  designConfig: DesignConfig[]
  colors: string[]
  styleColors: string[]
  areas: string[]
  extraFiles: string[]
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
  uploadingThumbnail: boolean
  bibBrace: boolean
  zipper: boolean
  binding: boolean
  // Redux Actions
  setLoadingAction: (loading: boolean) => void
  setColorAction: (color: string) => void
  setColorBlockAction: (index: number) => void
  setHoverColorBlockAction: (index: number) => void
  uploadFilesAction: (files: any, areas: any, extra: any) => void
  uploadDesignAction: (areas: any, config: any) => void
  setUploadingAction: (loading: boolean) => void
  setCurrentTabAction: (index: number) => void
  setSwipingTabAction: (swiping: boolean) => void
  setSelectedThemeAction: (id: number) => void
  setSelectedStyleAction: (id: number) => void
  setDesignConfigAction: (config: DesignConfig) => void
  setInspirationColorAction: (index: number) => void
  setProductCodeAction: (code: string) => void
  setThemeNameAction: (name: string) => void
  setStyleNameAction: (design: number, name: string) => void
  setComplexityAction: (design: number, complexity: number) => void
  setThumbnailAction: (design: number, item: number, thumbnail: string) => void
  setUploadingThumbnailAction: (uploading: boolean) => void
  setUploadingSuccess: (config: ModelConfig) => void
  uploadThemeImage: (file: any) => void
  addExtraFileAction: (file: string) => void
  removeExtraFileAction: (index: number) => void
  toggleExtraColorAction: (color: string) => void
  saveDesignSuccessAction: () => void
  // Apollo Mutations
  uploadThumbnail: (variables: {}) => Promise<Thumbnail>
  saveDesign: (variables: {}) => Promise<Design>
  createTheme: (variables: {}) => Promise<DataTheme>
  deleteTheme: (variables: {}) => Promise<MessagePayload>
  deleteStyle: (variables: {}) => Promise<MessagePayload>
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
      extraFiles,
      bibBrace,
      zipper,
      binding,
      setThemeNameAction,
      setStyleNameAction,
      setComplexityAction,
      setUploadingThumbnailAction,
      setUploadingSuccess,
      addExtraFileAction,
      removeExtraFileAction,
      toggleExtraColorAction
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
          extraFiles,
          formatMessage,
          bibBrace,
          zipper,
          binding
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
        onLoadDesign={setUploadingSuccess}
        onAddExtraFile={addExtraFileAction}
        onRemoveExtraFile={removeExtraFileAction}
        onToggleColor={toggleExtraColorAction}
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

  handleOnDeleteTheme = (id: number) => {
    confirm({
      title: 'Are you sure?',
      content:
        'If you remove this theme, all designs linked to it will be delete too.',
      onOk: async () => {
        try {
          const { deleteTheme, productCode } = this.props
          await deleteTheme({
            variables: { id },
            update: (store: any) => {
              const data = store.readQuery({
                query: getProductFromCode,
                variables: { code: productCode }
              })
              const themes = get(data, 'product.themes', [])
              const updatedThemes = remove(
                themes,
                ({ id: themeId }) => themeId !== id
              )
              set(data, 'product.themes', updatedThemes)
              store.writeQuery({
                query: getProductFromCode,
                data,
                variables: { code: productCode }
              })
            }
          })
        } catch (e) {
          message.error(e.message)
        }
      }
    })
  }

  handleOnDeleteStyle = async (id: number) => {
    confirm({
      title: 'Are you sure?',
      content: 'Design will be deleted.',
      onOk: async () => {
        try {
          const { deleteStyle, productCode, selectedTheme } = this.props
          await deleteStyle({
            variables: { id },
            update: (store: any) => {
              const data = store.readQuery({
                query: getProductFromCode,
                variables: { code: productCode }
              })
              const themes = get(data, 'product.themes', [])
              const themeIndex = findIndex(
                themes,
                ({ id: themeId }) => themeId === selectedTheme
              )
              const { styles } = themes[themeIndex]
              const updatedStyles = remove(
                styles,
                ({ id: styleId }) => styleId !== id
              )
              set(data, `product.themes[${themeIndex}].styles`, updatedStyles)
              data.product.themes[themeIndex].styles = updatedStyles
              store.writeQuery({
                query: getProductFromCode,
                data,
                variables: { code: productCode }
              })
            }
          })
        } catch (e) {
          message.error(e.message)
        }
      }
    })
  }

  handleOnSelectThemeImage = (file: UploadFile) => {
    this.setState({ themeImage: [file] })
  }

  handleOnDeleteThemeImage = () => {
    this.setState({ themeImage: [] })
  }

  handleUploadThumbnail = async (
    design: number,
    item: number,
    image: string
  ) => {
    const {
      uploadThumbnail,
      setThumbnailAction,
      setUploadingThumbnailAction
    } = this.props
    try {
      const response = await uploadThumbnail({ variables: { image } })
      const thumbnailUrl = get(response, 'data.style.image', '')
      setThumbnailAction(design, item, thumbnailUrl)
      setUploadingThumbnailAction(false)
    } catch (e) {
      setUploadingThumbnailAction(false)
      message.error(e.message)
    }
  }

  handleSaveDesign = async () => {
    try {
      const {
        productCode,
        modelConfig,
        selectedTheme,
        designConfig,
        saveDesign,
        themeName,
        createTheme,
        saveDesignSuccessAction
      } = this.props

      if (!productCode) {
        message.error('Please enter a product code')
        return
      }

      if (!designConfig.length) {
        message.error('Missing config file')
        return
      }

      if (!modelConfig) {
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
        areasPng,
        bibBraceWhite,
        bibBraceBlack,
        zipperWhite,
        zipperBlack,
        bindingWhite,
        bindingBlack,
        size
      } = modelConfig

      const designs = designConfig.map(
        ({ name, complexity, thumbnail, colors, inspiration }) => {
          const inspirationItems = inspiration.map(item => ({
            name: item.name,
            colors: item.colors,
            image: item.thumbnail
          }))

          const hasAllInspirationThumbnail = every(inspiration, 'thumbnail')

          if (!hasAllInspirationThumbnail) {
            message.error('Unable to find one or more Inspiration Thumbnails')
            return
          }

          return {
            name,
            image: thumbnail,
            complexity: complexity || 1,
            branding: brandingSvg,
            brandingPng,
            svgs: areasSvg,
            pngs: areasPng,
            colors,
            inspiration: inspirationItems,
            width: size.width,
            height: size.height
          }
        }
      )

      const hasAllDesignThumbnail = every(designs, 'image')
      if (!hasAllDesignThumbnail) {
        message.error('To proceed, save design thumbnail first')
        return
      }

      const { themeImage } = this.state
      let themeResponse = null
      const hasSelectedTheme = selectedTheme > 0
      if (!hasSelectedTheme && !!themeImage.length && !!themeName) {
        const responseImage = await uploadThemeImage(themeImage[0])
        if (!!responseImage) {
          const { image } = responseImage
          const theme = {
            image,
            name: themeName
          }
          themeResponse = await createTheme({ variables: { theme } })
        }
      }

      if (!themeResponse && !hasSelectedTheme) {
        message.error('Select a theme or create new one')
        return
      }

      const themeId = get(themeResponse, 'data.theme.id', selectedTheme)

      const design = {
        productCode,
        label,
        bumpMap,
        flatLock: flatlock,
        obj,
        mtl,
        bibBraceWhite,
        bibBraceBlack,
        zipperWhite,
        zipperBlack,
        bindingWhite,
        bindingBlack,
        theme_id: themeId,
        styles: designs
      }
      await saveDesign({
        variables: { design },
        refetchQueries: [
          { query: getProductFromCode, variables: { code: productCode } }
        ]
      })
      saveDesignSuccessAction()
      message.success('Your design is now saved')
    } catch (e) {
      message.error(e.message)
    }
  }
}

const mapStateToProps = (state: any) => state.get('designerTool').toJS()

const DesignerToolEnhance = compose(
  injectIntl,
  graphql(saveDesignMutation, { name: 'saveDesign' }),
  graphql(uploadThumbnailMutation, { name: 'uploadThumbnail' }),
  graphql(createThemeMutation, { name: 'createTheme' }),
  graphql(deleteThemeMutation, { name: 'deleteTheme' }),
  graphql(deleteStyleMutation, { name: 'deleteStyle' }),
  connect(
    mapStateToProps,
    { ...designerToolActions, ...designerToolApi }
  )
)(DesignerTool)

export default DesignerToolEnhance