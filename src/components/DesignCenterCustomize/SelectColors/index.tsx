/**
 * SelectColors Component - Created by miguelcanobbio on 01/08/18.
 */
import * as React from 'react'
import messages from './messages'
import {
  Container,
  BaseColors,
  BaseTitle,
  ColorLabel,
  Arrow,
  Divider,
  ColorsIcon,
  StyledButton,
  ButtonContainer
} from './styledComponents'
import AccessoryColor from '../AccessoryColor'
import colorsIcon from '../.../../../../assets/color_squares.svg'
import { StitchingColor, AccesoryColor, UserInfo, QueryProps, Colors, Color } from '../../../types/common'
import { AccessoryColors } from '../../../screens/DesignCenter/constants'
import ColorButtons from '../ColorButtons'
import { FormattedMessage } from 'react-intl'
import { ColorChartForm } from '../../ColorChartForm'
import { ColorChart } from '../../ColorChart'
import Message from 'antd/lib/message'
import get from 'lodash/get'
import find from 'lodash/find'

interface ColorsData extends QueryProps {
  colorsResult: Colors
}

interface Props {
  colors: string[]
  colorsList: ColorsData
  names: string[]
  stitchingColor?: StitchingColor
  bindingColor?: AccesoryColor
  zipperColor?: AccesoryColor
  bibColor?: AccesoryColor
  hasStitching: boolean
  hasZipper: boolean
  hasBinding: boolean
  hasBibBrace: boolean
  colorBlockHovered: number
  colorChartSending: boolean
  colorChartModalOpen: boolean
  colorChartModalFormOpen: boolean
  onSelectColorBlock: (index: number) => void
  onHoverColorBlock: (index: number) => void
  goToBaseColors: () => void
  goToStitching: () => void
  showContent: boolean
  formatMessage: (messageDescriptor: any) => string
  onAccessoryColorSelected?: (color: AccesoryColor, id: string) => void
  onRequestColorChart: (userInfo: UserInfo) => void
  onCloseColorChart: () => void
  onCloseColorChartForm: () => void
  onOpenFormChart: () => void
  onOpenColorChart: () => void
}

class SelectColors extends React.PureComponent<Props, {}> {
  render() {
    const {
      goToBaseColors,
      goToStitching,
      formatMessage,
      colors,
      colorsList,
      showContent,
      stitchingColor,
      bindingColor,
      zipperColor,
      bibColor,
      onAccessoryColorSelected = () => { },
      hasStitching,
      hasZipper,
      hasBinding,
      hasBibBrace,
      colorBlockHovered,
      onSelectColorBlock,
      onHoverColorBlock,
      names,
      onRequestColorChart,
      colorChartSending,
      colorChartModalOpen,
      colorChartModalFormOpen,
      onCloseColorChart,
      onCloseColorChartForm,
      onOpenFormChart,
      onOpenColorChart
    } = this.props
    if (!showContent) {
      return null
    }
    let arrayColors: Color[] = []
    let stitchingLabel = ''
    if (colorsList && !colorsList.loading) {
      try {
        arrayColors = JSON.parse(
          get(
            colorsList,
            'colorsResult.stitchingColors',
            []
          )
        )
        console.log('arrayColors:', arrayColors)
        const color = find(arrayColors, { value: stitchingColor ? stitchingColor.value : '' })
        console.log('color:', color)
        stitchingLabel = color ? color.label : ''
      } catch (e) {
        Message.error(e)
      }
    }

    return (
      <Container>
        <BaseColors onClick={goToBaseColors}>
          <BaseTitle>
            <ColorLabel>{formatMessage(messages.baseColors)}</ColorLabel>
            <Arrow type="right" />
          </BaseTitle>
          <ColorButtons
            {...{
              names,
              colors,
              onSelectColorBlock,
              colorBlockHovered,
              onHoverColorBlock,
              formatMessage
            }}
          />
        </BaseColors>
        <Divider />
        {hasStitching && (
          <AccessoryColor
            name={formatMessage(messages.stitching)}
            {...{ goToStitching, stitchingColor, stitchingLabel }}
          />
        )}
        {hasBinding && (
          <AccessoryColor
            id={AccessoryColors.Binding}
            colorSelected={bindingColor}
            name={formatMessage(messages.binding)}
            {...{ onAccessoryColorSelected }}
          />
        )}
        {hasZipper && (
          <AccessoryColor
            id={AccessoryColors.Zipper}
            colorSelected={zipperColor}
            name={formatMessage(messages.zipper)}
            {...{ onAccessoryColorSelected }}
          />
        )}
        {hasBibBrace && (
          <AccessoryColor
            id={AccessoryColors.Bib}
            colorSelected={bibColor}
            name={formatMessage(messages.bibColor)}
            {...{ onAccessoryColorSelected }}
          />
        )}
        <ButtonContainer>
          <StyledButton onClick={onOpenColorChart}>
            <ColorsIcon src={colorsIcon} />
            <FormattedMessage {...messages.orderChart} />
          </StyledButton>
        </ButtonContainer>
        <ColorChart
          {...{ formatMessage }}
          open={colorChartModalOpen}
          handleClose={onCloseColorChart}
          handleOpenForm={onOpenFormChart}
        />
        <ColorChartForm
          open={colorChartModalFormOpen}
          handleClose={onCloseColorChartForm}
          formatMessage={formatMessage}
          loading={colorChartSending}
          {...{ onRequestColorChart }}
        />
      </Container>
    )
  }
  handleClose = () => { }
}

export default SelectColors
