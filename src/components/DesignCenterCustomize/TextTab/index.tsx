/**
 * TextTab Component - Created by david on 17/04/18.
 */
import * as React from 'react'
import { FormattedMessage } from 'react-intl'
import SwipeableViews from 'react-swipeable-views'
import messages from './messages'
import isEmpty from 'lodash/isEmpty'
import OptionText from '../../OptionText'
import Radio from 'antd/lib/radio'
import Icon from 'antd/lib/icon'
import InputNumber from 'antd/lib/input-number'
import backIcon from '../../../assets/leftarrow.svg'
import TextEditor from '../TextEditor'
import { CanvasElements } from '../../../screens/DesignCenter/constants'
import {
  TextFormat,
  CanvasElement,
  SimpleFont,
  PositionSize
} from '../../../types/common'
import {
  Container,
  Header,
  Title,
  Input,
  InputWrapper,
  Button,
  Row,
  ArrowIcon,
  ButtonWrapper,
  LockContainer,
  AddTextButton,
  LayersText,
  Layers,
  LayerBlock,
  TitleLayer,
  DeleteLayer,
  EditLayer,
  EmptyElements
} from './styledComponents'
import { PositionResize } from '../PositionResize'

const SELECT_FONT = 0
const SELECT_FILL = 1
const SELECT_OUTLINE = 2
const ADD_EFFECT = 3
const SELECT_ALIGNMENT = 4
const CHANGE_SEPARATION = 5

interface Props {
  text: string
  productName: string
  selectedElement: string
  textFormat: TextFormat
  disableTooltip: boolean
  fonts: SimpleFont[]
  colorsList: any
  activeEl: PositionSize
  onDeleteLayer: (id: string) => void
  onSelectEl: (id: string, typeEl?: string) => void
  onPositionChange: (data: PositionSize) => void
  onUpdateText: (text: string) => void
  onApplyText: (text: string, style: TextFormat) => void
  formatMessage: (messageDescriptor: any) => string
  onSelectTextFormat: (
    key: string,
    value: string | number,
    fontStyle: boolean
  ) => void
  onLockElement: (id: string, type: string) => void
  elements: {
    [id: string]: CanvasElement
  }
}

interface State {
  option: number
  page: number
}

export class TextTab extends React.PureComponent<Props, State> {
  state = {
    option: 0,
    page: 0
  }

  render() {
    const { page, option } = this.state
    const {
      text,
      formatMessage,
      productName,
      textFormat,
      selectedElement,
      activeEl,
      onPositionChange,
      elements,
      fonts,
      colorsList
    } = this.props
    const headerTitle = this.getHeaderTitle(option, page)

    const RadioButton = Radio.Button
    const RadioGroup = Radio.Group
    const element = elements[selectedElement]
    const arrayElements = Object.keys(elements || {})
    return (
      <Container>
        {(!!page || selectedElement) && (
          <Header>
            <Row onClick={this.changePage(page === 2 ? 1 : 0, 0)}>
              <ArrowIcon src={backIcon} />
              <Title>
                <FormattedMessage {...messages[headerTitle]} />
              </Title>
            </Row>
            {selectedElement && !isEmpty(element) && !!textFormat && (
              <LockContainer onClick={this.handleOnLockElement}>
                <Icon type={element.lock ? 'lock' : 'unlock'} />
              </LockContainer>
            )}
          </Header>
        )}
        <SwipeableViews
          disabled={true}
          index={selectedElement && !page ? 1 : page}
        >
          <div>
            <AddTextButton onClick={this.changePage(1, 0)}>
              {formatMessage(messages.addTextHeader)}
            </AddTextButton>
            <LayersText>{formatMessage(messages.textLayers)}</LayersText>
            <Layers>
              {arrayElements.length ? (
                arrayElements.map((id, index) => (
                  <LayerBlock key={index}>
                    <TitleLayer {...elements[id].textFormat}>
                      {elements[id].text}
                    </TitleLayer>
                    <DeleteLayer {...{ id }} onClick={this.onDeleteLayer}>
                      {formatMessage(messages.delete)}
                    </DeleteLayer>
                    <EditLayer {...{ id }} onClick={this.onSelectLayer}>
                      {formatMessage(messages.edit)}
                    </EditLayer>
                  </LayerBlock>
                ))
              ) : (
                <EmptyElements>{formatMessage(messages.empty)}</EmptyElements>
              )}
            </Layers>
          </div>
          <div>
            <InputWrapper disabled={!text}>
              <Input
                autosize={true}
                value={text}
                onChange={this.handleOnUpdateText}
                placeholder={formatMessage(messages.enterTextPlaceholder)}
              />
              <ButtonWrapper>
                <Button disabled={!text} onClick={this.handleOnApplyText}>
                  {formatMessage(messages.applyButton)}
                </Button>
              </ButtonWrapper>
            </InputWrapper>
            <OptionText
              onClick={this.changePage(2, 0)}
              title={formatMessage(messages.font)}
              option={!!textFormat && textFormat.fontFamily}
            />
            <OptionText
              onClick={this.changePage(2, 1)}
              title={formatMessage(messages.fill)}
              color={!!textFormat && textFormat.fill}
            />
            <OptionText
              onClick={this.changePage(2, 2)}
              title={formatMessage(messages.outline)}
              color={!!textFormat && textFormat.stroke}
              selected={!!textFormat.strokeWidth}
            />
            <OptionText
              title={formatMessage(messages.alignment)}
              content={
                <RadioGroup
                  onChange={this.handleOnSelectAlignment}
                  value={!!textFormat && textFormat.textAlign}
                  defaultValue={'left'}
                >
                  <RadioButton value="left">
                    <Icon type="align-left" />
                  </RadioButton>
                  <RadioButton value="center">
                    <Icon type="align-center" />
                  </RadioButton>
                  <RadioButton value="right">
                    <Icon type="align-right" />
                  </RadioButton>
                </RadioGroup>
              }
            />
            <OptionText
              title={formatMessage(messages.fontSize)}
              content={
                <InputNumber
                  value={!!textFormat && textFormat.fontSize}
                  min={1}
                  max={200}
                  step={1}
                  defaultValue={1}
                  formatter={value => `${value} px`}
                  parser={value => value.replace(' px', '')}
                  onChange={this.handleOnChangeFontSize}
                />
              }
            />
            <OptionText
              title={formatMessage(messages.letterSpacing)}
              content={
                <InputNumber
                  value={
                    !!textFormat &&
                    textFormat.charSpacing &&
                    textFormat.charSpacing / 10
                  }
                  parser={value => value && value.replace('-', '-0')}
                  min={-20}
                  max={100}
                  step={1}
                  onChange={this.handleOnSelectSeparation}
                />
              }
            />
            <OptionText
              title={formatMessage(messages.leadingSpacing)}
              content={
                <InputNumber
                  value={!!textFormat && textFormat.lineHeight}
                  min={0}
                  max={50}
                  step={0.1}
                  onChange={this.handleOnChangeLineSeparation}
                />
              }
            />
            {selectedElement && (
              <PositionResize
                {...{ activeEl }}
                handleChange={onPositionChange}
              />
            )}
          </div>
          <TextEditor
            {...{ option, formatMessage, colorsList, fonts }}
            text={text || productName}
            strokeWidth={textFormat && textFormat.strokeWidth}
            onSelectFont={this.handleOnSelectFont}
            onSelectFill={this.handleOnSelectFill}
            onSelectStrokeWidth={this.handleOnSelectStrokeWidth}
            onSelectStrokeColor={this.handleOnSelectStrokeColor}
          />
        </SwipeableViews>
      </Container>
    )
  }

  getHeaderTitle = (option: number, page: number): string => {
    if (page !== 2) {
      return page ? 'backToLayers' : 'title'
    }

    switch (option) {
      case SELECT_FONT:
        return 'selectFont'
      case SELECT_FILL:
        return 'selectFill'
      case SELECT_OUTLINE:
        return 'selectOutline'
      case ADD_EFFECT:
        return 'addEffect'
      case SELECT_ALIGNMENT:
        return 'selectAlignment'
      case CHANGE_SEPARATION:
        return 'changeSeparation'
      default:
        return 'title'
    }
  }

  onSelectLayer = (event: React.MouseEvent<EventTarget>) => {
    const {
      currentTarget: { id }
    } = event
    const { onSelectEl } = this.props
    onSelectEl(id, 'text')
  }

  onDeleteLayer = (event: React.MouseEvent<EventTarget>) => {
    const {
      currentTarget: { id }
    } = event
    const { onDeleteLayer } = this.props
    onDeleteLayer(id)
  }

  handleOnUpdateText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value: text } = e.target
    const { onUpdateText } = this.props
    onUpdateText(text)
  }

  handleOnApplyText = () => {
    const { onApplyText, textFormat, text } = this.props
    if (!text) {
      return
    }
    onApplyText(text, textFormat)
  }

  handleOnSelectFont = (fontFamily: string) => {
    const {
      onSelectTextFormat,
      textFormat,
      onApplyText,
      text,
      selectedElement
    } = this.props
    if (selectedElement) {
      const newTextFormat = Object.assign({}, textFormat)
      newTextFormat.fontFamily = fontFamily
      onApplyText(text, newTextFormat)
    } else {
      this.setState({ page: 1 })
    }
    onSelectTextFormat('fontFamily', fontFamily, true)
  }

  handleOnSelectFill = (fill: string) => {
    const {
      onSelectTextFormat,
      textFormat,
      onApplyText,
      text,
      selectedElement
    } = this.props
    if (selectedElement) {
      const updatedTextFormat = Object.assign({}, textFormat)
      updatedTextFormat.fill = fill
      onApplyText(text, updatedTextFormat)
    } else {
      this.setState({ page: 1 })
    }
    onSelectTextFormat('fill', fill, false)
  }

  handleOnSelectStrokeWidth = (strokeWidth: number) => {
    const {
      onSelectTextFormat,
      textFormat,
      onApplyText,
      text,
      selectedElement
    } = this.props
    if (selectedElement) {
      const updatedTextFormat = Object.assign({}, textFormat)
      updatedTextFormat.strokeWidth = strokeWidth
      onApplyText(text, updatedTextFormat)
    }
    onSelectTextFormat('strokeWidth', strokeWidth, false)
  }

  handleOnSelectStrokeColor = (stroke: string) => {
    const {
      onSelectTextFormat,
      textFormat,
      onApplyText,
      text,
      selectedElement
    } = this.props
    if (selectedElement) {
      const updatedTextFormat = Object.assign({}, textFormat)
      updatedTextFormat.stroke = stroke
      onApplyText(text, updatedTextFormat)
    } else {
      this.setState({ page: 1 })
    }
    onSelectTextFormat('stroke', stroke, false)
  }

  handleOnSelectAlignment = (event: any) => {
    const {
      target: { value: alignment }
    } = event
    const {
      onSelectTextFormat,
      textFormat,
      onApplyText,
      text,
      selectedElement
    } = this.props
    if (selectedElement) {
      const updatedTextFormat = Object.assign({}, textFormat)
      updatedTextFormat.textAlign = alignment
      onApplyText(text, updatedTextFormat)
    } else {
      this.setState({ page: 1 })
    }
    onSelectTextFormat('textAlign', alignment, false)
  }

  handleOnSelectSeparation = (spacing: number | undefined) => {
    if (spacing) {
      const {
        onSelectTextFormat,
        textFormat,
        onApplyText,
        text,
        selectedElement
      } = this.props
      if (selectedElement) {
        const updatedTextFormat = Object.assign({}, textFormat)
        updatedTextFormat.charSpacing = spacing * 10
        onApplyText(text, updatedTextFormat)
      } else {
        this.setState({ page: 1 })
      }
      onSelectTextFormat('charSpacing', spacing * 10, false)
    }
  }

  handleOnChangeFontSize = (size: number | undefined) => {
    if (size) {
      const {
        onSelectTextFormat,
        textFormat,
        onApplyText,
        text,
        selectedElement
      } = this.props
      if (selectedElement) {
        const updatedTextFormat = Object.assign({}, textFormat)
        updatedTextFormat.fontSize = size
        onApplyText(text, updatedTextFormat)
      } else {
        this.setState({ page: 1 })
      }
      onSelectTextFormat('fontSize', size, false)
    }
  }

  handleOnChangeLineSeparation = (spacing: number | undefined) => {
    if (spacing) {
      const {
        onSelectTextFormat,
        textFormat,
        onApplyText,
        text,
        selectedElement
      } = this.props
      if (selectedElement) {
        const updatedTextFormat = Object.assign({}, textFormat)
        updatedTextFormat.lineHeight = spacing
        onApplyText(text, updatedTextFormat)
      } else {
        this.setState({ page: 1 })
      }
      onSelectTextFormat('lineHeight', spacing, false)
    }
  }

  handleOnLockElement = () => {
    const { selectedElement, onLockElement } = this.props
    onLockElement(selectedElement, CanvasElements.Text)
    this.forceUpdate()
  }

  changePage = (page: number, option: number) => () => {
    const { selectedElement, onSelectEl } = this.props
    if (!page && selectedElement) {
      onSelectEl('', 'text')
    }
    this.setState({ page, option })
  }
}

export default TextTab
