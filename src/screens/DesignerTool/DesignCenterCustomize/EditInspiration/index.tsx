/**
 * EditInspiration Component - Created by david on 13/11/18.
 */
import * as React from 'react'
import { FormattedMessage } from 'react-intl'
import messages from './messages'
import Input from 'antd/lib/input'
import Divider from 'antd/lib/divider'
import {
  Container,
  Top,
  Title,
  Button,
  Buttons,
  InputContainer,
  ColorButtons
} from './styledComponents'
import { NONE } from '../../reducer'
import ColorButton from '../ColorButton'
import ColorList from '../ColorList'
import { DesignObject, ModelDesign } from '../../../../types/common'

interface Props {
  colorIdea: DesignObject | ModelDesign | null
  render: boolean
  onEditColorIdea: (item: number) => void
}

class EditInspiration extends React.PureComponent<Props, {}> {
  render() {
    const { colorIdea, render } = this.props
    if (!colorIdea || !render) {
      return <div />
    }
    const { colors, name } = colorIdea
    const colorButtons = colors.map((_, index) => (
      <ColorButton
        key={index}
        {...{ index }}
        label={`Area ${index + 1}`}
        // colorBlockHovered={() => }
        onSelectColorBlock={() => {}}
        // onHoverColorBloc={() => {}}
        currentColor={colors[index]}
        selected={false}
      />
    ))

    return (
      <Container>
        <Top>
          <Title>
            <FormattedMessage {...messages.title} />
          </Title>
          <Buttons>
            <Button onClick={this.handleOnClickCancel}>
              <FormattedMessage {...messages.cancelButton} />
            </Button>
            <Button type="primary" onClick={this.handleOnClickDone}>
              <FormattedMessage {...messages.doneButton} />
            </Button>
          </Buttons>
        </Top>
        <InputContainer>
          <Input value={name} onChange={() => {}} />
        </InputContainer>
        <ColorButtons>{colorButtons}</ColorButtons>
        <Divider />
        <ColorList onSelectColor={() => {}} />
      </Container>
    )
  }

  handleOnClickCancel = () => {
    const { onEditColorIdea } = this.props
    onEditColorIdea(NONE)
  }

  handleOnClickDone = () => {
    // TODO: HANDLE TODO
  }
}

export default EditInspiration
