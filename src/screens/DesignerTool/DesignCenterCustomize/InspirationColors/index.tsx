/**
 * InspirationColors Component - Created by david on 11/07/18.
 */
import * as React from 'react'
import Divider from 'antd/lib/divider'
import Palette from '../../../../components/DesignPalette'
import {
  Container,
  ListContainer,
  EmptyLabel,
  Input,
  Row,
  InputNumber,
  Label,
  Column
} from './styledComponents'
import { DesignConfig } from '../../../../types/common'

const DESIGN_ITEM = -1

type AntdNumber = number | string | undefined

interface Props {
  index: number
  design: DesignConfig
  uploadingThumbnail: boolean
  onSelectPalette: (index: number) => void
  onSelectComplexity: (design: number, complexity: number) => void
  onUpdateStyleName: (design: number, name: string) => void
  onSaveThumbnail: (design: number, item: number, colors: string[]) => void
  formatMessage: (messageDescriptor: any) => string
}
class InspirationColors extends React.PureComponent<Props> {
  render() {
    const { design, uploadingThumbnail, formatMessage } = this.props
    const {
      inspiration = [],
      colors: mainColors,
      name: designName,
      thumbnail,
      complexity
    } = design

    const inspirationCount = inspiration.length
    const styleColors = (
      <Palette
        name="Design Colors"
        colors={mainColors}
        id={inspirationCount}
        key={inspirationCount}
        image={thumbnail}
        loading={uploadingThumbnail}
        buttonLabel="Save Thumbnail"
        onSelectPalette={this.handleOnSelectColors}
        {...{ formatMessage }}
      />
    )
    const list = inspiration.map(({ name, colors, thumbnail: image }, key) => (
      <Palette
        id={key}
        {...{ key, name, colors, image }}
        loading={uploadingThumbnail}
        buttonLabel="Save Thumbnail"
        onSelectPalette={this.handleOnSelectPalette(key)}
        {...{ formatMessage }}
      />
    ))
    return !!inspirationCount ? (
      <Container>
        <Divider>Design Info</Divider>
        <Row>
          <Column width="70%">
            <Label>Name</Label>
            <Input value={designName} onChange={this.handleOnChangeName} />
          </Column>
          <Column width="30%">
            <Label>Complexity</Label>
            <InputNumber
              min={1}
              max={3}
              value={complexity || 1}
              onChange={this.handleOnChangeComplexity}
            />
          </Column>
        </Row>
        <Divider>Colors</Divider>
        {styleColors}
        <Divider>Inspiration</Divider>
        <ListContainer>{list}</ListContainer>
      </Container>
    ) : (
      <EmptyLabel>Select JSON FILE</EmptyLabel>
    )
  }

  handleOnChangeComplexity = (value: AntdNumber) => {
    const { index, onSelectComplexity } = this.props
    onSelectComplexity(index, value as number)
  }

  handleOnSelectPalette = (item: number) => () => {
    const {
      index,
      design: { inspiration },
      onSaveThumbnail
    } = this.props
    const { colors = [] } = inspiration[item] || {}
    onSaveThumbnail(index, item, colors)
  }

  handleOnSelectColors = () => {
    const { index, design, onSaveThumbnail } = this.props
    const { colors: mainColors } = design
    onSaveThumbnail(index, DESIGN_ITEM, mainColors)
  }

  handleOnChangeName = (evt: React.FormEvent<HTMLInputElement>) => {
    const { index, onUpdateStyleName } = this.props
    const {
      currentTarget: { value }
    } = evt
    onUpdateStyleName(index, value)
  }
}

export default InspirationColors
