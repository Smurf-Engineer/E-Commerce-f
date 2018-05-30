/**
 * TextEditor Component - Created by david on 29/05/18.
 */
import * as React from 'react'
import { FormattedMessage } from 'react-intl'
import FontList from '../FontsList'
import FillColor from '../FillColor'
import OutlineColor from '../OutlineColor'
import messages from './messages'
import { Container, Text } from './styledComponents'

const FONT_LIST = 0
const FILL_COLOR = 1
const OUTLINE_COLOR = 2

interface Props {
  text: string
  option: number
}

class TextEditor extends React.PureComponent<Props, {}> {
  getEditorComponent = (component: number): React.ReactNode => {
    const { text } = this.props
    switch (component) {
      case FONT_LIST:
        return <FontList {...{ text }} />
      case FILL_COLOR:
        return <FillColor />
      case OUTLINE_COLOR:
        return <OutlineColor />
      default:
        return null
    }
  }

  render() {
    const { text, option } = this.props

    const optionComponent = this.getEditorComponent(option)

    return <Container>{optionComponent}</Container>
  }
}

export default TextEditor
