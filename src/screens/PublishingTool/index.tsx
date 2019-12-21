/**
 * PublishingTool Screen - Created by eduardoquintero on 02/12/19.
 */
import * as React from 'react'
import Helmet from 'react-helmet'
import { injectIntl, InjectedIntl } from 'react-intl'
import { FormattedMessage } from 'react-intl'
import Modal from 'antd/lib/modal'
import PlaceholdersRender3D from '../../components/PlaceholdersRender3D'
import set from 'lodash/set'
import remove from 'lodash/remove'
import findIndex from 'lodash/findIndex'
import get from 'lodash/get'
import message from 'antd/lib/message'
import * as publishingToolActions from './actions'
import * as publishingToolApi from './api'
import Tab from '../../components/Tab'
import ThemeModal from '../../components/ThemeModal'
import DesignModal from '../../components/DesignModal'
import {
  deleteThemeMutation,
  deleteStyleMutation,
  getColorsQuery,
  uploadThumbnailMutation,
  saveDesignMutation
} from './data'
import { getProductFromCode } from './Themes/data'
import Themes from './Themes'
import Design from './Design'
import messages from './messages'
import { connect } from 'react-redux'
import { compose, withApollo, graphql, QueryProps } from 'react-apollo'
import {
  Container,
  Header,
  Logo,
  Title,
  BackIcon,
  BackButton,
  Back,
  TopMenu,
  Layout,
  View,
  NavbarTabs
} from './styledComponents'
import logo from '../../assets/jakroo_logo.svg'
import backIcon from '../../assets/rightarrow.svg'
import { LoadScripts } from '../../utils/scriptLoader'
import { threeDScripts } from '../../utils/scripts'
import {
  Theme,
  MessagePayload,
  ModelConfig,
  DesignObject,
  ModelDesign,
  Colors,
  CanvasType
} from '../../types/common'
import { SETTINGS_TAB, Sections } from './constants'

const { confirm } = Modal

type Thumbnail = {
  style: {
    image: string
  }
}

interface Props {
  intl: InjectedIntl
  productToSearch: string
  productCode: string
  selectedTheme: number
  editableTheme: Theme | null
  currentTab: number
  currentPage: number
  designModalOpen: boolean
  designName: string
  uploading: boolean
  selectedDesign: number
  colorIdeas: DesignObject[]
  design: ModelDesign
  colorIdeaItem: number
  colorsList: Data
  colorBlock: number
  colorBlockHovered: number
  colors: string[]
  modelConfig: ModelConfig
  canvas: CanvasType
  selectedElement: string
  loadingModel: boolean
  uploadingThumbnail: boolean
  onSelectTab: (index: number) => void
  setProductCodeAction: (value: string) => void
  onChangeThemeAction: (id: number, section: string) => void
  setThemeToEditAction: (theme: Theme | null) => void
  updateThemeNameAction: (name: string) => void
  deleteTheme: (variables: {}) => Promise<MessagePayload>
  setCurrentPageAction: (page: number) => void
  toggleAddDesignAction: () => void
  updateDesignNameAction: (value: string) => void
  uploadDesignAction: (areas: any, config: any) => void
  setModelAction: (
    config: ModelConfig,
    colorIdeas: DesignObject[],
    design: ModelDesign
  ) => void
  deleteStyle: (variables: {}) => Promise<MessagePayload>
  unselectAction: (section: string) => void
  setColorIdeaItemAction: (item: number) => void
  setColorAction: (color: string) => void
  setColorBlockAction: (index: number) => void
  setHoverColorBlockAction: (index: number) => void
  setColorIdeaNameAction: (
    name: string,
    updateColors: boolean,
    item?: number
  ) => void
  setInspirationColorAction: (index: number) => void
  setLoadingAction: (loading: boolean) => void
  addColorIdeaAction: () => void
  uploadThumbnail: (variables: {}) => Promise<Thumbnail>
  setThumbnailAction: (item: number, thumbnail: string) => void
  setUploadingThumbnailAction: (uploadingItem: boolean) => void
  saveDesign: (variables: {}) => Promise<Design>
}

const steps = ['theme', 'designCustomization']

interface Data extends QueryProps {
  colorsResult: Colors
}

export class PublishingTool extends React.Component<Props, {}> {
  render3DPlaceholder: any
  async componentDidMount() {
    await LoadScripts(threeDScripts)
  }
  handleOnPressBack = () => {
    window.location.replace('/admin')
  }
  handleOnCancel = () => {
    const { setThemeToEditAction } = this.props
    setThemeToEditAction(null)
  }
  handleOnDeleteTheme = (id: number) => {
    const {
      intl: { formatMessage },
      selectedTheme,
      unselectAction
    } = this.props
    confirm({
      title: formatMessage(messages.deleteConfirmation),
      content: formatMessage(messages.deleteTheme),
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
          if (selectedTheme === id) {
            unselectAction(Sections.Theme)
          }
        } catch (e) {
          message.error(e.message)
        }
      }
    })
  }
  handleOnDeleteDesign = async (id: number) => {
    const {
      intl: { formatMessage },
      unselectAction
    } = this.props
    confirm({
      title: formatMessage(messages.deleteConfirmation),
      content: formatMessage(messages.deleteDesign),
      onOk: async () => {
        try {
          const {
            deleteStyle,
            productCode,
            selectedTheme,
            selectedDesign
          } = this.props
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
              store.writeQuery({
                query: getProductFromCode,
                data,
                variables: { code: productCode }
              })
            }
          })
          if (selectedDesign === id) {
            unselectAction(Sections.Design)
          }
        } catch (e) {
          message.error(e.message)
        }
      }
    })
  }
  handleUploadThumbnail = async (item: number, image: string) => {
    const {
      uploadThumbnail,
      setThumbnailAction,
      setUploadingThumbnailAction
    } = this.props
    try {
      const response = await uploadThumbnail({ variables: { image } })
      const thumbnailUrl = get(response, 'data.style.image', '')
      setThumbnailAction(item, thumbnailUrl)
    } catch (e) {
      setUploadingThumbnailAction(false)
      message.error(e.message)
    }
  }
  handleOnSaveThumbnail = (item: number, colors: string[]) => {
    if (this.render3DPlaceholder) {
      this.render3DPlaceholder.saveThumbnail(item, colors)
    }
  }
  render() {
    const {
      intl,
      onSelectTab,
      productCode,
      setProductCodeAction,
      onChangeThemeAction,
      selectedTheme,
      setThemeToEditAction,
      editableTheme,
      updateThemeNameAction,
      currentTab,
      setCurrentPageAction,
      currentPage,
      toggleAddDesignAction,
      designModalOpen,
      designName,
      updateDesignNameAction,
      uploadDesignAction,
      uploading,
      selectedDesign,
      setModelAction,
      colorIdeas,
      design,
      setColorIdeaItemAction,
      colorIdeaItem,
      colorsList,
      colorBlock,
      setColorBlockAction,
      setColorAction,
      setHoverColorBlockAction,
      colorBlockHovered,
      setColorIdeaNameAction,
      setInspirationColorAction,
      colors,
      canvas,
      selectedElement,
      setLoadingAction,
      loadingModel,
      modelConfig,
      addColorIdeaAction,
      setUploadingThumbnailAction,
      uploadingThumbnail
    } = this.props
    const { formatMessage } = intl
    const handleOnSelectTab = (index: number) => () => onSelectTab(index)

    const tabs = steps.map((step, index) => {
      return (
        <Tab
          {...{ index }}
          key={index}
          activeOnClick={currentTab > SETTINGS_TAB}
          selected={currentTab === index}
          onSelectTab={handleOnSelectTab(index)}
          totalItems={steps.length}
        >
          <FormattedMessage {...messages[step]} />
        </Tab>
      )
    })

    return (
      <Container>
        <Helmet title={formatMessage(messages.title)} />
        <Header>
          <Logo src={logo} />
          <Title>{formatMessage(messages.title)}</Title>
        </Header>
        <TopMenu>
          <BackButton onClick={this.handleOnPressBack}>
            <BackIcon src={backIcon} />
            <Back>{formatMessage(messages.back)}</Back>
          </BackButton>
          <NavbarTabs>{tabs}</NavbarTabs>
          <View />
        </TopMenu>
        <Layout>
          {currentTab === SETTINGS_TAB ? (
            <Themes
              {...{
                formatMessage,
                productCode,
                selectedTheme,
                currentPage,
                selectedDesign
              }}
              setProductCode={setProductCodeAction}
              onChangeTheme={onChangeThemeAction}
              onEditTheme={setThemeToEditAction}
              onDeleteTheme={this.handleOnDeleteTheme}
              onDeleteDesign={this.handleOnDeleteDesign}
              goToPage={setCurrentPageAction}
              toggleAddDesign={toggleAddDesignAction}
              onLoadDesign={setModelAction}
            />
          ) : (
            <Design
              {...{
                formatMessage,
                colorIdeas,
                design,
                colorIdeaItem,
                colorsList,
                colorBlock,
                colorBlockHovered,
                colors,
                uploadingThumbnail
              }}
              onEditColorIdea={setColorIdeaItemAction}
              onSelectColorBlock={setColorBlockAction}
              onSelectColor={setColorAction}
              onHoverColor={setHoverColorBlockAction}
              onUpdateColorIdeaName={setColorIdeaNameAction}
              onSelectInspirationColor={setInspirationColorAction}
              onAddColorIdea={addColorIdeaAction}
              onSaveThumbnail={this.handleOnSaveThumbnail}
            />
          )}
          {!!colors.length && (
            <PlaceholdersRender3D
              ref={placeHolder => (this.render3DPlaceholder = placeHolder)}
              {...{
                colors,
                design,
                colorBlockHovered,
                styleColors: [],
                onLoadModel: setLoadingAction,
                loadingModel,
                undoEnabled: false,
                redoEnabled: false,
                formatMessage,
                currentStyle: design,
                onApplyCanvasEl: null,
                onSelectEl: null,
                onRemoveEl: null,
                onUnmountTab: null,
                product: modelConfig,
                stitchingColor: '#000',
                bindingColor: 'black',
                zipperColor: 'black',
                bibColor: 'black',
                onCanvasElementResized: null,
                onCanvasElementDragged: null,
                onCanvasElementRotated: null,
                onCanvasElementTextChanged: null,
                onReApplyImageEl: null,
                onCanvasElementDuplicated: null,
                designHasChanges: null,
                canvas,
                selectedElement,
                onSetEditConfig: null,
                onSetCanvasObject: null,
                originalPaths: null,
                onResetEditing: null,
                onSelectedItem: null,
                selectedItem: null,
                redoChanges: null,
                undoChanges: null,
                saveStyleCanvas: null,
                saveDesignLoading: null
              }}
              onSaveThumbnail={this.handleUploadThumbnail}
              isMobile={false}
              isUserAuthenticated={true}
              responsive={false}
              onUploadingThumbnail={setUploadingThumbnailAction}
              onSaveDesign={() => alert('a')}
            />
          )}
        </Layout>
        <ThemeModal
          {...{ productCode, formatMessage }}
          theme={editableTheme}
          onCancel={this.handleOnCancel}
          onUpdateName={updateThemeNameAction}
        />
        <DesignModal
          {...{ productCode, formatMessage, uploading }}
          onCancel={toggleAddDesignAction}
          onUpdateName={updateDesignNameAction}
          open={designModalOpen}
          name={designName}
          onSave={uploadDesignAction}
        />
      </Container>
    )
  }
}

const mapStateToProps = (state: any) => state.get('publishingTool').toJS()

type OwnProps = {
  colorsList?: Data
}

const PublishingToolEnhance = compose(
  withApollo,
  injectIntl,
  graphql(deleteThemeMutation, { name: 'deleteTheme' }),
  graphql(deleteStyleMutation, { name: 'deleteStyle' }),
  graphql(uploadThumbnailMutation, { name: 'uploadThumbnail' }),
  graphql(saveDesignMutation, { name: 'saveDesign' }),
  graphql<Data>(getColorsQuery, {
    options: (ownprops: OwnProps) => {
      const { colorsList } = ownprops
      return {
        skip: colorsList
      }
    },
    name: 'colorsList'
  }),
  connect(mapStateToProps, {
    ...publishingToolActions,
    ...publishingToolApi
  })
)(PublishingTool)

export default PublishingToolEnhance
