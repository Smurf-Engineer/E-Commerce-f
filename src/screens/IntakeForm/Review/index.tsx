import * as React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { compose, withApollo } from 'react-apollo'
import ProductThumbnail from '../../../components/ProductThumbnail'
import zenscroll from 'zenscroll'
import parse from 'html-react-parser'
import draftToHtml from 'draftjs-to-html'
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
  Products,
  PaletteName,
  InspirationName,
  ProjectData,
  DataRow,
  DataText,
  DataValue,
  DocIcon
} from './styledComponents'
import { getFileNameFromUrl } from '../../../utils/utilsFiles'
import ColorBar from '../../../components/ColorBar'
import messages from './messages'
import { Message, InspirationType, ImageFile, UserType, Product } from '../../../types/common'
import { Sections,  CUSTOM_PALETTE_INDEX, InspirationTag } from '../constants'
import { DATE_FORMAT, DOCX_TYPE, DOC_TYPE, PDF_TYPE, ZIP_TYPE } from '../../../constants'

const docTypes = [DOC_TYPE, ZIP_TYPE, DOCX_TYPE, PDF_TYPE]

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
  selectedItems: Product[]
  fromScratch: boolean
  currentCurrency: string
  paletteName?: string
  colorLabels?: { [name: string]: string }
  selectedTeamSize?: string
  estimatedDate?: string
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
  goToNotifications = () => {
    const { goToPage } = this.props
    zenscroll.toY(0, 0)
    goToPage(Sections.NOTIFICATIONS)
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
      selectedTeamSize,
      estimatedDate,
      selectedItems,
      colorLabels,
      paletteName,
      fromScratch,
      currentCurrency
    } = this.props
    const inspirationItems =
      filter(inspiration, (inspirationItem: InspirationType) => includes(inspirationSelectedItems, inspirationItem.id))
    
    let contentState = null
    try {
      contentState = typeof window !== 'undefined' ? JSON.parse(projectDescription) : null
    } catch (e) {
      console.error('Error ', e)
    }

    return (
      <MainContainer>
        <Container>
          <Notes>
            <ProjectData>
              <DataRow>
                <DataText>{formatMessage(messages.name)}</DataText>
                <DataValue>{projectName || '-'}</DataValue>
                <EditButton onClick={this.goToNotes}>
                  {formatMessage(messages.edit)}
                </EditButton>
              </DataRow>
              <DataRow>
                <DataText>{formatMessage(messages.dateCreated)}</DataText>
                <DataValue>{moment(new Date()).format(DATE_FORMAT)}</DataValue>
              </DataRow>
              <DataRow>
                <DataText>{formatMessage(messages.teamSize)}</DataText>
                <DataValue>{selectedTeamSize || '-'}</DataValue>
                <EditButton onClick={this.goToNotifications}>
                  {formatMessage(messages.edit)}
                </EditButton>
              </DataRow>
              <DataRow>
                <DataText>{formatMessage(messages.deliveryDate)}</DataText>
                <DataValue>{estimatedDate ? moment(estimatedDate).format(DATE_FORMAT) : '-'}</DataValue>
                <EditButton onClick={this.goToNotifications}>
                  {formatMessage(messages.edit)}
                </EditButton>
              </DataRow>
            </ProjectData>
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
                <Text>
                  {contentState ?  parse(draftToHtml(contentState)) : '-'}
                </Text>
              </Column>
            </Row>
          </Ideas>
          {fromScratch ? <Inspiration>
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
                {inspirationItems.map(({ image, assetType, id }, index) => 
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
          {fromScratch ? <Color>
            <EditButton onClick={this.goToColor}>
              {formatMessage(messages.edit)}
            </EditButton>
            <Row>
              <Column>
                <StrongText>{formatMessage(messages.colorPalette)}</StrongText>
              </Column>
            </Row>
            {!!paletteName &&
              <PaletteName>
                {paletteName}
              </PaletteName>
            }
            <ColorBar
              {...{ colorLabels, formatMessage }}
              primary={selectedPaletteIndex === CUSTOM_PALETTE_INDEX
                ? selectedPrimaryColor[0] : selectedEditPrimaryColor[0]}
              accent={selectedPaletteIndex === CUSTOM_PALETTE_INDEX
                ? selectedColors : selectedEditColors}
              small={true}
            />
          </Color> : null}
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
                  const { fileUrl, name, type } = assetItem
                  return (<ImageContainer key={index}>
                    {docTypes.includes(type) ?
                      <DocIcon type={type === ZIP_TYPE ? 'file-zip' : 'file'} /> : <Image src={fileUrl} />
                    }
                    <ImageText>{name || getFileNameFromUrl(fileUrl)}</ImageText>
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
                {selectedItems.map((product: Product) => {
                  const {
                    images,
                    type,
                    description,
                    isTopProduct,
                    priceRange,
                    customizable,
                    colors,
                    collections
                  } = product

                  return (<ProductThumbnail
                    key={product.id}
                    id={product.id}
                    images={images[0]}
                    product={product}
                    yotpoId={product.yotpoId}
                    disableSlider={true}
                    hideCustomButton={true}
                    hideQuickView={true}
                    clickDisabled={true}
                    {...{
                      currentCurrency,
                      type,
                      description,
                      isTopProduct,
                      priceRange,
                      customizable,
                      colors,
                      collections
                    }}
                  />)})}
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