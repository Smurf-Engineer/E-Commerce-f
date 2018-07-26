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

const DESIGN_ITEM = -1

type AntdNumber = number | string | undefined

interface Props {
  design: DesignConfig
  uploadingThumbnail: number
  onSelectPalette: (index: number) => void
  onSelectComplexity: (complexity: number) => void
  onUpdateStyleName: (name: string) => void
  onSaveThumbnail: (desing: number, colors: string[]) => void
  formatMessage: (messageDescriptor: any) => string
}
const InspirationColors = ({
  design,
  uploadingThumbnail,
  onSelectComplexity,
  onUpdateStyleName,
  onSaveThumbnail,
  formatMessage
}: Props) => {
  const {
    inspiration = [],
    colors: mainColors,
    name: designName,
    complexity
  } = design

  const handleOnChangeComplexity = (value: AntdNumber) => {
    onSelectComplexity(value as number)
  }

  const handleOnSelectPalette = (index: number) => () => {
    const { colors = [] } = inspiration[index] || {}
    onSaveThumbnail(index, colors)
  }

  const handleOnSelectColors = () => onSaveThumbnail(DESIGN_ITEM, mainColors)

  const handleOnChangeName = (evt: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value }
    } = evt
    onUpdateStyleName(value)
  }

  const inspirationCount = inspiration.length
  const styleColors = (
    <PaletteCard
      name="Design Colors"
      colors={mainColors}
      id={inspirationCount}
      key={inspirationCount}
      loading={uploadingThumbnail === DESIGN_ITEM}
      buttonLabel="Save Thumbnail"
      onSelectPalette={handleOnSelectColors}
      {...{ formatMessage }}
    />
  )
  const list = inspiration.map(({ name, colors }, index) => (
    <PaletteCard
      id={index}
      key={index}
      {...{ name, colors }}
      loading={uploadingThumbnail === index}
      buttonLabel="Save Thumbnail"
      onSelectPalette={handleOnSelectPalette(index)}
      {...{ formatMessage }}
    />
  ))
  return !!inspirationCount ? (
    <Container>
      <Divider>Design Info</Divider>
      <Row>
        <Column width="70%">
          <Label>Name</Label>
          <Input value={designName} onChange={handleOnChangeName} />
        </Column>
        <Column width="30%">
          <Label>Complexity</Label>
          <InputNumber
            min={1}
            max={3}
            value={complexity || 1}
            onChange={handleOnChangeComplexity}
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

export default InspirationColors
