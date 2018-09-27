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
  TableList
} from './styledComponents'
import SizesTable from '../SizesTable'
import { Chart } from '../../types/common'

interface Props {
  boxHeaders: string[]
  chart: Chart
  units: string
  id?: string
  formatMessage: (messageDescriptor: any) => string
  onBoxHeaderClick: (evt: React.MouseEvent<HTMLDivElement>) => void
}

class SizingChart extends React.Component<Props, {}> {
  render() {
    const {
      id,
      boxHeaders,
      units,
      onBoxHeaderClick,
      chart: { title, tables }
    } = this.props

    const renderBoxHeaderList =
      boxHeaders &&
      boxHeaders.map((boxHeader, index) => {
        const checked = title === boxHeader

        return (
          <BoxHeader
            id={boxHeader}
            key={index}
            {...{ checked }}
            onClick={onBoxHeaderClick}
          >
            <FormattedMessage {...messages[boxHeader]} />
          </BoxHeader>
        )
      })

    const renderTableList = tables.map((table, index) => {
      return <SizesTable key={index} {...{ units, table }} />
    })

    return (
      <Container {...{ id }}>
        {boxHeaders && <BoxHeaderRow>{renderBoxHeaderList}</BoxHeaderRow>}
        <TableList multiple={tables.length > 1}>{renderTableList}</TableList>
      </Container>
    )
  }
}

export default SizingChart
