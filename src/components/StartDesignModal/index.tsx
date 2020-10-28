/**
 * StartDesignModal Component - Created by eduardoquintero on 19/10/20.
 */
import * as React from 'react'
import messages from './messages'
import {
  Container,
  Title,
  Card,
  CardTitle,
  DesignsCardsContainer,
  Item,
  List,
  BannerBack,
  BannerDesign
} from './styledComponents'
import ProDesignImg from '../../assets/Jakroo_Pro.png'
import DesignCenterImg from '../../assets/DesignLaB.png'
import DesignCenterBanner from '../../assets/design_lab.png'
import UnfoldList from '../UnfoldList'
import CustomModal from '../Common/JakrooModal'
import { Message } from '../../types/common'

interface Props {
  visible: boolean
  isMobile: boolean
  formatMessage: (messageDescriptor: Message, values?: {}) => string
}

const designCenterMessages = [
  'createUnlimited',
  'themedDesign',
  'expanded',
  'connect',
  'ideas'
]

const proDesignMessages = [
  'dedicatedAccount',
  'createUnlimited',
  'freeDesign',
  'extended',
  'customColor',
  'idealForTeams'
]

export class StartDesignModal extends React.Component<Props, {}> {
  state = {
    cardFolded: true,
    animationInProgress: false
  }

  toggleAnimation = () => {
    this.setState({ cardFolded: !this.state.cardFolded })
  }

  render() {
    const { cardFolded } = this.state
    const {
      formatMessage,
      isMobile
    } = this.props

    const mobileList = [
      <p key="1">Hello</p>, <p key="2">Bye</p>
    ]
    return (
      <Container>
        <CustomModal
          open={true}
          withLogo={false}
          width={'1200px'}
          requestClose={this.requestClose}
          wrapClassName={isMobile && 'transparent-modal'}
          maskStyle={isMobile && { background: 'rgba(0,0,0,0.9)' }}
        >
          <Title>{formatMessage(messages.twoWays)}</Title>
          {isMobile ?
            (<div>
              <UnfoldList
                childrens={mobileList}
              />
              <BannerDesign src={DesignCenterBanner} />
              <BannerBack
                onClick={this.toggleAnimation}
                className={cardFolded ? 'folded' : 'unfolded'}
              >
                <p>Hello</p>
              </BannerBack>
            </div>) :
            <DesignsCardsContainer>
              <Card onClick={this.goTo}>
                <CardTitle>
                  <img src={DesignCenterImg} />
                </CardTitle>
                <List>
                  {designCenterMessages.map((item: string, index: number) => (
                    <Item
                      key={index}
                    >
                      {formatMessage(messages[item])}
                    </Item>
                  ))}
                </List>
              </Card>
              <Card onClick={this.goTo}>
                <CardTitle>
                  <img src={ProDesignImg} />
                </CardTitle>
                <List>
                  {proDesignMessages.map((item: string, index: number) => (
                    <Item
                      key={index}
                    >
                      {formatMessage(messages[item])}
                    </Item>
                  ))}
                </List>
              </Card>
            </DesignsCardsContainer>}
        </CustomModal>
      </Container>
    )
  }
}

export default StartDesignModal
