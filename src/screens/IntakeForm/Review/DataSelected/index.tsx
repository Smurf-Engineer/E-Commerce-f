import * as React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import ProductThumbnail from '../../../../components/ProductThumbnail'
import zenscroll from 'zenscroll'
import filter from 'lodash/filter'
import includes from 'lodash/includes'
import {
  StrongText,
  Column,
  Row,
  EditButton,
  Inspiration,
  ImageContainer,
  Image,
  Images,
  Color,
  Files,
  ImageText,
  Products,
  Grid,
  PaletteName,
  InspirationName,
  DocIcon,
  LockerGrid,
  LogoImage
} from './styledComponents'
import aiLogo from '../../../../assets/ailogo.png'
import epsLogo from '../../../../assets/epslogo.png'
import { getFileExtension, getFileNameFromUrl } from '../../../../utils/utilsFiles'
import ColorBar from '../../../../components/ColorBar'
import messages from '../messages'
import { Message, InspirationType, ImageFile, Product, DesignType } from '../../../../types/common'
import { Sections, CUSTOM_PALETTE_INDEX, InspirationTag } from '../../constants'
import { DOC_TYPE, ZIP_TYPE, DOCX_TYPE, PDF_TYPE, POSTSCRIPT_TYPE } from '../../../../constants'
import ProductThumbnailStore from '../../../../components/ProductThumbnailStore'

const docTypes = [DOC_TYPE, ZIP_TYPE, DOCX_TYPE, PDF_TYPE]

interface Props extends RouteComponentProps<any> {
  inspiration: InspirationType[]
  inspirationSelectedItems: number[]
  selectedColors: string[]
  selectedPrimaryColor: string[]
  selectedPaletteIndex: number
  selectedEditColors: string[]
  lockerDesign: DesignType
  selectedEditPrimaryColor: string[]
  selectedFiles: ImageFile[]
  selectedItems: Product[]
  fromScratch: boolean
  currentCurrency: string
  colorLabels?: { [name: string]: string }
  paletteName?: string
  adminProject: boolean
  formatMessage: (messageDescriptor: Message, values?: {}) => string
  goToPage: (page: number) => void
}

export class DataSelected extends React.Component<Props, {}> {
  goToInspiration = () => {
    const { goToPage } = this.props
    zenscroll.toY(0, 0)
    goToPage(Sections.INSPIRATION)
  }
  goToColor = () => {
    const { goToPage } = this.props
    zenscroll.toY(0, 0)
    goToPage(Sections.COLORS)
  }
  goToFiles = () => {
    const { goToPage } = this.props
    zenscroll.toY(0, 0)
    goToPage(Sections.FILES)
  }
  goToLocker = () => {
    const { goToPage } = this.props
    zenscroll.toY(0, 0)
    goToPage(Sections.LOCKER)
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
      colorLabels,
      paletteName,
      lockerDesign,
      selectedItems,
      fromScratch,
      currentCurrency,
      adminProject
    } = this.props
    const inspirationItems =
      filter(inspiration, (inspirationItem: InspirationType) => includes(inspirationSelectedItems, inspirationItem.id))
    const {
      id: designId,
      shortId,
      product: productLocker,
      name: designName,
      image: lockerImage,
      createdAt
    } = lockerDesign || {}
    const { id: productId, description: lockerDescription, type: lockerType } = productLocker || {}
    return (
      <>
        {!adminProject && fromScratch ? <Inspiration>
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
        {!adminProject && fromScratch ? <Color>
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
        {
          !adminProject ? <Files>
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
                  const extension = getFileExtension(fileUrl)
                  return (<ImageContainer key={index}>
                    {docTypes.includes(type) ?
                      <DocIcon type={type === ZIP_TYPE ? 'file-zip' : 'file'} /> : 
                      (type === POSTSCRIPT_TYPE ?
                        <LogoImage src={extension === '.ai' ? aiLogo : epsLogo} /> : <Image src={fileUrl} />)
                    }
                    <ImageText>{name || getFileNameFromUrl(fileUrl)}</ImageText>
                  </ImageContainer>)
                }) : formatMessage(messages.noFiles)}
              </Images>
            </Row>
          </Files> : null
        }
        <Products>
          {!adminProject ? <EditButton onClick={this.goToFiles}>
            {formatMessage(messages.edit)}
          </EditButton> : null}
          <Row>
            <Column>
              <StrongText>{formatMessage(messages.products)}</StrongText>
            </Column>
          </Row>
          <Row>
            <Grid>
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
                  fitContainer={true}
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
                />)
              })}
            </Grid>
          </Row>
        </Products>
        {lockerDesign && designId &&
          <Products>
            <EditButton onClick={this.goToLocker}>
              {formatMessage(messages.edit)}
            </EditButton>
            <Row>
              <Column>
                <StrongText>{formatMessage(messages.locker)}</StrongText>
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
                  date={createdAt}
                />
              </LockerGrid>
            </Row>
          </Products>
        }
      </>
    )
  }
}

export default DataSelected
