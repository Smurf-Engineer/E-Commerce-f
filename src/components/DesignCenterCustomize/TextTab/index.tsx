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

const options = ['font', 'fill', 'outline', 'effect']

interface Props {
  text: string
  onUpdateText: (text: string) => void
  onApplyText: (text: string) => void
  formatMessage: (messageDescriptor: any) => string
}

interface Option {
  name: string
  value: string | null
}

interface State {
  text: string
  option: number
  page: number
  options: Option[]
}

export class TextTab extends React.PureComponent<Props, State> {
  state = {
    text: '',
    option: 0,
    page: 0,
    options: [
      {
        name: 'Avenir',
        value: null
      },
      {
        name: 'Black',
        value: '#000'
      },
      {
        name: 'Red',
        value: '#f12'
      },
      {
        name: 'Stretched',
        value: null
      }
    ]
  }
  handleOnUpdateText = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value: text } = e.target
    this.setState({ text })
  }

  handleOnApplyText = () => {
    const { text } = this.state
    const { onApplyText } = this.props
    this.setState({ text: '' })
    onApplyText(text)
  }

  changePage = (page: number, option: number) => () =>
    this.setState({ page, option })

  render() {
    const { text, page, option } = this.state
    const { formatMessage } = this.props

    const optionsList = options.map((id, index) => {
      const { options: items } = this.state
      const item = items[index]
      return (
        <OptionText
          key={index}
          onClick={this.changePage(1, index)}
          title={formatMessage(messages[id])}
          option={item.name}
          color={item.value}
        />
      )
    })

    return (
      <Container>
        <Header>
          <Row onClick={this.changePage(0, 0)}>
            {!!page && <ArrowIcon src={backIcon} />}
            <Title>
              <FormattedMessage {...messages.title} />
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
            {optionsList}
          </div>
          <TextEditor {...{ text, option }} />
        </SwipeableViews>
      </Container>
    )
  }
}

export default TextTab
