/**
 * AboutUsPage Screen - Created by gustavomedina on 14/06/18.
 */
// tslint:disable:max-line-length
import * as React from 'react'
import { FormattedMessage } from 'react-intl'
import { compose } from 'react-apollo'
import { connect } from 'react-redux'
import GoogleMapReact from 'google-map-react'
import * as aboutUsPageActions from './actions'
import messages from './messages'
import Divider from 'antd/lib/divider'
import {
  Container,
  ImageTitleContainer,
  HeaderTextContainer,
  Title,
  StyledImg,
  DescriptionItem,
  ItemsContainer,
  ItemTitle,
  ItemContent,
  MeetTitle,
  PeopleItem,
  PeopleImage,
  PeopleName,
  PeoplePosition
} from './styledComponents'

interface Props {}

const idealsArray = [
  {
    title: messages.comunnityTitle,
    message: messages.comunnityContent
  },
  {
    title: messages.integrityTitle,
    message: messages.integrityContent
  },
  {
    title: messages.teamWorkTitle,
    message: messages.teamWorkContent
  },
  {
    title: messages.innovationTitle,
    message: messages.innovationContent
  }
]

const peopleArray = [
  {
    image:
      'https://npengage.com/wp-content/plugins/all-in-one-seo-pack/images/default-user-image.png',
    name: 'Worker',
    position: 'Position'
  },
  {
    image:
      'https://npengage.com/wp-content/plugins/all-in-one-seo-pack/images/default-user-image.png',
    name: 'Worker',
    position: 'Position'
  },
  {
    image:
      'https://npengage.com/wp-content/plugins/all-in-one-seo-pack/images/default-user-image.png',
    name: 'Worker',
    position: 'Position'
  },
  {
    image:
      'https://npengage.com/wp-content/plugins/all-in-one-seo-pack/images/default-user-image.png',
    name: 'Worker',
    position: 'Position'
  },
  {
    image:
      'https://npengage.com/wp-content/plugins/all-in-one-seo-pack/images/default-user-image.png',
    name: 'Worker',
    position: 'Position'
  },
  {
    image:
      'https://npengage.com/wp-content/plugins/all-in-one-seo-pack/images/default-user-image.png',
    name: 'Worker',
    position: 'Position'
  },
  {
    image:
      'https://npengage.com/wp-content/plugins/all-in-one-seo-pack/images/default-user-image.png',
    name: 'Worker',
    position: 'Position'
  },
  {
    image:
      'https://npengage.com/wp-content/plugins/all-in-one-seo-pack/images/default-user-image.png',
    name: 'Worker',
    position: 'Position'
  },
  {
    image:
      'https://npengage.com/wp-content/plugins/all-in-one-seo-pack/images/default-user-image.png',
    name: 'Worker',
    position: 'Position'
  }
]

export class AboutUsPage extends React.Component<Props, {}> {
  render() {
    const AnyReactComponent = ({ text }: any) => <div>{text}</div>
    const center = {
      lat: 37.659794,
      lng: -121.876065
    }
    const zoom = 14

    const idealsList = idealsArray.map((ideal, index) => {
      return (
        <DescriptionItem key={index}>
          <ItemTitle>
            <FormattedMessage {...ideal.title} />
          </ItemTitle>
          <ItemContent>
            <FormattedMessage {...ideal.message} />
          </ItemContent>
        </DescriptionItem>
      )
    })

    const peopleList = peopleArray.map((person, index) => {
      return (
        <PeopleItem key={index}>
          <PeopleImage src={person.image} />
          <PeopleName>{person.name}</PeopleName>
          <PeoplePosition>{person.position}</PeoplePosition>
        </PeopleItem>
      )
    })

    return (
      <Container>
        <ImageTitleContainer>
          <StyledImg
            src={
              'https://storage.googleapis.com/jakroo-storage/screens/tech/header-tech.webp'
            }
          />
          <HeaderTextContainer>
            <Title>
              <FormattedMessage {...messages.title} />
            </Title>
          </HeaderTextContainer>
        </ImageTitleContainer>
        <ItemsContainer>{idealsList}</ItemsContainer>
        <Divider />
        <MeetTitle>
          <FormattedMessage {...messages.meetTitle} />
        </MeetTitle>
        <ItemsContainer>{peopleList}</ItemsContainer>
        <Divider />
        <MeetTitle>
          <FormattedMessage {...messages.meetTitle} />
        </MeetTitle>
        <Divider />
        <MeetTitle>
          <FormattedMessage {...messages.meetTitle} />
        </MeetTitle>
        <div style={{ height: '645px', width: '100%' }}>
          <GoogleMapReact
            bootstrapURLKeys={{
              key: 'AIzaSyAhSNGqAuj6AL4mJ0oNogYDK1UJcc_ws5U'
            }}
            defaultCenter={center}
            defaultZoom={zoom}
          >
            <AnyReactComponent
              lat={37.696137}
              lng={-121.876056}
              text={'Kreyser Avrora'}
            />
          </GoogleMapReact>
        </div>
      </Container>
    )
  }
}

const mapStateToProps = (state: any) => state.get('aboutUsPage').toJS()

const AboutUsPageEnhance = compose(
  connect(
    mapStateToProps,
    { ...aboutUsPageActions }
  )
)(AboutUsPage)

export default AboutUsPageEnhance
