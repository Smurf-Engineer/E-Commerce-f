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
import { TextFormat, CanvasElement } from '../../../types/common'
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
  LockContainer
} from './styledComponents'

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
  onUpdateText: (text: string) => void
  onApplyText: (text: string, style: TextFormat) => void
  formatMessage: (messageDescriptor: any) => string
  onSelectTextFormat: (key: string, value: string | number) => void
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
      elements
    } = this.props
    const headerTitle = this.getHeaderTitle(option, page)

    const RadioButton = Radio.Button
    const RadioGroup = Radio.Group
    const element = elements[selectedElement]

    return (
      <Container>
        <Header>
          <Row onClick={this.changePage(0, 0)}>
            {!!page && <ArrowIcon src={backIcon} />}
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
        <SwipeableViews disabled={true} index={page}>
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
              onClick={this.changePage(1, 0)}
              title={formatMessage(messages.font)}
              option={!!textFormat && textFormat.fontFamily}
            />
            <OptionText
              onClick={this.changePage(1, 1)}
              title={formatMessage(messages.fill)}
              color={!!textFormat && textFormat.fill}
            />
            <OptionText
              onClick={this.changePage(1, 2)}
              title={formatMessage(messages.outline)}
              color={!!textFormat && textFormat.stroke}
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
          </div>
          <TextEditor
            {...{ option, formatMessage }}
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
    if (page === 0) {
      return 'title'
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
      this.setState({ page: 0 })
    }
    onSelectTextFormat('fontFamily', fontFamily)
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
      this.setState({ page: 0 })
    }
    onSelectTextFormat('fill', fill)
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
    onSelectTextFormat('strokeWidth', strokeWidth)
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
      this.setState({ page: 0 })
    }
    onSelectTextFormat('stroke', stroke)
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
      this.setState({ page: 0 })
    }
    onSelectTextFormat('textAlign', alignment)
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
        this.setState({ page: 0 })
      }
      onSelectTextFormat('charSpacing', spacing * 10)
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
        this.setState({ page: 0 })
      }
      onSelectTextFormat('fontSize', size)
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
        this.setState({ page: 0 })
      }
      onSelectTextFormat('lineHeight', spacing)
    }
  }

  handleOnLockElement = () => {
    const { selectedElement, onLockElement } = this.props
    onLockElement(selectedElement, CanvasElements.Text)
    this.forceUpdate()
  }

  changePage = (page: number, option: number) => () =>
    this.setState({ page, option })
}

export default TextTab
