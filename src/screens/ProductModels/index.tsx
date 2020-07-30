/**
 * ProductModels Screen - Created by Jesús Apodaca on 16/12/19.
 */
import * as React from 'react'
import Helmet from 'react-helmet'
import message from 'antd/lib/message'
import Modal from 'antd/lib/modal'
import AntdTabs from 'antd/lib/tabs'
import queryString from 'query-string'
import { injectIntl, InjectedIntl } from 'react-intl'
import * as productModelsActions from './actions'
import * as apiActions from './api'
import * as thunkActions from './thunkActions'
import messages from './messages'
import FilesModal from './FilesModal'
import PredyedModal from './PredyedModal'
import { connect } from 'react-redux'
import { compose, withApollo, graphql } from 'react-apollo'
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
  Side,
  TopMessage,
  ModelContainer,
  SaveButton,
  AddModel,
  ModelsContainers,
  ModelBlock,
  Thumbnail,
  Details,
  Name,
  EditButton,
  Buttons,
  DeleteButton,
  LoadingContainer,
  Message,
  AddDesigns,
  ProductInfo,
  TitleModal,
  NavTabs,
  ColorBlock
} from './styledComponents'
import Render3D from '../../components/Render3D'
import logo from '../../assets/jakroo_logo.svg'
import colorIcon from '../../assets/color_white.svg'
import shirtModel from '../../assets/shirt_model.svg'
import backIcon from '../../assets/rightarrow.svg'
import jakrooLogo from '../../assets/Jackroologo.svg'
import { LoadScripts } from '../../utils/scriptLoader'
import { threeDScripts } from '../../utils/scripts'
import { ModelVariant, PredyedColor } from '../../types/common'
import get from 'lodash/get'
import Spin from 'antd/lib/spin'
import { saveProductsMutation, getProductQuery } from './data'
import Tab from '../../components/DesignCenterCustomize/Tab'
import { MODELS_TAB, PREDYED_TAB } from './constants'
import shortid from 'shortid'

const { TabPane } = AntdTabs

interface Props {
  intl: InjectedIntl
  openModal: boolean
  history: any
  client: any
  loading: boolean
  tempModel: ModelVariant
  variants: { [id: string]: ModelVariant }
  predyedColors: { [id: string]: PredyedColor }
  defaultModelIndex: string
  selected: string
  modelRender: string
  data: any
  openSuccess: boolean
  selectedTab: string
  color: string
  hexColor: string
  openPredyed: boolean
  selectedColor: string
  editColor: string
  editColorAction: (id: string, name: string, code: string) => void
  selectColorAction: (id: string) => void
  setColorsAction: (predyedColors: { [id: string]: PredyedColor }) => void
  changeColorAction: (color: string) => void
  changeHexAction: (name: string) => void
  openPredyedAction: (open: boolean) => void
  onTabClick: (selectedIndex: string) => void
  saveInfoAction: () => void
  resetReducer: () => void
  setLoadingAction: (loading: boolean) => void
  selectModelAction: (id: string) => void
  changeDefault: (checked: boolean) => void
  getVariants: (query: any, id: number) => void
  removeModelAction: (key: string) => void
  setFileAction: (key: string, url: string) => void
  uploadFile: (file: File, key: string) => void
  uploadImageModel: (file: File) => void
  changeNameAction: (name: string) => void
  setEditModel: (id: string) => void
  openModalAction: (open: boolean) => void
  uploadComplete: () => void
  saveProductModels: (variables: {}) => Promise<any>
}
export class ProductModels extends React.Component<Props, {}> {
  async componentDidMount() {
    await LoadScripts(threeDScripts)
    const {
      getVariants,
      client: { query }
    } = this.props
    const { id } = queryString.parse(location.search)
    getVariants(query, id)
  }
  componentWillUnmount() {
    const { resetReducer } = this.props
    resetReducer()
  }
  handleChangeTab = (selectedIndex: string) => {
    const { onTabClick } = this.props
    onTabClick(selectedIndex)
  }
  handleCloseModal = () => {
    const { openModalAction } = this.props
    openModalAction(false)
  }
  handleOpenModal = () => {
    const { openModalAction } = this.props
    openModalAction(true)
  }
  handleEdit = (id: string) => {
    const { setEditModel } = this.props
    setEditModel(id)
  }
  handleRemoveModel = (id: string) => {
    const { removeModelAction } = this.props
    removeModelAction(id)
  }
  selectModel = (id: string) => {
    const { selectModelAction } = this.props
    selectModelAction(id)
  }
  saveColor = () => {
    const { editColor, predyedColors, color, hexColor, setColorsAction } = this.props
    const id = editColor || shortid.generate()
    const colorObject = predyedColors[id] || {}
    predyedColors[id] = { ...colorObject, code: hexColor, name: color }
    setColorsAction(predyedColors)
  }
  saveProduct = async () => {
    try {
      const {
        saveProductModels,
        uploadComplete,
        setLoadingAction,
        predyedColors,
        variants
      } = this.props
      setLoadingAction(true)
      const { id: productId } = queryString.parse(location.search)
      const arrayPredyed = Object.keys(predyedColors).map((shortId: string) => {
        const { code, id, name } = predyedColors[shortId]
        return {
          code,
          id,
          name
        }
      })
      const arrayVariants = Object.keys(variants).map((shortId: string) => {
        const {
          name,
          icon,
          default: isDefault,
          bumpMap,
          obj,
          label,
          mtl,
          branding,
          flatlock,
          bibraceWhite,
          bibraceBlack,
          zipperWhite,
          zipperBlack,
          bindingWhite,
          bindingBlack
        } = variants[shortId]
        return {
          name,
          icon,
          isDefault,
          bumpMap,
          obj,
          label,
          mtl,
          branding,
          flatlock,
          bibraceWhite,
          bibraceBlack,
          zipperWhite,
          zipperBlack,
          bindingWhite,
          bindingBlack,
          shortId,
          productId
        }
      })
      const response = await saveProductModels({
        variables: { variants: arrayVariants, predyedColors: arrayPredyed, productId }
      })
      message.success(get(response, 'data.saveProductModels.message', ''))
      uploadComplete()
    } catch (e) {
      message.error(e.message)
    }
  }
  closePredyed = () => {
    const { openPredyedAction } = this.props
    openPredyedAction(false)
  }
  handleOpenPredyed = () => {
    const { openPredyedAction } = this.props
    openPredyedAction(true)
  }
  handleAddDesigns = () => {
    const {
      data: {
        product: { code }
      },
      history
    } = this.props
    history.push(`/admin/publishing-tool?code=${code}`)
  }
  handleProductInfo = () => {
    const { history } = this.props
    const { id } = queryString.parse(location.search)
    history.push(`/admin/product?id=${id}`)
  }
  editDefault = () => {
    const { defaultModelIndex, setEditModel } = this.props
    setEditModel(defaultModelIndex)
  }
  selectModelDefault = () => {
    const { defaultModelIndex, selectModelAction } = this.props
    selectModelAction(defaultModelIndex)
  }
  handleEditColor = (id: string) => {
    const { editColorAction, predyedColors } = this.props
    const { code, name } = predyedColors[id] || {}
    editColorAction(id, name, code)
  }
  removeColor = (id: string) => {
    const { setColorsAction, predyedColors } = this.props
    if (id && predyedColors[id]) {
      delete predyedColors[id]
      setColorsAction(predyedColors)
    }
  }
  selectColorShow = (id: string) => {
    const { selectColorAction } = this.props
    selectColorAction(id)
  }
  render() {
    const {
      intl,
      openModal,
      changeNameAction,
      variants,
      uploadFile,
      openSuccess,
      selectedTab,
      loading,
      selected,
      modelRender,
      predyedColors,
      selectedColor,
      openPredyed,
      hexColor,
      color,
      editColor,
      changeColorAction,
      changeHexAction,
      changeDefault,
      saveInfoAction,
      removeModelAction,
      setFileAction,
      uploadImageModel,
      defaultModelIndex,
      tempModel
    } = this.props
    const { formatMessage } = intl
    const defaultModel = variants[defaultModelIndex]
    const selectedRender = variants[modelRender]
    const { code: codeSelected, name: nameSelected } = predyedColors[selectedColor] || {}
    let product = {}
    if (selectedRender) {
      const {
        bibraceWhite,
        bibraceBlack,
        zipperWhite,
        zipperBlack,
        bindingWhite,
        bindingBlack
      } = selectedRender
      product = {
        ...selectedRender,
        bibBrace: (bibraceWhite || bibraceBlack) && {
          white: bibraceWhite,
          black: bibraceBlack
        },
        zipper: (zipperWhite || zipperBlack) && {
          white: zipperWhite,
          black: zipperBlack
        },
        binding: (bindingWhite || bindingBlack) && {
          white: bindingWhite,
          black: bindingBlack
        }
      }
    }
    return (
      <Container>
        <Helmet title={formatMessage(messages.title)} />
        <Header>
          <Logo src={logo} />
          <Title>{formatMessage(messages.title)}</Title>
        </Header>
        <TopMenu>
          <BackButton onClick={this.handleProductInfo}>
            <BackIcon src={backIcon} />
            <Back>{formatMessage(messages.back)}</Back>
          </BackButton>
        </TopMenu>
        <Layout>
          <NavTabs
            activeKey={selectedTab}
            size="large"
            onTabClick={this.handleChangeTab}
          >
            <TabPane key={MODELS_TAB} tab={<Tab label="models" icon={shirtModel} />}>
              <Side>
                <TopMessage background={true}>
                  {formatMessage(messages.build3D)}
                </TopMessage>
                <AddModel onClick={this.handleOpenModal}>
                  {formatMessage(messages.addModel)}
                </AddModel>
                <ModelsContainers>
                  {defaultModel && (
                    <>
                      <TopMessage>
                        {formatMessage(messages.defaultModel)}
                      </TopMessage>
                      <ModelBlock active={modelRender === defaultModelIndex}>
                        <Thumbnail
                          onClick={this.selectModelDefault}
                          src={defaultModel.icon || jakrooLogo}
                        />
                        <Details>
                          <Name>{defaultModel.name}</Name>
                          <Buttons>
                            <EditButton onClick={this.editDefault}>
                              {formatMessage(messages.edit)}
                            </EditButton>
                          </Buttons>
                        </Details>
                      </ModelBlock>
                    </>
                  )}
                  <TopMessage>{formatMessage(messages.modelVariants)}</TopMessage>
                  {Object.keys(variants).map((id: string, index) => {
                    const edit = () => this.handleEdit(id)
                    const { icon, name, default: isDefault } = variants[id]
                    const selectModel = () => this.selectModel(id)
                    const remove = () => this.handleRemoveModel(id)
                    return (
                      !isDefault && (
                        <ModelBlock active={modelRender === id} key={index}>
                          <Thumbnail
                            onClick={selectModel}
                            src={icon || jakrooLogo}
                          />
                          <Details>
                            <Name>{name}</Name>
                            <Buttons>
                              <EditButton onClick={edit}>
                                {formatMessage(messages.edit)}
                              </EditButton>
                              <DeleteButton onClick={remove}>
                                {formatMessage(messages.delete)}
                              </DeleteButton>
                            </Buttons>
                          </Details>
                        </ModelBlock>
                      )
                    )
                  })}
                </ModelsContainers>
              </Side>
            </TabPane>
            <TabPane key={PREDYED_TAB} tab={<Tab label="predyed" icon={colorIcon} />}>
              <Side>
                <TopMessage background={true}>
                  {formatMessage(messages.predyedTitle)}
                </TopMessage>
                <AddModel onClick={this.handleOpenPredyed}>
                  {formatMessage(messages.addPredyed)}
                </AddModel>
                <ModelsContainers>
                  {!!Object.keys(predyedColors).length &&
                    <TopMessage>{formatMessage(messages.preDyedVariants)}</TopMessage>
                  }
                  {Object.keys(predyedColors).map((id: string, index) => {
                    const edit = () => this.handleEditColor(id)
                    const { code, name } = predyedColors[id]
                    const selectColorShow = () => this.selectColorShow(id)
                    const remove = () => this.removeColor(id)
                    return (
                      <ModelBlock active={selectedColor === id} key={index}>
                        <ColorBlock
                          onClick={selectColorShow}
                          hexColor={code}
                        />
                        <Details>
                          <Name>{name}</Name>
                          <Name>{code}</Name>
                          <Buttons>
                            <EditButton onClick={edit}>
                              {formatMessage(messages.edit)}
                            </EditButton>
                            <DeleteButton onClick={remove}>
                              {formatMessage(messages.delete)}
                            </DeleteButton>
                          </Buttons>
                        </Details>
                      </ModelBlock>
                    )
                  })}
                </ModelsContainers>
              </Side>
            </TabPane>
          </NavTabs>
          <ModelContainer>
            <SaveButton onClick={this.saveProduct}>
              {formatMessage(messages.saveDesign)}
            </SaveButton>
            {selectedRender ? (
              <Render3D
                dynamic={true}
                designId={0}
                customProduct={true}
                isProduct={true}
                textColor="white"
                asImage={false}
                predyedSelected={nameSelected && !codeSelected}
                {...{ product }}
              />
            ) : (
                <Logo src={logo} />
              )}
          </ModelContainer>
        </Layout>
        <PredyedModal
          {...{
            openPredyed,
            color,
            hexColor,
            formatMessage,
            changeColorAction,
            editColor,
            changeHexAction,
          }}
          saveColor={this.saveColor}
          requestClose={this.closePredyed}
        />
        <FilesModal
          {...{
            openModal,
            saveInfoAction,
            changeDefault,
            setFileAction,
            uploadFile,
            removeModelAction,
            uploadImageModel,
            changeNameAction,
            formatMessage,
            tempModel
          }}
          defaultVariant={defaultModelIndex === selected}
          requestClose={this.handleCloseModal}
        />
        <Modal
          width="412px"
          visible={openSuccess}
          footer={null}
          closable={false}
          destroyOnClose={true}
        >
          <TitleModal>{formatMessage(messages.modelSaved)}</TitleModal>
          <Message>{formatMessage(messages.successQuestion)}</Message>
          <AddDesigns onClick={this.handleAddDesigns}>
            {formatMessage(messages.addNewDesigns)}
          </AddDesigns>
          <ProductInfo onClick={this.handleProductInfo}>
            {formatMessage(messages.goToInfo)}
          </ProductInfo>
        </Modal>
        <LoadingContainer active={loading}>
          <Spin size="large" />
        </LoadingContainer>
      </Container>
    )
  }
}

interface OwnProps {
  location?: any
}

const mapStateToProps = (state: any) => {
  const productModelsReducer = state.get('productModels').toJS()
  return {
    ...productModelsReducer
  }
}

const ProductModelsEnhance = compose(
  withApollo,
  injectIntl,
  saveProductsMutation,
  graphql(getProductQuery, {
    options: ({ location }: OwnProps) => {
      const search = location ? location.search : ''
      const queryParams = queryString.parse(search)
      return {
        variables: { id: queryParams.id }
      }
    }
  }),
  connect(mapStateToProps, {
    ...productModelsActions,
    ...thunkActions,
    ...apiActions
  })
)(ProductModels)

export default ProductModelsEnhance
