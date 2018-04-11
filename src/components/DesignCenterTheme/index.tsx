/**
 * DesignCenterGrid Component - Created by david on 26/02/18.
 */
import * as React from 'react'
import { graphql, compose } from 'react-apollo'
import withLoading from '../WithLoadingData'
import { QueryProps } from '../../types/common'
import { ThemeResult } from '../../types/common'
import { themesQuery } from './data'
import ThemeItem from '../Theme'
import { Row } from './styledComponents'

interface Data extends QueryProps {
  themes?: ThemeResult
}

interface Props {
  data: Data
  loadingModel: boolean
  onSelectTheme: (id: number) => void
}

export const DesignCenterGrid = ({ data, onSelectTheme }: Props) => {
  if (data.error) {
    // TODO: Handle error.
    return <div>Error</div>
  }

  const themes = data.themes ? data.themes.themes || [] : []
  const list = themes.map(({ id, image, name }, index) => (
    <ThemeItem key={index} {...{ id, name, image }} onClick={onSelectTheme} />
  ))
  return <Row>{list}</Row>
}

const DesignCenterGridWithData = compose(
  graphql<Data>(themesQuery),
  withLoading
)(DesignCenterGrid)

export default DesignCenterGridWithData
