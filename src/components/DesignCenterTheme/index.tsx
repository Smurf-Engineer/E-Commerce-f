/**
 * DesignCenterGrid Component - Created by david on 26/02/18.
 */
import * as React from 'react'
import { FormattedMessage } from 'react-intl'
import { graphql, compose } from 'react-apollo'
import Spin from 'antd/lib/spin'
import messages from './messages'
import { QueryProps } from '../../types/common'
import { Theme } from '../../types/common'
import { themesQuery } from './data'
import ThemeItem from './Theme'
import { Container, Text, Row, LoadingContainer } from './styledComponents'

interface Data extends QueryProps {
  themes?: Theme[]
}

interface Props {
  data: Data
  loadingModel: boolean
}

export const DesignCenterGrid = ({ data, loadingModel }: Props) => {
  if (data.loading || loadingModel) {
    return (
      <LoadingContainer>
        <Spin />
      </LoadingContainer>
    )
  }

  if (data.error) {
    // TODO: Handle error.
    return <div>Error</div>
  }
  const themes = data.themes || []
  const list = themes.map(({ image, name }, index) => (
    <ThemeItem key={index} {...{ name, image }} />
  ))
  return <Row>{list}</Row>
}

const DesignCenterGridWithData = compose(graphql<Data>(themesQuery))(
  DesignCenterGrid
)

export default DesignCenterGridWithData
