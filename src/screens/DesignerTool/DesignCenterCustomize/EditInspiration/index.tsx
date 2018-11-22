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
  colors: string[]
  colorBlock: number
  colorBlockHovered: number
  onSelectColor: (color: string) => void
  onEditColorIdea: (item: number) => void
  onHoverColorBlock: (index: number) => void
  onSelectColorBlock: (index: number) => void
  onUpdateColorIdeaName: (name: string, item?: number) => void
}

interface State {
  name: string | null
}

class EditInspiration extends React.PureComponent<Props, State> {
  state = {
    name: null
  }
  render() {
    const { name: temporalName } = this.state
    const {
      colorIdea,
      render,
      colors,
      colorBlockHovered,
      onHoverColorBlock,
      onSelectColor,
      onSelectColorBlock,
      colorBlock
    } = this.props
    if (!colorIdea || !render) {
      return <div />
    }
    const { name } = colorIdea
    const colorButtons = colors.map((_, index) => (
      <ColorButton
        key={index}
        {...{ index, colorBlockHovered, onHoverColorBlock, onSelectColorBlock }}
        label={`Area ${index + 1}`}
        currentColor={colors[index]}
        selected={colorBlock === index}
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
          <Input
            value={temporalName || name}
            onChange={this.handleOnUpdateName}
          />
        </InputContainer>
        <ColorButtons>{colorButtons}</ColorButtons>
        <Divider />
        <ColorList onSelectColor={onSelectColor} />
      </Container>
    )
  }

  handleOnUpdateName = (evt: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value }
    } = evt
    this.setState({ name: value })
  }

  handleOnClickCancel = () => {
    const { onEditColorIdea } = this.props
    onEditColorIdea(NONE)
  }

  handleOnClickDone = () => {
    const { onUpdateColorIdeaName, colorIdea } = this.props
    this.setState(({ name: temporalName }) => {
      onUpdateColorIdeaName(temporalName || colorIdea!.name)
      return {
        name: ''
      }
    })
  }
}

export default EditInspiration
