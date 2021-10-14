import * as React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { compose, withApollo, graphql } from 'react-apollo'
import ProductThumbnail from '../ProductThumbnail'
import { deleteProItemMutation, GetColorsQuery, getProDesignProject } from './data'
import moment from 'moment'
import parse from 'html-react-parser'
import Spin from 'antd/lib/spin'
import Icon from 'antd/lib/icon'
import get from 'lodash/get'
import {
  Container,
  Text,
  StrongText,
  Column,
  Row,
  MainContainer,
  Notes,
  Ideas,
  Inspiration,
  ImageContainer,
  Image,
  Images,
  Color,
  Files,
  ImageText,
  Products,
  BackContainer,
  SpinContainer,
  InspirationName,
  PaletteName,
  AddProductButton,
  AddLabel,
  DocIcon,
  LoadingContainer,
  ModalTitle,
  InfoBody,
  cancelButtonStyle,
  buttonStyle,
  MailLink,
  CollapsePanel,
  PanelDiv,
  TitleDiv,
  ProjectDescriptor,
  ProjectContainer,
  LockerGrid,
  Designs,
  LogoImage
} from './styledComponents'
import { getFileExtension, getFileNameFromUrl } from '../../utils/utilsFiles'
import ColorBar from '../ColorBar'
import messages from './messages'
import { Message, InspirationType, ColorsDataResult, ProDesignItem, MessagePayload } from '../../types/common'
import {
  CUSTOMER_APPROVED,
  CUSTOMER_PREVIEW,
  DATE_FORMAT,
  DOCX_TYPE,
  DOC_TYPE,
  PDF_TYPE,
  POSTSCRIPT_TYPE,
  ZIP_TYPE
} from '../../constants'
import aiLogo from '../../assets/ailogo.png'
import epsLogo from '../../assets/epslogo.png'
import { InspirationTag } from '../../screens/IntakeForm/constants'
import message from 'antd/lib/message'
import Modal from 'antd/lib/modal'
import ProductThumbnailStore from '../ProductThumbnailStore'

const { confirm } = Modal
const docTypes = [DOC_TYPE, ZIP_TYPE, DOCX_TYPE, PDF_TYPE]

const LIMIT_PRODUCTS = 25

interface Props extends RouteComponentProps<any> {
  history: History
  inspiration: InspirationType[]
  project: number
  data: any
  colorsList: ColorsDataResult
  deleteProItem: (variables: {}) => Promise<MessagePayload>
  formatMessage: (messageDescriptor: Message, values?: {}) => string
  goToPage: (page: number) => void
  onOpenQuickView: (id: number, yotpoId: string, gender: number) => void
  goBack: () => void
}

export class Review extends React.Component<Props, {}> {
  state = {
    deleting: false
  }
  handleGoItem = (id: number) => {
    const { history } = this.props
    history.push(`/approval?id=${id}`)
  }
  addNewProduct = () => {
    const { history, data } = this.props
    const id = get(data, 'project.shortId', '')
    if (id) {
      history.push(`/pro-design?id=${id}`)
    }
  }
  
  deleteItem = (itemId: string) => {
    const { formatMessage } = this.props
    confirm({
      title: <ModalTitle>{formatMessage(messages.areYouSure)}</ModalTitle>,
      icon: ' ',
      centered: true,
      cancelText: formatMessage(messages.cancel),
      okText: formatMessage(messages.yesDelete),
      cancelButtonProps: {
        style: cancelButtonStyle
      },
      okButtonProps: {
        style: buttonStyle
      },
      onOk: async () => await this.deleteDesign(itemId),
      content: <InfoBody>{formatMessage(messages.promptDelete)}</InfoBody>
    })
  }

  deleteDesign = async (itemId: string) => {
    const {
      formatMessage,
      deleteProItem,
      data: { refetch }
    } = this.props
    try {
      this.setState({ deleting: true })
      await deleteProItem({
        variables: { itemId }
      })
      refetch()
      message.success(formatMessage(messages.success))
    } catch (e) {
      const errorMessage = e.graphQLErrors.map((x: any) => x.message)
      message.error(errorMessage, 5)
    } finally {
      this.setState({ deleting: false })
    }
  }
  render() {
    const {
      formatMessage,
      data,
      colorsList,
      project,
      onOpenQuickView,
      goBack
    } = this.props
    const { deleting } = this.state
    const palette = get(data, 'project.palette', {})
    const projectName = get(data, 'project.name', '')
    const projectDescription = get(data, 'project.notes', '')
    const designs = get(data, 'project.designs', [])
    const files = get(data, 'project.files', [])
    const inspiration = get(data, 'project.inspiration', [])
    const teamSize = get(data, 'project.teamSize', '')
    const lockerDesign = get(data, 'project.locker', {})
    const deliveryDate = get(data, 'project.deliveryDate', '')
    const accountManager = get(data, 'project.user.accountManager', {})
    const {
      id: designId,
      shortId,
      product: productLocker,
      name: designName,
      image: lockerImage,
      createdAt: designDate
    } = lockerDesign || {}
    const { id: productId, description: lockerDescription, type: lockerType } = productLocker || {}
    let arrayColors = []
    if (colorsList && !colorsList.loading) {
      try {
        arrayColors = JSON.parse(get(colorsList, 'colorsResult.colors', []))
      } catch (e) {
        message.error(e)
      }
    }
    const colorLabels = arrayColors.reduce((obj, { value, name }: Color) => {
      obj[value] = name
      return obj
      // tslint:disable-next-line: align
    }, {})
    return (
      <MainContainer>
        {deleting &&
          <LoadingContainer><Spin /></LoadingContainer>
        }
        {data && project && projectName ? <Container>
          <BackContainer onClick={goBack}>
            <Icon type="left" />
            <span>{formatMessage(messages.back)}</span>
          </BackContainer>
          <Notes>
            <Row>
              <Column>
                <Text>{formatMessage(messages.name)}</Text>
                <StrongText>{projectName || '-'}</StrongText>
              </Column>
              <Column>
                <Text>{formatMessage(messages.teamSize)}</Text>
                <StrongText>{teamSize || '-'}</StrongText>
              </Column>
              <Column>
                <Text>{formatMessage(messages.deliveryDate)}</Text>
                <StrongText>{deliveryDate ? moment(deliveryDate).format(DATE_FORMAT) : '-'}</StrongText>
              </Column>
              <Column>
                <Text>{formatMessage(messages.dateCreated)}</Text>
                <StrongText>{moment(new Date()).format(DATE_FORMAT)}</StrongText>
              </Column>
              <Column>
                <Text>{formatMessage(messages.accountManager)}</Text>
                <MailLink href={`mailto:${accountManager.email}`}>
                  {accountManager.firstName ? `${accountManager.firstName} ${accountManager.lastName}` : '-'}
                </MailLink>
              </Column>
              <Column />
            </Row>
          </Notes>
          <CollapsePanel bordered={false}>
            <PanelDiv 
              header={
                <TitleDiv>
                  {formatMessage(messages.projectDetails)}
                </TitleDiv>
              }
              key="1"
            >
              <Ideas>
                <Row>
                  <Column>
                    <StrongText>{formatMessage(messages.designNotes)}</StrongText>
                  </Column>
                  <ProjectContainer>
                    <ProjectDescriptor>{projectDescription ? parse(projectDescription) : '-'}</ProjectDescriptor>
                  </ProjectContainer>
                </Row>
              </Ideas>
              {inspiration.length ? <Inspiration>
                <Row>
                  <Column>
                    <StrongText>{formatMessage(messages.inspiration)}</StrongText>
                  </Column>
                </Row>
                <Row>
                  <Images>
                    {inspiration.map(({ image, assetType, id }, index) => 
                      <ImageContainer key={index}>
                        <Image src={image} />
                        <InspirationName>
                          {assetType && 
                            `${InspirationTag[assetType]}${id ? id.toString().padStart(4, '0') : '-'}`
                          }
                        </InspirationName>
                      </ImageContainer>
                    )}
                  </Images>
                </Row>
              </Inspiration> : null}
              {palette && 
                <Color>
                  <Row>
                    <Column>
                      <StrongText>{formatMessage(messages.colorPalette)}</StrongText>
                    </Column>
                  </Row>
                  {palette.name &&
                    <PaletteName>
                      {palette.name}
                    </PaletteName>
                  }
                  <ColorBar
                    {...{ colorLabels, formatMessage }}
                    primary={palette.primary}
                    accent={[palette.accent1, palette.accent2, palette.accent3]}
                  />
                </Color>
              }
              <Files>
                <Row>
                  <Column>
                    <StrongText>{formatMessage(messages.uploadedFiles)}</StrongText>
                  </Column>
                </Row>
                <Row>
                  <Images>
                    {files.length ? files.map((assetItem, index) => {
                      const { fileUrl, type, name } = assetItem
                      const openFile = () => window.open(fileUrl)
                      const extension = getFileExtension(fileUrl)
                      return (<ImageContainer key={index}>
                        {docTypes.includes(type) ?
                          <DocIcon onClick={openFile} type={type === ZIP_TYPE ? 'file-zip' : 'file'} /> :
                          (type === POSTSCRIPT_TYPE ?
                            <LogoImage onClick={openFile} src={extension === '.ai' ? aiLogo : epsLogo} /> : 
                            <Image src={fileUrl} />
                          )
                        }
                        <ImageText>{name || getFileNameFromUrl(fileUrl)}</ImageText>
                      </ImageContainer>)
                    }) : formatMessage(messages.noFiles)}
                    </Images>
                  </Row>
                </Files>
                {lockerDesign && designId &&
                  <Designs>
                    <Row>
                      <Column fullWidth={true}>
                        <StrongText>{formatMessage(messages.designs)}</StrongText>
                      </Column>
                    </Row>
                    <Row>
                      <LockerGrid>
                        <ProductThumbnailStore
                          {...{ productId }}
                          type={lockerType}
                          description={lockerDescription}
                          product={productLocker}
                          name={designName}
                          image={lockerImage}
                          key={designId}
                          id={shortId}
                          withCheckbox={false}
                          disableSlider={true}
                          hideCustomButton={true}
                          hideQuickView={true}
                          clickDisabled={true}  
                          date={designDate}
                        />
                      </LockerGrid>
                    </Row>
                  </Designs>
                }
              </PanelDiv>
            </CollapsePanel>
            <Products>
              <Row>
                <Column fullWidth={true}>
                  <StrongText>{formatMessage(messages.products)}</StrongText>
                </Column>
              </Row>
              <Row>
                {designs.map((design: ProDesignItem, key: number) => {
                  const { product, code, image, status, name, id: itemId, createdAt, notifications } = design
                  const { 
                    id,
                    yotpoId,
                    type,
                    description,
                    isTopProduct,
                    images = [],
                    priceRange,
                    customizable,
                    colors
                  } = product
                  const imagesToShow = !!code && 
                  (status === CUSTOMER_PREVIEW || status === CUSTOMER_APPROVED) ? { thumbnail: image } : images[0]
                  const goToItem = () => this.handleGoItem(itemId)
                  const deleteItem = () => this.deleteItem(itemId)
                  return (
                    <ProductThumbnail
                      images={imagesToShow}
                      hideCustomButton={true}
                      product={product}
                      disableSlider={true}
                      onlyView={true}
                      isProDesign={true}
                      hideQuickView={true}
                      proStatus={status}
                      onPressThumbnail={goToItem}
                      type={!code ? type : name}
                      description={!code ? description : type}
                      onPressQuickView={onOpenQuickView}
                      {...{
                        key,
                        id,
                        yotpoId,
                        createdAt,
                        deleteItem,
                        notifications,
                        isTopProduct,
                        priceRange,
                        customizable,
                        colors
                      }}
                    />
                  )
                })}
                {designs.length < LIMIT_PRODUCTS &&
                  <AddProductButton onClick={this.addNewProduct}>
                    <AddLabel 
                      dangerouslySetInnerHTML={{
                        __html: formatMessage(messages.addProduct)
                      }}
                    />
                  </AddProductButton>
                }
              </Row>
            </Products>
        </Container> : <SpinContainer><Spin /></SpinContainer>}
      </MainContainer>
    )
  }
}

interface OwnProps {
  project?: number
  colorsList?: ColorsDataResult
}

const ReviewEnhance = compose(
  withApollo,
  graphql(deleteProItemMutation, { name: 'deleteProItem' }),
  graphql(getProDesignProject, {
    options: ({ project }: OwnProps) => {
      return {
        variables: {
          projectId: project
        },
        skip: !project,
        fetchPolicy: 'network-only'
      }
    }
  }),
  graphql<ColorsDataResult>(GetColorsQuery, {
    options: (ownprops: OwnProps) => {
      const { colorsList } = ownprops
      return {
        skip: !!colorsList
      }
    },
    name: 'colorsList'
  })
)(Review)

export default ReviewEnhance
