/**
 * FaqQuestions Component - Created by cazarez on 29/05/18.
 */
import * as React from 'react'
import messages from '../../screens/Faq/messages'
import { Container, Text } from './styledComponents'
import DivInfo from '../../components/ProductInfo'

interface QuestionType {
  id: string
  question: {}
  answer: {}
}

interface Props {
  questions: QuestionType[]
  formatMessage: (messageDescriptor: any) => string
}

interface StateProps {
  currentIndex: number
}

class FaqQuestions extends React.PureComponent<Props, StateProps> {
  state: StateProps = {
    currentIndex: -1
  }

  render() {
    const { formatMessage, questions } = this.props
    const { currentIndex } = this.state

    const questionsToRender = questions.map(({ id, question, answer }, key) => (
      <DivInfo
        {...{ key }}
        titleWidth={'85%'}
        title={formatMessage(messages[question as string])}
        titleColor={'#5F6062'}
        showContent={currentIndex === key}
        toggleView={this.handleToggleRow(key)}
      >
        <Text
          dangerouslySetInnerHTML={{
            __html: formatMessage(messages[answer as string])
          }}
        />
      </DivInfo>
    ))

    return <Container>{questionsToRender}</Container>
  }

  handleToggleRow = (rowId: number) => () => {
    const { currentIndex } = this.state
    this.setState({ currentIndex: rowId !== currentIndex ? rowId : -1 })
  }
}

export default FaqQuestions
