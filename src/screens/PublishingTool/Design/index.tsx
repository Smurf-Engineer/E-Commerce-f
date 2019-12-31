/**
 * Design Component - Created by eduardoquintero on 18/12/19.
 */
import * as React from 'react'
import messages from './messages'
import { updateStylesOrderMutation } from './data'
import Icon from 'antd/lib/icon'
import { compose, withApollo } from 'react-apollo'
import Palette from '../../../components/DesignPalette'
import SwipeableViews from 'react-swipeable-views'
import EditInspiration from '../EditInspiration'
import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Subtitle,
  TopContainer,
  ExportButton
} from './styledComponents'
import {
  Message,
  QueryProps,
  Product,
  ModelDesign,
  DesignObject
} from '../../../types/common'

const LIST_TAB = 0
const EDIT_TAB = 1

import { DESIGN_THUMBNAIL, DESIGN_COLORS, NONE } from '../reducer'

interface Props {
  productData: ProductData
  design: ModelDesign
  colorIdeas: DesignObject[]
  colorIdeaItem: number
  colorsList: any
  colorBlock: number
  colorBlockHovered: number
  colors: string[]
  uploadingThumbnail: boolean
  formatMessage: (messageDescriptor: Message) => string
  onEditColorIdea: (item: number) => void
  onSelectColorBlock: (index: number) => void
  onSelectColor: (color: string) => void
  onHoverColorBlock: (index: number) => void
  onUpdateColorIdeaName: (
    name: string,
    updateColors: boolean,
    item?: number
  ) => void
  onSelectInspirationColor: (index: number) => void
  onAddColorIdea: () => void
  onSaveThumbnail: (item: number, colors: string[]) => void
  onDeleteInspiration: (id: number, index: number) => void
}

interface ProductData extends QueryProps {
  product: Product
}

export class Design extends React.Component<Props, {}> {
  handleOnEditDesignColors = () => {
    const { onEditColorIdea } = this.props
    onEditColorIdea(DESIGN_COLORS)
  }
  handleOnPressSave = (item: number) => {
    const { colorIdeas, design, onSaveThumbnail } = this.props
    let { colors: modelColors } = design
    if (item !== DESIGN_THUMBNAIL) {
      const colorIdea = colorIdeas[item]
      modelColors = colorIdea.colors || []
    }
    onSaveThumbnail(item, modelColors)
  }
  downloadFile = async () => {
    const {
      design: { name, colors },
      colorIdeas
    } = this.props

    const fileName = 'config'
    const inspiration = colorIdeas.map(
      ({ name: inspirationName, colors: inspirationColors }) => {
        return { name: inspirationName, colors: inspirationColors }
      }
    )

    const jsonObject = { name, colors, inspiration }

    const json = JSON.stringify(jsonObject, null, '\t')
    const blob = new Blob([json], { type: 'application/json' })
    const href = await URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = href
    link.download = fileName + '.json'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  render() {
    const {
      formatMessage,
      colorBlock,
      colorIdeas,
      design,
      onEditColorIdea,
      colorIdeaItem,
      colorsList,
      onSelectColorBlock,
      onSelectColor,
      onHoverColorBlock,
      colorBlockHovered,
      onUpdateColorIdeaName,
      uploadingThumbnail,
      colors,
      onAddColorIdea,
      onSaveThumbnail,
      onDeleteInspiration
    } = this.props
    const { name, image, colors: designColors } = design
    let colorIdea: DesignObject | ModelDesign | null = null
    let renderList = true
    if (colorIdeaItem !== NONE) {
      colorIdea =
        colorIdeaItem === DESIGN_COLORS ? design : colorIdeas[colorIdeaItem]
      renderList = false
    }

    const colorIdeasList = colorIdeas.map(
      ({ id, name: ideaName, colors: ideaColors, image: thumbnail }, key) => (
        <Palette
          id={key}
          inspirationId={id}
          {...{
            key,
            formatMessage,
            onEditColorIdea,
            onDeleteInspiration
          }}
          name={ideaName}
          image={thumbnail}
          colors={ideaColors}
          loading={uploadingThumbnail}
          buttonLabel="Save Thumbnail"
          onSelectPalette={this.handleOnPressSave}
        />
      )
    )
    return (
      <Container>
        <Header>
          <Title>{formatMessage(messages.colorCombos)}</Title>
        </Header>
        <Content>
          <SwipeableViews
            disabled={true}
            index={renderList ? LIST_TAB : EDIT_TAB}
          >
            <div>
              <Button onClick={onAddColorIdea}>
                <Icon type="plus" />
                {formatMessage(messages.addColor)}
              </Button>
              <Palette
                showDelete={false}
                colors={designColors || []}
                id={DESIGN_THUMBNAIL}
                onSelectPalette={this.handleOnPressSave}
                onEditColorIdea={this.handleOnEditDesignColors}
                {...{ formatMessage, image, name }}
                buttonLabel="Save Thumbnail"
                loading={uploadingThumbnail}
              />
              <TopContainer>
                <Subtitle>{formatMessage(messages.colorCombosList)}</Subtitle>
                <ExportButton onClick={this.downloadFile}>
                  {formatMessage(messages.exportColors)}
                </ExportButton>
              </TopContainer>
              {colorIdeasList}
            </div>
            <EditInspiration
              render={!renderList}
              {...{
                colors,
                colorIdea,
                colorBlock,
                onSelectColor,
                onEditColorIdea,
                onSaveThumbnail,
                colorsList,
                colorBlockHovered,
                onHoverColorBlock,
                onSelectColorBlock,
                onUpdateColorIdeaName,
                formatMessage
              }}
            />
          </SwipeableViews>
        </Content>
      </Container>
    )
  }
}

const DesignEnhance = compose(withApollo, updateStylesOrderMutation)(Design)

export default DesignEnhance
