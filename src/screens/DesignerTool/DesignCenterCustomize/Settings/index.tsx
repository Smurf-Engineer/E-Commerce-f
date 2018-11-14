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
  Row,
  Column,
  Label,
  Input,
  InputNumber,
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
  onUpdateStyleName: (design: number, name: string) => void
  onSaveThumbnail: (design: number, item: number, colors: string[]) => void
  formatMessage: (messageDescriptor: any) => string
  onEditColorIdea: (item: number) => void
}

const Settings = ({
  designs,
  onSelectPalette,
  onSelectComplexity,
  onUpdateStyleName,
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

  const handleOnPressSave = (item: number) => {
    // TODO: HANDLE ON CHANGE COLOR
    // const colorIdea = colorIdeas[item]
    // onSaveThumbnail(item, item, colorIdea.colors)
  }

  // const items = designs.map((design, index) => (
  //   <InspirationItem
  //     key={index}
  //     {...{
  //       index,
  //       design,
  //       onSelectPalette,
  //       onSelectComplexity,
  //       onUpdateStyleName,
  //       onSaveThumbnail,
  //       uploadingThumbnail,
  //       formatMessage
  //     }}
  //   />
  // ))

  const styleColors = (
    <Palette
      {...{ formatMessage }}
      showDelete={false}
      name="Design Colors"
      colors={design ? design.colors : []}
      id={colorIdeas.length}
      image={design && design.image}
      loading={uploadingThumbnail}
      buttonLabel="Save Thumbnail"
      onSelectPalette={() => {}}
    />
  )

  const colorIdeasList = colorIdeas.map(
    ({ id, name, colors, thumbnail: image }, key) => (
      <Palette
        id={key}
        inspirationId={id}
        {...{
          key,
          name,
          colors,
          image,
          formatMessage,
          onEditColorIdea,
          onDeleteInspiration
        }}
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
        <Label>Name</Label>
        <Input
          placeholder="Design name"
          value={design && design.name}
          onChange={() => {}}
        />
      </DesignInfo>
      <Divider>Colors</Divider>
      {styleColors}
      <Divider>Inspiration</Divider>
      <List>{colorIdeasList}</List>
    </Container>
  )
}

export default Settings
