/**
 * DesignPathway Component - Created by eduardoquintero on 17/11/20.
 */
import * as React from 'react'
import {
  Container,
  DesignsCardsContainer,
  Card,
  CardTitle,
  ButtonWrapper,
  Button
} from './styledComponents'
import FromScratch from '../../../assets/from_scracht.svg'

import { Message } from '../../../types/common'

interface Props {
  formatMessage: (messageDescriptor: Message, values?: {}) => string
}

const MobileMenu = ({ formatMessage }: Props) => {
  return (
    <Container>
       <DesignsCardsContainer>
              <Card onClick={this.goToCustomize}>
                <CardTitle>
                  <img src={FromScratch} />
                </CardTitle>
                dsfs
                <ButtonWrapper>
                  <Button>
                    {/* formatMessage(messages.customizeLabel) */}
                  </Button>
                </ButtonWrapper>

              </Card>
              <Card onClick={this.goToProDesign}>
                <CardTitle>
                  <img src={FromScratch} />
                </CardTitle>
                sd
                <ButtonWrapper>
                  <Button>
                    {/* formatMessage(messages.customizeLabel) */}
                  </Button>
                </ButtonWrapper>
              </Card>
            </DesignsCardsContainer>
    </Container>
  )
}

export default MobileMenu
