/**
 * JobOpenings Component - Created by jorge on 31/07/18.
 */
import * as React from 'react'
import messages from '../../screens/WorkAtJakroo/messages'
import { Container, Text } from './styledComponents'
import DivInfo from '../../components/ProductInfo'

interface JobOpening {
  header: string
  content: string
}

interface Props {
  jobOpenings: JobOpening[]
  formatMessage: (messageDescriptor: any) => string
}

interface StateProps {
  currentIndex: number
}

class JobOpenings extends React.Component<Props, {}> {
  state: StateProps = {
    currentIndex: -1
  }

  render() {
    const { jobOpenings, formatMessage } = this.props
    const { currentIndex } = this.state

    const jobOpeningsList = jobOpenings.map(({ header, content }, key) => (
      <DivInfo
        {...{ key }}
        titleWidth={'85%'}
        title={formatMessage(messages[header])}
        titleColor={'#5F6062'}
        showContent={currentIndex === key}
        toggleView={this.handleToggleRow(key)}
      >
        <Text
          dangerouslySetInnerHTML={{
            __html: formatMessage(messages[content])
          }}
        />
      </DivInfo>
    ))

    return <Container>{jobOpeningsList}</Container>
  }

  handleToggleRow = (rowId: number) => () => {
    const { currentIndex } = this.state
    this.setState({ currentIndex: rowId !== currentIndex ? rowId : -1 })
  }
}

export default JobOpenings
