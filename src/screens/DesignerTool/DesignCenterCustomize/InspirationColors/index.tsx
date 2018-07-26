/**
 * InspirationColors Component - Created by david on 11/07/18.
 */
import * as React from 'react'
import Divider from 'antd/lib/divider'
import PaletteCard from '../../../../components/PaletteCard'
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

const NONE = -2
const DESIGN_ITEM = -1

type AntdNumber = number | string | undefined

interface Props {
  index: number
  design: DesignConfig
  uploadingThumbnail: number
  onSelectPalette: (index: number) => void
  onSelectComplexity: (desing: number, complexity: number) => void
  onUpdateStyleName: (desing: number, name: string) => void
  onSaveThumbnail: (desing: number, item: number, colors: string[]) => void
}
class InspirationColors extends React.PureComponent<Props> {
  state = {
    uploadingThumbnail: NONE
  }
  render() {
    const { design } = this.props
    const { uploadingThumbnail } = this.state
    const {
      inspiration = [],
      colors: mainColors,
      name: designName,
      complexity
    } = design

    const inspirationCount = inspiration.length
    const styleColors = (
      <PaletteCard
        name="Design Colors"
        colors={mainColors}
        id={inspirationCount}
        key={inspirationCount}
        loading={uploadingThumbnail === DESIGN_ITEM}
        buttonLabel="Save Thumbnail"
        onSelectPalette={this.handleOnSelectColors}
      />
    )
    const list = inspiration.map(({ name, colors }, key) => (
      <PaletteCard
        id={key}
        {...{ key, name, colors }}
        loading={uploadingThumbnail === key}
        buttonLabel="Save Thumbnail"
        onSelectPalette={this.handleOnSelectPalette(key)}
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
