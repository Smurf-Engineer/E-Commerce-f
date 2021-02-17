import * as React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { compose, withApollo, graphql } from 'react-apollo'
import ProductThumbnail from '../ProductThumbnail'
import { GetColorsQuery, getProDesignProject } from './data'
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
  PaletteName
} from './styledComponents'
import { getFileNameFromUrl } from '../../utils/utilsFiles'
import ColorBar from '../ColorBar'
import messages from './messages'
import { Message, InspirationType, ColorsDataResult, ProDesignItem } from '../../types/common'
import { DATE_FORMAT } from '../../constants'
import { InspirationTag } from '../../screens/IntakeForm/constants'
import message from 'antd/lib/message'

interface Props extends RouteComponentProps<any> {
  history: History
  inspiration: InspirationType[]
  project: number
  data: any
  colorsList: ColorsDataResult
  formatMessage: (messageDescriptor: Message, values?: {}) => string
  goToPage: (page: number) => void
  onOpenQuickView: (id: number, yotpoId: string, gender: number) => void
  goBack: () => void
}

export class Review extends React.Component<Props, {}> {
  handleGoItem = (id: number) => {
    const { history } = this.props
    history.push(`/approval?id=${id}`)
  }
  render() {
    const {
      formatMessage,
      data,
      colorsList,
      onOpenQuickView,
      goBack
    } = this.props
    const palette = get(data, 'project.palette', {})
    const projectName = get(data, 'project.name', '')
    const projectDescription = get(data, 'project.notes', '')
    const designs = get(data, 'project.designs', [])
    const files = get(data, 'project.files', [])
    const inspiration = get(data, 'project.inspiration', [])
    const teamSize = get(data, 'project.teamSize', '')
    const deliveryDate = get(data, 'project.deliveryDate', '')
    const accountManager = get(data, 'project.user.accountManager', {})
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
        {data && !data.loading ? <Container>
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
                <StrongText>
                  {accountManager.firstName ? `${accountManager.firstName} ${accountManager.lastName}` : '-'}
                </StrongText>
              </Column>
              <Column />
            </Row>
          </Notes>
          <Ideas>
            <Row>
              <Column>
                <StrongText>{formatMessage(messages.designNotes)}</StrongText>
              </Column>
              <Column>
                <Text fullWidth={true}>{projectDescription ? parse(projectDescription) : '-'}</Text>
              </Column>
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
                  const { fileUrl } = assetItem
                  return (<ImageContainer key={index}>
                    <Image src={fileUrl} />
                    <ImageText>{getFileNameFromUrl(fileUrl)}</ImageText>
                  </ImageContainer>)
                }) : formatMessage(messages.noFiles)}
                </Images>
              </Row>
            </Files>
            <Products>
              <Row>
                <Column fullWidth={true}>
                  <StrongText>{formatMessage(messages.products)}</StrongText>
                </Column>
              </Row>
              <Row>
                {designs.map((design: ProDesignItem, key: number) => {
                  const { product, code, image, status, name, id: itemId } = design
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
                  const imagesToShow = !!code ? { thumbnail: image } : images[0]
                  const goToItem = () => this.handleGoItem(itemId)
                  return (
                    <ProductThumbnail
                      images={imagesToShow}
                      hideCustomButton={true}
                      product={product}
                      disableSlider={true}
                      onlyView={true}
                      isProDesign={true}
                      proStatus={status}
                      onPressThumbnail={goToItem}
                      type={!code ? type : name}
                      description={!code ? description : type}
                      onPressQuickView={onOpenQuickView}
                      {...{
                        key,
                        id,
                        yotpoId,
                        isTopProduct,
                        priceRange,
                        customizable,
                        colors
                      }}
                    />
                  )
                })}
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
