/**
 * Design Component - Created by eduardoquintero on 18/12/19.
 */
import * as React from 'react'
import messages from './messages'
import { updateStylesOrderMutation } from './data'
import Icon from 'antd/lib/icon'
import Divider from 'antd/lib/divider'
import { compose, withApollo } from 'react-apollo'
import Palette from '../../../components/DesignPalette'
import SwipeableViews from 'react-swipeable-views'
import { Container, Header, Title, Content, Button } from './styledComponents'
import {
  Message,
  QueryProps,
  Product,
  ModelDesign,
  DesignObject,
  ColorsDataResult
} from '../../../types/common'

const LIST_TAB = 0
const EDIT_TAB = 1

import { DESIGN_THUMBNAIL, DESIGN_COLORS } from '../reducer'

interface Props {
  productData: ProductData
  design: ModelDesign
  colorIdeas: DesignObject[]
  colorIdeaItem: number
  colorsList: ColorsDataResult
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

  render() {
    const {
      formatMessage,
      colorIdeas,
      design,
      onEditColorIdea,
      uploadingThumbnail,
      onAddColorIdea,
      onDeleteInspiration
    } = this.props
    const { name, image, colors: designColors } = design
    let renderList = true

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
              <Divider>{formatMessage(messages.colorCombosList)}</Divider>
              {colorIdeasList}
            </div>
          </SwipeableViews>
        </Content>
      </Container>
    )
  }
}

const DesignEnhance = compose(withApollo, updateStylesOrderMutation)(Design)

export default DesignEnhance
