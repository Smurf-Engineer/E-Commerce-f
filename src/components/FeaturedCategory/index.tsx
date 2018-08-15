/**
 * FeaturedCategory Component - Created by cazarez on 25/05/18.
 */
import * as React from 'react'
import { FormattedMessage } from 'react-intl'

import messages from './messages'
import { Container, Text, StyledImg, Category } from './styledComponents'

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
        <Category>
          <StyledImg src={image1} onClick={this.handleClick} />
          <Text>
            <FormattedMessage {...messages.outWearLabel} />
          </Text>
        </Category>
        <Category>
          <StyledImg src={image2} onClick={this.handleClick} />
          <Text>
            <FormattedMessage {...messages.raceSuitsLabel} />
          </Text>
        </Category>
        <Category>
          <StyledImg src={image3} onClick={this.handleClick} />
          <Text>
            <FormattedMessage {...messages.jupiterLabel} />
          </Text>
        </Category>
      </Container>
    )
  }

  handleClick = () => {
    const { history } = this.props
    history.push('/product-catalogue')
  }
}

export default FeaturedCategory
