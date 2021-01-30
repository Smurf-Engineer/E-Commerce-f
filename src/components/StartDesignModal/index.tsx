/**
 * StartDesignModal Component - Created by eduardoquintero on 19/10/20.
 */
import * as React from 'react'
import messages from './messages'
import {
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
import DesignCenterBanner from '../../assets/start_design_lab.jpg'
import ProDesignBanner from '../../assets/start_pro_design.jpg'
import UnfoldList from '../UnfoldList'
import CustomModal from '../Common/JakrooModal'
import SimpleLi from '../SimpleLi'
import { Message } from '../../types/common'
import zenscroll from 'zenscroll'

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
  'ideal',
  'themedDesign',
  'expanded',
]

const proDesignMessages = [
  'customKits',
  'idealForTeams',
  'dedicatedAccount',
  'customColor'
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
    setTimeout(() => this.scrollBottom(), 700)
  }

  scrollBottom = () => {
    if (window) {
      const node = document.querySelector('.ant-modal-wrap')
      if (node) {
        const modalScroller = zenscroll.createScroller(node, 0)
        modalScroller.toY(node.scrollHeight)
      }
    }
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
      <CustomModal
        {... { open }}
        withLogo={false}
        width={'100%'}
        requestClose={onClose}
        style={{ maxWidth: '1200px' }}
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
                key={index}
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
                <Banner src={ProDesignBanner} />
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
                <img src={DesignCenterBanner} />
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
                <img src={ProDesignBanner} />
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
    )
  }
}

export default StartDesignModal
