/**
 * EditInspiration Component - Created by eduardoquintero on 30/12/19.
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
import { NONE } from '../reducer'
import ColorButton from '../ColorButton'
import ColorList from '../ColorList'
import {
  DesignObject,
  ModelDesign,
  Message,
  ColorsDataResult
} from '../../../types/common'

interface Props {
  colorIdea: DesignObject | ModelDesign | null
  render: boolean
  colors: string[]
  colorBlock: number
  colorBlockHovered: number
  colorsList: ColorsDataResult
  onSelectColor: (color: string) => void
  onEditColorIdea: (item: number) => void
  onHoverColorBlock: (index: number) => void
  onSelectColorBlock: (index: number) => void
  formatMessage: (messageDescriptor: Message) => string
  onUpdateColorIdeaName: (
    name: string,
    updateColors: boolean,
    item?: number
  ) => void
}

interface State {
  name: string | null
  updateName: boolean
  updateColors: boolean
}

class EditInspiration extends React.PureComponent<Props, State> {
  state = {
    name: null,
    updateName: false,
    updateColors: false
  }
  render() {
    const { name: temporalName, updateName, updateColors } = this.state
    const {
      colorIdea,
      render,
      colors,
      colorBlockHovered,
      onHoverColorBlock,
      onSelectColorBlock,
      colorBlock,
      colorsList,
      formatMessage
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
            <Button
              type="primary"
              onClick={this.handleOnClickDone}
              disabled={!updateName && !updateColors}
            >
              <FormattedMessage {...messages.doneButton} />
            </Button>
          </Buttons>
        </Top>
        <InputContainer>
          <Input
            placeholder="Name"
            value={temporalName || name}
            onChange={this.handleOnUpdateName}
          />
        </InputContainer>
        <ColorButtons>{colorButtons}</ColorButtons>
        <Divider />
        <ColorList
          onSelectColor={this.handleOnSelectColor}
          stitching={false}
          {...{ colorsList, formatMessage }}
        />
      </Container>
    )
  }

  handleOnSelectColor = (color: string) => {
    const { updateColors } = this.state
    const { onSelectColor } = this.props
    if (!updateColors) {
      this.setState({ updateColors: true }, () => {
        onSelectColor(color)
      })
    } else {
      onSelectColor(color)
    }
  }

  handleOnUpdateName = (evt: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value }
    } = evt
    this.setState({ name: value, updateName: true })
  }

  handleOnClickCancel = () => {
    const { onEditColorIdea } = this.props
    this.setState({ name: '', updateName: false })
    onEditColorIdea(NONE)
  }

  handleOnClickDone = () => {
    const { onUpdateColorIdeaName, colorIdea } = this.props
    this.setState(({ name: temporalName, updateColors }) => {
      onUpdateColorIdeaName(temporalName || colorIdea!.name, updateColors)
      return {
        name: '',
        updateName: false
      }
    })
  }
}

export default EditInspiration
