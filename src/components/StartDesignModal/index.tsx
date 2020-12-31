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
  Banner,
  FoldContent,
  UnfoldContainer,
  MobileCard,
  ButtonWrapper,
  Button,
  ColorWheel,
  MobileContainer,
  CloseIcon
} from './styledComponents'
import closeIcon from '../../assets/cancel-button.svg'
import colorWheel from '../../assets/Colorwheel.svg'
import ProDesignImg from '../../assets/Jakroo_Pro.png'
import DesignCenterImg from '../../assets/DesignLAB.png'
import DesignCenterBanner from '../../assets/design_lab.png'
import UnfoldList from '../UnfoldList'
import CustomModal from '../Common/JakrooModal'
import SimpleLi from '../SimpleLi'
import { Message } from '../../types/common'

interface Props {
  visible: boolean
  open: boolean
  formatMessage: (messageDescriptor: Message, values?: {}) => string
  goToCustomize: () => void
  goToProDesign: () => void
  onClose: () => void
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
    designCardFolded: true,
    proDesignCardFolded: true,
    animationInProgress: false,
    isMobile: false
  }

  componentDidMount() {
    const isMobile = window.matchMedia(
      '(min-width: 320px) and (max-width: 480px)'
    ).matches
    this.setState({ isMobile })
  }

  toggleDesignAnimation = () => {
    this.setState({ designCardFolded: !this.state.designCardFolded })
  }

  toggleProDesignAnimation = () => {
    this.setState({ proDesignCardFolded: !this.state.proDesignCardFolded })
  }

  render() {
    const { designCardFolded, proDesignCardFolded, isMobile } = this.state
    const {
      formatMessage,
      goToCustomize,
      goToProDesign,
      open,
      onClose
    } = this.props

    return (
      <Container>
        <CustomModal
          {... {open}}
          withLogo={false}
          width={'1200px'}
          requestClose={onClose}
          wrapClassName={isMobile && 'transparent-modal'}
          withCross={!isMobile}
          maskStyle={isMobile && { background: 'rgba(0,0,0,0.9)' }}
        >
          <Title>{formatMessage(messages.twoWays)}</Title>
          {isMobile ?
            (<MobileContainer>
              <CloseIcon src={closeIcon} onClick={onClose} />
              <UnfoldList childrens={[]} />
              <UnfoldContainer>
                <BannerBack onClick={this.toggleDesignAnimation}>
                  <Banner src={DesignCenterBanner} />
                </BannerBack>
                {designCenterMessages.map((item: string, index: number) => (
                  <FoldContent
                  order={index + 1}
                  className={designCardFolded ? 'folded' : 'unfolded'}
                  >
                    <MobileCard>
                      <SimpleLi message={formatMessage(messages[item])} />
                    </MobileCard>
                  </FoldContent>
                ))}
                <FoldContent
                  order={designCenterMessages.length + 1}
                  className={designCardFolded ? 'folded' : 'unfolded'}
                  onClick={goToCustomize}
                >
                  <ButtonWrapper onClick={goToCustomize}>
                    <Button>
                      <ColorWheel src={colorWheel} />
                      {formatMessage(messages.customizeLabel)}
                    </Button>
                  </ButtonWrapper>
                </FoldContent>
              </UnfoldContainer>
              <UnfoldContainer>
                <BannerBack onClick={this.toggleProDesignAnimation}>
                  <Banner src={DesignCenterBanner} />
                </BannerBack>
                {proDesignMessages.map((item: string, index: number) => (
                  <FoldContent
                  order={index + 1}
                  className={proDesignCardFolded ? 'folded' : 'unfolded'}
                  >
                    <MobileCard>
                      <SimpleLi message={formatMessage(messages[item])} />
                    </MobileCard>
                  </FoldContent>
                ))}
                 <FoldContent
                  order={designCenterMessages.length + 1}
                  className={proDesignCardFolded ? 'folded' : 'unfolded'}
                  onClick={goToProDesign}
                >
                  <ButtonWrapper>
                    <Button>
                      <ColorWheel src={colorWheel} />
                      {formatMessage(messages.customizeLabel)}
                    </Button>
                  </ButtonWrapper>
                </FoldContent>
              </UnfoldContainer>
            </MobileContainer>) :
            <DesignsCardsContainer>
              <Card onClick={goToCustomize}>
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
                <ButtonWrapper>
                  <Button>
                    <ColorWheel src={colorWheel} />
                    {formatMessage(messages.customizeLabel)}
                  </Button>
                </ButtonWrapper>

              </Card>
              <Card onClick={goToProDesign}>
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
                <ButtonWrapper>
                  <Button>
                    <ColorWheel src={colorWheel} />
                    {formatMessage(messages.customizeLabel)}
                  </Button>
                </ButtonWrapper>
              </Card>
            </DesignsCardsContainer>}
        </CustomModal>
      </Container>
    )
  }
}

export default StartDesignModal
