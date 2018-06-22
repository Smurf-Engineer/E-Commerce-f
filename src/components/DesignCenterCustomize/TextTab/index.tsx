/**
 * TextTab Component - Created by david on 17/04/18.
 */
import * as React from 'react'
import { FormattedMessage } from 'react-intl'
import SwipeableViews from 'react-swipeable-views'
import messages from './messages'
import OptionText from '../../OptionText'
import backIcon from '../../../assets/leftarrow.svg'
import TextEditor from '../TextEditor'
import { TextFormat, CanvasElement } from '../../../types/common'
import {
  Container,
  Header,
  Title,
  Input,
  InputWrapper,
  Button,
  Row,
  ArrowIcon
} from './styledComponents'

const SELECT_FONT = 0
const SELECT_FILL = 1
const SELECT_OUTLINE = 2
const ADD_EFFECT = 3

interface Props {
  text: string
  productName: string
  selectedElement: string
  textFormat: TextFormat
  onUpdateText: (text: string) => void
  onApplyText: (text: string, style: TextFormat) => void
  formatMessage: (messageDescriptor: any) => string
  onSelectTextFormat: (key: string, value: string | number) => void
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

      textFormat
    } = this.props

    const headerTitle = this.getHeaderTitle(option, page)

    return (
      <Container>
        <Header>
          <Row onClick={this.changePage(0, 0)}>
            {!!page && <ArrowIcon src={backIcon} />}
            <Title>
              <FormattedMessage {...messages[headerTitle]} />
            </Title>
          </Row>
        </Header>
        <SwipeableViews index={page}>
          <div>
            <InputWrapper>
              <Input
                value={text}
                onChange={this.handleOnUpdateText}
                placeholder="Enter Text"
                addonAfter={
                  <Button onClick={this.handleOnApplyText}>Apply</Button>
                }
              />
            </InputWrapper>
            <OptionText
              onClick={this.changePage(1, 0)}
              title={formatMessage(messages.font)}
              option={textFormat.fontFamily}
            />
            <OptionText
              onClick={this.changePage(1, 1)}
              title={formatMessage(messages.fill)}
              color={textFormat.fill}
            />
            <OptionText
              onClick={this.changePage(1, 2)}
              title={formatMessage(messages.outline)}
              color={textFormat.stroke}
            />
          </div>
          <TextEditor
            {...{ option, formatMessage }}
            text={text || productName}
            strokeWidth={textFormat.strokeWidth}
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
      default:
        return 'title'
    }
  }

  handleOnUpdateText = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value: text } = e.target
    const { onUpdateText } = this.props
    onUpdateText(text)
  }

  handleOnApplyText = () => {
    const { onApplyText, textFormat, text } = this.props
    onApplyText(text, textFormat)
  }

  handleOnSelectFont = (font: string) => {
    const { onSelectTextFormat } = this.props
    onSelectTextFormat('fontFamily', font)
    this.setState({ page: 0 })
  }

  handleOnSelectFill = (fillColor: string) => {
    const { onSelectTextFormat } = this.props
    onSelectTextFormat('fill', fillColor)
    this.setState({ page: 0 })
  }

  handleOnSelectStrokeWidth = (strokeWidth: number) => {
    const { onSelectTextFormat } = this.props
    onSelectTextFormat('strokeWidth', strokeWidth)
  }

  handleOnSelectStrokeColor = (strokeColor: string) => {
    const { onSelectTextFormat } = this.props
    onSelectTextFormat('stroke', strokeColor)
    this.setState({ page: 0 })
  }

  changePage = (page: number, option: number) => () =>
    this.setState({ page, option })
}

export default TextTab
