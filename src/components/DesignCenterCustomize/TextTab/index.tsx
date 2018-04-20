/**
 * TextTab Component - Created by david on 17/04/18.
 */
import * as React from 'react'
import { FormattedMessage } from 'react-intl'
import messages from './messages'
import OptionText from '../../OptionText'
import {
  Container,
  Header,
  Title,
  Input,
  InputWrapper,
  Button
} from './styledComponents'

interface Props {
  text: string
  onUpdateText: (text: string) => void
}

class TextTab extends React.PureComponent<Props, {}> {
  handleOnUpdateText = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { onUpdateText } = this.props
    const { value } = e.target
    onUpdateText(value)
  }

  render() {
    return (
      <Container>
        <Header>
          <Title>
            <FormattedMessage {...messages.title} />
          </Title>
        </Header>
        <InputWrapper>
          <Input
            // value={}
            onChange={this.handleOnUpdateText}
            placeholder="Enter Text"
            addonAfter={<Button onClick={() => {}}>Apply</Button>}
          />
        </InputWrapper>
        <OptionText title="Font" option="Heveltica" />
        <OptionText title="Fill" option="Black" color="#fff" />
        <OptionText title="Outline" option="Black" color="#f12" />
        <OptionText title="Effect" option="Stretched" />
      </Container>
    )
  }
}

export default TextTab
