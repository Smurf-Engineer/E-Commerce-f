import * as React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { compose, withApollo, graphql } from 'react-apollo'
import ProductThumbnail from '../ProductThumbnail'
import { getProDesignProject } from './data'
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
  InspirationName
} from './styledComponents'
import { getFileNameFromUrl } from '../../utils/utilsFiles'
import ColorBar from '../ColorBar'
import messages from './messages'
import { Message, InspirationType } from '../../types/common'
import { DATE_FORMAT } from '../../constants'
import { InspirationTag } from '../../screens/IntakeForm/constants'

interface Props extends RouteComponentProps<any> {
  history: any
  inspiration: InspirationType[]
  project: number
  data: any
  formatMessage: (messageDescriptor: Message, values?: {}) => string
  goToPage: (page: number) => void
  onOpenQuickView: (id: number, yotpoId: string, gender: number) => void
  goBack: () => void
}

export class Review extends React.Component<Props, {}> {
  render() {
    const {
      formatMessage,
      data,
      onOpenQuickView,
      goBack
    } = this.props
    const palette = get(data, 'project.palette', {})
    const projectName = get(data, 'project.name', '')
    const projectDescription = get(data, 'project.notes', '')
    const products = get(data, 'project.products', [])
    const files = get(data, 'project.files', [])
    const inspiration = get(data, 'project.inspiration', [])
    const teamSize = get(data, 'project.teamSize', '')
    const deliveryDate = get(data, 'project.deliveryDate', '')
    const accountManager = get(data, 'project.user.accountManager', {})

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
          {palette ? <Color>
            <Row>
              <Column>
                <StrongText>{formatMessage(messages.colorPalette)}</StrongText>
              </Column>
            </Row>
            <ColorBar
              primary={palette.primary}
              accent={[palette.accent1, palette.accent2, palette.accent3]}
            />
          </Color> : null}
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
                {products.map(product => {
                  const { 
                    id,
                    yotpoId,
                    type,
                    description,
                    isTopProduct,
                    images,
                    priceRange,
                    customizable,
                    colors
                  } = product

                  return (<ProductThumbnail
                  key={id}
                  images={images[0]}
                  hideCustomButton={true}
                  product={product}
                  disableSlider={true}
                  onlyView={true}
                  onPressQuickView={onOpenQuickView}
                  {...{
                    id,
                    yotpoId,
                    type,
                    description,
                    isTopProduct,
                    priceRange,
                    customizable,
                    colors
                  }}
                />)
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
)(Review)

export default ReviewEnhance
