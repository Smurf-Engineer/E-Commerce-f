/**
 * Settings Component - Created by david on 26/07/18.
 */
import * as React from 'react'
import Icon from 'antd/lib/icon'
import Divider from 'antd/lib/divider'
import {
  Container,
  List,
  Button,
  Label,
  Input,
  DesignInfo
} from './styledComponents'
import Palette from '../../../../components/DesignPalette'
import {
  DesignConfig,
  DesignObject,
  ModelDesign
} from '../../../../types/common'
import { DESIGN_THUMBNAIL, DESIGN_COLORS } from '../../reducer'

interface Props {
  designs: DesignConfig[]
  uploadingThumbnail: boolean
  colorIdeas: DesignObject[]
  render: boolean
  design: ModelDesign
  onSelectConfig: (config: DesignConfig) => void
  onSelectPalette: (index: number) => void
  onDeleteInspiration: (id: number) => void
  onSelectComplexity: (design: number, complexity: number) => void
  onUpdateDesignName: (name: string) => void
  onSaveThumbnail: (item: number, colors: string[]) => void
  formatMessage: (messageDescriptor: any) => string
  onEditColorIdea: (item: number) => void
}

const Settings = ({
  onUpdateDesignName,
  onSaveThumbnail,
  uploadingThumbnail,
  formatMessage,
  colorIdeas,
  onEditColorIdea,
  render,
  onDeleteInspiration,
  design
}: Props) => {
  if (!render) {
    return <div />
  }

  const { name, colors, image } = design
  const handleOnChangeName = (evt: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value }
    } = evt
    onUpdateDesignName(value)
  }

  const handleOnEditDesignColors = () => onEditColorIdea(DESIGN_COLORS)

  const handleOnPressSave = (item: number) => {
    let { colors: modelColors } = design
    if (item !== DESIGN_THUMBNAIL) {
      const colorIdea = colorIdeas[item]
      modelColors = colorIdea.colors || []
    }

    onSaveThumbnail(item, modelColors)
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
        image={thumbnail}
        name={ideaName}
        colors={ideaColors}
        loading={uploadingThumbnail}
        buttonLabel="Save Thumbnail"
        onSelectPalette={handleOnPressSave}
      />
    )
  )
  return (
    <Container>
      <Button>
        <Icon type="plus" />
        ADD NEW COLOR IDEA
      </Button>
      <Divider>Design Info</Divider>
      <DesignInfo>
        <Label>Design Name</Label>
        <Input
          placeholder="Design name"
          value={name}
          onChange={handleOnChangeName}
        />
      </DesignInfo>
      <Divider>Colors</Divider>
      <Palette
        showDelete={false}
        colors={colors || []}
        name="Design Colors"
        id={DESIGN_THUMBNAIL}
        onEditColorIdea={handleOnEditDesignColors}
        onSelectPalette={handleOnPressSave}
        {...{ formatMessage, image }}
        buttonLabel="Save Thumbnail"
        loading={uploadingThumbnail}
      />
      <Divider>Inspiration</Divider>
      <List>{colorIdeasList}</List>
    </Container>
  )
}

export default Settings
