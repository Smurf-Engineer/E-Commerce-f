/**
 * TeamStoreItem Component - Created by cazarez on 11/04/18.
 */
import * as React from 'react'
import messages from './messages'
import MediaQuery from 'react-responsive'
import {
  Container,
  TeamStoreCard,
  CardContent,
  StyledImg,
  CardTitle,
  ShareButton,
  EditButton,
  ButtonsContainer,
  DeleteLabel,
  BottomContainer,
  TitleName
} from './styledComponents'

interface Props {
  image: string
  idStore?: string
  name?: string
  small?: boolean
  showNameStore?: boolean
  closed?: boolean
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
  small = false,
  showNameStore = false,
  withEditButton = false,
  withShareButton = false,
  withDeleteButton = false,
  onItemClick,
  onEditClick,
  onDeleteClick,
  closed = false
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

  const buttons = (
    <ButtonsContainer>
      {withEditButton && !closed && (
        <EditButton onClick={handleClickEdit}>
          {formatMessage(messages.editButtonLabel)}
        </EditButton>
      )}
      {withShareButton && !closed && (
        <ShareButton onClick={handleClickShare}>
          {formatMessage(messages.shareButtonLabel)}
        </ShareButton>
      )}
      {withDeleteButton && !closed && (
        <DeleteLabel onClick={handleClickDelete}>
          {formatMessage(messages.deleteButtonLabel)}
        </DeleteLabel>
      )}
    </ButtonsContainer>
  )

  return (
    <Container>
      <TeamStoreCard {...{ small }}>
        <CardContent>
          {image ? (
            <StyledImg src={image} onClick={onItemClick} />
          ) : (
              <TitleName onClick={onItemClick}>{name}</TitleName>
            )}
          {showNameStore && (
            <BottomContainer>
              <CardTitle>{name}</CardTitle>
              <MediaQuery minWidth={480}>{buttons}</MediaQuery>
            </BottomContainer>
          )}
        </CardContent>
      </TeamStoreCard>
      <MediaQuery maxWidth={480}>{buttons}</MediaQuery>
    </Container>
  )
}

export default TeamStoreItem
