/**
 * Settings Component - Created by david on 26/07/18.
 */
import * as React from 'react'
import Icon from 'antd/lib/icon'
import Divider from 'antd/lib/divider'
import isEmpty from 'lodash/isEmpty'
import { Container, List, Button, EmptyLabel } from './styledComponents'
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

  if (isEmpty(design)) {
    return (
      <EmptyLabel>
        Load a design from the product tab or upload a new one in the upload
        tab.
      </EmptyLabel>
    )
  }

  const { name, colors, image } = design
  // const handleOnChangeName = (evt: React.FormEvent<HTMLInputElement>) => {
  //   const {
  //     currentTarget: { value }
  //   } = evt
  //   onUpdateDesignName(value)
  // }

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
        showDelete={!!id}
        name={ideaName}
        image={thumbnail}
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
      {/* // TODO: DELETE AFTER THE CLIENT, TEST THE NEW PUBLISHING TOOL
        <DesignInfo>
          <Label>Design Name</Label>
          <Input
            placeholder="Design name"
            value={name}
            onChange={handleOnChangeName}
          />
        </DesignInfo>
        <Divider>Colors</Divider>
      */}
      <Palette
        showDelete={false}
        colors={colors || []}
        id={DESIGN_THUMBNAIL}
        onEditColorIdea={handleOnEditDesignColors}
        onSelectPalette={handleOnPressSave}
        {...{ formatMessage, image, name }}
        buttonLabel="Save Thumbnail"
        loading={uploadingThumbnail}
      />
      <Divider>Color Combos</Divider>
      <List>{colorIdeasList}</List>
    </Container>
  )
}

export default Settings
