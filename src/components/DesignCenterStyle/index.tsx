/**
 * DesignCenterStyle Component - Created by david on 12/03/18.
 */
import * as React from 'react'
import { FormattedMessage } from 'react-intl'
import { graphql, compose } from 'react-apollo'
import withLoading from '../WithLoadingData'
import { QueryProps } from '../../types/common'
import { stylesQuery } from './data'
import messages from './messages'
import StyleItem from '../Theme'
import { StyleResult } from '../../types/common'
import { Container, Title, Slider, Row, List } from './styledComponents'
// TODO: TEST DATA
import dummieData from '../../components/DesignCenterCustomize/Render3D/dummieData'

interface Data extends QueryProps {
  styles?: StyleResult
}

interface Props {
  data: Data
  onSelectStyle: (style: any) => void
  onSelectStyleComplexity: (index: number, colors: string[]) => void
}

const marks = {
  1: 'Classic',
  2: 'Edgy',
  3: 'Extreme'
}

export class DesignCenterStyle extends React.PureComponent<Props, {}> {
  handleOnSelectStyle = (id: number, index: any) => {
    const { onSelectStyle, data: { styles } } = this.props
    const allStyles = styles ? styles.styles || [] : []
    const colors = allStyles ? allStyles[index].colors : {}
    onSelectStyle(colors)
  }

  handleOnSelectComplexity = (value: any) => {
    const { onSelectStyleComplexity } = this.props
    const currentStyle = value - 1
    onSelectStyleComplexity(currentStyle, dummieData[currentStyle].colors)
  }

  render() {
    const { data: { styles, error } } = this.props
    if (error) {
      return <div>Error</div>
    }
    const stylesItems = styles ? styles.styles || [] : []
    const list = stylesItems.map(({ id, image, name }, index) => (
      <StyleItem
        key={index}
        {...{ index, id, name, image }}
        onClick={this.handleOnSelectStyle}
      />
    ))

    return (
      <Container>
        <Title>
          <FormattedMessage {...messages.title} />
        </Title>
        <Slider
          onChange={this.handleOnSelectComplexity}
          marks={marks}
          defaultValue={1}
          min={1}
          max={3}
        />
        <List>
          <Row>{list}</Row>
        </List>
      </Container>
    )
  }
}

const DesignCenterStyleWithData = compose(
  graphql<Data>(stylesQuery),
  withLoading
)(DesignCenterStyle)

export default DesignCenterStyleWithData
