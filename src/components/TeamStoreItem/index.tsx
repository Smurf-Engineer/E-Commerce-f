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
  ShareButton,
  ButtonsContainer,
  DeleteLabel
} from './styledComponents'

interface Props {
  image: string
  idStore?: string
  name?: string
  showNameStore?: boolean
  withShareButton?: boolean
  withEditButton?: boolean
  withDeleteButton?: boolean
  formatMessage: (messageDescriptor: any) => string
  openShareModalAction?: (id?: string) => void
  onItemClick?: () => void
  onEditClick?: () => void
  onDeleteClick?: () => void
}

const TeamStoreItem = ({
  idStore,
  image,
  name,
  formatMessage,
  openShareModalAction,
  showNameStore = false,
  withEditButton = false,
  withShareButton = false,
  withDeleteButton = false,
  onItemClick,
  onEditClick,
  onDeleteClick
}: Props) => {
  const handleClickShare = () => {
    if (openShareModalAction) {
      openShareModalAction(idStore)
    }
  }
  const handleClickEdit = () => {
    if (onEditClick) {
      onEditClick()
    }
  }
  const handleClickDelete = () => {
    if (onDeleteClick) {
      onDeleteClick()
    }
  }
  return (
    <Container>
      <TeamStoreCard>
        <TeamCardHeader>
          {showNameStore && <CardTitle>{name}</CardTitle>}
          <ButtonsContainer>
            {withEditButton && (
              <ShareButton onClick={handleClickEdit}>{'Edit'}</ShareButton>
            )}
            {withShareButton && (
              <ShareButton onClick={handleClickShare}>
                {formatMessage(messages.shareButtonLabel)}
              </ShareButton>
            )}
            {withDeleteButton && (
              <DeleteLabel onClick={handleClickDelete}>{'Delete'}</DeleteLabel>
            )}
          </ButtonsContainer>
        </TeamCardHeader>

        <CardContent>
          {image && <StyledImg src={image} onClick={onItemClick} />}
        </CardContent>
      </TeamStoreCard>
    </Container>
  )
}

export default TeamStoreItem
