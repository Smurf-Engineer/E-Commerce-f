/**
 * FitInfoTable Component - Created by gustavomedina on 12/03/18.
 */
import * as React from 'react'
import { FormattedMessage } from 'react-intl'
import { compose, graphql } from 'react-apollo'
import { connect } from 'react-redux'
import keys from 'lodash/keys'
import forEach from 'lodash/forEach'
import compact from 'lodash/compact'
import { QueryProps, BodyChartItem } from '../../types/common'
import Table from 'antd/lib/table'
import messages from './messages'
import { Container, Text, tableStyle } from './styledComponents'
import { categoriesQuery } from './data'

interface Data extends QueryProps {
  bodyChart: BodyChartItem[]
}

interface Props {
  data: Data
  bodyChartId?: number
  metric?: string
  genderId?: number
}

export class FitInfoTable extends React.Component<Props, {}> {
  render() {
    const { data, metric } = this.props
    const { bodyChart } = data

    let chartcolumns: any = [] as any
    let chartData: any = [] as any

    if (!data.loading && !data.error) {
      chartcolumns = Object.keys(bodyChart[0]).map((key, index) => {
        if (key !== '__typename') {
          return {
            title: key,
            dataIndex: key
          }
        }
        return null
      })

      chartcolumns = compact(chartcolumns)

      let indexItems = 0
      chartData = bodyChart.map((key: any, index) => {
        const objectKeys = keys(key)
        const object: any = {}
        forEach(objectKeys, (value, objectIndex) => {
          object[value] = key[value]
          object.index = indexItems++
          object.key = indexItems++
        })
        return object
      })
    }

    return (
      <Container>
        <Table
          dataSource={chartData}
          columns={chartcolumns}
          style={tableStyle}
          pagination={false}
        />
      </Container>
    )
  }
}

type OwnProps = {
  bodyChartId?: number
  genderId?: number
  metric?: string
}

const FitInfoTableEnhance = compose(
  graphql<Data>(categoriesQuery, {
    options: ({ bodyChartId, genderId, metric }: OwnProps) => ({
      fetchPolicy: 'network-only',
      variables: { bodyChartId, genderId, metric }
    })
  })
)(FitInfoTable)

export default FitInfoTableEnhance
