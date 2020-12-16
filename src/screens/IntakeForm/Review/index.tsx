import * as React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { compose, withApollo } from 'react-apollo'
import ProductThumbnail from '../../../components/ProductThumbnail'
import zenscroll from 'zenscroll'
import moment from 'moment'
import filter from 'lodash/filter'
import includes from 'lodash/includes'
import {
  Container,
  Text,
  StrongText,
  Column,
  Row,
  MainContainer,
  EditButton,
  Notes,
  Ideas,
  Inspiration,
  ImageContainer,
  Image,
  Images,
  Color,
  Files,
  ImageText,
  Products
} from './styledComponents'
import { getFileNameFromUrl } from '../../../utils/utilsFiles'
import ColorBar from '../../../components/ColorBar'
import messages from './messages'
import { Message, InspirationType, ImageFile, UserType } from '../../../types/common'
import { Sections,  CUSTOM_PALETTE_INDEX } from '../constants'
import { DATE_FORMAT } from '../../../constants'

interface Props extends RouteComponentProps<any> {
  inspiration: InspirationType[]
  inspirationSelectedItems: number[]
  selectedColors: string[]
  selectedPrimaryColor: string[]
  selectedPaletteIndex: number
  selectedEditColors: string[]
  selectedEditPrimaryColor: string[]
  selectedFiles: ImageFile[]
  projectName: string
  projectDescription: string
  user: UserType
  selectedItems: number[]
  formatMessage: (messageDescriptor: Message, values?: {}) => string
  goToPage: (page: number) => void
}

export class Review extends React.Component<Props, {}> {
  goToNotes = () => {
    const { goToPage } = this.props
    zenscroll.toY(0, 0)
    goToPage(Sections.NOTES)
  }
  goToInspiration = () => {
    const { goToPage } = this.props
    zenscroll.toY(0, 0)
    goToPage(Sections.INSPIRATION)
  }
  goToColor = () => {
    const { goToPage } = this.props
    zenscroll.toY(0, 0)
    goToPage(Sections.COLORS)
  }
  goToFiles = () => {
    const {goToPage } = this.props
    zenscroll.toY(0, 0)
    goToPage(Sections.FILES)
  }
  render() {
    const {
      formatMessage,
      inspirationSelectedItems,
      inspiration,
      selectedColors,
      selectedPrimaryColor,
      selectedPaletteIndex,
      selectedEditColors,
      selectedEditPrimaryColor,
      selectedFiles,
      projectName,
      projectDescription,
      user,
      selectedItems
    } = this.props
    const inspirationItems =
      filter(inspiration, (inspirationItem: InspirationType) => includes(inspirationSelectedItems, inspirationItem.id))
    return (
      <MainContainer>
        <Container>
          <Notes>
            <EditButton onClick={this.goToNotes}>
              {formatMessage(messages.edit)}
            </EditButton>
            <Row>
              <Column>
                <Text>{formatMessage(messages.name)}</Text>
                <StrongText>{projectName || '-'}</StrongText>
              </Column>
              <Column>
                <Text>{formatMessage(messages.customerName)}</Text>
                <StrongText>{user ? `${user.name} ${user.lastName}` : '-'}</StrongText>
              </Column>
              <Column>
                <Text>{formatMessage(messages.email)}</Text>
                <StrongText>{user ? user.email : '-'}</StrongText>
              </Column>
              <Column>
                <Text>{formatMessage(messages.dateCreated)}</Text>
                <StrongText>{moment(new Date()).format(DATE_FORMAT)}</StrongText>
              </Column>
              <Column />
            </Row>
          </Notes>
          <Ideas>
            <EditButton onClick={this.goToNotes}>
              {formatMessage(messages.edit)}
            </EditButton>
            <Row>
              <Column>
                <StrongText>{formatMessage(messages.designNotes)}</StrongText>
              </Column>
              <Column>
                <Text>{projectDescription || '-'}</Text>
              </Column>
            </Row>
          </Ideas>
          <Inspiration>
            <EditButton onClick={this.goToInspiration}>
              {formatMessage(messages.edit)}
            </EditButton>
            <Row>
              <Column>
                <StrongText>{formatMessage(messages.inspiration)}</StrongText>
              </Column>
            </Row>
            <Row>
              <Images>
                {inspirationItems.map((assetItem, index) => {
                  const { image } = assetItem
                  return (<ImageContainer key={index}>
                  <Image src={image} />
                  </ImageContainer>)
                })}
              </Images>
            </Row>
          </Inspiration>
          <Color>
            <EditButton onClick={this.goToColor}>
              {formatMessage(messages.edit)}
            </EditButton>
            <Row>
              <Column>
                <StrongText>{formatMessage(messages.colorPalette)}</StrongText>
              </Column>
            </Row>
            <ColorBar
              primary={selectedPaletteIndex === CUSTOM_PALETTE_INDEX
                ? selectedPrimaryColor[0] : selectedEditPrimaryColor[0]}
              accent={selectedPaletteIndex === CUSTOM_PALETTE_INDEX
                ? selectedColors : selectedEditColors}
            />
          </Color>
          <Files>
            <EditButton onClick={this.goToFiles}>
              {formatMessage(messages.edit)}
            </EditButton>
            <Row>
              <Column>
                <StrongText>{formatMessage(messages.uploadedFiles)}</StrongText>
              </Column>
            </Row>
            <Row>
              <Images>
                {selectedFiles.length ? selectedFiles.map((assetItem, index) => {
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
              <EditButton onClick={this.goToFiles}>
                {formatMessage(messages.edit)}
              </EditButton>
              <Row>
                <Column>
                  <StrongText>{formatMessage(messages.products)}</StrongText>
                </Column>
              </Row>
              <Row>
                {selectedItems.map((productId) => (<ProductThumbnail
                  id={productId}
                />))}
              </Row>
            </Products>
        </Container>
      </MainContainer>
    )
  }
}

const ReviewEnhance = compose(
  withApollo,
)(Review)

export default ReviewEnhance
