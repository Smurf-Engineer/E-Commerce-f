/**
 * Colors Component - Created by eduardoquintero on 02/12/20.
 */
import * as React from 'react'
import ColorBar from '../../../components/ColorBar'
import ColorSelector from '../../../components/ColorSelector'
import BackIcon from '../../../assets/leftarrow.svg'
import SwipeableViews from 'react-swipeable-views'
import isEqual from 'lodash/isEqual'
import zenscroll from 'zenscroll'
import rightArrow from '../../../assets/arrow.svg'
import { RouteComponentProps } from 'react-router-dom'
import {
  Container,
  Title,
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
  LeftPaletteLabel,
  EditButton
} from './styledComponents'
import messages from './messages'
import { CUSTOM_PALETTE_INDEX } from '../constants'
import { Message, ProDesignPalette, QueryProps, ColorsDataResult } from '../../../types/common'
import ReactDOM from 'react-dom'

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
  colorLabels?: { [name: string]: string }
  selectedColors: string[]
  selectedPrimaryColor: string[]
  selectedPaletteIndex: number
  selectedEditColors: string[]
  selectedEditPrimaryColor: string[]
  isMobile: boolean
  isTablet: boolean
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
  private createRef: any
  private paletteRef: any
  openBuildAction = () => {
    const { setOpenBuild } = this.props
    setOpenBuild(true)
  }
  closeBuildAction = () => {
    const { setOpenBuild } = this.props
    setOpenBuild(false)
  }
  buildFromZero = () => {
    const { resetSelection } = this.props
    resetSelection()
  }
  handleOnSelectPrimary = (color: string) =>  {
    const { onSelect, selectedPaletteIndex, isTablet, isMobile } = this.props
    const index = selectedPaletteIndex === CUSTOM_PALETTE_INDEX ? SELECTED_PRIMARY_COLOR : SELECTED_EDIT_PRIMARY_COLOR
    onSelect(color, index, 0)
    if (isMobile || isTablet) {
      const node = ReactDOM.findDOMNode(isTablet ? this.paletteRef : this.createRef) as HTMLElement
      const intakeScroller = zenscroll.createScroller(node, 0)
      intakeScroller.toY(590, 1200)
    }
  }
  render() {
    const {
      formatMessage,
      onDeselect,
      onSelect,
      selectPalette,
      data,
      colorLabels,
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
          <SelectPaletteContainer>
            <SwipeableViews
              disabled={true}
              enableMouseEvents={false}
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
                          {isMobile ?
                            <EditButton onClick={this.openBuildAction}>
                              {formatMessage(messages.edit)}
                            </EditButton>
                            : <img onClick={this.openBuildAction} src={rightArrow} />
                          }
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
                {!isMobile ?
                  <CreatePalette
                    ref={(listObject: any) => {
                      this.paletteRef = listObject
                    }}
                  >
                    <Palette>
                      <Text>{formatMessage(messages.primaryColor)}</Text>
                      {!colorsList.loading &&
                        <ColorSelector
                          selectedColors={
                            selectedPaletteIndex === CUSTOM_PALETTE_INDEX ?
                              selectedPrimaryColor : selectedEditPrimaryColor}
                          colorsList={colorsList}
                          onSelect={this.handleOnSelectPrimary}
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
                  : null
                }
              </PaletteColumns>
            </>
            <>
              <PaletteTitle withPadding={true} onClick={this.closeBuildAction}>
                <Image src={BackIcon} />
                {formatMessage(messages.selectPalette)}
              </PaletteTitle>
              <CreatePalette
                ref={(listObject: any) => {
                  this.createRef = listObject
                }}
              >
                  <Palette>
                    <Text>{formatMessage(messages.primaryColor)}</Text>
                    {!colorsList.loading &&
                      <ColorSelector
                        selectedColors={
                          selectedPaletteIndex === CUSTOM_PALETTE_INDEX ?
                            selectedPrimaryColor : selectedEditPrimaryColor}
                        colorsList={colorsList}
                        onSelect={this.handleOnSelectPrimary}
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

export default Colors
