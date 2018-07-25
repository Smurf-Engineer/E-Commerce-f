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

type AntdNumber = number | string | undefined

interface Props {
  design: DesignConfig
  onSelectPalette: (index: number) => void
  onSelectComplexity: (complexity: number) => void
  onUpdateStyleName: (name: string) => void
  onSaveThumbnail: (colors: string[]) => void
}
const InspirationColors = ({
  design,
  onSelectComplexity,
  onUpdateStyleName,
  onSaveThumbnail
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
    onSaveThumbnail(colors)
  }

  const handleOnSelectColors = () => onSaveThumbnail(mainColors)

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
      onSelectPalette={handleOnSelectColors}
      buttonLabel="THUMBNAIL"
    />
  )
  const list = inspiration.map(({ name, colors }, index) => (
    <PaletteCard
      id={index}
      key={index}
      {...{ name, colors }}
      buttonLabel="THUMBNAIL"
      onSelectPalette={handleOnSelectPalette(index)}
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
