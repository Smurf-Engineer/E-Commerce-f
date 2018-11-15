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
  onSaveThumbnail: (design: number, item: number, colors: string[]) => void
  formatMessage: (messageDescriptor: any) => string
  onEditColorIdea: (item: number) => void
}

const Settings = ({
  designs,
  onSelectPalette,
  onSelectComplexity,
  onUpdateDesignName,
  onSaveThumbnail,
  uploadingThumbnail,
  onSelectConfig,
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

  const handleOnPressSave = (id: number) => {
    // TODO: HANDLE ON CHANGE COLOR
    // const colorIdea = colorIdeas[item]
    // onSaveThumbnail(item, item, colorIdea.colors)
  }

  const colorIdeasList = colorIdeas.map(
    ({ id, name: ideaName, colors: ideaColors, thumbnail }, key) => (
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
        id={colorIdeas.length}
        onSelectPalette={() => {}}
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
