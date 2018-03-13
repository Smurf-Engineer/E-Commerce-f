/**
 * DesignCenterStyle Component - Created by david on 12/03/18.
 */
import * as React from 'react'
import { FormattedMessage } from 'react-intl'
import messages from './messages'
import StyleItem from '../Theme'
import { Theme } from '../../types/common'
import { Container, Title, Slider, Row, List } from './styledComponents'

// TODO: Dummie data
const styles: Theme[] = [
  {
    id: 0,
    name: 'Name of Style',
    image:
      'https://storage.googleapis.com/jakroo-storage/Assets_themes/Patriotic_arm%20forces.svg'
  },
  {
    id: 1,
    name: 'Name of Style',
    image:
      'https://storage.googleapis.com/jakroo-storage/Assets_themes/AnimalPrint.svg'
  },
  {
    id: 2,
    name: 'Name of Style',
    image:
      'https://storage.googleapis.com/jakroo-storage/Assets_themes/Geometric.svg'
  },
  {
    id: 2,
    name: 'Name of Style',
    image:
      'https://storage.googleapis.com/jakroo-storage/Assets_themes/Geometric.svg'
  }
]

interface Props {}

const marks = {
  1: 'Classic',
  2: 'Edgy',
  3: 'Extreme'
}

class DesignCenterStyle extends React.PureComponent<Props, {}> {
  render() {
    const list = styles.map(({ image, name }, index) => (
      <StyleItem key={index} {...{ name, image }} />
    ))
    return (
      <Container>
        <Title>
          <FormattedMessage {...messages.title} />
        </Title>
        <Slider marks={marks} defaultValue={0} min={1} max={3} />
        <List>
          <Row>{list}</Row>
        </List>
      </Container>
    )
  }
}

export default DesignCenterStyle
