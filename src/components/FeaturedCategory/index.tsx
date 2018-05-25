/**
 * FeaturedCategory Component - Created by cazarez on 25/05/18.
 */
import * as React from 'react'

// import messages from './messages'
import { Container, Text, StyledImg } from './styledComponents'

import image1 from '../../assets/Racesuits.jpg'
import image2 from '../../assets/Outerwear.jpg'
import image3 from '../../assets/racesuits-2.jpg'

interface Props {
  history: any
}

// TODO: EVERYTHING HARDCODED FOR THE MOMENT CHANGE  LATER
class FeaturedCategory extends React.PureComponent<Props, {}> {
  render() {
    return (
      <Container>
        <div>
          <StyledImg src={image1} onClick={this.handleClick} />
          <Text>{'OUTWEAR'}</Text>
        </div>
        <div>
          <StyledImg src={image2} onClick={this.handleClick} />
          <Text>{'RACE SUITS'}</Text>
        </div>
        <div>
          <StyledImg src={image3} onClick={this.handleClick} />
          <Text>{'JUPITER COLLECTION'}</Text>
        </div>
      </Container>
    )
  }

  handleClick = () => {
    const { history } = this.props
    history.push('/product-catalogue')
  }
}

export default FeaturedCategory
