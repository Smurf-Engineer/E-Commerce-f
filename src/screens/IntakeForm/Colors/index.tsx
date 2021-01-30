/**
 * Colors Component - Created by eduardoquintero on 02/12/20.
 */
import * as React from 'react'
import { compose, graphql } from 'react-apollo'
import ColorBar from '../../../components/ColorBar'
import ColorSelector from '../../../components/ColorSelector'
import { GetColorPalettes, GetColorsQuery } from './data'
import BackIcon from '../../../assets/leftarrow.svg'
import SwipeableViews from 'react-swipeable-views'
import isEqual from 'lodash/isEqual'
import AntdMessage from 'antd/lib/message'
import rightArrow from '../../../assets/arrow.svg'
import { RouteComponentProps } from 'react-router-dom'
import {
  Container,
  Title,
  InfoText,
  SelectPaletteContainer,
  PaletteTitle,
  PaletteColumns,
  Palettes,
  CreatePalette,
  PaletteContainer,
  Body,
  Header,
  MainContainer,
  Text,
  Palette,
  Image,
  PaletteLabel,
  LeftPaletteLabel
} from './styledComponents'
import messages from './messages'
import { CUSTOM_PALETTE_INDEX } from '../constants'
import { Message, ProDesignPalette, QueryProps, ColorsDataResult, Color } from '../../../types/common'
import get from 'lodash/get'

const SELECTED_PRIMARY_COLOR = 'selectedPrimaryColor'
const SELECTED_COLORS = 'selectedColors'
const SELECTED_EDIT_PRIMARY_COLOR = 'selectedEditPrimaryColor'
const SELECTED_EDIT_COLORS = 'selectedEditColors'

interface Data extends QueryProps {
  rows: ProDesignPalette[]
}

interface Props extends RouteComponentProps<any> {
  data: Data
  colorsList: ColorsDataResult
  selectedColors: string[]
  selectedPrimaryColor: string[]
  selectedPaletteIndex: number
  selectedEditColors: string[]
  selectedEditPrimaryColor: string[]
  isMobile: boolean
  openBuild: boolean
  setOpenBuild: (open: boolean) => void
  formatMessage: (messageDescriptor: Message, values?: {}) => string
  onSelect: (color: string, listName: string, index?: number) => void
  onDeselect: (color: string, listName: string) => void
  selectPalette: (primaryColor: string, accentColors: string[], index: number) => void
  resetSelection: () => void
}

export class Colors extends React.Component<Props, {}> {
  state = {
    openBuild: false
  }
  openBuildAction = () => {
    const { setOpenBuild } = this.props
    setOpenBuild(true)
  }
  closeBuildAction = () => {
    const { setOpenBuild } = this.props
    setOpenBuild(false)
  }
  buildFromZero = () => {
    const { resetSelection, selectedPaletteIndex } = this.props
    if (selectedPaletteIndex >= -1) {
      resetSelection()
    } 
  }
  render() {
    const {
      formatMessage,
      onDeselect,
      onSelect,
      selectPalette,
      data,
      openBuild,
      colorsList,
      selectedColors,
      selectedPrimaryColor,
      selectedPaletteIndex,
      selectedEditPrimaryColor,
      selectedEditColors,
      isMobile
    } = this.props
    const accentColorsLength = selectedPaletteIndex === CUSTOM_PALETTE_INDEX ?
    selectedColors.length : selectedEditColors.length

    let arrayColors = []

    if (colorsList) {
      try {
        arrayColors = JSON.parse(get(colorsList, 'colorsResult.colors', []))
      } catch (e) {
        AntdMessage.error(e)
      }
    }

    const colorLabels = arrayColors.reduce((obj, { value, name }: Color) => {
      obj[value] = name
      return obj
      // tslint:disable-next-line: align
    }, {})

    const handleOnSelectPrimary = (color: string) =>
      onSelect(color, selectedPaletteIndex === CUSTOM_PALETTE_INDEX ?
        SELECTED_PRIMARY_COLOR : SELECTED_EDIT_PRIMARY_COLOR,
               0)
    const handleOnDeselect = (color: string) =>
      onDeselect(color, selectedPaletteIndex === CUSTOM_PALETTE_INDEX ? SELECTED_COLORS : SELECTED_EDIT_COLORS)
    const handleOnSelectAccent = (color: string) =>
      onSelect(color, selectedPaletteIndex === CUSTOM_PALETTE_INDEX ?
        SELECTED_COLORS : SELECTED_EDIT_COLORS,
               accentColorsLength >= 3 ? 0 : undefined)

    // const onSelectCustomPalette = () => selectPalette(selectedPrimaryColor[0], selectedColors, CUSTOM_PALETTE_INDEX)
    return (
      <MainContainer>
        <Container>
          <Title>
            {formatMessage(messages.currentPalette)}
          </Title>
          <ColorBar
            {...{ formatMessage, colorLabels }}
            primary={selectedPaletteIndex === CUSTOM_PALETTE_INDEX
              ? selectedPrimaryColor[0] : selectedEditPrimaryColor[0]}
            accent={selectedPaletteIndex === CUSTOM_PALETTE_INDEX
              ? selectedColors : selectedEditColors}
            withLegend={true}
          />
          <InfoText>
            {formatMessage(messages.colorsInfo)}
          </InfoText>
          <SelectPaletteContainer>
            <SwipeableViews
              disabled={true}
              className={'intake'}
              index={isMobile && openBuild ? 1 : 0}
              >
              <>
              <PaletteTitle>
                <LeftPaletteLabel>
                  {formatMessage(messages.trendingPalette)}
                </LeftPaletteLabel>
                <PaletteLabel onClick={this.buildFromZero}>
                  {formatMessage(messages.buildYourOwn)}
                </PaletteLabel>
              </PaletteTitle>
              <PaletteColumns>
                <Palettes>
                  {!data.loading && data.rows.map((palette, index) => {
                    const { accent1, accent2, accent3, id, name, primary } = palette
                    const accentColors = [ accent1, accent2, accent3]
                    var filteredAccentColors = accentColors.reduce((result: string[], accent: string) => {
                      if (accent) {
                        result.push(accent)
                      }
                      return result
                    // tslint:disable-next-line: align
                    }, [])
                    const colorsWithoutChanges = isEqual(accentColors, selectedEditColors)
                    const primaryColorWithoutChanges = primary === selectedEditPrimaryColor[0]
                    const onSelectPalette = () => selectPalette(palette.primary, filteredAccentColors, index)
                    return (
                      <>
                      <PaletteContainer
                        key={id}
                        selected={selectedPaletteIndex === index &&
                          (colorsWithoutChanges && primaryColorWithoutChanges)}
                        onClick={onSelectPalette}
                      >
                        <Header>
                          {name}
                          <img onClick={this.openBuildAction} src={rightArrow} />
                        </Header>
                        <Body>
                          <ColorBar
                            {...{formatMessage}}
                            primary={primary}
                            accent={filteredAccentColors}
                          />
                        </Body>
                      </PaletteContainer>
                    </>)
                  })}

                </Palettes>
                {!isMobile ? <CreatePalette>
                  <Palette>
                    <Text>{formatMessage(messages.primaryColor)}</Text>
                    {!colorsList.loading &&
                      <ColorSelector
                        selectedColors={
                          selectedPaletteIndex === CUSTOM_PALETTE_INDEX ?
                            selectedPrimaryColor : selectedEditPrimaryColor}
                        colorsList={colorsList}
                        onSelect={handleOnSelectPrimary}
                        onDeselect={handleOnDeselect} />}
                  </Palette>
                  <Palette>
                    <Text>{formatMessage(messages.accentColor)}</Text>
                    {!colorsList.loading &&
                      <ColorSelector
                        selectedColors={
                          selectedPaletteIndex === CUSTOM_PALETTE_INDEX ? selectedColors : selectedEditColors}
                        colorsList={colorsList}
                        onSelect={handleOnSelectAccent}
                        onDeselect={handleOnDeselect} />}
                  </Palette>
                </CreatePalette> : null}
              </PaletteColumns>
            </>
            <>
              <PaletteTitle withPadding={true} onClick={this.closeBuildAction}>
                <Image src={BackIcon} />
                {formatMessage(messages.selectPalette)}
              </PaletteTitle>
              <CreatePalette>
                  <Palette>
                    <Text>{formatMessage(messages.primaryColor)}</Text>
                    {!colorsList.loading &&
                      <ColorSelector
                        selectedColors={
                          selectedPaletteIndex === CUSTOM_PALETTE_INDEX ?
                            selectedPrimaryColor : selectedEditPrimaryColor}
                        colorsList={colorsList}
                        onSelect={handleOnSelectPrimary}
                        onDeselect={handleOnDeselect} />}
                  </Palette>
                  <Palette>
                    <Text>{formatMessage(messages.accentColor)}</Text>
                    {!colorsList.loading &&
                      <ColorSelector
                        selectedColors={
                          selectedPaletteIndex === CUSTOM_PALETTE_INDEX ? selectedColors : selectedEditColors}
                        colorsList={colorsList}
                        onSelect={handleOnSelectAccent}
                        onDeselect={handleOnDeselect} />}
                  </Palette>
                </CreatePalette>
            </>
            </SwipeableViews>
          </SelectPaletteContainer>
        </Container>
      </MainContainer>
    )
  }
}

type OwnProps = {
  colorsList?: ColorsDataResult
}

const ColorsEnhance = compose(
  graphql<Data>(GetColorPalettes, {}),
  graphql<ColorsDataResult>(GetColorsQuery, {
    options: (ownprops: OwnProps) => {
      const { colorsList } = ownprops
      return {
        skip: !!colorsList
      }
    },
    name: 'colorsList'
  }),
)(Colors)

export default ColorsEnhance
