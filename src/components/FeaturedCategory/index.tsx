/**
 * FeaturedCategory Component - Created by cazarez on 25/05/18.
 */
import * as React from 'react'
import { FormattedMessage } from 'react-intl'

import messages from './messages'
import { Container, Text, StyledImg, Category } from './styledComponents'

import image1 from '../../assets/black-to-basics.jpg'
import image2 from '../../assets/high-visibility-gear.jpg'
import image3 from '../../assets/warmers.jpg'

interface Props {
  history: any
  browserName?: string
}

// TODO: EVERYTHING HARDCODED FOR THE MOMENT CHANGE  LATER
class FeaturedCategory extends React.PureComponent<Props, {}> {
  render() {
    const { browserName } = this.props

    return (
      <Container {...{ browserName }}>
        <Category>
          <StyledImg
            id="black_to_basics"
            src={image1}
            onClick={this.handleClick}
          />
          <Text>
            <FormattedMessage {...messages.blackToBasicsLabel} />
          </Text>
        </Category>
        <Category>
          <StyledImg
            id="high_visibility"
            src={image2}
            onClick={this.handleClick}
          />
          <Text>
            <FormattedMessage {...messages.highVisibilityLabel} />
          </Text>
        </Category>
        <Category>
          <StyledImg id="warmers" src={image3} onClick={this.handleClick} />
          <Text>
            <FormattedMessage {...messages.warmersLabel} />
          </Text>
        </Category>
      </Container>
    )
  }

  handleClick = (evt: any) => {
    const { history } = this.props
    history.push(`/product-catalogue?contentTile=${evt.target.id}`)
  }
}

export default FeaturedCategory
