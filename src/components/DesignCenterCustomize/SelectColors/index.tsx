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
  ButtonContainer, Description, ExampleImage, HelpImage, PredyedImages, Title
} from './styledComponents'
import AccessoryColor from '../AccessoryColor'
import colorsIcon from '../.../../../../assets/color_squares.svg'
import predyedFabric from '../.../../../../assets/predyed-fabric.jpg'
import printedFabric from '../.../../../../assets/printed-fabric.jpg'
import HelpModal from '../../Common/JakrooModal'
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
  selectedPredyed: string
  hasBranding: boolean
  hasBinding: boolean
  hasBibBrace: boolean
  colorBlockHovered: number
  colorChartSending: boolean
  colorChartModalOpen: boolean
  colorChartModalFormOpen: boolean
  predyedLabel?: string
  onSelectPredyed: (predyedColor: string) => void
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

interface State {
  openHelp: boolean
}

class SelectColors extends React.PureComponent<Props, State> {
  state = {
    openHelp: false
  }
  closeHelpModal = () => {
    this.setState({ openHelp: false })
  }
  openHelpModal = () => {
    this.setState({ openHelp: true })
  }
  render() {
    const {
      goToBaseColors,
      goToStitching,
      formatMessage,
      colors,
      colorsList,
      predyedLabel,
      showContent,
      stitchingColor,
      bindingColor,
      zipperColor,
      bibColor,
      onSelectPredyed = () => { },
      onAccessoryColorSelected = () => { },
      hasStitching,
      hasBranding,
      selectedPredyed,
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
    const { openHelp } = this.state
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
        const color = find(arrayColors, { value: stitchingColor ? stitchingColor.value : '' })
        stitchingLabel = get(color, 'label', '')
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
        {hasBranding && (
          <AccessoryColor
            id={AccessoryColors.Predyed}
            name={predyedLabel || formatMessage(messages.predyedColor)}
            colorSelected={selectedPredyed}
            isPredyed={true}
            openHelp={this.openHelpModal}
            onAccessoryColorSelected={onSelectPredyed}
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
        <HelpModal
          open={openHelp}
          withLogo={false}
          requestClose={this.closeHelpModal}
        >
          <Title dangerouslySetInnerHTML={{
            __html: formatMessage(messages.predyedTitle)
          }} />
          <PredyedImages>
            <HelpImage>
              <ExampleImage src={predyedFabric} />
              {formatMessage(messages.predyedFabric)}
            </HelpImage>
            <HelpImage>
              <ExampleImage src={printedFabric} />
              {formatMessage(messages.printedFabric)}
            </HelpImage>
          </PredyedImages>
          <Description
            dangerouslySetInnerHTML={{
              __html: formatMessage(messages.predyedDesc)
            }}
          />
        </HelpModal>
      </Container>
    )
  }
  handleClose = () => { }
}

export default SelectColors
