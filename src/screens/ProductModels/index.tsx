/**
 * ProductModels Screen - Created by Jesús Apodaca on 16/12/19.
 */
import * as React from 'react'
import Helmet from 'react-helmet'
import { injectIntl, InjectedIntl } from 'react-intl'
import * as productModelsActions from './actions'
import messages from './messages'
import FilesModal from './FilesModal'
import { connect } from 'react-redux'
import { compose, withApollo } from 'react-apollo'
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
  DeleteButton
} from './styledComponents'
import logo from '../../assets/jakroo_logo.svg'
import backIcon from '../../assets/rightarrow.svg'
import { LoadScripts } from '../../utils/scriptLoader'
import { threeDScripts } from '../../utils/scripts'
import { ModelVariant } from '../../types/common'

interface Props {
  intl: InjectedIntl
  openModal: boolean
  tempModel: ModelVariant
  variants: ModelVariant[]
  defaultModelIndex: string
  uploadingIcon: boolean
  changeNameAction: (name: string) => void
  setEditModel: (id: string) => void
  openModalAction: (open: boolean) => void
}
export class ProductModels extends React.Component<Props, {}> {
  render3D: any
  async componentDidMount() {
    await LoadScripts(threeDScripts)
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
  editDefault = () => {
    const { defaultModelIndex, setEditModel } = this.props
    setEditModel(defaultModelIndex)
  }
  render() {
    const {
      intl,
      openModal,
      changeNameAction,
      variants,
      defaultModelIndex,
      tempModel,
      uploadingIcon
    } = this.props
    const { formatMessage } = intl
    const defaultModel = variants[defaultModelIndex]
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
              <ModelBlock>
                <Thumbnail src={defaultModel.icon} />
                <Details>
                  <Name>{defaultModel.name}</Name>
                  <Buttons>
                    <EditButton onClick={this.editDefault}>
                      {formatMessage(messages.edit)}
                    </EditButton>
                  </Buttons>
                </Details>
              </ModelBlock>
              <TopMessage>{formatMessage(messages.modelVariants)}</TopMessage>
              {Object.keys(variants).map((id: string, index) => {
                const edit = () => this.handleEdit(id)
                const { icon, name, default: isDefault } = variants[id]
                return (
                  !isDefault && (
                    <ModelBlock key={index}>
                      <Thumbnail src={icon} />
                      <Details>
                        <Name>{name}</Name>
                        <Buttons>
                          <EditButton onClick={edit}>
                            {formatMessage(messages.edit)}
                          </EditButton>
                          <DeleteButton>
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
          <ModelContainer>
            <SaveButton>{formatMessage(messages.saveDesign)}</SaveButton>
            <Logo src={logo} />
          </ModelContainer>
        </Layout>
        <FilesModal
          {...{
            openModal,
            changeNameAction,
            formatMessage,
            tempModel,
            uploadingIcon
          }}
          requestClose={this.handleCloseModal}
        />
      </Container>
    )
  }
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
  connect(mapStateToProps, {
    ...productModelsActions
  })
)(ProductModels)

export default ProductModelsEnhance
