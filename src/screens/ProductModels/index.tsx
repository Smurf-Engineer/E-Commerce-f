/**
 * ProductModels Screen - Created by Jesús Apodaca on 16/12/19.
 */
import * as React from 'react'
import Helmet from 'react-helmet'
import message from 'antd/lib/message'
import Modal from 'antd/lib/modal'
import { injectIntl, InjectedIntl } from 'react-intl'
import * as productModelsActions from './actions'
import * as apiActions from './api'
import * as thunkActions from './thunkActions'
import messages from './messages'
import FilesModal from './FilesModal'
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
  TitleModal
} from './styledComponents'
import Render3D from '../../components/Render3D'
import logo from '../../assets/jakroo_logo.svg'
import backIcon from '../../assets/rightarrow.svg'
import jakrooLogo from '../../assets/Jackroologo.svg'
import { LoadScripts } from '../../utils/scriptLoader'
import { threeDScripts } from '../../utils/scripts'
import { ModelVariant } from '../../types/common'
import get from 'lodash/get'
import Spin from 'antd/lib/spin'
import { saveProductsMutation, getProductQuery } from './data'

interface Props {
  intl: InjectedIntl
  openModal: boolean
  match: any
  history: any
  client: any
  loading: boolean
  tempModel: ModelVariant
  variants: { [id: string]: ModelVariant }
  defaultModelIndex: string
  selected: string
  modelRender: string
  data: any
  openSuccess: boolean
  saveInfoAction: () => void
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
  render3D: any
  async componentDidMount() {
    await LoadScripts(threeDScripts)
    const {
      getVariants,
      client: { query },
      match
    } = this.props
    const id = get(match, 'params.id', '')
    getVariants(query, id)
  }
  handleOnPressBack = () => {
    window.location.replace('/admin')
  }
  handleCloseModal = () => {
    const { openModalAction } = this.props
    openModalAction(false)
  }
  handleOpenModal = () => {
    const { openModalAction } = this.props
    openModalAction(true)
  }
  handleEdit = (id: string) => () => {
    const { setEditModel } = this.props
    setEditModel(id)
  }
  handleRemoveModel = (id: string) => () => {
    const { removeModelAction } = this.props
    removeModelAction(id)
  }
  selectModel = (id: string) => () => {
    const { selectModelAction } = this.props
    selectModelAction(id)
  }
  saveProduct = async () => {
    try {
      const {
        saveProductModels,
        uploadComplete,
        setLoadingAction,
        variants,
        match
      } = this.props
      setLoadingAction(true)
      const productId = get(match, 'params.id', '')
      const arrayVariants = Object.keys(variants).map((shortId: string) => {
        const {
          name,
          icon,
          default: isDefault,
          bumpmap,
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
          bumpmap,
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
        variables: { variants: arrayVariants, productId }
      })
      message.success(get(response, 'data.saveProductModels.message', ''))
      uploadComplete()
    } catch (e) {
      message.error(e.message)
    }
  }
  handleAddDesigns = () => {
    const {
      data: {
        product: { code }
      },
      history
    } = this.props
    history.push(`/admin/publishing-tool/${code}`)
  }
  handleProductInfo = () => {
    const { history, match } = this.props
    const id = get(match, 'params.id', '')
    history.push(`/admin/products/details/${id}`)
  }
  render() {
    const {
      intl,
      openModal,
      changeNameAction,
      variants,
      uploadFile,
      openSuccess,
      loading,
      selected,
      modelRender,
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
          <BackButton onClick={this.handleOnPressBack}>
            <BackIcon src={backIcon} />
            <Back>{formatMessage(messages.back)}</Back>
          </BackButton>
        </TopMenu>
        <Layout>
          <Side>
            <TopMessage background={true}>
              {formatMessage(messages.build3D)}
            </TopMessage>
            <AddModel onClick={this.handleOpenModal}>
              {formatMessage(messages.addModel)}
            </AddModel>
            <ModelsContainers>
              <TopMessage>{formatMessage(messages.defaultModel)}</TopMessage>
              {defaultModel && (
                <ModelBlock active={modelRender === defaultModelIndex}>
                  <Thumbnail
                    onClick={this.selectModel(defaultModelIndex)}
                    src={defaultModel.icon || jakrooLogo}
                  />
                  <Details>
                    <Name>{defaultModel.name}</Name>
                    <Buttons>
                      <EditButton onClick={this.handleEdit(defaultModelIndex)}>
                        {formatMessage(messages.edit)}
                      </EditButton>
                    </Buttons>
                  </Details>
                </ModelBlock>
              )}
              <TopMessage>{formatMessage(messages.modelVariants)}</TopMessage>
              {Object.keys(variants).map(
                (id: string, index) =>
                  !variants[id].default && (
                    <ModelBlock active={modelRender === id} key={index}>
                      <Thumbnail
                        onClick={this.selectModel(id)}
                        src={variants[id].icon || jakrooLogo}
                      />
                      <Details>
                        <Name>{variants[id].name}</Name>
                        <Buttons>
                          <EditButton onClick={this.handleEdit(id)}>
                            {formatMessage(messages.edit)}
                          </EditButton>
                          <DeleteButton onClick={this.handleRemoveModel(id)}>
                            {formatMessage(messages.delete)}
                          </DeleteButton>
                        </Buttons>
                      </Details>
                    </ModelBlock>
                  )
              )}
            </ModelsContainers>
          </Side>
          <ModelContainer>
            <SaveButton onClick={this.saveProduct}>
              {formatMessage(messages.saveDesign)}
            </SaveButton>
            {selectedRender ? (
              <Render3D
                designId={0}
                customProduct={true}
                isProduct={true}
                {...{ product }}
              />
            ) : (
              <Logo src={logo} />
            )}
          </ModelContainer>
        </Layout>
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
  match?: any
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
    options: ({ match }: OwnProps) => ({
      variables: { id: get(match, 'params.id', '') }
    })
  }),
  connect(mapStateToProps, {
    ...productModelsActions,
    ...thunkActions,
    ...apiActions
  })
)(ProductModels)

export default ProductModelsEnhance
