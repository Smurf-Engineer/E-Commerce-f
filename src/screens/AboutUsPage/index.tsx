/**
 * AboutUsPage Screen - Created by gustavomedina on 14/06/18.
 */
// tslint:disable:max-line-length
import * as React from 'react'
import { FormattedMessage, injectIntl, InjectedIntl } from 'react-intl'
import { RouteComponentProps } from 'react-router-dom'
import { compose } from 'react-apollo'
import GoogleMapReact from 'google-map-react'
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
  PeoplePosition,
  MapContainer,
  MapMarker,
  ImageContainer,
  IFrameContainer,
  MapRelativeContainer,
  MapTextContainer,
  LineText,
  HeaderDialog
} from './styledComponents'
import Layout from '../../components/MainLayout'
import config from '../../config/index'

interface Props extends RouteComponentProps<any> {
  intl: InjectedIntl
}

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
      'https://storage.googleapis.com/jakroo-storage/screens/aboutus/wayne.png',
    name: 'WAYNE DU',
    position: 'CEO, Founder',
    description:
      'As part of JAKROO’s dynamic duo, Wayne is responsible for defining global strategy and ensuring all parts of the organization work together like a well-oiled machine. Wayne is awed by his team who provide him with an endless stream of innovative ideas to work with. As founder, Wayne finds it liberating to be the key decision maker and contribute to the success of others. Wayne’s pastimes include reading, riding, soccer and convincing his wife and daughter that he is not “boring”.'
  },
  {
    image:
      'https://storage.googleapis.com/jakroo-storage/screens/aboutus/derek.png',
    name: 'DEREK WISEMAN',
    position: 'COO',
    description:
      'In the beginning there was Wayne. Then there was Derek. Then Derek and Wayne joined forces and the rest is history. As an apparel industry veteran with a penchant for technology and marketing Derek uses his skills and passion to set help set the direction for the company and keep the momentum going strong. Derek is a tolerant, multi-lingual family guy who enjoys the company of good friends, staying active, and building ‘things’ in his spare time. Wisely, he taps into the strengths of his team and lets them shine.'
  },
  {
    image:
      'https://storage.googleapis.com/jakroo-storage/screens/aboutus/wei.png',
    name: 'WEI TAN',
    position: 'CFO',
    description: `Wei is JAKROO'S data-cranking specialist keeping all informed of the great job they are doing. From the newbie to the most experienced everyone is valued and knows the role they play in JAKROO’s success. Wei is impressed by JAKROO’s growth and gives them extra gold stars for moving inventory and keeping sales up. Wei has the travel bug and loves to get away and see the world. She’s a budding fashionista and steals a tip or two whenever she can.`
  },
  {
    image:
      'https://storage.googleapis.com/jakroo-storage/screens/aboutus/eric.png',
    name: 'ERIC PETERSON',
    position: 'Senior Production Manager',
    description:
      'A valuable member from day 1, Eric makes sure all orders get processed accurately and on time working with both the sales and production divisions to get the job done. Convinced of JAKROO’s potential he came on board and is thrilled at the exponential growth crediting JAKROO’s cutting edge technology and superb customer service. Eric is a compassionate person with a listening ear and enjoys a good concert. If you see a shiny new bike in the parking lot, it’s probably Eric’s.'
  },
  {
    image:
      'https://storage.googleapis.com/jakroo-storage/screens/aboutus/patricia.png',
    name: 'PATRICE SPYRKA',
    position: 'Direct of Sales Wholesale Division',
    description:
      'Our front line sales person Patrice is a two time Junior Olympian in Nordic Skiing and to say she’s passionate about heading Jakroo’s Nordic division is an understatement. Her career began in the cycling division at Descente America where she went on to fulfill various roles and gain valuable experience. Patrice is a devoted, hardworking mom of two sport-loving girls and proud supporter of her husband, a competitive masters road cyclist that rides and competes as often as possible.'
  },
  {
    image:
      'https://storage.googleapis.com/jakroo-storage/screens/aboutus/sherwin.png',
    name: 'SHERWIN GONZALES',
    position: 'Graphic Designer',
    description:
      'Since joining JARKOO, Sherwin has become a cycling and running convert surprising even himself in the process. He thrives in the company’s close-knit environment and enjoys collaborating with his talented coworkers where together they create designs that are nothing short of awesome. The fast-paced environment keeps Sherwin on his toes catering to dozens of customer requests daily to provide outstanding customer service. Sherwin enjoys the time he spends with friends and family, staying active, photography and belting it out at karaoke.'
  },
  {
    image:
      'https://storage.googleapis.com/jakroo-storage/screens/aboutus/michael.png',
    name: 'MICHAEL HERNANDEZ',
    position: 'Director of Sales',
    description:
      'Michael first approached JAKROO as a customer and quickly realized he wanted in. Now, as senior manager of direct sales he puts his high-energy personality to good use giving each and every customer the most professional treatment possible. Keeping up with evolving technologies is exciting and challenging but it’s this innovation that makes JAKROO a force to be reckoned with. At home Michael trains (and does laundry for) his partner, a World Cup track medalist and member of the U.S. National Team.'
  },
  {
    image:
      'https://storage.googleapis.com/jakroo-storage/screens/aboutus/joseph.png',
    name: 'JOSEPH SIWA',
    position: 'Account Manager',
    description:
      'Cycling helped Joseph turn his life around so working for JAKROO was an easy decision. Joseph loves being part of a forward thinking company clearly ahead of the curve in terms of technology, products and service. As frontline to customers, Joseph uses his jovial, welcoming personality and in-depth product knowledge to understand and respond to their needs. His passion spills over into his personal time where biking tops the list followed by jamming with friends and hanging out with his dog.'
  },
  {
    image:
      'https://storage.googleapis.com/jakroo-storage/screens/aboutus/john.png',
    name: 'JOHN BERIAULT',
    position: 'Sr. Account Manager',
    description:
      'JAKROO gets an A++ for recruiting teacher, John Beriault to our position as Sr. Accounts Manager! John has quickly become a valued member of our energetic team and a pro at smoothly managing our Canadian accounts from the initial design, all the way to post-order follow up. Although he misses the face-to-face interaction with customers, John is thrilled to be able to work closer to home where he wisely spends his time devising ways to trick his 8 week old son into going to sleep so he can catch a few z’s himself! Don’t worry John; this only lasts 20 years or so.'
  },
  {
    image:
      'https://storage.googleapis.com/jakroo-storage/screens/aboutus/emily.png',
    name: 'EMILY MCKEAN',
    position: 'Sr. Graphic Designer',
    description: `Emily McKean humbly described herself as “awesome” during her job interview. We took her word for it, and now she’s making waves applying her talents to incredible custom sportswear designs here at JAKROO. Emily's time away from work is spent hitting the gym, enjoying a game of hockey or playing soccer. She thrives in JAKROO always-changing, uber-creative environment where no day or design is ever the same. She may be trying to butter us up, but she reports that since working with us she sees everything a little more sharply, with a little more humor and even works faster. Looks like an “awesome” design guru has found an equally awesome environment to work in!`
  },
  {
    image:
      'https://storage.googleapis.com/jakroo-storage/screens/aboutus/alex.png',
    name: 'ALEX CHIU',
    position: 'Account Manager',
    description:
      'Karma strikes again bringing good people to the awesome team here at JAKROO! Enter Alex Chiu, our multi-tasking Account Manager whose unique skillset makes him a natural fit. Although he’s the new kid on the block, Alex feels right at home among his new co-workers thanks in part to his old college roommate, an avid cyclist. After noticing his roommate’s consistently sunny disposition, Alex traded in his junk food and video games for a bike losing 60 pounds in the process! His pace might be a little slower than the rest, but that just gives him time to stop and pursue his second passion, photography. Each day, it’s his mission to work towards the best possible result for JAKROO and above all, the customer.'
  },
  {
    image:
      'https://storage.googleapis.com/jakroo-storage/screens/aboutus/ben.png',
    name: 'BEN JACQUES-MAYNES',
    position: 'R&D and Specialty Accounts Manager',
    description:
      'As a professional athlete, you could say Ben has been ‘training’ for his position for over 15 years.  His team spirit comes through as he works to improve existing products and add his practical expertise to creating new ones.  Ben was first introduced to JAKROO as a racer, and was driven to come on board after learning about the company’s vision.  Fueled by the infectious passion of his co-workers, Ben has quickly discovered that it is possible to work hard and have fun!  On his downtime you’ll often find Ben heading outside to work in his garden, play with his kids, ski, hike or camp.  As a quick learner with a thoughtful, reasoned approach, we’re confident Ben will make his mark as an integral part of the evolving face of JAKROO.'
  },
  {
    image:
      'https://storage.googleapis.com/jakroo-storage/screens/aboutus/elie.png',
    name: 'ELIE MALMAN',
    position: 'Graphic Designer',
    description: `What do you get when you combine a fun-loving personality with a passion for fashion and design? You get a natural fit for JAKROO's graphic design team! Eli Malman, is thrilled to take her skills to the next level as she works to deliver an outstanding finished product. You’ll seldom see here without an iced coffee nearby as she expertly applies her creative skills to bring each customer’s vision to life.  Part gamer and foodie with a side of ‘crazy cat lady,’ Elie is a refreshing addition to JAKROO's employee culture.  Every day she is broadening her horizons as she tackles the world of design, 30 products at a time!`
  }
]

export class AboutUsPage extends React.Component<Props, {}> {
  render() {
    const { intl, history } = this.props

    const MarkComponent = ({ text }: any) => (
      <div>
        <MapMarker
          src={
            'https://storage.googleapis.com/jakroo-storage/screens/redmarker.png'
          }
        />
      </div>
    )
    const center = {
      lat: 37.696081,
      lng: -121.933441
    }
    const marker = {
      lat: 37.696081,
      lng: -121.933441,
      street: '5906 Stoneridge Mall Road',
      city: 'Pleasanton, CA 94588',
      phone: '1.800.485.7067'
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
          <ImageContainer>
            <PeopleImage src={person.image} />
            <p className="cornerLink">{person.description}</p>
          </ImageContainer>
          <PeopleName>{person.name}</PeopleName>
          <PeoplePosition>{person.position}</PeoplePosition>
        </PeopleItem>
      )
    })

    return (
      <Layout {...{ intl, history }}>
        <Container>
          <ImageTitleContainer>
            <StyledImg
              src={
                'https://storage.googleapis.com/jakroo-storage/screens/aboutus.jpg'
              }
            />
            <HeaderTextContainer>
              <Title>
                <FormattedMessage {...messages.title} />
              </Title>
            </HeaderTextContainer>
            <HeaderDialog>
              <FormattedMessage {...messages.headerDialog} />
            </HeaderDialog>
          </ImageTitleContainer>
          <ItemsContainer>{idealsList}</ItemsContainer>
          <Divider />
          <MeetTitle>
            <FormattedMessage {...messages.meetTitle} />
          </MeetTitle>
          <ItemsContainer>{peopleList}</ItemsContainer>
          <Divider />
          <MeetTitle>
            <FormattedMessage {...messages.historyTitle} />
          </MeetTitle>
          <IFrameContainer>
            <iframe
              src="https://cdn.knightlab.com/libs/timeline3/latest/embed/index.html?source=165999Jr4OyxZo-hBomSVxAwdyZUKLTT2uZF6L3XSXRg&font=Default&lang=en&initial_zoom=2&height=650"
              width="100%"
              height="650"
            />
          </IFrameContainer>
          <Divider />
          <MeetTitle>
            <FormattedMessage {...messages.locationTitle} />
          </MeetTitle>
          <MapRelativeContainer>
            <MapContainer>
              <GoogleMapReact
                bootstrapURLKeys={{
                  key: config.googleMapKey
                }}
                defaultCenter={center}
                defaultZoom={zoom}
              >
                <MarkComponent lat={marker.lat} lng={marker.lng} text={''} />
              </GoogleMapReact>
            </MapContainer>
            <MapTextContainer>
              <LineText>{marker.street}</LineText>
              <LineText>{marker.city}</LineText>
              <LineText>{marker.phone}</LineText>
            </MapTextContainer>
          </MapRelativeContainer>
        </Container>
      </Layout>
    )
  }
}

const AboutUsPageEnhance = compose(injectIntl)(AboutUsPage)

export default AboutUsPageEnhance
