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

// TODO: Option effect disabled
const options = ['font', 'fill', 'outline' /* , 'effect' */]

interface Props {
  text: string
  productName: string
  onUpdateText: (text: string) => void
  onApplyText: (text: string, style: any) => void // TODO: Type style
  formatMessage: (messageDescriptor: any) => string
}

interface Option {
  name: string
  value: string | null
}

interface State {
  text: string
  font: string
  fillColor: string
  strokeWidth: number
  strokeColor: string
  option: number
  page: number
}

export class TextTab extends React.PureComponent<Props, State> {
  state = {
    text: '',
    option: 0,
    page: 0,
    font: 'Avenir',
    fillColor: '#000',
    strokeWidth: 0,
    strokeColor: '#000'
  }

  render() {
    const {
      text,
      page,
      option,
      font,
      fillColor,
      strokeWidth,
      strokeColor
    } = this.state
    const { formatMessage, productName } = this.props

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
              option={font}
            />
            <OptionText
              onClick={this.changePage(1, 1)}
              title={formatMessage(messages.fill)}
              color={fillColor}
            />
            <OptionText
              onClick={this.changePage(1, 2)}
              title={formatMessage(messages.outline)}
              color={strokeColor}
            />
          </div>
          <TextEditor
            {...{ option, formatMessage }}
            text={text || productName}
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
    this.setState({ text })
  }

  handleOnApplyText = () => {
    const { text, font, fillColor, strokeWidth, strokeColor } = this.state
    const { onApplyText } = this.props
    this.setState({ text: '' })

    const textStyle = {
      fontFamily: font,
      stroke: strokeColor,
      fill: fillColor,
      strokeWidth: strokeWidth
    }

    onApplyText(text, textStyle)
  }

  handleOnSelectFont = (font: string) => this.setState({ font })

  handleOnSelectFill = (fillColor: string) => this.setState({ fillColor })

  handleOnSelectStrokeWidth = (strokeWidth: number) =>
    this.setState({ strokeWidth })

  handleOnSelectStrokeColor = (strokeColor: string) =>
    this.setState({ strokeColor })

  changePage = (page: number, option: number) => () =>
    this.setState({ page, option })
}

export default TextTab
