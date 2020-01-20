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

const staticSizes = ['xxs', 'xs', 's', 'm', 'l', 'xl', 'xxl', 'xxxl']

class SizesTable extends React.Component<Props, {}> {
  render() {
    const { units, table } = this.props
    const { title, headers, size } = table

    const sizes = size || staticSizes

    const renderHeader = headers.map((header, key) => (
      <HeaderCell {...{ key }}>
        <Title>
          <FormattedMessage {...messages[header]} />
        </Title>
      </HeaderCell>
    ))

    const renderContent = sizes.map((s, row) => (
      <Row key={row}>
        <Cell>
          <FormattedMessage {...messages[s]} />
        </Cell>
        {headers.map((header, key) => {
          const element = table[header]

          return element && <Cell {...{ key }}>{element[units][row]}</Cell>
        })}
      </Row>
    ))

    return (
      <Container>
        <TableTitle>
          {title && <FormattedMessage {...messages[title]} />}
        </TableTitle>
        <HeaderRow>
          <HeaderCell>
            <Title>
              <FormattedMessage {...messages.size} />
            </Title>
          </HeaderCell>
          {renderHeader}
        </HeaderRow>
        {renderContent}
      </Container>
    )
  }
}

export default SizesTable
