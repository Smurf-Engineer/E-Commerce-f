/**
 * TeamStoreItem Component - Created by cazarez on 11/04/18.
 */
import * as React from 'react'
import messages from './messages'
import {
  Container,
  TeamStoreCard,
  CardContent,
  TeamCardHeader,
  StyledImg,
  CardTitle,
  ShareButton
} from './styledComponents'

interface Props {
  image: string
  idStore?: string
  name?: string
  showNameStore?: boolean
  formatMessage: (messageDescriptor: any) => string
  openShareModalAction?: (id?: string) => void
  onItemClick?: () => void
}

const TeamStoreItem = ({
  idStore,
  image,
  name,
  formatMessage,
  openShareModalAction,
  showNameStore = false,
  onItemClick
}: Props) => {
  const handleClickShare = () => {
    if (openShareModalAction) {
      openShareModalAction(idStore)
    }
  }
  return (
    <Container>
      <TeamStoreCard>
        {showNameStore && (
          <TeamCardHeader>
            <CardTitle>{name}</CardTitle>
            <ShareButton onClick={handleClickShare}>
              {formatMessage(messages.shareButtonLabel)}
            </ShareButton>
          </TeamCardHeader>
        )}
        <CardContent>
          <StyledImg src={image} onClick={onItemClick} />
        </CardContent>
      </TeamStoreCard>
    </Container>
  )
}

export default TeamStoreItem
