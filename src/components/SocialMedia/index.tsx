/**
 * SocialMedia Component - Created by cazarez on 07/02/18.
 */
import * as React from 'react'
import {
  Container,
  Text,
  SocialLogosContainer,
  StyledImg
} from './styledComponents'
import fbLogo from '../../assets/fb.svg'
import fbLogoHover from '../../assets/fb_hover.svg'
import twitterLogo from '../../assets/twitter.svg'
import twitterLogoHover from '../../assets/twitter_hover.svg'
import instagramLogo from '../../assets/instagram.svg'
import intagramLogoHover from '../../assets/instagram_hover.svg'
import youtubeLogo from '../../assets/youtube.svg'
import youtubeLogoHover from '../../assets/youtube_hover.svg'

class SocialMedia extends React.Component {
  state = {
    hoverOn: ''
  }
  render() {
    const { hoverOn } = this.state
    console.log(hoverOn)
    return (
      <Container>
        <SocialLogosContainer>
          <StyledImg
            id="fb"
            alt="fb"
            src={hoverOn === 'fb' ? fbLogoHover : fbLogo}
            onMouseEnter={this.handleHover}
            onMouseLeave={this.resetHover}
            onClick={this.handleClick}
          />
          <StyledImg
            id="tw"
            alt="twitter"
            src={hoverOn === 'tw' ? twitterLogoHover : twitterLogo}
            onMouseEnter={this.handleHover}
            onMouseLeave={this.resetHover}
            onClick={this.handleClick}
          />
          <StyledImg
            id="ig"
            alt="instagram"
            src={hoverOn === 'ig' ? intagramLogoHover : instagramLogo}
            onMouseEnter={this.handleHover}
            onMouseLeave={this.resetHover}
            onClick={this.handleClick}
          />
          <StyledImg
            id="ytb"
            alt="youtube"
            src={hoverOn === 'ytb' ? youtubeLogoHover : youtubeLogo}
            onMouseEnter={this.handleHover}
            onMouseLeave={this.resetHover}
            onClick={this.handleClick}
          />
        </SocialLogosContainer>
        <Text>© Copyright JAKROO 2018</Text>
      </Container>
    )
  }

  handleHover = (evt: React.FormEvent<EventTarget>) => {
    const target = evt.target as HTMLInputElement
    const { id } = target
    this.setState({ hoverOn: id })
  }

  resetHover = () => {
    this.setState({ hoverOn: '' })
  }

  handleClick = (evt: React.FormEvent<EventTarget>) => {
    const target = evt.target as HTMLInputElement
    const { id } = target
    switch (id) {
      case 'fb':
        window.location.href = 'https://www.facebook.com/jakroo'
        break
      case 'tw':
        window.location.href = 'https://twitter.com/jakroousa'
        break
      case 'ig':
        window.location.href = 'https://www.instagram.com/jakroousa/'
        break
      case 'ytb':
        window.location.href = 'https://www.youtube.com/user/jakroousa'
        break
      default:
        break
    }
  }
}

export default SocialMedia
