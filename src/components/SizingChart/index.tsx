/**
 * SizingChart Component - Created by jorge on 01/08/18.
 */
import * as React from 'react'
import { FormattedMessage } from 'react-intl'
import messages from '../../screens/FitAndSizing/messages'
import {
  Container,
  BoxHeaderRow,
  BoxHeader,
  Table,
  HeaderRow,
  HeaderCell,
  Title,
  Row,
  Cell
} from './styledComponents'

interface Table {
  title: string
  headers: string[]
}

interface Chart {
  title: string
  headers?: string[]
  size?: string[]
  waist?: string[]
  chest?: string[]
  inseam?: string[]
  hips?: string[]
  height?: string[]
  tables?: Table[]
}

interface Props {
  boxHeaders: string[]
  chart: Chart
  formatMessage: (messageDescriptor: any) => string
}

class SizingChart extends React.Component<Props, {}> {
  render() {
    const {
      boxHeaders,
      chart: { title, headers, size }
    } = this.props

    const boxHeaderList = boxHeaders.map((boxHeader, index) => {
      const checked = title === boxHeader

      return (
        <BoxHeader key={index} {...{ checked }}>
          <FormattedMessage {...messages[boxHeader]} />
        </BoxHeader>
      )
    })

    const header = headers
      ? headers.map((item, index) => (
          <HeaderCell key={index}>
            <Title>
              <FormattedMessage {...messages[item]} />
            </Title>
          </HeaderCell>
        ))
      : null

    const renderTableContent = size
      ? size.map((s, index) => (
          <Row key={index}>
            {headers ? headers.map(h => this.getCell(h, index)) : null}
          </Row>
        ))
      : null

    return (
      <Container>
        <BoxHeaderRow>{boxHeaderList}</BoxHeaderRow>
        {header ? (
          <Table>
            <HeaderRow>{header}</HeaderRow>
            {renderTableContent}
          </Table>
        ) : null}
      </Container>
    )
  }

  getCell = (header: string, index: number): JSX.Element => {
    const {
      chart: { size, waist, chest, inseam, hips, height }
    } = this.props

    switch (header) {
      case 'size':
        return (
          <Cell>{size && <FormattedMessage {...messages[size[index]]} />}</Cell>
        )
      case 'waist':
        return <Cell>{waist && waist[index]}</Cell>
      case 'chest':
        return <Cell>{chest && chest[index]}</Cell>
      case 'inseam':
        return <Cell>{inseam && inseam[index]}</Cell>
      case 'hips':
        return <Cell>{hips && hips[index]}</Cell>
      case 'height':
        return <Cell>{height && height[index]}</Cell>
      default:
        return <div />
    }
  }
}

export default SizingChart
