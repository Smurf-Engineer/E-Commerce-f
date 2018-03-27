/**
 * ColorTab Component - Created by david on 26/02/18.
 */
import * as React from 'react'
import { FormattedMessage } from 'react-intl'
import Divider from 'antd/lib/divider'
import SwipeableViews from 'react-swipeable-views'
import ColorButton from '../ColorButton'
import ColorList from '../ColorList'
import MyPalette from '../MyPalette'
import nextIcon from '../../../assets/rightarrow.svg'
import backIcon from '../../../assets/leftarrow.svg'
import messages from './messages'
import { Palette } from '../../../types/common'
import {
  Container,
  TextColors,
  Text,
  Top,
  Row,
  ArrowIcon,
  ColorButtons
} from './styledComponents'

interface Props {
  colorBlock: number
  colorBlockHovered: number
  paletteName: string
  palettes: Palette[]
  colors: string[]
  styleColors: string[]
  onSelectColorBlock: (index: number) => void
  onSelectColor: (color: string) => void
  onSelectPalette: (colors: string[]) => void
  onChangePaletteName: (name: string) => void
  onSetPalettes: (palettes: Palette[]) => void
  onHoverColorBlock: (index: number) => void
}

interface State {
  isFirstPage: boolean
}

const colorsBlocks = ['Color 1', 'Color 2', 'Color 3', 'Color 4', 'Color 5']

class ColorTab extends React.PureComponent<Props, State> {
  state = {
    isFirstPage: true
  }
  handleTooglePage = () =>
    this.setState(({ isFirstPage }) => ({ isFirstPage: !isFirstPage }))
  render() {
    const {
      onSelectColorBlock,
      onHoverColorBlock,
      colorBlock,
      colorBlockHovered,
      onSelectColor,
      onChangePaletteName,
      paletteName,
      palettes,
      colors,
      styleColors,
      onSetPalettes,
      onSelectPalette
    } = this.props
    const { isFirstPage } = this.state
    const colorButtons = colorsBlocks.map((label, index) => (
      <ColorButton
        key={index}
        {...{
          index,
          label,
          colorBlockHovered,
          onSelectColorBlock,
          onHoverColorBlock
        }}
        currentColor={colors[index] || styleColors[index]}
        selected={colorBlock === index}
      />
    ))
    return (
      <Container>
        <Top>
          {isFirstPage && (
            <TextColors>
              <FormattedMessage {...messages.selectColor} />
            </TextColors>
          )}
          <Row {...{ isFirstPage }} onClick={this.handleTooglePage}>
            <Text>
              <FormattedMessage
                {...messages[isFirstPage ? 'myPalettes' : 'myPalette']}
              />
            </Text>
            <ArrowIcon src={isFirstPage ? nextIcon : backIcon} />
          </Row>
        </Top>
        <SwipeableViews index={isFirstPage ? 0 : 1}>
          <div>
            <ColorButtons>{colorButtons}</ColorButtons>
            <Divider />
            <ColorList {...{ onSelectColor }} />
          </div>
          <MyPalette
            {...{
              onSelectPalette,
              onChangePaletteName,
              paletteName,
              palettes,
              onSetPalettes,
              colors
            }}
          />
        </SwipeableViews>
      </Container>
    )
  }
}

export default ColorTab
