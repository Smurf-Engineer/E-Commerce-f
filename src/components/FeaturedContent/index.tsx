/**
 * FeaturedContent Component - Created by cazarez on 24/05/18.
 */
import * as React from 'react'
import { Container, StyledImg } from './styledComponents'
import { HomepageImagesType } from '../../types/common'
import MediaQuery from 'react-responsive'
import { History } from 'history'

interface Props {
  featuredContent: HomepageImagesType[]
  history: History
}

export class FeaturedContent extends React.PureComponent<Props, {}> {
  render() {
    const { featuredContent = [] } = this.props
    const content = featuredContent.map(
      ({ desktopImage, mobilemage, url }, key) => {
        return (
          <MediaQuery {...{ key }} minWidth={640}>
            {matches => {
              if (matches) {
                return (
                  <a>
                    <StyledImg
                      src={desktopImage}
                      onClick={this.handleGoTo(url)}
                    />
                  </a>
                )
              }
              return (
                <a>
                  <StyledImg src={mobilemage} onClick={this.handleGoTo(url)} />
                </a>
              )
            }}
          </MediaQuery>
        )
      }
    )
    return <Container>{content}</Container>
  }

  handleGoTo = (link: string) => () => {
    const { history } = this.props
    history.push(link)
  }
}

export default FeaturedContent
