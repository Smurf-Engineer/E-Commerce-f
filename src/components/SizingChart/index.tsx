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

interface Measure {
  in: string[]
  cm: string[]
}

interface Table {
  title: string
  headers: string[]
  size: string[]
  waist?: Measure
  chest?: Measure
  inseam?: Measure
  hips?: Measure
  height?: Measure
  bicep?: Measure
  length?: Measure
  thigh?: Measure
  calf?: Measure
  mens?: Measure
  womens?: Measure
  circumference?: Measure
}

interface Chart {
  title: string
  tables: Table[]
}

interface Props {
  boxHeaders: string[]
  chart: Chart
  units: string
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
    return sizes.map((s, row) => (
      <Row key={row}>
        {headers && headers.map((h, i) => this.getCell(table, h, row, i))}
      </Row>
    ))
  }

  getCell = (
    table: Table,
    header: string,
    row: number,
    index: number
  ): JSX.Element => {
    const { units } = this.props

    const {
      size,
      waist,
      chest,
      inseam,
      hips,
      height,
      bicep,
      length,
      thigh,
      calf,
      mens,
      womens,
      circumference
    } = table

    switch (header) {
      case 'size':
        return (
          <Cell key={index}>
            {size && <FormattedMessage {...messages[size[row]]} />}
          </Cell>
        )
      case 'waist':
        return <Cell key={index}>{waist && waist[units][row]}</Cell>
      case 'chest':
        return <Cell key={index}>{chest && chest[units][row]}</Cell>
      case 'inseam':
        return <Cell key={index}>{inseam && inseam[units][row]}</Cell>
      case 'hips':
        return <Cell key={index}>{hips && hips[units][row]}</Cell>
      case 'height':
        return <Cell key={index}>{height && height[units][row]}</Cell>
      case 'bicep':
        return <Cell key={index}>{bicep && bicep[units][row]}</Cell>
      case 'length':
        return <Cell key={index}>{length && length[units][row]}</Cell>
      case 'thigh':
        return <Cell key={index}>{thigh && thigh[units][row]}</Cell>
      case 'calf':
        return <Cell key={index}>{calf && calf[units][row]}</Cell>
      case 'mens':
        return <Cell key={index}>{mens && mens[units][row]}</Cell>
      case 'womens':
        return <Cell key={index}>{womens && womens[units][row]}</Cell>
      case 'circumference':
        return (
          <Cell key={index}>{circumference && circumference[units][row]}</Cell>
        )
      default:
        return <div />
    }
  }
}

export default SizingChart
