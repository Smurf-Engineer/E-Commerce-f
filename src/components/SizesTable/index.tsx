/**
 * SizesTable Component - Created by jorge on 03/08/18.
 */
import * as React from 'react'
import { FormattedMessage } from 'react-intl'
import messages from '../../screens/FitAndSizing/messages'
import {
  Container,
  HeaderRow,
  HeaderCell,
  Title,
  Row,
  Cell,
  TableTitle
} from './styledComponents'
import { SizesTableType } from '../../types/common'

interface Props {
  units: string
  table: SizesTableType
}

class SizesTable extends React.Component<Props, {}> {
  render() {
    const { units, table } = this.props
    const { title, headers, size } = table

    const renderHeader = headers.map((header, key) => (
      <HeaderCell {...{ key }}>
        <Title>
          <FormattedMessage {...messages[header]} />
        </Title>
      </HeaderCell>
    ))

    const renderContent = size.map((s, row) => (
      <Row key={row}>
        {headers.map((header, key) => {
          if (!key) {
            return (
              <Cell {...{ key }}>
                <FormattedMessage {...messages[s]} />
              </Cell>
            )
          } else {
            const element = table[header]

            return element && <Cell {...{ key }}>{element[units][row]}</Cell>
          }
        })}
      </Row>
    ))

    return (
      <Container>
        <TableTitle>
          {title && <FormattedMessage {...messages[title]} />}
        </TableTitle>
        <HeaderRow>{renderHeader}</HeaderRow>
        {renderContent}
      </Container>
    )
  }
}

export default SizesTable
