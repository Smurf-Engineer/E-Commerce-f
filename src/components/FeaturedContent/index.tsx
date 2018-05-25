/**
 * FeaturedContent Component - Created by cazarez on 24/05/18.
 */
import * as React from 'react'
import { compose, graphql } from 'react-apollo'

import { GetFeaturedContent } from './data'
import { Container, StyledImg } from './styledComponents'
import { QueryProps } from '../../types/common'

type FeaturedContentType = {
  image: string
  link: string
}

interface Data extends QueryProps {
  featuredContent: FeaturedContentType[]
}

interface Props {
  data: Data
  history: any
}

export class FeaturedContent extends React.PureComponent<Props, {}> {
  render() {
    const {
      data: { featuredContent }
    } = this.props
    console.log('FEATURED CONTEND ', featuredContent)

    let content
    if (featuredContent) {
      content = featuredContent.map(({ image, link }, key) => {
        return (
          <a {...{ key }} href={link}>
            <StyledImg
              src={image}
              // onClick={this.handleGoTo(link)} TODO: uncomment later
            />
          </a>
        )
      })
    }
    return <Container>{content}</Container>
  }

  // TODO: use this function when service returns route not full url
  handleGoTo = (link: string) => () => {
    const { history } = this.props
    console.log('CLICK')
    history.push(`/${link}`)
  }
}

export const FeaturedContentEnhanced = compose(graphql(GetFeaturedContent))(
  FeaturedContent
)
export default FeaturedContentEnhanced
