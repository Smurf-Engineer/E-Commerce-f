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

    // TODO: REMOVE IT LATER
    if (this.props.data && this.props.data.error) {
      console.log('---------FEATURE----------')
      console.log(this.props.data)
      console.log('---------------------------')
      return <div>ERROR</div>
    }

    let content
    if (featuredContent) {
      content = featuredContent.map(({ image, link }, key) => {
        return (
          <a {...{ key }}>
            <StyledImg src={image} onClick={this.handleGoTo(link)} />
          </a>
        )
      })
    }
    return <Container>{content}</Container>
  }

  handleGoTo = (link: string) => () => {
    const { history } = this.props
    history.push(link)
  }
}

export const FeaturedContentEnhanced = compose(graphql(GetFeaturedContent))(
  FeaturedContent
)
export default FeaturedContentEnhanced
