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
  Cell,
  TableList,
  TableTitle
} from './styledComponents'

interface Table {
  title: string
  headers: string[]
  size: string[]
  waist?: string[]
  chest?: string[]
  inseam?: string[]
  hips?: string[]
  height?: string[]
  bicep?: string[]
  length?: string[]
  tight?: string[]
  calf?: string[]
  mens?: string[]
  womens?: string[]
  circumference?: string[]
}

interface Chart {
  title: string
  tables: Table[]
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
      chart: { title, tables }
    } = this.props

    const boxHeaderList = boxHeaders.map((boxHeader, index) => {
      const checked = title === boxHeader

      return (
        <BoxHeader key={index} {...{ checked }}>
          <FormattedMessage {...messages[boxHeader]} />
        </BoxHeader>
      )
    })

    const renderTableList =
      tables &&
      tables.map(({ title: t, headers, size }, index) => (
        <Table key={index}>
          <TableTitle>{t && <FormattedMessage {...messages[t]} />}</TableTitle>
          <HeaderRow>{this.getHeader(headers)}</HeaderRow>
          {this.getContent(tables[index], headers, size)}
        </Table>
      ))

    return (
      <Container>
        <BoxHeaderRow>{boxHeaderList}</BoxHeaderRow>
        <TableList multiple={tables.length > 1}>{renderTableList}</TableList>
      </Container>
    )
  }

  getHeader = (headers: string[] = []): JSX.Element[] => {
    return headers.map((item, index) => (
      <HeaderCell key={index}>
        <Title>
          <FormattedMessage {...messages[item]} />
        </Title>
      </HeaderCell>
    ))
  }

  getContent = (
    table: Table,
    headers: string[],
    sizes: string[]
  ): JSX.Element[] => {
    return sizes.map((s, index) => (
      <Row key={index}>
        {headers && headers.map(h => this.getCell(table, h, index))}
      </Row>
    ))
  }

  getCell = (table: Table, header: string, index: number): JSX.Element => {
    const {
      size,
      waist,
      chest,
      inseam,
      hips,
      height,
      bicep,
      length,
      tight,
      calf,
      mens,
      womens,
      circumference
    } = table

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
      case 'bicep':
        return <Cell>{bicep && bicep[index]}</Cell>
      case 'length':
        return <Cell>{length && length[index]}</Cell>
      case 'tight':
        return <Cell>{tight && tight[index]}</Cell>
      case 'calf':
        return <Cell>{calf && calf[index]}</Cell>
      case 'mens':
        return <Cell>{mens && mens[index]}</Cell>
      case 'womens':
        return <Cell>{womens && womens[index]}</Cell>
      case 'circumference':
        return <Cell>{circumference && circumference[index]}</Cell>
      default:
        return <div />
    }
  }
}

export default SizingChart
