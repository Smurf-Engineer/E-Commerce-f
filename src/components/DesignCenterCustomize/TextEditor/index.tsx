/**
 * TextEditor Component - Created by david on 29/05/18.
 */
import * as React from 'react'
import FontList from '../FontsList'
import FillColor from '../FillColor'
import OutlineColor from '../OutlineColor'
import { Container } from './styledComponents'

const FONT_LIST = 0
const FILL_COLOR = 1
const OUTLINE_COLOR = 2

interface Props {
  text: string
  option: number
  onSelectFont: (font: string) => void
  onSelectFill: (color: string) => void
  onSelectStrokeWidth: (width: number) => void
  onSelectStrokeColor: (color: string) => void
  formatMessage: (messageDescriptor: any) => string
}

class TextEditor extends React.PureComponent<Props, {}> {
  getEditorComponent = (component: number): React.ReactNode => {
    const {
      text,
      onSelectFont,
      formatMessage,
      onSelectFill,
      onSelectStrokeWidth,
      onSelectStrokeColor
    } = this.props
    switch (component) {
      case FONT_LIST:
        return <FontList {...{ text, onSelectFont }} />
      case FILL_COLOR:
        return <FillColor {...{ onSelectFill }} />
      case OUTLINE_COLOR:
        return (
          <OutlineColor
            {...{ formatMessage, onSelectStrokeWidth, onSelectStrokeColor }}
          />
        )
      default:
        return null
    }
  }

  render() {
    const { option } = this.props

    const optionComponent = this.getEditorComponent(option)

    return <Container>{optionComponent}</Container>
  }
}

export default TextEditor
