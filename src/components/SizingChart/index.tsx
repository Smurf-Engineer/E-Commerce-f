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
import { Chart, SizesTable } from '../../types/common'

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
      units,
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

    const renderHeader = (headers: string[]) =>
      headers.map((item, index) => (
        <HeaderCell key={index}>
          <Title>
            <FormattedMessage {...messages[item]} />
          </Title>
        </HeaderCell>
      ))

    const renderContent = (
      table: SizesTable,
      headers: string[],
      sizes: string[]
    ) =>
      sizes.map((s, row) => (
        <Row key={row}>
          {headers.map((header, index) => {
            if (!index) {
              return (
                <Cell key={index}>
                  <FormattedMessage {...messages[s]} />
                </Cell>
              )
            } else {
              const element = table[header]

              return element && <Cell key={index}>{element[units][row]}</Cell>
            }
          })}
        </Row>
      ))

    const renderTableList = tables.map(({ title: t, headers, size }, index) => (
      <Table key={index}>
        <TableTitle>{t && <FormattedMessage {...messages[t]} />}</TableTitle>
        <HeaderRow>{renderHeader(headers)}</HeaderRow>
        {renderContent(tables[index], headers, size)}
      </Table>
    ))

    return (
      <Container>
        <BoxHeaderRow>{boxHeaderList}</BoxHeaderRow>
        <TableList multiple={tables.length > 1}>{renderTableList}</TableList>
      </Container>
    )
  }
}

export default SizingChart
